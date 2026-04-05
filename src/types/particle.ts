export type ParticleType = 'fermion' | 'boson';

export type ParticleCategory = 'quark' | 'lepton' | 'gauge-boson' | 'scalar-boson';

export type Generation = 1 | 2 | 3;

export interface Particle {
  id: string;
  name: string;
  symbol: string;
  type: ParticleType;
  category: ParticleCategory;
  charge: string;
  mass: string;
  spin: string;
  description: string;
  generation?: Generation;
  color: string;
  force?: string;
}
