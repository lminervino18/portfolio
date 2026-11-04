import { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'
import './styles/ExperienceCard.css'

const LANDING_URL = 'https://sociovirtual.ai/'

const specialties = ['AI Agents', 'Full Stack', 'DevOps', 'System Architecture']

export function ExperienceCard() {
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()
  const reducedMotion = useReducedMotion()

  return (
    <div className={`experience-card ${expanded ? 'expanded' : ''}`}>
      <div className="experience-header">
        <a
          href={LANDING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="experience-logo-link"
          aria-hidden="true"
          tabIndex={-1}
        >
          <img
            src="/assets/me/socio-virtual.png"
            alt=""
            width={200}
            height={200}
            className="experience-logo"
          />
        </a>
        <p className="experience-title">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={expanded ? 'role' : 'status'}
              className="experience-title-text"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: reducedMotion ? 0 : 0.15, ease: 'easeOut' }}
            >
              {expanded ? (
                <>
                  <strong>AI Shipper</strong> @{' '}
                </>
              ) : (
                'Currently building at '
              )}
              <a
                href={LANDING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-highlight experience-link"
              >
                Socio Virtual
              </a>
            </motion.span>
          </AnimatePresence>
        </p>
        <button
          type="button"
          className="experience-toggle"
          aria-label="Socio Virtual role details"
          aria-expanded={expanded}
          aria-controls={expanded ? panelId : undefined}
          onClick={() => setExpanded(isExpanded => !isExpanded)}
        >
          <FaPlus className="experience-icon" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            className="experience-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: 'easeInOut' }}
          >
            <div className="experience-details">
              <p className="experience-description">
                Building and deploying AI-powered solutions for businesses, combining full-stack
                development, software architecture, DevOps, and AI agent engineering with
                real-world client implementations.
              </p>
              <ul className="experience-tags">
                {specialties.map(specialty => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
