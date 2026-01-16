import type { Particle } from '../types/particle';

interface ParticleCardProps {
  particle: Particle;
  onClick: () => void;
}

export function ParticleCard({ particle, onClick }: ParticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer animate-fade-in"
      style={{
        '--particle-color': particle.color,
        '--particle-bg': `${particle.color}20`,
        '--particle-border': `${particle.color}40`,
        '--particle-glow': `${particle.color}60`,
      } as React.CSSProperties}
    >
      <div
        className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 h-24 sm:h-28 md:h-32 flex flex-col items-center justify-center gap-1 sm:gap-2 border-2 transition-all duration-300 ease-out hover:bg-white/10 hover:border-[color:var(--particle-color)] hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_20px_-5px_var(--particle-glow)] border-[color:var(--particle-border)]"
      >
        <div className="relative">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_15px_var(--particle-glow)] bg-[color:var(--particle-bg)] text-[color:var(--particle-color)] border border-[color:var(--particle-border)]"
          >
            {particle.symbol}
            <div className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-20 bg-[color:var(--particle-color)] animation-delay-500" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/90 leading-tight group-hover:text-white transition-colors duration-200">{particle.name}</p>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-white/60 group-hover:text-white/80 transition-colors duration-200 font-mono tracking-wider">{particle.charge}</p>
        </div>
      </div>
    </div>
  );
}
