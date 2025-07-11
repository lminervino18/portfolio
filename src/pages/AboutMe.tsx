import './styles/AboutMe.css'
import { TechGrid } from '../components/TechGrid'
import { SocialLinks } from '../components/SocialLinks'
import CountUp from '../components/CountUp'
import TrueFocus from '../components/TrueFocus'
import { motion } from 'framer-motion'
import { useRef } from 'react'

export function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const birthDate = new Date('2000-07-13')
  const age = Math.floor((Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

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
            Download CV
          </a>
        </div>

        <div className="about-right">
          <div className="simple-box">
            <p className="about-text">
              I'm in my final year of{' '}
              <a href="/src/assets/me/ing.pdf" target="_blank" className="link-highlight">
                Computer Engineering
              </a>{' '}
              at{' '}
              <span className="fiuba-highlight">
                FIUBA
                <img
                  src="/src/assets/me/fiuba.jpeg"
                  alt="FIUBA preview"
                  className="preview-image"
                />
              </span>
              . I enjoy web design, distributed systems, data science, neural networks, and best practices.
            </p>
          </div>
        </div>
      </motion.section>

      <section className="tech-section">
        <h2>Technologies</h2>
        <TechGrid />
      </section>
    </div>
  )
}
