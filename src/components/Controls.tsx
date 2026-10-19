import React from 'react';

interface ControlsProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  current,
  total,
  onPrev,
  onNext,
  onSelect,
}) => {
  const currentStr = String(current + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');

  return (
    <nav className="controls" aria-label="Sunum kontrolleri">
      <button
        id="prev"
        type="button"
        onClick={onPrev}
        aria-label="Önceki slayta git"
      >
        ← Geri
      </button>

      <div className="center-controls">
        <div className="slide-dots" id="dots">
          {Array.from({ length: total }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`dot ${i === current ? 'active' : ''}`}
              aria-label={`${i + 1}. slayta git`}
              onClick={() => onSelect(i)}
            />
          ))}
        </div>
        <span className="progress" id="progress">
          {currentStr} / {totalStr}
        </span>
      </div>

      <button
        id="next"
        type="button"
        onClick={onNext}
        aria-label="Sonraki slayta git"
      >
        İleri →
      </button>
    </nav>
  );
};
