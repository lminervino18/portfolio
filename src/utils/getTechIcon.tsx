export function getTechIcon(tech: string): string {
  const mapping: Record<string, string> = {
    "Python": "python.png",
    "Pygame": "pygame.png",
    "React": "react.png",
    "React Native": "react.png",
    "TypeScript": "typescript.png",
    "JavaScript": "javascript.png",
    "CSS": "css.png",
    "MySQL": "mysql.png",        
    "PostgreSQL": "postgresql.png",  
    "MongoDB": "mongodb.png",    
    "Firebase": "firebase.png",  
    "Rust": "rust.png",
    "Assembly (x86-64)": "asm.png",
    "Docker": "docker.png"
  }

  const fileName = mapping[tech] || tech.toLowerCase().replace(/\s+/g, '') + ".png"
  return `/src/assets/technologies/${fileName}`
}
