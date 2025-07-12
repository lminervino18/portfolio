import './styles/AboutMe.css'
import { TechGrid } from '../components/TechGrid'

export function AboutMe() {
  return (
    <div className="about-container">
      <section className="about-content">
        <img src="/src/assets/me/logo.jpeg" alt="Profile" className="profile-img" />
        <h1>Hi, I'm Lorenzo Minervino</h1>
        <p>Software engineering student passionate about backend, systems design, and distributed architectures.</p>
      </section>
      <section className="tech-section visible">
        <h2>Technologies</h2>
        <TechGrid />
      </section>
    </div>
  )
}
