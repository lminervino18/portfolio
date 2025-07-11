import './styles/AboutMe.css'
import { TechGrid } from '../components/TechGrid'

export function AboutMe() {
  return (
    <main className="about-container">
      <div className="about-content">
        <img src="/src/assets/me/logo.jpeg" alt="Profile" className="profile-img" />
        <h1>Hi, I'm Lorenzo Minervino</h1>
        <p>Software engineering student passionate about backend, systems design, and distributed architectures.</p>
      </div>
      <div className="tech-section">
        <h2>Technologies</h2>
        <TechGrid />
      </div>
    </main>
  )
}
