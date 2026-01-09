import { ParticleCard } from './ParticleCard';
import { GENERATIONS } from '../constants/particles';
import { getParticlesByGeneration, particlesData } from '../data/particles';
import { getParticleOrAntiparticle } from '../data/antiparticles';
import { RotateCcw } from 'lucide-react';

interface StandardModelTableProps {
  onParticleClick: (particleId: string) => void;
  showAntiparticles: boolean;
  onToggleAntiparticles: () => void;
}

export function StandardModelTable({ onParticleClick, showAntiparticles, onToggleAntiparticles }: StandardModelTableProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center space-y-2 sm:space-y-4 animate-fade-in-up">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 sm:mb-3 flex-wrap">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white px-2">
            Standard Model
          </h1>
          <button
            onClick={onToggleAntiparticles}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 border ${
              showAntiparticles
                ? 'bg-white/10 border-white/30 text-white'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white/90 hover:bg-white/10'
            }`}
            title={showAntiparticles ? 'Show particles' : 'Show antiparticles'}
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">
              {showAntiparticles ? 'Particles' : 'Antiparticles'}
            </span>
          </button>
        </div>
        <p className="text-sm sm:text-base md:text-xl text-white/60 max-w-2xl mx-auto px-2">
          {showAntiparticles 
            ? 'The complete picture of antiparticles and their interactions'
            : 'The complete picture of elementary particles and their interactions'}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 animate-fade-in-delay-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white/80">Fermions</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
            <div className="text-center">
              <p className="text-xs sm:text-sm font-semibold text-white/40 uppercase tracking-wider mb-1 sm:mb-2">Type</p>
            </div>
            {GENERATIONS.map((gen) => (
              <div
                key={gen.id}
                className={`text-center ${gen.id === 1 ? 'animate-fade-in-delay-2' : gen.id === 2 ? 'animate-fade-in-delay-3' : 'animate-fade-in-delay-4'}`}
              >
                <p className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 sm:mb-1">Gen {gen.id}</p>
                <p className="text-[10px] sm:text-xs text-white/40">{gen.name}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 sm:mb-8 animate-fade-in-delay-4">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white/30 rounded-full" />
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">Quarks</h3>
                <p className="text-xs sm:text-sm text-white/40">Experience strong force, 6 flavors</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
              <div className="flex items-center justify-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/60 text-center">
                  {showAntiparticles ? 'Up-type (-2/3)' : 'Up-type (+2/3)'}
                </span>
              </div>
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(1).find((p) => p.id === 'up')!, showAntiparticles)} onClick={() => onParticleClick('up')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(2).find((p) => p.id === 'charm')!, showAntiparticles)} onClick={() => onParticleClick('charm')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(3).find((p) => p.id === 'top')!, showAntiparticles)} onClick={() => onParticleClick('top')} />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              <div className="flex items-center justify-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/60 text-center">
                  {showAntiparticles ? 'Down-type (+1/3)' : 'Down-type (-1/3)'}
                </span>
              </div>
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(1).find((p) => p.id === 'down')!, showAntiparticles)} onClick={() => onParticleClick('down')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(2).find((p) => p.id === 'strange')!, showAntiparticles)} onClick={() => onParticleClick('strange')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(3).find((p) => p.id === 'bottom')!, showAntiparticles)} onClick={() => onParticleClick('bottom')} />
            </div>
          </div>

          <div className="animate-fade-in-delay-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white/30 rounded-full" />
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">Leptons</h3>
                <p className="text-xs sm:text-sm text-white/40">Do not experience strong force, 6 flavors</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
              <div className="flex items-center justify-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/60 text-center">
                  {showAntiparticles ? 'Charged (+1)' : 'Charged (-1)'}
                </span>
              </div>
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(1).find((p) => p.id === 'electron')!, showAntiparticles)} onClick={() => onParticleClick('electron')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(2).find((p) => p.id === 'muon')!, showAntiparticles)} onClick={() => onParticleClick('muon')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(3).find((p) => p.id === 'tau')!, showAntiparticles)} onClick={() => onParticleClick('tau')} />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
              <div className="flex items-center justify-center">
                <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-white/60 text-center">Neutrinos (0)</span>
              </div>
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(1).find((p) => p.id === 'electron-neutrino')!, showAntiparticles)} onClick={() => onParticleClick('electron-neutrino')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(2).find((p) => p.id === 'muon-neutrino')!, showAntiparticles)} onClick={() => onParticleClick('muon-neutrino')} />
              <ParticleCard particle={getParticleOrAntiparticle(getParticlesByGeneration(3).find((p) => p.id === 'tau-neutrino')!, showAntiparticles)} onClick={() => onParticleClick('tau-neutrino')} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 animate-fade-in-delay-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white/80">Bosons</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-white/30 rounded-full" />
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">Force Carriers & Higgs</h3>
              <p className="text-xs sm:text-sm text-white/40">Mediators of fundamental interactions</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
            <ParticleCard particle={getParticleOrAntiparticle(particlesData.find((p) => p.id === 'photon')!, showAntiparticles)} onClick={() => onParticleClick('photon')} />
            <ParticleCard particle={getParticleOrAntiparticle(particlesData.find((p) => p.id === 'gluon')!, showAntiparticles)} onClick={() => onParticleClick('gluon')} />
            <ParticleCard particle={getParticleOrAntiparticle(particlesData.find((p) => p.id === 'w-boson')!, showAntiparticles)} onClick={() => onParticleClick('w-boson')} />
            <ParticleCard particle={getParticleOrAntiparticle(particlesData.find((p) => p.id === 'z-boson')!, showAntiparticles)} onClick={() => onParticleClick('z-boson')} />
          </div>

          <div className="flex justify-center">
            <div className="w-full sm:w-3/4 md:w-1/2">
              <ParticleCard particle={getParticleOrAntiparticle(particlesData.find((p) => p.id === 'higgs')!, showAntiparticles)} onClick={() => onParticleClick('higgs')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
