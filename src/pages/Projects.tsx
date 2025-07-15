import { useState, useRef, useCallback, useEffect } from 'react'
import { projects } from '../constants/projects'
import type { Project } from '../constants/projects'
import { getTechIcon } from '../utils/getTechIcon'
import { FaGithub } from 'react-icons/fa'
import './styles/Projects.css'

export function Projects() {
  const [index, setIndex] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const interactionTimeout = useRef<number | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const current: Project = projects[index]

  const goNext = useCallback(() => setIndex(i => (i + 1) % projects.length), [])
  const goPrev = useCallback(() => setIndex(i => (i - 1 + projects.length) % projects.length), [])

  const handleEnded = () => !isInteracting && goNext()
  const onInteract = () => {
    setIsInteracting(true)
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current)
    interactionTimeout.current = window.setTimeout(() => setIsInteracting(false), 3000)
  }

  useEffect(() => {
    const vid = videoRef.current
    if (vid) {
      vid.pause()
      vid.load()
      vid.currentTime = 0
      const playPromise = vid.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Autoplay failed, muting and retrying.', err)
          vid.muted = true
          vid.play().catch(() => console.error('Video still failed to play.'))
        })
      }
    }
  }, [index])

  return (
    <div className="proj-wrapper" onMouseMove={onInteract} onClick={onInteract}>
      <button className="proj-arrow left" onClick={goPrev}>&lsaquo;</button>

      <div className="proj-modal">
        <div className="proj-title-bar">
          <h2>{current.title}</h2>
          <a href={current.githubRepo} target="_blank" rel="noopener noreferrer">
            <FaGithub size={26} />
          </a>
        </div>

        <div className="proj-content-grid">
          <div className="proj-video-container">
            <video
              ref={videoRef}
              onEnded={handleEnded}
              autoPlay
              muted
              controls
              playsInline
            >
              <source src={`/projects_videos/${current.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="proj-info">
            <div className="proj-description">
              <h3>Description</h3>
              <p>{current.description}</p>
            </div>

            <div className="proj-tech-teammates">
              <div className="proj-tech">
                <h3>Technologies</h3>
                <div className="tech-icons">
                  {current.technologies.map(tech => (
                    <img key={tech} src={getTechIcon(tech)} alt={tech} title={tech} />
                  ))}
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
                          />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button className="proj-arrow right" onClick={goNext}>&rsaquo;</button>
    </div>
)
}
