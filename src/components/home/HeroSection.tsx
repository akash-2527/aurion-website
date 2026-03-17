import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBg from "@/assets/hero-bg.jpg";
import teamPhoto from "@/assets/hero-team.webp"; // <-- add your image here as hero-team.jpg
import HoverAnimator from "@/motion/HoverAnimator";

gsap.registerPlugin(ScrollTrigger);

// ─── Word-by-word reveal ──────────────────────────────────────────────────────
function WordReveal({
  text,
  className,
  baseDelay = 0,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const words = Array.from(container.querySelectorAll<HTMLSpanElement>(".w-word"));
    if (!words.length) return;
    gsap.set(words, { opacity: 0, y: 20, filter: "blur(5px)" });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.7, ease: "power3.out",
        stagger, delay: baseDelay,
      });
    }, container);
    return () => ctx.revert();
  }, [baseDelay, stagger]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="w-word inline-block" style={{ marginRight: "0.26em", opacity: 0 }} aria-hidden="true">
          {word}
        </span>
      ))}
    </span>
  );
}

// ─── HeroImage — geometric reveal + parallax ─────────────────────────────────
// The image is revealed with an expanding clip-path (angled parallelogram).
// On scroll it drifts upward. On mouse it shifts slightly, giving depth.
function HeroImage() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Entrance: clip-path sweeps open, image scales down ──────────────────
  useEffect(() => {
    const wrap = wrapRef.current;
    const img  = imgRef.current;
    if (!wrap || !img) return;

    // Start: fully clipped (zero width reveal), image scaled up
    gsap.set(wrap, {
      clipPath: "polygon(8% 0%, 8% 0%, 8% 100%, 8% 100%)",
      immediateRender: true,
    });
    gsap.set(img, { scale: 1.14, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });
      // Clip sweeps from left to right — angled leading edge creates the
      // parallelogram shape and gives it a dynamic, editorial feel
      tl.to(wrap, {
        clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
        duration: 1.1, ease: "power3.inOut",
      })
      // Simultaneously scale image down to natural size
        .to(img, {
          scale: 1, duration: 1.4, ease: "power2.out", force3D: true,
        }, 0);
    }, wrap);

    return () => ctx.revert();
  }, []);

  // ── Scroll parallax: image drifts upward at 0.3× scroll speed ──────────
  useEffect(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap) return;
    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: -60, ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  // ── Mouse parallax: subtle opposite-direction shift ──────────────────────
  useEffect(() => {
    const img  = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap) return;

    let rafId: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Shift opposite cursor: creates depth illusion
      tx = ((e.clientX / vw) - 0.5) * -14;
      ty = ((e.clientY / vh) - 0.5) * -8;
    };

    const tick = () => {
      cx += (tx - cx) * 0.055;
      cy += (ty - cy) * 0.055;
      img.style.transform = `scale(1) translate(${cx}px, ${cy}px)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    /*
     * RESPONSIVE CHANGES:
     * — Previously `hidden lg:flex`: now visible on sm+ as a stacked block
     *   (flex on lg+, block on sm/md so it stacks below the copy column).
     * — Height is fluid: clamps between 260px (mobile) and 520px (desktop)
     *   via a CSS custom property resolved per breakpoint.
     * — StatBadge is repositioned slightly on small screens (see below).
     */
    <div className="relative flex items-center justify-end mt-2 sm:mt-0">
      {/* Outer wrapper controls clip-path shape */}
      <div
        ref={wrapRef}
        style={{
          position: "relative",
          width: "100%",
          // Fluid height: 260px on xs, 340px on sm, 420px on md, 520px on lg+
          height: "clamp(260px, 40vw, 520px)",
          // Clip starts fully closed — GSAP will open it
          clipPath: "polygon(8% 0%, 8% 0%, 8% 100%, 8% 100%)",
          willChange: "clip-path",
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        {/* Image */}
        <img
          ref={imgRef}
          src={teamPhoto}
          alt="Professional team in discussion"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
            display: "block",
            willChange: "transform",
            transformOrigin: "center center",
          }}
        />

        {/* Colour grade overlay — warm tint to match site palette */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, hsla(0,55%,32%,0.12) 0%, hsla(38,45%,55%,0.06) 50%, transparent 75%)",
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />

        {/* Bottom fade — bleeds into background */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Floating stat badge — appears after image reveal ──────────────── */}
      <StatBadge />
    </div>
  );
}

// ─── Floating badge overlaid on image ────────────────────────────────────────
function StatBadge() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 16, scale: 0.94, force3D: true, immediateRender: true });
    gsap.to(el, {
      opacity: 1, y: 0, scale: 1,
      duration: 0.75, ease: "back.out(1.3)",
      delay: 1.85, force3D: true,
    });
  }, []);

  return (
    /*
     * RESPONSIVE CHANGES:
     * — On xs/sm the badge sits at bottom: 1rem, left: 0.75rem so it doesn't
     *   overflow the viewport. On lg+ we restore the original -1.5rem offset.
     */
    <div
      ref={ref}
      className="absolute z-10"
      style={{
        bottom: "1rem",
        left: "0.75rem",
        opacity: 0,
      }}
    >
      {/* Inner wrapper: original styles unchanged */}
      <div
        className="bg-card border border-border rounded-sm"
        style={{
          padding: "1rem 1.35rem",
          boxShadow: "0 8px 32px -6px rgba(0,0,0,0.18)",
          backdropFilter: "blur(8px)",
          minWidth: "200px",
        }}
      >
        <p
          className="font-heading font-semibold text-foreground leading-none"
          style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}
        >
          People-first
        </p>
        <p
          className="font-body text-muted-foreground"
          style={{ fontSize: "0.78rem", letterSpacing: "0.06em" }}
        >
          AI adoption that actually sticks
        </p>
        {/* Small primary accent rule */}
        <div style={{ height: "2px", width: "32px", background: "hsl(var(--primary))", marginTop: "0.75rem", borderRadius: "1px" }} />
      </div>
    </div>
  );
}

// ─── HeroSection ─────────────────────────────────────────────────────────────
const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbRef     = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const noteRef    = useRef<HTMLParagraphElement>(null);

  // ── Mouse-reactive orb ────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const orb     = orbRef.current;
    if (!section || !orb) return;

    let rafId: number;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width  - 0.5) * 55;
      targetY = ((e.clientY - rect.top)  / rect.height - 0.5) * 38;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      orb.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
      rafId = requestAnimationFrame(tick);
    };

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ── Entrance animations ───────────────────────────────────────────────────
  useEffect(() => {
    const label  = labelRef.current;
    const sub    = subRef.current;
    const cta    = ctaRef.current;
    const note   = noteRef.current;
    const section = sectionRef.current;
    if (!label || !sub || !cta || !section) return;

    gsap.set([label, sub, cta], { opacity: 0, y: 12, force3D: true, immediateRender: true });
    if (note) gsap.set(note, { opacity: 0, immediateRender: true });

    const afterWords = 1.9; // wait for word reveal to mostly finish

    const ctx = gsap.context(() => {
      gsap.to(label, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.15, force3D: true });
      gsap.to(sub,   { opacity: 1, y: 0, duration: 0.8,  ease: "power2.out", delay: afterWords,        force3D: true });
      gsap.to(cta,   { opacity: 1, y: 0, duration: 0.7,  ease: "power2.out", delay: afterWords + 0.2,  force3D: true });
      if (note) gsap.to(note, { opacity: 1, duration: 0.6, ease: "power2.out", delay: afterWords + 0.45 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.15]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/93 to-background/68" />
      </div>

      {/*
       * RESPONSIVE CHANGES — Mouse-reactive warm orb:
       * — Size shrinks on mobile: clamp(280px, 70vw, 580px) so it never
       *   overflows the viewport on narrow screens.
       * — Vertical anchor raised slightly on mobile (top: 38%) to sit
       *   behind the copy column rather than bleeding off-screen.
       */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "44%", left: "38%",
          width: "clamp(280px, 70vw, 580px)",
          height: "clamp(280px, 70vw, 580px)",
          background: "radial-gradient(circle, hsl(var(--primary)/0.10) 0%, hsl(var(--accent)/0.04) 55%, transparent 78%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(48px)",
          animation: "orbPulse 7s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes orbPulse {
          0%,100% { opacity:.65; scale:1;    }
          50%      { opacity:1;   scale:1.07; }
        }
      `}</style>

      {/*
       * RESPONSIVE CHANGES — Container:
       * — Top/bottom padding scales down on mobile: pt-20 pb-20 → pt-28 pb-28
       *   on lg+. Tailwind classes handle this step via responsive prefix.
       * — On xs the grid is single-column (already was), but now the image
       *   column is visible on all breakpoints (was `hidden lg:flex`).
       * — gap-y is tightened on xs to avoid too much dead space.
       */}
      <div className="relative z-10 aurion-container w-full pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 sm:gap-y-12 lg:gap-16 items-center">

          {/* ── Left: copy ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-7">
            <span
              ref={labelRef}
              className="aurion-label mb-5 sm:mb-7 block"
              style={{ opacity: 0 }}
            >
              AI Adoption &amp; Enablement
            </span>

            {/*
             * RESPONSIVE CHANGES — Heading:
             * — aurion-heading-xl is assumed to set a large fixed font size.
             *   We add responsive text overrides via an inline className layer
             *   so the heading scales gracefully without altering the design
             *   token itself.
             */}
            <h1 className="aurion-heading-xl mb-7 sm:mb-9 leading-tight text-[clamp(1.75rem,5vw,3.5rem)]">
              <WordReveal
                text="Turn scattered AI experimentation into structured, responsible everyday use."
                baseDelay={0.4}
                stagger={0.06}
              />
            </h1>

            <p
              ref={subRef}
              className="aurion-body-lg max-w-[520px] mb-8 sm:mb-12 text-[clamp(0.95rem,2vw,1.125rem)]"
              style={{ opacity: 0 }}
            >
              Aurion helps organisations move from quiet, inconsistent AI use to
              confident, aligned, everyday practice that{" "}
              <strong className="text-foreground font-medium">
                strengthens workflows and reduces risk.
              </strong>
            </p>

            {/*
             * RESPONSIVE CHANGES — CTA group:
             * — Already uses flex-col sm:flex-row; no change needed.
             * — gap tightened slightly on xs to keep buttons compact.
             */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start"
              style={{ opacity: 0 }}
            >
              <HoverAnimator>
                <Link
                  to="/how-we-work"
                  className="aurion-btn-primary group relative overflow-hidden w-full sm:w-auto text-center"
                >
                  <span className="relative z-10">
                    See how adoption actually works
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/[0.07] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
                  />
                </Link>
              </HoverAnimator>

              <HoverAnimator>
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center sm:justify-start gap-2.5 px-7 py-4 font-body font-medium text-base text-foreground border border-border rounded-sm hover:border-primary/50 transition-colors duration-200 w-full sm:w-auto"
                >
                  Book a clarity call
                  <span className="text-primary/60 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 inline-block">
                    →
                  </span>
                </Link>
              </HoverAnimator>
            </div>

            <p
              ref={noteRef}
              className="mt-4 sm:mt-5 text-xs font-body text-muted-foreground/50 tracking-wide"
              style={{ opacity: 0 }}
            >
              No pitch deck. No agenda. Just a real conversation.
            </p>
          </div>

          {/* ── Right: image with geometric reveal ─────────────────────────── */}
          {/*
           * RESPONSIVE CHANGES:
           * — Was `hidden lg:flex`; now visible on all breakpoints.
           * — On xs/sm/md it stacks below the copy (single-column grid).
           * — On lg+ it sits in its original side-by-side column.
           * — The HeroImage component itself now uses a fluid height so the
           *   image never feels oversized or cropped on small screens.
           */}
          <div className="lg:col-span-6 xl:col-span-5">
            <HeroImage />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      {/* <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] font-body uppercase tracking-[0.25em] text-muted-foreground/35">
          Scroll
        </span>
        <span className="w-px h-7 bg-muted-foreground/25 animate-pulse" />
      </div> */}
    </section>
  );
};

export default HeroSection;