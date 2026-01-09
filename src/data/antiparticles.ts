import type { Particle } from '../types/particle';
import { particlesData } from './particles';

const chargeMap: Record<string, string> = {
  '+2/3 e': '-2/3 e',
  '-1/3 e': '+1/3 e',
  '-1 e': '+1 e',
  '+1 e': '-1 e',
  '0': '0',
  '±1 e': '±1 e',
};

function invertCharge(charge: string): string {
  return chargeMap[charge] || charge;
}

function getAntiparticleSymbol(symbol: string): string {
  if (symbol === 'u') return 'ū';
  if (symbol === 'd') return 'đ';
  if (symbol === 'c') return 'c̄';
  if (symbol === 's') return 's̄';
  if (symbol === 't') return 't̄';
  if (symbol === 'b') return 'b̄';
  if (symbol === 'e⁻') return 'e⁺';
  if (symbol === 'μ⁻') return 'μ⁺';
  if (symbol === 'τ⁻') return 'τ⁺';
  if (symbol === 'νₑ') return 'ν̄ₑ';
  if (symbol === 'ν_μ') return 'ν̄_μ';
  if (symbol === 'ν_τ') return 'ν̄_τ';
  return symbol;
}

export function getAntiparticle(particle: Particle): Particle {
  const isSelfAntiparticle = ['photon', 'gluon', 'z-boson', 'higgs'].includes(particle.id);
  
  if (isSelfAntiparticle) {
    return particle;
  }

  const antiparticleId = particle.id.startsWith('anti-') 
    ? particle.id.replace('anti-', '')
    : `anti-${particle.id}`;

  const antiparticleName = particle.name.includes('Anti-')
    ? particle.name.replace('Anti-', '').trim()
    : `Anti-${particle.name}`;

  const newCharge = invertCharge(particle.charge);
  const newSymbol = getAntiparticleSymbol(particle.symbol);

  let antiparticleDescription = '';
  if (particle.type === 'fermion') {
    if (particle.category === 'quark') {
      antiparticleDescription = `The antiparticle of the ${particle.name.toLowerCase()}. Has opposite charge and quantum numbers.`;
    } else if (particle.category === 'lepton') {
      if (particle.charge === '0') {
        antiparticleDescription = `The antineutrino associated with ${particle.name.toLowerCase()}. Has opposite lepton number.`;
      } else {
        antiparticleDescription = `The antiparticle of the ${particle.name.toLowerCase()}. Has opposite charge (+1 e).`;
      }
    }
  } else {
    antiparticleDescription = particle.description;
  }

  return {
    ...particle,
    id: antiparticleId,
    name: antiparticleName,
    symbol: newSymbol,
    charge: newCharge,
    description: antiparticleDescription || particle.description,
  };
}

export function getParticleOrAntiparticle(particle: Particle, showAntiparticles: boolean): Particle {
  if (showAntiparticles) {
    return getAntiparticle(particle);
  }
  return particle;
}

export function getParticleByIdWithAntiparticle(id: string, showAntiparticles: boolean): Particle | undefined {
  const baseId = id.startsWith('anti-') ? id.replace('anti-', '') : id;
  const particle = particlesData.find((p: Particle) => p.id === baseId);
  
  if (!particle) return undefined;
  
  if (showAntiparticles) {
    return getAntiparticle(particle);
  }
  return particle;
}
