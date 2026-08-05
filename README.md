# Personal Portfolio – Lorenzo Minervino

This is my personal portfolio built with React, TypeScript and Vite. It showcases my academic background, skills, and selected projects as a Computer Engineering student.

## Overview

This project combines a clean UI with responsive design and subtle interactions, all optimized for performance and accessibility.

- Built with **React + Vite + TypeScript**
- Animations powered by **Framer Motion**
- Uses [React Bits](https://reactbits.dev/) for high-quality reusable components
- Fully responsive layout
- Modular architecture with reusable hooks and logic

## Screenshots

### About Me

![About Me](./docs/about-me.png)

### Projects

![Projects](./docs/projects.png)

## Stack and Tooling

- **React + TypeScript + Vite** for fast development and build performance
- **Framer Motion** for smooth and declarative animations
- **Custom Hooks** for handling proximity effects and interactivity
- **ESLint + TypeScript ESLint** with optional type-aware linting
- **React Bits** components for flexible and accessible UI primitives

## Getting Started

To install dependencies and start the development server:

```bash
npm install
npm run dev
```
Requires Node.js 18+

## Project videos

The demo clips are **not** committed. They live locally in `videos/` (gitignored)
and are served from Cloudinary, which keeps roughly 80 MB of media out of the
repository and out of every deploy.

To publish a new clip, drop the `.mp4` in `videos/` and run:

```bash
npm run videos:upload
```

The script is idempotent: it hashes each file and skips anything already uploaded
with the same content, so re-running only pushes what changed. Pass `--force` to
re-upload everything.

It needs a local `.env.local` (never committed):

```env
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
```

Only this script reads that variable — it is never exposed to Vite or to browser
code. The normal `npm run build` does not need it.

Each video also needs a poster frame in `public/assets/projects_posters/` with the
same base name, so the player shows a real frame instead of a grey box while the
clip loads.

## React Bits

This project uses React Bits, a modern component library offering composable and accessible building blocks for React. It helped accelerate the layout and structure of this site while maintaining flexibility and performance.

## Contact

You can connect with me on [LinkedIn](https://www.linkedin.com/in/lorenzominervino/) or visit my [GitHub](https://github.com/lminervino18).

Email: lminervino18@gmail.com
