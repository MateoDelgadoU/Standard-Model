import type { Particle } from '../types/particle';
import { particlesData } from './particles';

const SELF_CONJUGATE = new Set(['photon', 'gluon', 'z-boson', 'higgs']);

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
  W: 'W',  // W± are each other's antiparticle (symbol stays)
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
  if (SELF_CONJUGATE.has(particle.id)) return particle;

  const name = antiNames[particle.id] ?? `Anti-${particle.name.toLowerCase()}`;
  const symbol = antiSymbols[particle.symbol] ?? particle.symbol;
  const charge = invertCharge(particle.charge);

  return { ...particle, id: `anti-${particle.id}`, name, symbol, charge };
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
