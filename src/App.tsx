import { useState, useCallback, useEffect } from 'react';
import { StandardModelTable } from './components/StandardModelTable';
import { ParticleModal } from './components/ParticleModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { getParticleByIdWithAntiparticle } from './data/antiparticles';
import { Atom, User } from 'lucide-react';

const STORAGE_KEY = 'show-antiparticles';

function App() {
  const [showAntiparticles, setShowAntiparticles] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'true';
  });

  const [selectedParticleId, setSelectedParticleId] = useState<string | null>(null);
  const selectedParticle = selectedParticleId
    ? (getParticleByIdWithAntiparticle(selectedParticleId, showAntiparticles) ?? null)
    : null;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(showAntiparticles));
  }, [showAntiparticles]);

  const handleParticleClick = useCallback((particleId: string) => {
    setSelectedParticleId(particleId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedParticleId(null);
  }, []);

  const toggleAntiparticles = useCallback(() => {
    setShowAntiparticles((prev) => !prev);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      {showAntiparticles && (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-blue-950/20 pointer-events-none z-[5] transition-opacity duration-500" />
      )}

      <div className="relative z-10 animate-fade-in">
        <div className="pt-12 sm:pt-16 pb-6 sm:pb-8 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 animate-slide-up">
              <Atom className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 tracking-tight">
                Particle Physics
              </h2>
              <Atom className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
            </div>
            <p className="text-center text-blue-100/70 text-base sm:text-lg max-w-2xl mx-auto px-2 animate-slide-up delay-100 font-light leading-relaxed">
              Explore the fundamental building blocks of the universe. Click on any particle to learn more about its properties and role in the Standard Model.
            </p>
          </div>
        </div>

        <div className="px-3 sm:px-4 pb-12 sm:pb-16 animate-slide-up delay-200">
          <div className="max-w-7xl mx-auto">
            <StandardModelTable
              onParticleClick={handleParticleClick}
              showAntiparticles={showAntiparticles}
              onToggleAntiparticles={toggleAntiparticles}
            />
          </div>
        </div>

        <footer className="text-center py-8 sm:py-12 px-4 animate-slide-up delay-300">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span>Built by</span>
              <span className="text-white/60 font-medium">Mateo Delgado</span>
            </div>
            <a
              href="https://mmatdu.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-200/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 hover:border-blue-400/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Visit Portfolio</span>
            </a>
          </div>
        </footer>
      </div>

      <ParticleModal
        particle={selectedParticle}
        isOpen={!!selectedParticle}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
