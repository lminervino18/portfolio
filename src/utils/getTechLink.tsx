export function getTechLink(tech: string): string {
  const links: Record<string, string> = {
    "Python": "https://www.python.org/",
    "Pygame": "https://www.pygame.org/docs/",
    "React": "https://react.dev/",
    "React Native": "https://reactnative.dev/",
    "TypeScript": "https://www.typescriptlang.org/",
    "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "MySQL": "https://dev.mysql.com/doc/",
    "PostgreSQL": "https://www.postgresql.org/docs/",
    "MongoDB": "https://www.mongodb.com/docs/",
    "Firebase": "https://firebase.google.com/docs",
    "Rust": "https://www.rust-lang.org/learn",
    "Assembly (x86-64)": "https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html",
    "Docker": "https://docs.docker.com/",
    "Arduino": "https://www.arduino.cc/"
  }

  return links[tech] || "#"
}
