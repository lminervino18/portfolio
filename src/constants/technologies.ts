const ICON_BASE = '/assets/technologies'

/**
 * Every technology the site can render, keyed by the exact name used in
 * `projects.ts`. This is the single source of truth: a name that is not here
 * fails to compile instead of rendering a broken image.
 */
const catalog = {
  'Arduino': { logo: 'arduino.png', url: 'https://www.arduino.cc/' },
  'Assembly (x86-64)': {
    logo: 'asm.png',
    url: 'https://www.intel.com/content/www/us/en/docs/intrinsics-guide/index.html',
  },
  'C': { logo: 'c.png', url: 'https://en.cppreference.com/w/c' },
  'CSS': { logo: 'css.png', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  'Docker': { logo: 'docker.png', url: 'https://docs.docker.com/' },
  'Firebase': { logo: 'firebase.png', url: 'https://firebase.google.com/docs' },
  'Java': { logo: 'java.png', url: 'https://docs.oracle.com/en/java/javase/' },
  'JavaScript': {
    logo: 'javascript.png',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  'MongoDB': { logo: 'mongodb.png', url: 'https://www.mongodb.com/docs/' },
  'MySQL': { logo: 'mysql.png', url: 'https://dev.mysql.com/doc/' },
  'Playwright': { logo: 'playwright.png', url: 'https://playwright.dev/docs/intro' },
  'PostgreSQL': { logo: 'postgresql.png', url: 'https://www.postgresql.org/docs/' },
  'Pygame': { logo: 'pygame.png', url: 'https://www.pygame.org/docs/' },
  'Python': { logo: 'python.png', url: 'https://www.python.org/' },
  'RabbitMQ': { logo: 'rabbitmq.png', url: 'https://www.rabbitmq.com/docs' },
  'React': { logo: 'react.png', url: 'https://react.dev/' },
  'React Native': { logo: 'react.png', url: 'https://reactnative.dev/' },
  'Rust': { logo: 'rust.png', url: 'https://www.rust-lang.org/learn' },
  'SQL': { logo: 'sql.png', url: 'https://www.postgresql.org/docs/current/sql.html' },
  'Smalltalk': { logo: 'smalltalk.png', url: 'https://www.gnu.org/software/smalltalk/' },
  'Spring Boot': { logo: 'springboot.png', url: 'https://docs.spring.io/spring-boot/index.html' },
  'Tailwind CSS': { logo: 'tailwind.png', url: 'https://tailwindcss.com/docs' },
  'TypeScript': { logo: 'typescript.png', url: 'https://www.typescriptlang.org/' },
  'Vite': { logo: 'vite.png', url: 'https://vite.dev/guide/' },
} satisfies Record<string, { logo: string; url: string }>

export type TechnologyName = keyof typeof catalog

export interface Technology {
  name: TechnologyName
  icon: string
  url: string
}

export function technology(name: TechnologyName): Technology {
  const { logo, url } = catalog[name]
  return { name, icon: `${ICON_BASE}/${logo}`, url }
}

/**
 * The curated subset shown in the "Technologies I Use" grid on the About page.
 * It is deliberately not every entry in `catalog`: the grid answers what I work
 * with, not what happens to appear in a project.
 */
export const aboutTechnologies: TechnologyName[] = [
  'Assembly (x86-64)',
  'C',
  'CSS',
  'Docker',
  'Java',
  'JavaScript',
  'Python',
  'React',
  'Rust',
  'Smalltalk',
  'SQL',
  'TypeScript',
]
