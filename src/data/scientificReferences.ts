import type { ParticleCategory } from '../types/particle';

const PDG_BASE = 'https://pdg.lbl.gov/2026/tables/';

export function getScientificSource(category: ParticleCategory) {
  const file = category === 'quark'
    ? 'rpp2026-sum-quarks.pdf'
    : category === 'lepton'
      ? 'rpp2026-sum-leptons.pdf'
      : 'rpp2026-sum-gauge-higgs-bosons.pdf';
  return `${PDG_BASE}${file}`;
}

export const NEUTRINO_MASS_NOTE = 'Flavor states are mixtures of mass eigenstates, so a flavor has no single fixed mass. Oscillations require at least two nonzero masses. KATRIN constrains the effective electron-neutrino mass mβ < 0.45 eV (90% confidence, 2025), not a separate mass for each flavor. Neutrino masses require an extension of the minimal Standard Model; their origin and Dirac/Majorana nature are unresolved.';
