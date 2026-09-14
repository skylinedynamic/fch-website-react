"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the stacking-panel animation used by PartnerSection (`.ks-project-panel`).
 *
 * The theme sets this up once inside /js/bundle.js, which is loaded with
 * `strategy="afterInteractive"` and therefore runs exactly once per full page
 * load. That leaves two holes this component fills:
 *
 *  1. Arriving at the page through a Next.js client-side navigation never
 *     re-runs the theme script, so the panels get no ScrollTrigger at all and
 *     the section simply scrolls past. Only a hard refresh brought it back.
 *
 *  2. On a fresh load the theme measures the trigger positions immediately,
 *     before the preloader is pulled out of the flow and before fonts and
 *     images settle. Everything below shifts afterwards, so the pin engages at
 *     the wrong scroll offset - the animation looks broken even though it ran.
 *
 * This mirrors WowInit, which already does the same job for WOW.js.
 */
export default function ProjectPanelInit() {
    const pathname = usePathname();

    useEffect(() => {
        let cancelled = false;
        let mm: any = null;
        let pollTimer: ReturnType<typeof setTimeout> | undefined;
        let settleTimer: ReturnType<typeof setTimeout> | undefined;
        const listeners: Array<() => void> = [];

        const getGsap = () => {
            const w = window as any;
            return w.gsap && w.ScrollTrigger ? { gsap: w.gsap, ScrollTrigger: w.ScrollTrigger } : null;
        };

        const isPanelTrigger = (t: any) =>
            t?.trigger instanceof Element && t.trigger.classList.contains("ks-project-panel");

        const build = () => {
            if (cancelled) return;
            const libs = getGsap();
            if (!libs) return;
            const { gsap, ScrollTrigger } = libs;

            const panels = Array.from(document.querySelectorAll<HTMLElement>(".ks-project-panel"));
            if (!panels.length) return;

            gsap.registerPlugin(ScrollTrigger);

            // Drop whatever the theme bundle (or a previous mount) left behind so
            // the panels never end up with two competing pins. `kill(true)` reverts
            // the pin, restoring the original layout before we measure again.
            ScrollTrigger.getAll().filter(isPanelTrigger).forEach((t: any) => t.kill(true));

            mm = gsap.matchMedia();
            mm.add("(min-width: 767px)", () => {
                panels.forEach((section) => {
                    gsap.set(section, { scale: 1 });
                    gsap.to(section, {
                        scale: 1,
                        scrollTrigger: {
                            trigger: section,
                            pin: section,
                            scrub: 1,
                            start: "top 100px",
                            end: "bottom 82%",
                            endTrigger: ".ks-project-area",
                            pinSpacing: false,
                        },
                    });
                });
            });

            // Re-measure as the page finishes settling. Late images and webfonts
            // both move the section, and a stale offset is what made the pin fire
            // in the wrong place.
            const refresh = () => {
                if (!cancelled) ScrollTrigger.refresh();
            };

            if (document.readyState !== "complete") {
                window.addEventListener("load", refresh);
                listeners.push(() => window.removeEventListener("load", refresh));
            }

            if ((document as any).fonts?.ready) {
                (document as any).fonts.ready.then(refresh).catch(() => {});
            }

            // Images inside the section change its height as they arrive.
            const area = document.querySelector(".ks-project-area");
            if (area) {
                area.querySelectorAll("img").forEach((img) => {
                    if (img.complete) return;
                    img.addEventListener("load", refresh, { once: true });
                    img.addEventListener("error", refresh, { once: true });
                });
            }

            settleTimer = setTimeout(refresh, 1200);
        };

        // gsap arrives with the afterInteractive bundle, which may not have run
        // yet when this mounts. Poll briefly rather than racing it.
        let attempts = 0;
        const waitForGsap = () => {
            if (cancelled) return;
            if (getGsap()) {
                build();
                return;
            }
            if (attempts++ > 40) return; // ~6s, then give up quietly
            pollTimer = setTimeout(waitForGsap, 150);
        };

        // First load: the preloader is still on screen and about to be removed,
        // which shifts the layout. Wait for it, exactly as WowInit does.
        const preloaderVisible = !!document.querySelector(".preloader:not(.fadeout)");
        if (preloaderVisible) {
            const onPreloaderDone = () => setTimeout(waitForGsap, 150);
            window.addEventListener("preloader-done", onPreloaderDone, { once: true });
            listeners.push(() => window.removeEventListener("preloader-done", onPreloaderDone));
            // Safety net in case the event was missed.
            settleTimer = setTimeout(waitForGsap, 2000);
        } else {
            waitForGsap();
        }

        return () => {
            cancelled = true;
            if (pollTimer) clearTimeout(pollTimer);
            if (settleTimer) clearTimeout(settleTimer);
            listeners.forEach((off) => off());
            if (mm) mm.revert();
        };
    }, [pathname]);

    return null;
}
