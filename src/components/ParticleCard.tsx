import type { Particle } from '../types/particle';

interface ParticleCardProps {
  particle: Particle;
  onClick: () => void;
}

export function ParticleCard({ particle, onClick }: ParticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="particle-card relative group animate-fade-in-up cursor-pointer"
      style={{
        animationDelay: '0.1s',
      }}
    >
      <div
        className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center gap-1 sm:gap-2 border-2 border-transparent hover:border-opacity-30 transition-all duration-300 hover:scale-105"
        style={{
          borderColor: particle.color,
          '--tw-border-opacity': '0',
          boxShadow: '0 0 0 rgba(0,0,0,0)',
        } as React.CSSProperties & { boxShadow: string }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px -10px ${particle.color}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
        }}
      >
        <div className="relative animate-scale-in">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold"
            style={{
              backgroundColor: `${particle.color}20`,
              color: particle.color,
              border: `2px solid ${particle.color}40`,
            }}
          >
            {particle.symbol}
          </div>
          <div
            className="absolute -inset-1 rounded-full animate-pulse-glow pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${particle.color}40 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="text-center">
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/90 leading-tight">{particle.name}</p>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-white/60">{particle.charge}</p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 rounded-b-xl sm:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100"
          style={{ backgroundColor: particle.color }}
        />
      </div>
    </div>
  );
}
