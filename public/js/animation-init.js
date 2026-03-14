/**
 * animation-init.js
 * Initialises WOW.js and scroll-based animations correctly in Next.js.
 *
 * Problem in Next.js:
 *   - Scripts load asynchronously/afterInteractive, so there are race
 *     conditions between wow.js, script.js, and React hydration.
 *   - WOW.js sets visibility:hidden on .wow elements during setup;
 *     if it runs too early (before preloader is gone) elements flash.
 *   - The preloader dispatches a custom 'preloaderDone' event when it
 *     hides, which we listen for here.
 *
 * Solution:
 *   - Wait for WOW to be available (poll).
 *   - Then listen for 'preloaderDone' OR a fallback timeout.
 *   - Only then call WOW().init() and dispatch a scroll event.
 */
(function () {
    'use strict';

    var MAX_WAIT = 8000;   // maximum ms to wait for WOW to load
    var POLL_MS = 100;    // poll interval

    function initWOW() {
        if (typeof WOW === 'undefined') return;

        try {
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: false,
                live: true
            });
            wow.init();
        } catch (e) {
            // Silent fail — WOW not critical
        }

        // Nudge all IntersectionObserver / scroll-based animations
        window.dispatchEvent(new Event('scroll'));
        window.dispatchEvent(new Event('resize'));
    }

    function waitForWOW(callback) {
        var elapsed = 0;
        var interval = setInterval(function () {
            elapsed += POLL_MS;
            if (typeof WOW !== 'undefined') {
                clearInterval(interval);
                callback();
            } else if (elapsed >= MAX_WAIT) {
                clearInterval(interval);
            }
        }, POLL_MS);
    }

    function onPreloaderDone() {
        waitForWOW(initWOW);
    }

    // Listen for our custom preloader-done event (fired from Preloader.tsx)
    window.addEventListener('preloaderDone', onPreloaderDone, { once: true });

    // Fallback: if preloaderDone never fires (e.g. session already loaded),
    // still init WOW after a short delay
    window.addEventListener('load', function () {
        setTimeout(function () {
            waitForWOW(initWOW);
        }, 500);
    }, { once: true });

})();
