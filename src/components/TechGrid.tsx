import React from 'react'
import { technologies } from '../constants/technologies'
import type { Technology } from '../constants/technologies'

import './styles/TechGrid.css'

interface Props {
  items?: Technology[]
}

export const TechGrid: React.FC<Props> = ({ items }) => {
  const list = items || technologies

  return (
    <div className="tech-grid">
      {list.map((tech: Technology) => (
        <a
          key={tech.name}
          className="tech-card"
          href={tech.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`/src/assets/technologies/${tech.logo}`}
            alt={tech.name}
            className="tech-logo"
          />
        </a>
      ))}
    </div>
  )
}

export default TechGrid
