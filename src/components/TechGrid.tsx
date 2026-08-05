import { aboutTechnologies, technology } from '../constants/technologies'
import './styles/TechGrid.css'

export function TechGrid() {
  return (
    <div className="tech-grid">
      {aboutTechnologies.map(name => {
        const { icon, url } = technology(name)
        return (
          <a
            key={name}
            className="tech-card"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={icon} alt={name} className="tech-logo" />
          </a>
        )
      })}
    </div>
  )
}
