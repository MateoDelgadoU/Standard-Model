import { useState, useCallback } from 'react';
import { StandardModelTable } from './components/StandardModelTable';
import { ParticleModal } from './components/ParticleModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { getParticleById } from './data/particles';
import { Atom, User } from 'lucide-react';

function App() {
  const [selectedParticleId, setSelectedParticleId] = useState<string | null>(null);
  const selectedParticle = selectedParticleId ? (getParticleById(selectedParticleId) ?? null) : null;

  const handleParticleClick = useCallback((particleId: string) => {
    setSelectedParticleId(particleId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedParticleId(null);
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <div className="relative z-10">
        <div className="pt-12 sm:pt-16 pb-6 sm:pb-8 px-3 sm:px-4 animate-fade-in-up">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="animate-rotate-slow">
                <Atom className="w-8 h-8 sm:w-12 sm:h-12 text-white/60" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Particle Physics
              </h2>
              <div className="animate-rotate-reverse">
                <Atom className="w-8 h-8 sm:w-12 sm:h-12 text-white/60" />
              </div>
            </div>
            <p className="text-center text-white/60 text-sm sm:text-base max-w-2xl mx-auto px-2">
              Explore the fundamental building blocks of the universe. Click on any particle to learn more about its properties and role in the Standard Model.
            </p>
          </div>
        </div>

        <div className="px-3 sm:px-4 pb-12 sm:pb-16">
          <div className="max-w-7xl mx-auto">
            <StandardModelTable onParticleClick={handleParticleClick} />
          </div>
        </div>

        <footer className="text-center py-6 sm:py-8 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <p className="text-white/40 text-xs sm:text-sm">
              Built by: Mateo Delgado
            </p>
            <a
              href="https://mmatdu.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-white/60 hover:text-white/90 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20 hover:scale-105 active:scale-95"
            >
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              About me
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
