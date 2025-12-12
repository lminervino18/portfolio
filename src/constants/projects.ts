export interface Project {
  title: string
  description: string
  videoUrl: string 
  githubRepo: string
  teammateRepos: string[]
  technologies: string[],
  year: number
}

export const projects: Project[] = [
  {
    title: "Rustic Airlines",
    description: "A distributed flight management system developed in Rust, featuring a Cassandra-compatible database engine, real-time tracking on a world map, and a flight simulator. It supports strong and weak consistency levels, multi-node replication, and fault tolerance.",
    videoUrl: "rustic-airlines.mp4",
    githubRepo: "https://github.com/lminervino18/rustic-airlines",
    teammateRepos: [
      "https://github.com/alendavies",
      "https://github.com/lazcanoluca",
      "https://github.com/kmu01"
    ],
    technologies: ["Rust"],
    year: 2024
  },
  {
    title: "ClassConnect",
    description: "A full-stack educational management platform enabling seamless interaction between students and teachers. It includes course and assignment management, exams, feedback, real-time chat, analytics, and an AI assistant integrated into the mobile app.",
    videoUrl: "classconnect.mp4",
    githubRepo: "https://github.com/IS2-Class-Connect",
    teammateRepos: [
      "https://github.com/mbianchif",
      "https://github.com/Manuel-Pol",
      "https://github.com/s-g-u"
    ],
    technologies: ["React Native", "TypeScript", "Python", "Docker", "Firebase", "PostgreSQL", "MongoDB"],
    year: 2025
  },
  {
    title: "Mi Colección de Camisetas",
    description: "A full-featured web app to manage a personal football jersey collection. Users can upload images, edit detailed information, filter items, and explore interactive statistics and insights about their collection through a modern interface.",
    videoUrl: "mi-coleccion-camisetas.mp4",
    githubRepo: "https://github.com/lminervino18/mi-coleccion-camisetas",
    teammateRepos: [],
    technologies: ["React", "JavaScript", "CSS", "Java","MySQL"],
    year: 2024
  },
   {
  title: "YPF Route",
  description: "A distributed system built in Rust to manage and control fuel consumption for vehicle fleets, featuring multi-node coordination, fault tolerance, offline operation handling, and a command-line interface for administration.",
  videoUrl: "ypf-ruta.mp4",
  githubRepo: "https://github.com/lminervino18/ypf-fleet-fuel-distributed-system",
  teammateRepos: [
    "https://github.com/alejoordonez02"
  ],
  technologies: ["Rust"],
  year: 2025
},
  {
  "title": "AI Drawing Arm",
  "description": "An AI-powered robotic arm that interprets natural language prompts and draws symbolic figures on a 14×10 grid using OpenAI and inverse kinematics. The system validates and centers shapes, translates them into optimized servo angles, and controls a dual-arm mechanism via Arduino for precise, coordinated drawing.",
  "videoUrl": "ai-arm-drawing.mp4",
  "githubRepo": "https://github.com/lminervino18/ai-arm-drawing",
  "teammateRepos": [
    "https://github.com/felipeperassi"
  ],
  "technologies": ["Python", "Arduino"],
  "year": 2025
  },
  {
    title: "Multiplayer Hangman Game",
    description: "A personal project built in Python using Pygame. It's a two-player version of the classic Hangman game, featuring a full dictionary word pool, player turn-based guessing, images, background music, and a fun interactive game flow.",
    videoUrl: "hangman.mp4",
    githubRepo: "https://github.com/lminervino18/HangmanGame",
    teammateRepos: [],
    technologies: ["Python", "Pygame"],
    year: 2021
  },
  {
    title: "Gastandoando",
    description: "A collaborative web app built with React and TypeScript for organizing personal and group expenses, managing savings, and forecasting future spending. Designed to simplify financial planning and sharing within groups.",
    videoUrl: "gastando-ando.mp4",
    githubRepo: "https://github.com/Manuel-Pol/GastandoAndo-GDSI",
    teammateRepos: [
      "https://github.com/alendavies",
      "https://github.com/kmu01",
      "https://github.com/pgallino",
      "https://github.com/Manuel-Pol",
      "https://github.com/mreimundo"
    ],
    technologies: ["TypeScript", "React"],
    year: 2024
  },
  {
    title: "Fox and Geese Game",
    description: "A multiplayer terminal-based game implemented entirely in x86-64 assembly, where one player controls a fox and the other controls geese. The game logic, rendering, and interaction are all handled at a low level, demonstrating direct memory manipulation and input handling.",
    videoUrl: "zorros-y-ocas.mp4",
    githubRepo: "https://github.com/Bastian1998/Zorro-y-Ocas",
    teammateRepos: [],
    technologies: ["Assembly (x86-64)"],
    year: 2024
  },
  {
    title: "Pokédex App",
    description: "A project written in Python that simulates a Pokédex. Users can browse Pokémon, search by name, and build custom teams from the collection. It features an interactive interface and image-based display using a custom graphical library.",
    videoUrl: "pokedex.mp4",
    githubRepo: "https://github.com/lminervino18/Pokedex",
    teammateRepos: ["https://github.com/Manuel-Pol"],
    technologies: ["Python"],
    year: 2021
  }

]
