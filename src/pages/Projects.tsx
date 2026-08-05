import { useState, useRef, useCallback, useEffect } from 'react'
import { projects } from '../constants/projects'
import type { Project } from '../constants/projects'
import { technology } from '../constants/technologies'
import { FaGithub } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import VariableProximity from '../components/VariableProximity'
import './styles/Projects.css'

// Videos are delivered from Cloudinary (`q_auto` picks the bitrate per client)
// so the repository and the deploy stay free of ~80 MB of media.
// Uploaded by scripts/upload-videos.mjs; the cloud name is public delivery data.
const VIDEO_CDN = 'https://res.cloudinary.com/aff9xkft/video/upload/q_auto/portfolio'

const posterOf = (videoUrl: string) => videoUrl.replace(/\.mp4$/, '.jpg')

export function Projects() {
  const [index, setIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const direction = useRef(1)
  const containerRef = useRef<HTMLDivElement>(null!)

  const current: Project = projects[index]

  const goTo = useCallback((targetIndex: number) => {
    direction.current = targetIndex > index ? 1 : -1
    setIndex(targetIndex)
  }, [index])

  const goNext = useCallback(() => {
    direction.current = 1
    setIndex(i => (i + 1) % projects.length)
  }, [])

  const goPrev = useCallback(() => {
    direction.current = -1
    setIndex(i => (i - 1 + projects.length) % projects.length)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      vid.pause()
      vid.load()
      vid.currentTime = 0
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          vid.muted = true
          vid.play().catch(() => {})
        })
      }
    }
  }, [current.videoUrl])

  return (
    <motion.div
      className="proj-wrapper"
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="project-dots" role="tablist" aria-label="Projects">
        {projects.map((project, i) => (
          <button
            key={project.title}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`${project.title} (${i + 1} of ${projects.length})`}
            title={project.title}
          />
        ))}
      </div>

      <button className="proj-arrow left" onClick={goPrev} aria-label="Previous project">
        &lsaquo;
      </button>

      <div className="proj-modal">
        <div className="proj-title-bar">
          <h2>{current.title}</h2>
          <a
            href={current.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${current.title} on GitHub`}
          >
            <FaGithub size={26} />
          </a>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.title}
            className="proj-content-grid"
            initial={{ x: direction.current > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction.current > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="proj-video-container">
              <video
                ref={videoRef}
                autoPlay
                muted
                controls
                playsInline
                preload="metadata"
                poster={`/assets/projects_posters/${posterOf(current.videoUrl)}`}
              >
                <source src={`${VIDEO_CDN}/${current.videoUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="proj-info">
              <div className="proj-description">
                <h3>Description</h3>
                <VariableProximity
                  fromFontVariationSettings="'wght' 400"
                  toFontVariationSettings="'wght' 700"
                  containerRef={containerRef}
                >
                  {current.description}
                </VariableProximity>
              </div>

              <div className="proj-tech-teammates">
                <div className="proj-tech">
                  <h3>Technologies</h3>
                  <div className="tech-icons">
                    {current.technologies.map(name => {
                      const { icon, url } = technology(name)
                      return (
                        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
                          <img src={icon} alt={name} title={name} className="tech-icon" />
                        </a>
                      )
                    })}
                  </div>

                </div>

                {current.teammateRepos.length > 0 && (
                  <div className="proj-team">
                    <h3>Teammates</h3>
                    <div className="team-icons">
                      {current.teammateRepos.map(url => {
                        const user = url.split('/').pop()
                        return (
                          <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                            <img
                              src={`https://github.com/${user}.png?size=64`}
                              alt={user}
                              title={user}
                              className="team-icon"
                            />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="proj-arrow right" onClick={goNext} aria-label="Next project">
        &rsaquo;
      </button>
    </motion.div>
  )
}
