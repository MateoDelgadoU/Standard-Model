import { useState, useCallback, useEffect } from 'react';
import { StandardModelTable } from './components/StandardModelTable';
import { ParticleModal } from './components/ParticleModal';
import { AnimatedBackground } from './components/AnimatedBackground';
import { getParticleByIdWithAntiparticle } from './data/antiparticles';

const STORAGE_KEY = 'show-antiparticles';

function App() {
  const [showAntiparticles, setShowAntiparticles] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedParticle = selectedId
    ? (getParticleByIdWithAntiparticle(selectedId, showAntiparticles) ?? null)
    : null;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(showAntiparticles));
  }, [showAntiparticles]);

  const handleClick = useCallback((id: string) => setSelectedId(id), []);
  const handleClose = useCallback(() => setSelectedId(null), []);
  const toggleAnti = useCallback(() => setShowAntiparticles((p) => !p), []);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden flex flex-col">
      <AnimatedBackground />

      {/* Content — vertically centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-6 sm:py-0">
        <StandardModelTable
          onParticleClick={handleClick}
          showAntiparticles={showAntiparticles}
          onToggleAntiparticles={toggleAnti}
        />
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-3 sm:pb-4">
        <a
          href="https://mmateodelgadou.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-white/20 hover:text-white/40 transition-colors duration-200"
        >
          Mateo Delgado
        </a>
      </div>

      <ParticleModal
        particle={selectedParticle}
        isOpen={!!selectedParticle}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
