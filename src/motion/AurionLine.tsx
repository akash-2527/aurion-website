import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AurionLine = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1440 6000"
      fill="none"
      preserveAspectRatio="xMidYMin slice"
    >
      <path
        ref={pathRef}
        d="M -50 100 Q 400 200 720 400 Q 1040 600 1200 900 Q 1360 1200 900 1500 Q 440 1800 200 2100 Q -40 2400 500 2700 Q 1040 3000 1300 3300 Q 1560 3600 800 3900 Q 40 4200 300 4500 Q 560 4800 1100 5100 Q 1640 5400 720 5700"
        stroke="hsl(0, 55%, 32%)"
        strokeWidth="1.5"
        strokeOpacity="0.08"
        fill="none"
      />
    </svg>
  );
};

export default AurionLine;
