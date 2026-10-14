# Standard Model of Particle Physics

An interactive visualization of the Standard Model of particle physics.

## What is the Standard Model?

The Standard Model is a theory that describes the fundamental particles that make up all matter in the universe and the forces that govern their interactions. It classifies particles into two main categories:

- **Fermions**: Matter particles (quarks and leptons) organized into three generations
- **Bosons**: Force-carrying particles that mediate interactions between fermions

The model includes 17 fundamental particles: 12 fermions (6 quarks and 6 leptons) and 5 bosons (4 gauge bosons and the Higgs boson).

## How it's Built

This web application is built with:

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

The application uses pure CSS animations for smooth interactions and a minimalist dark theme inspired by the cosmos.

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm run dev
```

3. Build for production:
```bash
pnpm run build
```

---

Built by Mateo Delgado

## Scientific data

Masses and uncertainties follow the [PDG 2026 summary tables](https://pdg.lbl.gov/2026/tables/contents_tables.html) (data cutoff: January 15, 2026). Tiles show rounded values; dialogs show uncertainties and definitions. Natural units use c = 1, spin is in units of ℏ, and electric charge is in units of e. Quark running masses depend on renormalization scheme and scale; the top entry uses direct reconstruction. The W average excludes CDF 2022, following PDG.

Neutrino flavors are mixtures of mass eigenstates, so their tiles do not assign individual masses. The [PDG neutrino review](https://pdg.lbl.gov/2026/reviews/rpp2026-rev-neutrino-mixing.pdf) explains mixing and the unresolved mass origin and Dirac/Majorana nature. The [KATRIN 2025 result](https://www.katrin.kit.edu/1271.php) constrains the effective electron-neutrino mass to less than 0.45 eV at 90% confidence.

The 17 tiles count particle types, grouping the eight gluon color states and both W charges. Antiparticle descriptions distinguish the conjugate states instead of reusing matter descriptions. Photon and gluon zero masses are Standard Model predictions, not measurements with zero uncertainty.

Background motion and the orbit logo are decorative, not physical trajectories or simulations. Descriptions also draw on [CERN's Standard Model overview](https://home.web.cern.ch/science/physics/standard-model/), [ATLAS's J/ψ definition](https://atlas.cern/Glossary/jpsi-meson), and [CERN's explanation of the origin of mass](https://cds.cern.ch/journal/CERNBulletin/2012/28/News%20Articles/1459456?ln=en).
