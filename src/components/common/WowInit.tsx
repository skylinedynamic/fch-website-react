"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function WowInit() {
    const pathname = usePathname();
    const initiallyLoaded = useRef(false);

    useEffect(() => {
        // This removes previously processed WOW animations styles and classes,
        // essentially completely resetting them back to their default DOM layout, 
        // then fires the WOW.js processor over them again!
        const initWow = () => {
            if (typeof window !== "undefined" && (window as any).WOW) {
                const wowElements = document.querySelectorAll(".wow");
                wowElements.forEach((el) => {
                    el.classList.remove("animated", "wow-resolved");
                    (el as HTMLElement).style.visibility = "hidden";
                    (el as HTMLElement).style.animationName = "none";
                });

                const wow = new (window as any).WOW({
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: false,
                    live: false,
                });
                wow.init();
            }
        };

        // If this is the FIRST time hitting the site during a session, the preloader will be active. 
        // Therefore, we MUST wait for the preloader to finish its exit animations before triggering the WOW instances.
        if (!initiallyLoaded.current) {
            initiallyLoaded.current = true;

            const handlePreloaderDone = () => {
                // Small buffer to guarantee DOM layout shifts caused by preloader removal are resolved locally
                setTimeout(initWow, 100);
            };

            // We rely on the event dispatched natively from Preloader.tsx itself.
            window.addEventListener("preloader-done", handlePreloaderDone, { once: true });

            return () => window.removeEventListener("preloader-done", handlePreloaderDone);
        }
        // For every subsequent page navigation handled by Next.js router (no preloader!), 
        // initiate the reset process smoothly after a brief routing delay to guarantee DOM hydrated.
        else {
            const timeout = setTimeout(initWow, 0);
            return () => clearTimeout(timeout);
        }
    }, [pathname]);

    return null;
}
