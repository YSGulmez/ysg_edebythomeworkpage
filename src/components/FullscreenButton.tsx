import React, { useEffect, useState } from 'react';

export const FullscreenButton: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch {
      // Fullscreen can fail if not permitted in iframe or user agent
    }
  };

  return (
    <button
      className="fullscreen-control"
      id="fullscreen"
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? 'Tam ekrandan çık' : 'Tam ekranı aç'}
      title={isFullscreen ? 'Tam ekrandan çık' : 'Tam ekranı aç'}
    >
      {isFullscreen ? '⤢ Çıkış' : '⛶ Tam ekran'}
    </button>
  );
};
