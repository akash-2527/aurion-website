import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Mobile URL-bar show/hide fires resize events; re-measuring every trigger on
// each one causes scroll jank and stale positions on phones.
ScrollTrigger.config({ ignoreMobileResize: true });

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  // Every page resets to the top itself; stop the browser from fighting that.
  window.history.scrollRestoration = "manual";
}

/**
 * Route-level scroll + ScrollTrigger housekeeping. Rendered once inside the router.
 *
 * 1. Scrolls to top in a *layout* effect, i.e. before any page's useEffect
 *    creates its ScrollTriggers (page-level usePageMount hooks run after their
 *    children, so triggers were being measured at the previous page's scroll).
 * 2. Re-measures triggers whenever the document height actually changes
 *    (late images, web-font swap, expanding panels). Without this, triggers
 *    measured before layout settled fire at the wrong place — or never.
 * 3. Failsafe: when the user reaches the very bottom, play any reveal whose
 *    start position lies beyond the max scroll and so could never be reached.
 */
const RouteEffects = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastHeight = document.documentElement.scrollHeight;
    const scheduleRefresh = () => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (h !== lastHeight) {
        lastHeight = h;
        scheduleRefresh();
      }
    });
    ro.observe(document.body);

    let alive = true;
    document.fonts?.ready.then(() => alive && scheduleRefresh());

    const onAssetLoad = (e: Event) => {
      if (e.target instanceof HTMLImageElement) scheduleRefresh();
    };
    document.addEventListener("load", onAssetLoad, true);

    const playStranded = () => {
      const max = ScrollTrigger.maxScroll(window);
      ScrollTrigger.getAll().forEach((st) => {
        const anim = st.animation;
        if (!anim || st.vars.scrub || st.vars.pin) return;
        if (st.start >= max - 1 && anim.progress() === 0 && !anim.isActive()) anim.play();
      });
    };
    const bottomGuard = ScrollTrigger.create({
      start: () => Math.max(0, ScrollTrigger.maxScroll(window) - 2),
      end: "max",
      onEnter: playStranded,
    });

    return () => {
      alive = false;
      clearTimeout(timer);
      ro.disconnect();
      document.removeEventListener("load", onAssetLoad, true);
      bottomGuard.kill();
    };
  }, [pathname]);

  return null;
};

export default RouteEffects;
