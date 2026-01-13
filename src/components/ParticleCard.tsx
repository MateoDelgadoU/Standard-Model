import type { Particle } from '../types/particle';

interface ParticleCardProps {
  particle: Particle;
  onClick: () => void;
}

export function ParticleCard({ particle, onClick }: ParticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer"
    >
      <div
        className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center gap-1 sm:gap-2 border-2 transition-all duration-200 hover:bg-white/10"
        style={{
          borderColor: `${particle.color}40`,
          '--hover-border': particle.color,
        } as React.CSSProperties & { '--hover-border': string }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${particle.color}80`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${particle.color}40`;
        }}
      >
        <div className="relative">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 group-hover:brightness-110"
            style={{
              backgroundColor: `${particle.color}20`,
              color: particle.color,
              border: `2px solid ${particle.color}40`,
            }}
          >
            {particle.symbol}
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/90 leading-tight group-hover:text-white transition-colors duration-200">{particle.name}</p>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-white/60 group-hover:text-white/80 transition-colors duration-200">{particle.charge}</p>
        </div>
      </div>
    </div>
  );
}
