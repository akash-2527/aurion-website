import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  title: string;
  items: string[];
}

interface PhaseTimelineProps {
  phases: Phase[];
}

const PhaseTimeline = ({ phases }: PhaseTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the vertical line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      // Animate each phase card
      gsap.utils.toArray<HTMLElement>(".phase-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
        <div
          ref={lineRef}
          className="w-full h-full bg-accent origin-top"
        />
      </div>

      <div className="space-y-16 md:space-y-24">
        {phases.map((phase, i) => (
          <div
            key={i}
            className={`phase-card relative md:w-5/12 ${
              i % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
            }`}
            style={{ opacity: 0 }}
          >
            {/* Dot on timeline */}
            <div className="hidden md:block absolute top-6 w-3 h-3 rounded-full bg-primary border-2 border-background"
              style={{
                [i % 2 === 0 ? "right" : "left"]: "-1.65rem",
              }}
            />

            <span className="aurion-label">Phase {i + 1}</span>
            <h3 className="aurion-heading-md mt-2 mb-4">{phase.title}</h3>
            <ul className="space-y-2">
              {phase.items.map((item, j) => (
                <li key={j} className="aurion-body flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhaseTimeline;
