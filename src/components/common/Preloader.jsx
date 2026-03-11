'use client';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Check if we've already shown the loader in this session to avoid "re-loading" on every client-side nav
    // Actually, RootLayout SHOULD persist, but if something causes a remount, this guard helps.
    const hasLoaded = sessionStorage.getItem('fch_loaded');
    if (hasLoaded) {
      setHidden(true);
      return;
    }

    // 1. Reduced wait time for a snappier feel
    const timer = setTimeout(() => {
      // 2. Start the CSS transitions for the preloader sections
      setLoaded(true);

      // 3. Re-trigger WOW precisely when the content starts becoming visible
      const animationTimer = setTimeout(() => {
        if (typeof window !== 'undefined') {
          if (window.WOW) {
            try {
              new window.WOW().init();
            } catch (e) { }
          }
          window.dispatchEvent(new Event('scroll'));
        }
      }, 300); // Faster trigger

      // 4. Start fading out the entire preloader container
      const fadeTimer = setTimeout(() => {
        setOpacity(0);
      }, 500);

      // 5. Finally remove from DOM after all transitions complete
      const hideTimer = setTimeout(() => {
        setHidden(true);
        sessionStorage.setItem('fch_loaded', 'true');
      }, 1100);

      return () => {
        clearTimeout(animationTimer);
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }, 800); // Reduced from 2000ms to 800ms for better UX

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
