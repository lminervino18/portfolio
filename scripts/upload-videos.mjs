/**
 * Uploads every project video in videos/ to Cloudinary under the `portfolio/`
 * folder, using the file name as the public id. The site plays them from the
 * CDN, so the videos themselves are never committed.
 *
 * Reads CLOUDINARY_URL from .env.local. Never prints the credentials.
 * Idempotent: an asset that already exists with the same bytes is skipped,
 * so re-running after adding one video only uploads that one.
 *
 *   node scripts/upload-videos.mjs [--force]
 */
import { readdir, readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import process from 'node:process'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config({ path: '.env.local', quiet: true })

if (!process.env.CLOUDINARY_URL) {
  console.error('Missing CLOUDINARY_URL in .env.local')
  process.exit(1)
}

// The SDK reads CLOUDINARY_URL at import time, which happens before dotenv runs.
cloudinary.config(true)

const FOLDER = 'portfolio'
const VIDEO_DIR = 'videos'
const force = process.argv.includes('--force')

const files = (await readdir(VIDEO_DIR)).filter(f => f.endsWith('.mp4')).sort()

// Cloudinary's own etag is computed on the stored asset, not on the bytes we
// sent, so it never matches a local digest. We stamp our own hash in the
// asset context on upload and compare against that.
const existing = new Map()
let cursor
do {
  const page = await cloudinary.api.resources({
    resource_type: 'video',
    type: 'upload',
    prefix: `${FOLDER}/`,
    max_results: 500,
    context: true,
    ...(cursor ? { next_cursor: cursor } : {}),
  })
  for (const r of page.resources) existing.set(r.public_id, r.context?.custom?.sha)
  cursor = page.next_cursor
} while (cursor)

const results = []
for (const file of files) {
  const name = path.basename(file, '.mp4')
  const publicId = `${FOLDER}/${name}`
  const bytes = await readFile(path.join(VIDEO_DIR, file))
  const sha = createHash('sha256').update(bytes).digest('hex')

  if (!force && existing.get(publicId) === sha) {
    console.log(`skip    ${publicId}`)
    results.push({ publicId, uploaded: false })
    continue
  }

  const res = await cloudinary.uploader.upload(path.join(VIDEO_DIR, file), {
    resource_type: 'video',
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    context: { sha },
  })
  console.log(`upload  ${res.public_id}  ${(res.bytes / 1024 / 1024).toFixed(1)} MB  ${res.duration.toFixed(1)}s`)
  results.push({ publicId: res.public_id, uploaded: true })
}

const uploaded = results.filter(r => r.uploaded).length
console.log(`\n${results.length} videos, ${uploaded} uploaded, ${results.length - uploaded} unchanged`)

// Cloudinary builds the q_auto derivative on its first request, so without this
// the first visitor to each clip waits several seconds for the transcode.
const cloudName = cloudinary.config().cloud_name
console.log('\nwarming the delivery URLs')
for (const { publicId } of results) {
  const url = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto/${publicId}.mp4`
  const started = Date.now()
  const res = await fetch(url)
  await res.arrayBuffer()
  console.log(`  ${res.ok ? 'ok  ' : `${res.status} `} ${publicId}  ${Date.now() - started} ms`)
}
