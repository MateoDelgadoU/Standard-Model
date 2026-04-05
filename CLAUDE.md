# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Interactive visualization of the Standard Model of particle physics. Built with React 19, TypeScript, Vite, and Tailwind CSS 4. Shows a table of fundamental particles (quarks, leptons, bosons) with a toggle for antiparticles, click-to-expand modal details, and animated cosmic background.

## Commands

```bash
pnpm install        # Install dependencies
pnpm run dev        # Start dev server
pnpm run build      # Type-check (tsc -b) then build for production
pnpm run lint       # ESLint
pnpm run preview    # Preview production build
```

## Architecture

- `src/types/particle.ts` — Core `Particle` interface and type unions
- `src/data/particles.ts` — All standard particle data
- `src/data/antiparticles.ts` — Antiparticle data and `getParticleByIdWithAntiparticle()` lookup
- `src/constants/particles.ts` — Display constants (colors, categories)
- `src/components/StandardModelTable.tsx` — Main grid layout with antiparticle toggle
- `src/components/ParticleCard.tsx` — Individual particle tile
- `src/components/ParticleModal.tsx` — Detail modal on click
- `src/components/AnimatedBackground.tsx` — Cosmic animated background
- `src/App.tsx` — Root: manages selected particle state and antiparticle toggle (persisted to localStorage)

## Key Patterns

- Antiparticle toggle state is persisted in `localStorage` under key `show-antiparticles`
- Pure CSS animations (defined in `index.css`) for transitions — no animation libraries
- Tailwind CSS 4 via PostCSS (configured in `postcss.config.js`), not the older `tailwind.config.js` plugin approach
