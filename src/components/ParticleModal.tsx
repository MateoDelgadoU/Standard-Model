import { useEffect, useState } from 'react';
import { X, Atom, Zap, Scale, Activity, Layers } from 'lucide-react';
import type { Particle } from '../types/particle';

interface ParticleModalProps {
  particle: Particle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticleModal({ particle, isOpen, onClose }: ParticleModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen && particle) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, particle]);

  if (!particle || !shouldRender) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/95 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`fixed inset-x-3 top-3 bottom-auto max-h-[85vh] sm:inset-x-4 sm:top-4 sm:max-h-[85vh] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] md:max-h-[90vh] z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold relative overflow-hidden flex-shrink-0"
                style={{
                  backgroundColor: `${particle.color}20`,
                  color: particle.color,
                  border: `3px solid ${particle.color}40`,
                }}
              >
                {particle.symbol}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1 truncate">{particle.name}</h2>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white/60 flex-wrap">
                  <span
                    className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider"
                    style={{
                      backgroundColor: `${particle.color}20`,
                      color: particle.color,
                    }}
                  >
                    {particle.type}
                  </span>
                  {particle.generation && (
                    <span className="text-white/40">• Generation {particle.generation}</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/60" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Electric Charge</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-white">{particle.charge}</p>
            </div>

            <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Scale className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Mass</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-white">{particle.mass}</p>
            </div>

            <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Spin</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-white">{particle.spin}</p>
            </div>

            <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-white/60" />
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">Category</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-white capitalize">
                {particle.category?.replace('-', ' ')}
              </p>
            </div>
          </div>

          <div className="glass rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6">
            <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
              <Atom className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
              <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-wider">About</span>
            </div>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">{particle.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
