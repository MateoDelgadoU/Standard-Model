import { useEffect, useRef } from 'react';

import { getScientificSource, NEUTRINO_MASS_NOTE } from '../data/scientificReferences';
import type { Particle } from '../types/particle';

interface ParticleModalProps {
  particle: Particle | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticleModal({ particle, isOpen, onClose }: ParticleModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement;
    if (isOpen && particle) {
      dialog.showModal();
    } else {
      dialog.close();
    }
    return () => {
      dialog.close();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [isOpen, particle]);

  if (!particle) return null;

  const rows = [
    ['Mass', particle.massDetail ?? particle.mass],
    ['Charge', particle.charge === '0' ? '0' : `${particle.charge} e`],
    ['Spin', `${particle.spin} ℏ`],
    ['Type', `${particle.category?.replace('-', ' ')}`],
    ...(particle.generation ? [['Generation', String(particle.generation)]] : []),
    ...(particle.force ? [[particle.id === 'higgs' ? 'Field' : 'Force', particle.force]] : []),
  ];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="particle-title"
      aria-describedby="particle-description"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-white/[0.08] bg-black/90 p-0 text-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="relative p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close particle details"
          className="absolute right-3 top-2 rounded-md px-2 py-1 text-xl text-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300 cursor-pointer"
        >
          ×
        </button>
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
            <h2 id="particle-title" className="text-xl font-semibold text-white truncate">{particle.name}</h2>
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
            <div key={label} className="flex justify-between items-baseline gap-4">
              <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
              <span className="text-sm text-white/90 font-mono text-right break-words">{value}</span>
            </div>
          ))}
        </div>

        {/* Description */}
        <p id="particle-description" className="text-sm text-white/60 leading-relaxed">{particle.description}</p>
        {(particle.massNote || particle.id.includes('neutrino')) && (
          <p className="mt-4 text-xs text-white/50 leading-relaxed">
            {particle.id.includes('neutrino') ? NEUTRINO_MASS_NOTE : particle.massNote}
          </p>
        )}
        <p className="mt-4 text-[10px] text-white/40">Mass units use c = 1; charge is in units of e.</p>
        <a
          href={getScientificSource(particle.category)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-cyan-300 hover:underline"
        >
          Source: Particle Data Group 2026 ↗
        </a>
        {particle.id.includes('neutrino') && (
          <a href="https://pdg.lbl.gov/2026/reviews/rpp2026-rev-neutrino-mixing.pdf" target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs text-cyan-300 hover:underline">
            Neutrino masses and mixing ↗
          </a>
        )}
      </div>
    </dialog>
  );
}
