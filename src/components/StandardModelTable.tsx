import { ParticleCard } from './ParticleCard';
import { particlesData } from '../data/particles';
import { getParticleOrAntiparticle } from '../data/antiparticles';
import type { Particle } from '../types/particle';

interface Props {
  onParticleClick: (id: string) => void;
  showAntiparticles: boolean;
  onToggleAntiparticles: () => void;
}

function get(id: string): Particle {
  return particlesData.find((p) => p.id === id)!;
}

export function StandardModelTable({ onParticleClick, showAntiparticles, onToggleAntiparticles }: Props) {
  const p = (id: string) => getParticleOrAntiparticle(get(id), showAntiparticles);

  const card = (id: string) => (
    <ParticleCard
      key={id}
      particle={p(id)}
      onClick={() => onParticleClick(id)}
    />
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-5 sm:mb-7">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-none">
            Standard Model
          </h1>
          <p className="text-[10px] sm:text-xs text-white/25 mt-1.5 tracking-wide">
            {showAntiparticles ? 'Antiparticles' : 'Elementary particles'}
          </p>
        </div>
        <button
          onClick={onToggleAntiparticles}
          className={`text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
            showAntiparticles
              ? 'bg-white/10 border-white/20 text-white/90'
              : 'bg-transparent border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/15'
          }`}
        >
          {showAntiparticles ? 'Show particles' : 'Show antiparticles'}
        </button>
      </div>

      {/* Main layout: stacked on mobile, row on sm+ */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
        {/* Fermions */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-4">
            {/* Quarks */}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] sm:text-[10px] text-white/20 uppercase tracking-[0.15em] mb-2 text-center">
                Quarks
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {card('up')}{card('charm')}{card('top')}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {card('down')}{card('strange')}{card('bottom')}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="text-center"><span className="text-[8px] sm:text-[8px] text-white/15">I</span></div>
                <div className="text-center"><span className="text-[8px] sm:text-[8px] text-white/15">II</span></div>
                <div className="text-center"><span className="text-[8px] sm:text-[8px] text-white/15">III</span></div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-white/[0.05] self-stretch my-4" />

            {/* Leptons */}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] sm:text-[10px] text-white/20 uppercase tracking-[0.15em] mb-2 text-center">
                Leptons
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {card('electron')}{card('muon')}{card('tau')}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {card('electron-neutrino')}{card('muon-neutrino')}{card('tau-neutrino')}
              </div>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="text-center"><span className="text-[8px] sm:text-[8px] text-white/15">I</span></div>
                <div className="text-center"><span className="text-[8px] sm:text-[8px] text-white/15">II</span></div>
                <div className="text-center"><span className="text-[8px] sm:text-[8px] text-white/15">III</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider — horizontal on mobile, vertical on sm+ */}
        <div className="h-px sm:h-auto sm:w-px bg-white/[0.05] sm:self-stretch sm:my-4" />

        {/* Bosons — full width grid on mobile, fixed width on sm+ */}
        <div className="sm:w-[170px] md:w-[200px] sm:shrink-0">
          <div className="text-[10px] sm:text-[10px] text-white/20 uppercase tracking-[0.15em] mb-2 text-center">
            Bosons
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-2 mb-2">
            {card('gluon')}{card('photon')}{card('z-boson')}{card('w-boson')}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {card('higgs')}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 sm:gap-6 mt-5 sm:mt-7">
        {[
          ['#6366f1', 'Quarks'],
          ['#22d3ee', 'Leptons'],
          ['#8b5cf6', 'Gauge bosons'],
          ['#f59e0b', 'Higgs'],
        ].map(([color, label]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[9px] sm:text-[10px] text-white/25">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
