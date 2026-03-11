'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // 1. Initial wait of 2 seconds as requested by the user
    const timer = setTimeout(() => {
      // 2. Start the CSS transitions for the preloader sections
      setLoaded(true);
      
      // 3. Wait for the preloader background sections to start opening (0.6s delay in original)
      // Then re-initialize WOW to ensure animations start at the right moment
      const animationTimer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          // Re-trigger WOW precisely when the content starts becoming visible
          if (window.WOW) {
            try {
              new window.WOW().init();
            } catch (e) {}
          }
          // Force visibility check for elements already in viewport
          window.dispatchEvent(new Event('scroll'));
        }
      }, 600);

      // 4. Start fading out the entire preloader container
      const fadeTimer = setTimeout(() => {
        setOpacity(0);
      }, 800);

      // 5. Finally remove from DOM after all transitions complete
      const hideTimer = setTimeout(() => {
        setHidden(true);
      }, 1500);
      
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div 
      id="preloader" 
      className={`preloader ${loaded ? 'loaded' : ''}`}
      style={{ 
        opacity: opacity, 
        transition: 'opacity 0.6s ease-out',
        pointerEvents: loaded ? 'none' : 'auto'
      }}
    >
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="F" className="letters-loading">F</span>
          <span data-text-preloader="O" className="letters-loading">O</span>
          <span data-text-preloader="U" className="letters-loading">U</span>
          <span data-text-preloader="R" className="letters-loading">R</span>
          <span className="letters-loading space">&nbsp;</span>
          <span data-text-preloader="C" className="letters-loading">C</span>
          <span data-text-preloader="O" className="letters-loading">O</span>
          <span data-text-preloader="R" className="letters-loading">R</span>
          <span data-text-preloader="N" className="letters-loading">N</span>
          <span data-text-preloader="E" className="letters-loading">E</span>
          <span data-text-preloader="R" className="letters-loading">R</span>
          <span className="letters-loading space">&nbsp;</span>
          <span data-text-preloader="F" className="letters-loading">F</span>
          <span data-text-preloader="U" className="letters-loading">U</span>
          <span data-text-preloader="N" className="letters-loading">N</span>
          <span data-text-preloader="D" className="letters-loading">D</span>
          <span data-text-preloader="I" className="letters-loading">I</span>
          <span data-text-preloader="N" className="letters-loading">N</span>
          <span data-text-preloader="G" className="letters-loading">G</span>
        </div>
        <p className="text-center">Loading</p>
      </div>
      <div className="loader">
        <div className="row">
          <div className="col-3 loader-section section-left"><div className="bg"></div></div>
          <div className="col-3 loader-section section-left"><div className="bg"></div></div>
          <div className="col-3 loader-section section-right"><div className="bg"></div></div>
          <div className="col-3 loader-section section-right"><div className="bg"></div></div>
        </div>
      </div>
    </div>
  );
}
