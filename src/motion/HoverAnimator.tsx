import { useRef, type ReactNode } from "react";
import gsap from "gsap";

interface HoverAnimatorProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  y?: number;
}

const HoverAnimator = ({ children, className = "", scale = 1.02, y = -2 }: HoverAnimatorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale, y, duration: 0.3, ease: "power2.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
};

export default HoverAnimator;
