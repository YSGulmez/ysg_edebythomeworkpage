import React from 'react';

interface Particle {
  char: string;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: number;
}

const PARTICLES: Particle[] = [
  { char: '-', left: '8%', top: '18%', size: '3.2rem', delay: '0s', duration: '16s', opacity: 0.15 },
  { char: '( )', left: '84%', top: '14%', size: '2.8rem', delay: '-3s', duration: '19s', opacity: 0.14 },
  { char: '—', left: '15%', top: '72%', size: '3.5rem', delay: '-6s', duration: '22s', opacity: 0.12 },
  { char: '(', left: '92%', top: '65%', size: '4rem', delay: '-2s', duration: '18s', opacity: 0.13 },
  { char: ')', left: '4%', top: '48%', size: '3.8rem', delay: '-8s', duration: '20s', opacity: 0.13 },
  { char: '-', left: '78%', top: '82%', size: '3rem', delay: '-5s', duration: '15s', opacity: 0.14 },
  { char: '•', left: '48%', top: '8%', size: '1.8rem', delay: '-10s', duration: '24s', opacity: 0.16 },
  { char: '-', left: '55%', top: '88%', size: '2.5rem', delay: '-7s', duration: '17s', opacity: 0.13 },
];

export const BackgroundParticles: React.FC = () => {
  return (
    <div className="bg-particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
