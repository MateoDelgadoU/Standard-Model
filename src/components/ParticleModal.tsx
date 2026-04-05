import type { Particle } from '../types/particle';

interface ParticleModalProps {
  particle: Particle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticleModal({ particle, isOpen, onClose }: ParticleModalProps) {
  if (!particle) return null;

  const rows = [
    ['Mass', particle.mass],
    ['Charge', particle.charge === '0' ? '0' : `${particle.charge} e`],
    ['Spin', particle.spin],
    ['Type', `${particle.category?.replace('-', ' ')}`],
    ...(particle.generation ? [['Generation', String(particle.generation)]] : []),
    ...(particle.force ? [['Force', particle.force]] : []),
  ];

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center p-4 transition-all duration-200 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full max-w-sm rounded-2xl border border-white/[0.08] bg-black/80 backdrop-blur-xl p-6 shadow-2xl transition-transform duration-200 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shrink-0"
            style={{
              backgroundColor: `${particle.color}15`,
              color: particle.color,
              border: `1px solid ${particle.color}30`,
            }}
          >
            {particle.symbol}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-semibold text-white truncate">{particle.name}</h2>
            <span
              className="text-[10px] font-medium uppercase tracking-widest"
              style={{ color: `${particle.color}cc` }}
            >
              {particle.type}
            </span>
          </div>
        </div>

        {/* Properties */}
        <div className="space-y-2 mb-5">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between items-baseline">
              <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
              <span className="text-sm text-white/90 font-mono">{value}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed">{particle.description}</p>
      </div>
    </div>
  );
}
