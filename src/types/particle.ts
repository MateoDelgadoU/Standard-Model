export type ParticleType = 'fermion' | 'boson';

export type QuarkFlavor = 'up' | 'down' | 'charm' | 'strange' | 'top' | 'bottom';

export type LeptonFlavor = 'electron' | 'muon' | 'tau' | 'electron-neutrino' | 'muon-neutrino' | 'tau-neutrino';

export type BosonType = 'photon' | 'gluon' | 'w-boson' | 'z-boson' | 'higgs';

export type Generation = 1 | 2 | 3;

export interface Particle {
  id: string;
  name: string;
  symbol: string;
  type: ParticleType;
  category?: 'quark' | 'lepton' | 'gauge-boson' | 'scalar-boson';
  charge: string;
  mass: string;
  spin: string;
  description: string;
  generation?: Generation;
  color?: string;
}
