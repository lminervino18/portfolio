import './styles/AboutMe.css'
import { TechGrid } from '../components/TechGrid'
import { SocialLinks } from '../components/SocialLinks'
import CountUp from '../components/CountUp'
import TrueFocus from '../components/TrueFocus'
import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import VariableProximity from '../components/VariableProximity'

  export function AboutMe() {
    const containerRef = useRef<HTMLDivElement>(null)
    const age = useMemo(() => {
    const birthDate = new Date('2000-07-13')
    return Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
  }, [])

  return (
    <div className="about-container" ref={containerRef}>
      <motion.section
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="about-left">
          <img src="/src/assets/me/logo.jpeg" alt="Profile" className="profile-img" />

          <SocialLinks />

          <div className="name-age-wrapper">
            <TrueFocus
              sentence="Lorenzo Minervino"
              manualMode={false}
              blurAmount={2}
              borderColor="#8000ff"
              glowColor="#b266ff"
              animationDuration={1}
              pauseBetweenAnimations={0.8}
            />
            <div className="age-number">
              <CountUp to={age} />
              <span className="age-label-inline">years</span>
            </div>
          </div>

          <a href="/src/assets/me/cv.pdf" target="_blank" className="cv-button">
            <span>CV</span>
          </a>

        </div>

        <div className="about-right">
          <div className="simple-box">
            <div className="about-text">
              <VariableProximity
                fromFontVariationSettings="'wght' 300"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef as React.RefObject<HTMLElement>}
              >
                I'm in my final year of
              </VariableProximity>{' '}
              <a href="/src/assets/me/ing.pdf" target="_blank" className="link-highlight">
                Computer Engineering
              </a>{' '}
              <VariableProximity
                fromFontVariationSettings="'wght' 300"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef as React.RefObject<HTMLElement>}
              >
                at
              </VariableProximity>{' '}
              <span className="fiuba-highlight">
                FIUBA
                <img
                  src="/src/assets/me/fiuba.jpeg"
                  alt="FIUBA photo"
                  className="preview-image"
                />
              </span>
              <VariableProximity
                fromFontVariationSettings="'wght' 300"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef as React.RefObject<HTMLElement>}
              >
                . I enjoy web design, distributed systems, data science, neural networks, and best practices.
              </VariableProximity>
            </div>
          </div>

          <section className="tech-section">
            <h2>Technologies</h2>
            <TechGrid />
          </section>
        </div>
      </motion.section>
    </div>
  )
}
