import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import HoverAnimator from "@/motion/HoverAnimator";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 aurion-container w-full pt-20 pb-20">
        <div className="max-w-3xl">
          <span className="aurion-label mb-6 block ml-4">AI Adoption & Enablement</span>
          <h1
            ref={headlineRef}
            className="aurion-heading-xl mb-8 ml-4"
            style={{ opacity: 0 }}
          >
            Helping organisations adopt AI with clarity, confidence, and responsibility.
          </h1>
          <p
            ref={subRef}
            className="aurion-body-lg max-w-2xl mb-10 ml-4"
            style={{ opacity: 0 }}
          >
            Aurion helps teams embed AI into everyday workflows, learning, and decision-making — without fear, chaos, or hype.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <HoverAnimator>
              <Link to="/how-we-work" className="aurion-btn-primary ml-4">
                Explore how we work
              </Link>
            </HoverAnimator>
            <HoverAnimator>
              <Link to="/contact" className="aurion-btn-secondary ml-4">
                Book a free 30-minute clarity call
              </Link>
            </HoverAnimator>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
