import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { projects } from '../constants/projects'
import type { Project } from '../constants/projects'
import { getTechIcon } from '../utils/getTechIcon'
import { FaGithub } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import VariableProximity from '../components/VariableProximity'
import { getTechLink } from '../utils/getTechLink'
import './styles/Projects.css'

const posterOf = (videoUrl: string) => videoUrl.replace(/\.mp4$/, '.jpg')

export function Projects() {
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [index, setIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const direction = useRef(1)
  const containerRef = useRef<HTMLDivElement>(null!)

  // Only technologies shared by more than one project are worth a filter chip:
  // a chip that always yields a single project is a slower way to click a dot.
  const filters = useMemo(() => {
    const counts = new Map<string, number>()
    for (const project of projects) {
      for (const tech of project.technologies) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([tech]) => tech)
  }, [])

  const visible = useMemo(
    () => (activeTech ? projects.filter(p => p.technologies.includes(activeTech)) : projects),
    [activeTech],
  )

  const current: Project = visible[index]

  const selectTech = useCallback((tech: string | null) => {
    direction.current = 1
    setActiveTech(tech)
    setIndex(0)
  }, [])

  const goTo = useCallback((targetIndex: number) => {
    direction.current = targetIndex > index ? 1 : -1
    setIndex(targetIndex)
  }, [index])

  const goNext = useCallback(() => {
    direction.current = 1
    setIndex(i => (i + 1) % visible.length)
  }, [visible.length])

  const goPrev = useCallback(() => {
    direction.current = -1
    setIndex(i => (i - 1 + visible.length) % visible.length)
  }, [visible.length])

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
      <div className="project-dots">
        {visible.map((project, i) => (
          <button
            key={project.title}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${project.title}`}
          />
        ))}
      </div>

      <button className="proj-arrow left" onClick={goPrev} aria-label="Previous project">
        &lsaquo;
      </button>

      <div className="proj-modal">
        <div className="proj-filters" role="group" aria-label="Filter projects by technology">
          <button
            className={`proj-filter ${activeTech === null ? 'active' : ''}`}
            onClick={() => selectTech(null)}
            aria-pressed={activeTech === null}
          >
            All <span className="proj-filter-count">{projects.length}</span>
          </button>
          {filters.map(tech => (
            <button
              key={tech}
              className={`proj-filter ${activeTech === tech ? 'active' : ''}`}
              onClick={() => selectTech(tech)}
              aria-pressed={activeTech === tech}
            >
              <img src={getTechIcon(tech)} alt="" aria-hidden="true" />
              {tech}
              <span className="proj-filter-count">
                {projects.filter(p => p.technologies.includes(tech)).length}
              </span>
            </button>
          ))}
        </div>

        <div className="proj-title-bar">
          <h2>{current.title}</h2>
          <span className="proj-year">{current.year}</span>
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
                <source src={`/assets/projects_videos/${current.videoUrl}`} type="video/mp4" />
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
                    {current.technologies.map(tech => (
                      <a
                        key={tech}
                        href={getTechLink(tech)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={getTechIcon(tech)}
                          alt={tech}
                          title={tech}
                          className="tech-icon"
                        />
                      </a>
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
