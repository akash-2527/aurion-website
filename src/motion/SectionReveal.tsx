import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

const SectionReveal = ({ children, className = "", delay = 0, direction = "up" }: SectionRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    if (direction === "up") fromVars.y = 50;
    if (direction === "left") fromVars.x = -50;
    if (direction === "right") fromVars.x = 50;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, fromVars, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default SectionReveal;
