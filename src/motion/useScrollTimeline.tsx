import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTimelineOptions {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
}

export const useScrollTimeline = (options: ScrollTimelineOptions = {}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!triggerRef.current) return;

    const ctx = gsap.context(() => {
      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: options.start || "top 80%",
          end: options.end || "bottom 20%",
          scrub: options.scrub ?? false,
          pin: options.pin ?? false,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [options.start, options.end, options.scrub, options.pin]);

  return { triggerRef, timeline: timelineRef };
};

export default useScrollTimeline;
