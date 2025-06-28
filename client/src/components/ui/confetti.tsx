import React from 'react';

interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  x?: number;
  y?: number;
  shapes?: string[];
  scalar?: number;
  colors?: string[];
  origin?: { x?: number; y?: number };
  disableForReducedMotion?: boolean;
}

declare global {
  interface Window {
    confetti: (options?: ConfettiOptions) => Promise<null>;
  }
}

export const triggerConfetti = (options: ConfettiOptions = {}) => {
  if (typeof window !== 'undefined' && window.confetti) {
    // Burst from multiple positions for more dramatic effect
    const defaults = {
      particleCount: 150,
      spread: 90,
      startVelocity: 60,
      gravity: 0.8,
      scalar: 1.2,
      colors: ['#8B5CF6', '#06D6A0', '#FFD23F', '#EE6C4D', '#3A86FF']
    };
    
    // Fire confetti from left
    window.confetti({
      ...defaults,
      origin: { x: 0.1, y: 0.6 },
      angle: 60,
      ...options,
    });
    
    // Fire confetti from right
    window.confetti({
      ...defaults,
      origin: { x: 0.9, y: 0.6 },
      angle: 120,
      ...options,
    });
    
    // Fire confetti from center
    return window.confetti({
      ...defaults,
      origin: { x: 0.5, y: 0.6 },
      angle: 90,
      ...options,
    });
  }
  return Promise.resolve(null);
};

// Load confetti script
if (typeof window !== 'undefined' && !window.confetti) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
  script.async = true;
  document.head.appendChild(script);
}
