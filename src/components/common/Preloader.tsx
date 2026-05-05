'use client';
import { useEffect, useRef } from 'react';

// Minimum time (ms) the preloader is visible
const MIN_DISPLAY_MS = 800;

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = preloaderRef.current;
    if (!el) return;

    const mountTime = Date.now();

    function startExitAnimation() {
      if (!el) return;

      // Step 1: Add 'loaded' — triggers CSS door-open + spinner/letters fade
      el.classList.add('loaded');

      // Dispatch immediately so WOW animations can start gracefully AS the doors open
      window.dispatchEvent(new Event('preloader-done'));

      // Step 2: After 300ms (faster than 600ms), add 'fadeout'
      const fadeTimer = setTimeout(() => {
        el.classList.add('fadeout');
      }, 300);

      // Step 3: Hide from DOM after all animations done (300ms delay + 400ms fade = 700ms)
      const hideTimer = setTimeout(() => {
        el.style.display = 'none';
      }, 700);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

    function onWindowLoad() {
      const elapsed = Date.now() - mountTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      const minTimer = setTimeout(() => {
        startExitAnimation();
      }, remaining);

      return () => clearTimeout(minTimer);
    }

    // Safety timeout: If everything takes too long, force the preloader to close after 5s
    const safetyTimer = setTimeout(() => {
      startExitAnimation();
    }, 5000);

    let cleanup: (() => void) | undefined;

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // DOM is already ready — enforce minimum time from mount
      cleanup = onWindowLoad() ?? undefined;
    } else {
      // Wait for DOM to be interactive (faster than window.load), then enforce minimum time
      const handler = () => {
        cleanup = onWindowLoad() ?? undefined;
      };
      window.addEventListener('DOMContentLoaded', handler, { once: true });
      cleanup = () => {
        window.removeEventListener('DOMContentLoaded', handler);
        clearTimeout(safetyTimer);
      };
    }

    return () => {
      cleanup?.();
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div id="preloader" className="preloader" ref={preloaderRef}>
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
