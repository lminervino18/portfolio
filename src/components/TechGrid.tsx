import { technologies } from '../constants/technologies'
import './styles/TechGrid.css'

export function TechGrid() {
  return (
    <div className="tech-grid">
      {technologies.map(tech => (
        <a
          key={tech.name}
          className="tech-card"
          href={tech.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`/assets/technologies/${tech.logo}`}
            alt={tech.name}
            className="tech-logo"
          />
        </a>
      ))}
    </div>
  )
}
