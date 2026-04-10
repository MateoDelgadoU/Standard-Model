import type { Particle } from '../types/particle';

interface ParticleCardProps {
  particle: Particle;
  onClick: () => void;
  compact?: boolean;
}

export function ParticleCard({ particle, onClick }: ParticleCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.15] hover:scale-[1.04] cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/30 min-h-[76px] sm:min-h-[68px] py-2"
    >
      <span
        className="text-lg sm:text-lg md:text-xl font-semibold leading-none"
        style={{ color: particle.color }}
      >
        {particle.symbol}
      </span>
      <span className="text-[10px] sm:text-[10px] text-white/50 mt-1 leading-none tracking-wide">
        {particle.name}
      </span>
      <span className="text-[9px] sm:text-[9px] text-white/30 mt-0.5 font-mono leading-none">
        {particle.mass}
      </span>
    </button>
  );
}
