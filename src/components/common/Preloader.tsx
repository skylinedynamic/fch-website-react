'use client';
import { useEffect, useRef } from 'react';

// Minimum time (ms) the preloader is visible — gives letters animation time to play
const MIN_DISPLAY_MS = 3000;

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = preloaderRef.current;
    if (!el) return;

    // Track when this component mounted so we can enforce MIN_DISPLAY_MS
    const mountTime = Date.now();

    // Mirrors the original jQuery logic:
    //   $(window).on('load', function () {
    //     $(".preloader").addClass('loaded');
    //     $(".preloader").delay(600).fadeOut();
    //   });
    //
    // But also enforces a MINIMUM display time so the letters animation
    // has room to play even on fast connections where window.load fires
    // before React finishes hydrating.

    function startExitAnimation() {
      if (!el) return;

      // Step 1: Add 'loaded' — triggers CSS door-open + spinner/letters fade
      //   .preloader.loaded .loader-section .bg  → width: 0  (0.3s delay, 0.7s duration)
      //   .preloader.loaded .animation-preloader → opacity: 0 (0.3s)
      el.classList.add('loaded');

      // Step 2: After 600ms, add 'fadeout' — mirrors jQuery .delay(600).fadeOut()
      //   .preloader.fadeout → opacity: 0, transition: 0.4s
      const fadeTimer = setTimeout(() => {
        el.classList.add('fadeout');
      }, 600);

      // Step 3: Hide from DOM after all animations done (600ms delay + 400ms fade = 1000ms)
      const hideTimer = setTimeout(() => {
        el.style.display = 'none';
      }, 1100);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }

    function onWindowLoad() {
      // How long has the preloader been visible?
      const elapsed = Date.now() - mountTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      // Wait until MIN_DISPLAY_MS has passed, then begin exit animation
      const minTimer = setTimeout(() => {
        startExitAnimation();
      }, remaining);

      return () => clearTimeout(minTimer);
    }

    let cleanup: (() => void) | undefined;

    if (document.readyState === 'complete') {
      // window.load already fired — enforce minimum time from mount
      cleanup = onWindowLoad() ?? undefined;
    } else {
      // Wait for real window.load, then enforce minimum time
      const handler = () => {
        cleanup = onWindowLoad() ?? undefined;
      };
      window.addEventListener('load', handler, { once: true });
      return () => window.removeEventListener('load', handler);
    }

    return () => cleanup?.();
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
