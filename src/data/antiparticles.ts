import type { Particle } from '../types/particle';
import { particlesData } from './particles';

// W± is a combined entry; the gluon tile represents the entire color octet.
const SHARED_BOSON_ENTRIES = new Set(['photon', 'gluon', 'z-boson', 'w-boson', 'higgs']);

const antiSymbols: Record<string, string> = {
  u: '\u016B',    // ū
  d: 'd\u0305',   // d̄
  c: 'c\u0305',   // c̄
  s: 's\u0305',   // s̄
  t: 't\u0305',   // t̄
  b: 'b\u0305',   // b̄
  e: 'e\u207A',   // e⁺  (positron)
  '\u03BC': '\u03BC\u207A',  // μ⁺  (antimuon)
  '\u03C4': '\u03C4\u207A',  // τ⁺  (antitau)
  '\u03BD\u2091': '\u03BD\u0305\u2091',  // ν̄ₑ
  '\u03BD\u03BC': '\u03BD\u0305\u03BC',  // ν̄μ
  '\u03BD\u03C4': '\u03BD\u0305\u03C4',  // ν̄τ
};

const antiNames: Record<string, string> = {
  electron: 'Positron',
  muon: 'Antimuon',
  tau: 'Antitau',
  'electron-neutrino': 'Electron antineutrino',
  'muon-neutrino': 'Muon antineutrino',
  'tau-neutrino': 'Tau antineutrino',
};

function invertCharge(charge: string): string {
  if (charge === '0' || charge === '\u00B11') return charge;
  if (charge.startsWith('+')) return charge.replace('+', '-');
  if (charge.startsWith('-')) return charge.replace('-', '+');
  return charge;
}

export function getAntiparticle(particle: Particle): Particle {
  if (SHARED_BOSON_ENTRIES.has(particle.id)) return particle;

  const name = antiNames[particle.id] ?? `Anti-${particle.name.toLowerCase()}`;
  const symbol = antiSymbols[particle.symbol] ?? particle.symbol;
  const charge = invertCharge(particle.charge);

  const description = particle.category === 'quark'
    ? `Antiparticle of the ${particle.name.toLowerCase()} quark. It has opposite electric charge and conjugate color charge; its mass and spin are the same by CPT symmetry.`
    : particle.id.includes('neutrino')
      ? `Electron, muon and tau antineutrinos are distinguished by their charged-current weak interactions. This is the ${particle.name.toLowerCase().replace(' neutrino', '')} flavor. Whether neutrinos are Dirac or Majorana particles remains unknown.`
      : `Antiparticle of the ${particle.name.toLowerCase()}. It has opposite electric charge and the same mass and spin by CPT symmetry.`;

  return { ...particle, description, id: `anti-${particle.id}`, name, symbol, charge };
}

export function getParticleOrAntiparticle(particle: Particle, showAnti: boolean): Particle {
  return showAnti ? getAntiparticle(particle) : particle;
}

export function getParticleByIdWithAntiparticle(id: string, showAnti: boolean): Particle | undefined {
  const baseId = id.startsWith('anti-') ? id.replace('anti-', '') : id;
  const p = particlesData.find((x) => x.id === baseId);
  if (!p) return undefined;
  return showAnti ? getAntiparticle(p) : p;
}
