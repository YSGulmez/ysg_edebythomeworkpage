import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TopProgress } from './components/TopProgress';
import { FullscreenButton } from './components/FullscreenButton';
import { SlideContent, TOTAL_SLIDES } from './components/SlideContent';
import { Controls } from './components/Controls';
import { BackgroundParticles } from './components/BackgroundParticles';

export const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((prev) => {
      const nextIndex = (index + TOTAL_SLIDES) % TOTAL_SLIDES;
      setDirection(nextIndex >= prev || (prev === TOTAL_SLIDES - 1 && nextIndex === 0) ? 'next' : 'prev');
      return nextIndex;
    });
  }, []);

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  // Touch swipe gesture support
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    const target = e.target as HTMLElement;
    if (target.closest('button, .sentence, .drop, .choices')) return;
    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  // Mouse swipe / drag navigation support
  const mouseDragRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, .sentence, .drop, .choices, .rule-grid, .card')) return;
    mouseDragRef.current = { x: e.clientX, y: e.clientY, active: true };
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseDragRef.current.active) return;
    mouseDragRef.current.active = false;
    document.body.style.cursor = '';
    const dx = e.clientX - mouseDragRef.current.x;
    const dy = e.clientY - mouseDragRef.current.y;

    if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <div
      className="presentation-app"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <BackgroundParticles />
      <TopProgress current={currentSlide} total={TOTAL_SLIDES} />
      <FullscreenButton />

      <main className="deck">
        <SlideContent index={currentSlide} direction={direction} />
      </main>

      <Controls
        current={currentSlide}
        total={TOTAL_SLIDES}
        onPrev={handlePrev}
        onNext={handleNext}
        onSelect={goToSlide}
      />
    </div>
  );
};

export default App;
