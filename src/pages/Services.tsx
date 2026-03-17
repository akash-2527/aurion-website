import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, ShimmerBtn } from "./how-we-work/shared";
import servicesPhoto from "@/assets/services-team.webp";

gsap.registerPlugin(ScrollTrigger);

// ─── Design tokens — exactly match CaseStudies palette ───────────────────────
const C = {
  bg:      "hsl(35, 30%, 96%)",
  warm:    "hsl(30, 20%, 92%)",
  dark:    "hsl(15, 20%, 12%)",
  primary: "hsl(0, 55%, 32%)",
  gold:    "hsl(38, 45%, 55%)",
  fg:      "hsl(15, 20%, 15%)",
  muted:   "hsl(15, 10%, 45%)",
  border:  "hsl(30, 15%, 85%)",
  card:    "hsl(35, 28%, 99%)",
  offW:    "rgba(245,238,228,1)",
  offM:    "rgba(245,238,228,0.28)",
};

// ─── Global CSS ───────────────────────────────────────────────────────────────
const css = `
  /* ── Hero grid ── */
  .sv-hero-grid {
    display: grid;
    grid-template-columns: 6fr 5fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }
  @media (max-width: 900px) {
    .sv-hero-grid { grid-template-columns: 1fr; }
  }

  /* ── Section 2-col ── */
  .sv-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 4.5rem);
    align-items: start;
  }
  @media (max-width: 860px) {
    .sv-2col { grid-template-columns: 1fr; gap: 2rem; }
  }

  /* ── Service card grid ── */
  .sv-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(1rem, 2vw, 1.5rem);
  }
  @media (max-width: 640px) {
    .sv-cards { grid-template-columns: 1fr; }
  }

  /* ── Stats strip ── */
  .sv-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 700px) {
    .sv-stats { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Metrics dark bar ── */
  .sv-metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(1.5rem, 4vw, 2.5rem);
  }
  @media (max-width: 640px) {
    .sv-metrics { grid-template-columns: repeat(2, 1fr); }
  }

  /* ── Section row padding ── */
  .sv-pad { padding: clamp(64px, 9vw, 108px) 0; }

  /* ── Stat cell borders ── */
  .sv-stat-border { border-right: 1px solid hsl(30,15%,85%); }
  .sv-stat-border:last-child { border-right: none; }
  @media (max-width: 700px) {
    .sv-stat-border:nth-child(2n) { border-right: none; }
    .sv-stat-border:nth-child(2n+1):not(:last-child) {
      border-right: 1px solid hsl(30,15%,85%);
    }
  }

  /* ── Badge responsive ── */
  .sv-badge { right: 0.75rem; }
  @media (min-width: 768px) { .sv-badge { right: -1.5rem; } }

  /* ── Hover row ── */
  .sv-row-hover {
    transition: background 0.35s ease;
  }
  .sv-row-hover:hover { background: hsla(0,55%,32%,0.018); }

  /* ── Ghost number ── */
  .sv-ghost {
    font-size: clamp(4.5rem, 10vw, 8rem);
    line-height: 0.82;
    letter-spacing: -0.05em;
    user-select: none;
    pointer-events: none;
  }

  /* ── Marquee ── */
  @keyframes sv-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .sv-marquee-track {
    animation: sv-marquee 34s linear infinite;
  }

  /* ── Pull quote ── */
  .sv-pull { font-size: clamp(1.2rem, 2.4vw, 1.9rem); }
`;

// ─── useLineDraw ──────────────────────────────────────────────────────────────
function useLineDraw(
  ref: React.RefObject<HTMLElement | null>,
  opts: { delay?: number; duration?: number } = {}
) {
  const { delay = 0, duration = 0.95 } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center", immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1, duration, ease: "power3.inOut", delay,
        scrollTrigger: { trigger: el, start: "top 91%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── useReveal ────────────────────────────────────────────────────────────────
function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts: { y?: number; delay?: number; duration?: number } = {}
) {
  const { y = 28, delay = 0, duration = 0.85 } = opts;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, y: 0, duration, ease: "power3.out", delay, force3D: true,
        scrollTrigger: { trigger: el, start: "top 88%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ══════════════════════════════════════════════════════════════════════════════
// IRIS APERTURE REVEAL IMAGE ANIMATION
// ══════════════════════════════════════════════════════════════════════════════
// Technique: "Cinematic Iris Aperture"
//
// The image is masked by an SVG clipPath circle (userSpaceOnUse coordinates)
// that begins at radius 0 — completely hidden — and expands outward from the
// centre with a power2.inOut ease, mimicking a camera lens aperture opening.
//
// As the iris expands the image simultaneously "wakes up":
//  • Starts deep grayscale + underexposed (brightness 0.6)
//  • Colour and brightness restore over 1.15 s (power2.out) — as if a
//    photographer is dialling in the exposure in real time
//
// At the moment the iris reaches full open:
//  • A brief, soft light pulse fires (screen blend) — a single shutter flash
//
// Post-reveal:
//  • Warm colour grade settles onto the image
//  • Decorative offset frame materialises left → right
//  • Badge springs in from below
//  • Scroll parallax drifts the inner image up on scroll
//  • Continuous mouse-reactive 3D tilt on the outer panel
// ══════════════════════════════════════════════════════════════════════════════

function IrisRevealImage({ src }: { src: string }) {
  const panelRef   = useRef<HTMLDivElement>(null);   // mouse tilt target
  const wrapRef    = useRef<HTMLDivElement>(null);   // visible container
  const clipDivRef = useRef<HTMLDivElement>(null);   // clip-path applied here
  const innerRef   = useRef<HTMLDivElement>(null);   // parallax + grayscale target
  const gradeRef   = useRef<HTMLDivElement>(null);   // warm colour grade
  const frameRef   = useRef<HTMLDivElement>(null);   // decorative offset frame
  const badgeRef   = useRef<HTMLDivElement>(null);   // floating badge
  const circleRef  = useRef<SVGCircleElement>(null); // SVG clip circle
  const pulseRef   = useRef<HTMLDivElement>(null);   // shutter-flash overlay

  // ── Iris aperture entrance ───────────────────────────────────────────────
  useEffect(() => {
    const circle  = circleRef.current;
    const clipDiv = clipDivRef.current;
    const inner   = innerRef.current;
    const grade   = gradeRef.current;
    const frame   = frameRef.current;
    const badge   = badgeRef.current;
    const pulse   = pulseRef.current;
    if (!circle || !clipDiv) return;

    // Measure actual pixel dimensions so the iris is a true circle
    const rect = clipDiv.getBoundingClientRect();
    const w    = rect.width  || 480;
    const h    = rect.height || 400;
    const cx   = w / 2;
    const cy   = h / 2;
    // Radius that just clears every corner of the bounding box
    const maxR = Math.sqrt(cx * cx + cy * cy) * 1.06;

    // ── Initial states ──────────────────────────────────────────────────
    gsap.set(circle, { attr: { cx, cy, r: 0 }, immediateRender: true });
    if (inner) gsap.set(inner, { filter: "grayscale(100%) brightness(0.6)", immediateRender: true });
    if (grade) gsap.set(grade, { opacity: 0, immediateRender: true });
    if (frame) gsap.set(frame, { opacity: 0, scaleX: 0, transformOrigin: "left center", immediateRender: true });
    if (badge) gsap.set(badge, { opacity: 0, y: 20, scale: 0.88, force3D: true, immediateRender: true });
    if (pulse) gsap.set(pulse, { opacity: 0, immediateRender: true });

    const ctx = gsap.context(() => {

      // Phase 1 — iris opens from centre outward
      gsap.to(circle, {
        attr: { r: maxR },
        duration: 1.35,
        ease: "power2.inOut",
        delay: 0.12,
      });

      // Phase 1b — colour and exposure wake up as iris opens
      if (inner) {
        gsap.to(inner, {
          filter: "grayscale(0%) brightness(1)",
          duration: 1.15,
          ease: "power2.out",
          delay: 0.55,
        });
      }

      const irisEnd = 0.12 + 1.35; // 1.47 s

      // Phase 2 — single soft shutter-flash at iris completion
      if (pulse) {
        gsap.to(pulse, {
          opacity: 0.22,
          duration: 0.11,
          ease: "power4.out",
          delay: irisEnd,
          onComplete: () => {
            gsap.to(pulse, { opacity: 0, duration: 0.65, ease: "power2.out" });
          },
        });
      }

      // Phase 3 — warm grade settles in
      if (grade) {
        gsap.to(grade, {
          opacity: 1, duration: 0.7, ease: "power2.out",
          delay: irisEnd + 0.06,
        });
      }

      // Phase 4 — decorative frame draws in left → right
      if (frame) {
        gsap.to(frame, {
          opacity: 1, scaleX: 1,
          duration: 0.65, ease: "power3.out",
          delay: irisEnd + 0.2,
        });
      }

      // Phase 5 — badge springs up
      if (badge) {
        gsap.to(badge, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.58, ease: "back.out(1.7)", force3D: true,
          delay: irisEnd + 0.36,
        });
      }

    });

    return () => ctx.revert();
  }, []);

  // ── Scroll parallax ──────────────────────────────────────────────────────
  useEffect(() => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(inner, { y: 0 }, {
        y: -52, ease: "none",
        scrollTrigger: {
          trigger: wrap, start: "top bottom", end: "bottom top",
          scrub: 1.3, invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  // ── Mouse 3D tilt ────────────────────────────────────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    let raf: number, tX = 0, tY = 0, cX = 0, cY = 0;
    const onMove = (e: MouseEvent) => {
      tX = ((e.clientX / window.innerWidth)  - 0.5) * 7;
      tY = ((e.clientY / window.innerHeight) - 0.5) * -5;
    };
    const tick = () => {
      cX += (tX - cX) * 0.055; cY += (tY - cY) * 0.055;
      panel.style.transform = `perspective(1100px) rotateY(${cX}deg) rotateX(${cY}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={panelRef} style={{ position: "relative", willChange: "transform" }}>

      {/* ── Hidden SVG: clipPath definition ── */}
      <svg
        width="0" height="0"
        style={{ position: "absolute", overflow: "hidden" }}
        aria-hidden
      >
        <defs>
          {/*
            userSpaceOnUse: coordinates match the element's own pixel space.
            We set cx/cy/r in the useEffect once we know the actual dimensions.
          */}
          <clipPath id="aurion-iris-clip" clipPathUnits="userSpaceOnUse">
            <circle ref={circleRef} cx="0" cy="0" r="0" />
          </clipPath>
        </defs>
      </svg>

      {/* Offset decorative frame */}
      <div ref={frameRef} aria-hidden style={{
        position: "absolute",
        top: "18px", left: "18px", right: "-18px", bottom: "-18px",
        border: `1.5px solid hsla(0,55%,32%,0.22)`,
        borderRadius: "6px",
        opacity: 0, zIndex: 0, pointerEvents: "none",
      }} />

      {/* Shadow bloom */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 70%, hsla(0,55%,32%,0.24) 0%, transparent 72%)`,
        transform: "translateY(22px) scale(0.95)",
        filter: "blur(32px)",
        zIndex: 0, borderRadius: "8px", pointerEvents: "none",
      }} />

      {/* Main image container */}
      <div
        ref={wrapRef}
        style={{
          position: "relative", zIndex: 1,
          width: "100%",
          height: "clamp(260px, 40vw, 520px)",
          borderRadius: "6px",
          overflow: "hidden",
          boxShadow: "0 24px 64px -10px rgba(0,0,0,0.32)",
        }}
      >
        {/* Iris clip wrapper — clip-path applied here so cx/cy map to its pixel space */}
        <div
          ref={clipDivRef}
          style={{
            position: "absolute", inset: 0,
            clipPath: "url(#aurion-iris-clip)",
          }}
        >
          {/* Parallax inner — 116% tall for scroll drift room */}
          <div
            ref={innerRef}
            style={{
              width: "100%",
              height: "116%",
              position: "absolute",
              top: 0, left: 0,
              backgroundImage:    `url(${src})`,
              backgroundSize:     "cover",
              backgroundPosition: "center 25%",
              backgroundRepeat:   "no-repeat",
              willChange:         "transform, filter",
            }}
          />
        </div>

        {/* Shutter-flash pulse at iris completion */}
        <div ref={pulseRef} aria-hidden style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at 52% 38%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.12) 38%, transparent 62%)",
          mixBlendMode: "screen",
          pointerEvents: "none", zIndex: 4, opacity: 0,
        }} />

        {/* Warm colour grade */}
        <div ref={gradeRef} aria-hidden style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, hsla(0,55%,32%,0.11) 0%, hsla(38,45%,55%,0.06) 42%, transparent 66%)`,
          mixBlendMode: "multiply", pointerEvents: "none", zIndex: 2, opacity: 0,
        }} />

        {/* Bottom fade to page bg */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
          background: `linear-gradient(to top, ${C.bg} 0%, transparent 100%)`,
          pointerEvents: "none", zIndex: 2,
        }} />
      </div>

      {/* Floating badge */}
      <div ref={badgeRef} className="sv-badge" style={{
        position: "absolute", bottom: "1.75rem",
        opacity: 0, zIndex: 10,
      }}>
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: "4px",
          padding: "1rem 1.4rem",
          boxShadow: "0 10px 32px -6px rgba(0,0,0,0.14)",
          minWidth: "180px",
        }}>
          <div style={{ height: "2px", width: "26px", background: C.primary, borderRadius: "1px", marginBottom: "0.65rem" }} />
          <p className="font-heading font-semibold" style={{ fontSize: "0.94rem", color: C.fg, lineHeight: 1.2, marginBottom: "0.2rem" }}>
            Tailored to your teams
          </p>
          <p className="font-body" style={{ fontSize: "0.72rem", color: C.muted, letterSpacing: "0.05em" }}>
            Nothing off the shelf
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MARQUEE STRIP — borrowed directly from CaseStudies pattern
// ══════════════════════════════════════════════════════════════════════════════
const MARQUEE_WORDS = [
  "Copilot Training","·","Claude Training","·",
  "System Adoption","·","Automation","·",
  "Advisory","·","Responsible AI","·",
];

function MarqueeStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.set(wrapRef.current, { opacity: 0 });
    gsap.to(wrapRef.current, { opacity: 1, duration: 0.8, delay: 1.4, ease: "power2.out" });
  }, []);
  return (
    <div ref={wrapRef} style={{ overflow: "hidden", borderBottom: `1px solid ${C.border}`, opacity: 0 }}>
      <div className="sv-marquee-track" style={{ display: "flex", whiteSpace: "nowrap", width: "200%", padding: "12px 0" }}>
        {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
          <span key={i} className="font-heading text-sm font-medium"
            style={{ padding: "0 1.5rem", color: w === "·" ? C.gold : "hsl(15,10%,54%)" }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// HERO — editorial light bg, exactly like CaseStudies
// ══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ruleRef    = useRef<HTMLDivElement>(null);

  // Mouse orb
  useEffect(() => {
    const section = sectionRef.current;
    const orb     = orbRef.current;
    if (!section || !orb) return;
    let raf: number, tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width  - 0.5) * 80;
      ty = ((e.clientY - r.top)  / r.height - 0.5) * 50;
    };
    const tick = () => {
      cx += (tx - cx) * 0.04; cy += (ty - cy) * 0.04;
      orb.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`;
      raf = requestAnimationFrame(tick);
    };
    section.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { section.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  // Copy entrance — same skew-reveal used in CaseStudies
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".hl");
    gsap.set(items, { opacity: 0, y: 52, skewY: 1.5, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1, y: 0, skewY: 0,
        stagger: 0.11, duration: 1.0, ease: "power4.out",
        delay: 0.2, force3D: true,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Animated rule
  useEffect(() => {
    const el = ruleRef.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(el, { scaleX: 1, duration: 1.3, ease: "power3.inOut", delay: 1.0 });
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative", overflow: "hidden",
      padding: "clamp(72px, 10vw, 112px) 0 clamp(48px, 7vw, 80px)",
      background: C.bg,
    }}>
      {/* Noise texture */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.02,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
      }} />
      {/* Subtle grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(hsla(0,55%,32%,0.025) 1px, transparent 1px), linear-gradient(90deg, hsla(0,55%,32%,0.025) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      {/* Mouse orb */}
      <div ref={orbRef} aria-hidden style={{
        position: "absolute", top: "42%", left: "66%",
        width: "580px", height: "580px", borderRadius: "50%",
        background: `radial-gradient(circle, hsla(38,45%,55%,0.09) 0%, hsla(0,55%,32%,0.04) 48%, transparent 72%)`,
        filter: "blur(56px)", transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 0, willChange: "transform",
      }} />

      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="sv-hero-grid">

          {/* Copy */}
          <div ref={contentRef}>
            <span className="hl aurion-label mb-6 block" style={{ opacity: 0 }}>
              Services
            </span>
            <h1 className="hl font-heading font-semibold leading-tight" style={{
              opacity: 0,
              fontSize: "clamp(2.4rem, 6vw, 5rem)",
              color: C.fg, letterSpacing: "-0.025em",
              maxWidth: "14ch",
            }}>
              What we<br />
              <span style={{ color: C.primary }}>offer.</span>
            </h1>

            {/* Animated rule */}
            <div style={{ position: "relative", height: "1px", maxWidth: "280px", margin: "2.25rem 0" }}>
              <div style={{ position: "absolute", inset: 0, background: C.border }} />
              <div ref={ruleRef} style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(90deg, ${C.primary}, ${C.gold}, transparent)`,
                opacity: 0.8,
              }} />
            </div>

            <p className="hl font-body" style={{
              opacity: 0, fontSize: "clamp(1rem, 1.4vw, 1.1rem)",
              color: C.muted, lineHeight: 1.82, maxWidth: "42ch",
              marginBottom: "2.5rem",
            }}>
              AI training, Copilot adoption, system enablement and automation.
              Everything shaped around your organisation, your tools and your people.
            </p>

            <div className="hl" style={{ opacity: 0 }}>
              <ShimmerBtn to="/contact">Book a discovery call</ShimmerBtn>
            </div>
          </div>

          {/* Iris Aperture Reveal Image */}
          <IrisRevealImage src={servicesPhoto} />

        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// STATS STRIP — mirrors CaseStudies MetricsBar light variant
// ══════════════════════════════════════════════════════════════════════════════
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value, duration: 1.7, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true, invalidateOnRefresh: true },
        onUpdate: () => { if (el) el.textContent = `${Math.round(obj.val)}${suffix}`; },
      });
    }, el);
    return () => ctx.revert();
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function StatsStrip() {
  const ref     = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useLineDraw(lineRef as React.RefObject<HTMLElement>);

  const stats = [
    { val: 4,   suf: "",  label: "Training pathways" },
    { val: 94,  suf: "%", label: "Avg satisfaction"  },
    { val: 100, suf: "%", label: "Tailored delivery" },
    { val: 3,   suf: "+", label: "Sectors served"    },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cells = el.querySelectorAll<HTMLElement>(".sv-stat-cell");
    gsap.set(cells, { opacity: 0, y: 20 });
    const ctx = gsap.context(() => {
      gsap.to(cells, {
        opacity: 1, y: 0, stagger: 0.09, duration: 0.72, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ background: C.warm, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div className="aurion-container" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div ref={lineRef} style={{
          height: "2px",
          background: `linear-gradient(90deg, ${C.primary} 0%, ${C.gold} 45%, transparent)`,
          opacity: 0.5,
        }} />
        <div ref={ref} className="sv-stats">
          {stats.map((s, i) => (
            <div key={i} className="sv-stat-cell sv-stat-border" style={{
              padding: "clamp(1.4rem, 3vw, 2.25rem) clamp(1rem, 2.5vw, 1.75rem)",
            }}>
              <div className="font-heading font-bold" style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                color: C.primary, lineHeight: 1, letterSpacing: "-0.035em",
                marginBottom: "0.35rem",
              }}>
                <CountUp value={s.val} suffix={s.suf} />
              </div>
              <p className="font-body" style={{
                fontSize: "0.74rem", color: C.muted,
                letterSpacing: "0.09em", textTransform: "uppercase", margin: 0,
              }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION HEADER — editorial CaseStudies style with ghost number + rule
// ══════════════════════════════════════════════════════════════════════════════
function SectionHeader({ num, label, title, sub, light = false }: {
  num: string; label: string; title: string; sub?: string; light?: boolean;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  useReveal(ref  as React.RefObject<HTMLElement>);
  useLineDraw(lineRef as React.RefObject<HTMLElement>, { delay: 0.1 });

  const gold = "hsl(38,45%,62%)";
  const fg   = light ? C.offW         : C.fg;
  const sub_ = light ? "rgba(245,238,228,0.52)" : C.muted;
  const ac   = light ? gold           : C.primary;

  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1.1rem", marginBottom: "0.6rem" }}>
        <span className="sv-ghost font-heading font-bold" style={{
          color: light ? C.offW : C.primary,
          opacity: light ? 0.065 : 0.085,
        }}>{num}</span>
        <span className="font-body font-semibold" style={{
          fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase",
          color: ac, paddingBottom: "0.85rem",
        }}>{label}</span>
      </div>
      <div ref={lineRef} style={{
        height: "1px",
        background: light
          ? "linear-gradient(90deg, rgba(245,238,228,0.18) 0%, transparent 80%)"
          : `linear-gradient(90deg, ${C.border} 0%, transparent 80%)`,
        marginBottom: "1.75rem",
      }} />
      <h2 className="font-heading font-semibold" style={{
        fontSize: "clamp(1.5rem, 3.2vw, 2.5rem)",
        color: fg, lineHeight: 1.16, letterSpacing: "-0.02em",
        maxWidth: "620px", margin: "0 0 0.8rem",
      }}>{title}</h2>
      {sub && (
        <p className="font-body" style={{
          fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)",
          color: sub_, lineHeight: 1.78, maxWidth: "540px", margin: 0,
        }}>{sub}</p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE CARD — magnetic 3D tilt + cursor spotlight, CaseStudies card style
// ══════════════════════════════════════════════════════════════════════════════
function ServiceCard({ num, title, body, tag, accent = C.primary, delay = 0 }: {
  num: string; title: string; body: string; tag?: string; accent?: string; delay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  // Magnetic 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    let raf: number | null = null;
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let tGX = 50, tGY = 50, cGX = 50, cGY = 50;
    let hov = false;
    const tick = () => {
      if (!hov) { raf = null; return; }
      cRX += (tRX - cRX) * 0.11; cRY += (tRY - cRY) * 0.11;
      cGX += (tGX - cGX) * 0.08; cGY += (tGY - cGY) * 0.08;
      card.style.transform = `perspective(800px) rotateX(${cRX}deg) rotateY(${cRY}deg) translateY(-6px)`;
      glow.style.background = `radial-gradient(circle at ${cGX}% ${cGY}%, ${accent}1a 0%, transparent 56%)`;
      raf = requestAnimationFrame(tick);
    };
    const enter = (e: MouseEvent) => {
      hov = true; if (raf === null) raf = requestAnimationFrame(tick);
      card.style.borderColor = `${accent}55`;
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top)  / r.height) - 0.5) * 12;
      tRY =  (((e.clientX - r.left) / r.width)  - 0.5) * 16;
      tGX = ((e.clientX - r.left) / r.width)  * 100;
      tGY = ((e.clientY - r.top)  / r.height) * 100;
    };
    const move = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top)  / r.height) - 0.5) * 12;
      tRY =  (((e.clientX - r.left) / r.width)  - 0.5) * 16;
      tGX = ((e.clientX - r.left) / r.width)  * 100;
      tGY = ((e.clientY - r.top)  / r.height) * 100;
    };
    const leave = () => {
      hov = false; tRX = 0; tRY = 0; tGX = 50; tGY = 50;
      card.style.borderColor = "";
      gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.6)", overwrite: true });
      gsap.to(glow, { opacity: 0, duration: 0.3, overwrite: true, onComplete: () => { glow.style.opacity = "1"; glow.style.background = "none"; } });
    };
    card.addEventListener("mouseenter", enter, { passive: true });
    card.addEventListener("mousemove",  move,  { passive: true });
    card.addEventListener("mouseleave", leave, { passive: true });
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mousemove",  move);
      card.removeEventListener("mouseleave", leave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [cardRef, glowRef, accent]);

  // Scroll reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 34, scale: 0.97, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.72, ease: "power3.out", force3D: true, delay,
        scrollTrigger: { trigger: el, start: "top 91%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);

  // Bottom bar sweep
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center", immediateRender: true });
    if (hov) gsap.to(bar, { scaleX: 1, duration: 0.3, ease: "power2.out", overwrite: true });
    else     gsap.to(bar, { scaleX: 0, duration: 0.22, ease: "power2.in", transformOrigin: "right center", overwrite: true });
  }, [hov]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0, position: "relative",
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: "4px",
        padding: "clamp(1.4rem, 3vw, 2.1rem) clamp(1.2rem, 2.5vw, 1.9rem) clamp(1.4rem, 3vw, 2.25rem)",
        boxShadow: hov ? "0 18px 52px -8px rgba(0,0,0,0.13)" : "0 2px 14px -4px rgba(0,0,0,0.07)",
        willChange: "transform, box-shadow",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "default", overflow: "hidden",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${accent} 0%, ${accent}44 100%)`, borderRadius: "4px 4px 0 0" }} />
      {/* Bottom sweep */}
      <div ref={barRef} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: accent, zIndex: 1 }} />
      {/* Cursor glow */}
      <div ref={glowRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, borderRadius: "4px" }} />
      {/* Ghost number */}
      <span aria-hidden style={{
        position: "absolute", bottom: "-0.4rem", right: "0.9rem",
        fontFamily: "Georgia, serif",
        fontSize: "clamp(3.2rem, 6vw, 5rem)",
        fontWeight: 700, color: accent, opacity: 0.055,
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.05em",
      }}>{num}</span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", gap: "0.5rem" }}>
          <span className="font-body font-semibold" style={{ fontSize: "10px", letterSpacing: "0.24em", textTransform: "uppercase", color: accent, flexShrink: 0 }}>{num}</span>
          <span style={{ color: hov ? accent : C.muted, transform: hov ? "translate(3px,-2px)" : "none", transition: "color 0.2s, transform 0.2s", fontSize: "0.88rem", flexShrink: 0 }}>↗</span>
        </div>
        {tag && (
          <span className="font-body font-semibold" style={{
            display: "inline-block", fontSize: "9px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: accent,
            background: `${accent}12`, border: `1px solid ${accent}28`,
            borderRadius: "2px", padding: "0.2rem 0.62rem", marginBottom: "0.85rem",
          }}>{tag}</span>
        )}
        <h3 className="font-heading font-semibold leading-snug" style={{
          fontSize: "clamp(0.97rem, 1.5vw, 1.16rem)",
          color: hov ? accent : C.fg, marginBottom: "0.62rem",
          transition: "color 0.22s ease",
        }}>{title}</h3>
        <div style={{ height: "1px", background: C.border, marginBottom: "0.72rem" }} />
        <p className="font-body" style={{ fontSize: "0.852rem", color: C.muted, lineHeight: 1.8, margin: 0 }}>{body}</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. COPILOT TRAINING
// ══════════════════════════════════════════════════════════════════════════════
function CopilotSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  useReveal(ctaRef as React.RefObject<HTMLElement>, { y: 14, delay: 0.28 });

  const cards = [
    { num: "01", title: "AI and Copilot Training",  body: "Practical, role-relevant training that helps your teams use AI with confidence and clarity.",                         tag: "Foundation", accent: C.primary },
    { num: "02", title: "Copilot Essentials",        body: "For teams new to AI. Prompting, everyday use cases, safe adoption and building genuine confidence.",                 tag: "New to AI",  accent: "hsl(0,48%,38%)" },
    { num: "03", title: "Copilot in Practice",       body: "For premium Copilot licence holders. Real-work scenarios across Outlook, Teams and SharePoint.",                    tag: "Premium",    accent: "hsl(16,42%,36%)" },
    { num: "04", title: "Copilot Agents",            body: "For teams ready to build AI assistants. Copilot Studio, data connections, governance and deployment.",              tag: "Advanced",   accent: "hsl(32,40%,34%)" },
  ];

  return (
    <section id="section-copilot" className="sv-pad" style={{ background: C.warm }}>
      <div className="aurion-container">
        <SectionHeader num="01" label="Copilot Training"
          title="Training pathways for every stage of AI readiness."
          sub="Role-relevant, practical training that builds confidence and clarity  not just awareness."
        />
        <div className="sv-cards" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          {cards.map((c, i) => <ServiceCard key={c.num} {...c} delay={i * 0.09} />)}
        </div>
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <ShimmerBtn to="/contact">Book a discovery call to choose the right pathway</ShimmerBtn>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. CLAUDE TRAINING
// ══════════════════════════════════════════════════════════════════════════════
function ClaudeSection() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useReveal(leftRef  as React.RefObject<HTMLElement>);
  useReveal(rightRef as React.RefObject<HTMLElement>, { delay: 0.13 });

  const topics = [
    "Advanced prompting and reasoning",
    "Research and analysis workflows",
    "Domain-specific use cases",
    "Knowledge synthesis techniques",
    "Ethical and responsible use",
  ];

  return (
    <section id="section-claude" className="sv-pad" style={{ background: C.dark, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-5%", width: "55vw", height: "70vh", background: "radial-gradient(ellipse at top right, hsla(0,55%,32%,0.18) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(hsla(38,45%,55%,0.025) 1px, transparent 1px), linear-gradient(90deg, hsla(38,45%,55%,0.025) 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeader num="02" label="Claude Training"
          title="Deep thinking, analysis and knowledge work."
          sub="For teams who want to use Claude for advanced research, reasoning and domain-specific tasks."
          light
        />
        <div className="sv-2col">
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="font-body" style={{ fontSize: "1.02rem", color: "rgba(245,238,228,0.55)", lineHeight: 1.82, marginBottom: "1.5rem" }}>
              Every session is customised to your field  whether HR, legal, finance, research or operations. We cover prompting, reasoning, research workflows and domain-specific use cases.
            </p>
            <p className="font-body" style={{ fontSize: "1.02rem", color: "rgba(245,238,228,0.55)", lineHeight: 1.82, marginBottom: "2.5rem" }}>
              No generic playbooks. No off-the-shelf slides. Just practical training that reflects how your team actually works.
            </p>
            <div style={{ background: "hsl(15,18%,16%)", borderLeft: `3px solid ${C.primary}`, padding: "1.3rem 1.55rem", borderRadius: "0 4px 4px 0", marginBottom: "2.5rem" }}>
              <p className="font-heading font-medium" style={{ fontSize: "0.93rem", fontStyle: "italic", color: "rgba(245,238,228,0.92)", lineHeight: 1.68, margin: 0 }}>
                "Every session is customised. No generic playbooks."
              </p>
            </div>
            <ShimmerBtn to="/contact" light>Request a customised Claude training plan</ShimmerBtn>
          </div>
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div style={{ background: "hsl(15,18%,16%)", border: "1px solid rgba(245,238,228,0.09)", borderRadius: "4px", padding: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              <span className="font-body font-semibold uppercase block" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "rgba(245,238,228,0.3)", marginBottom: "1.5rem" }}>What we cover</span>
              {topics.map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 0", borderBottom: i < topics.length - 1 ? "1px solid rgba(245,238,228,0.07)" : "none" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.primary, flexShrink: 0, opacity: 0.7 }} />
                  <span className="font-body" style={{ fontSize: "0.875rem", color: "rgba(245,238,228,0.58)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. SYSTEM ADOPTION
// ══════════════════════════════════════════════════════════════════════════════
function SystemAdoptionSection() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useReveal(leftRef  as React.RefObject<HTMLElement>);
  useReveal(rightRef as React.RefObject<HTMLElement>, { delay: 0.12 });

  const platforms = ["Microsoft 365","SharePoint","Teams","Knowledge management tools","CRM and HRIS platforms"];
  const itemRefs  = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, x: -18, force3D: true, immediateRender: true });
      const ctx = gsap.context(() => {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: i * 0.07, force3D: true, scrollTrigger: { trigger: el, start: "top 92%", once: true, invalidateOnRefresh: true } });
      }, el);
      return () => ctx.revert();
    });
  }, []);

  return (
    <section id="section-adoption" className="sv-pad" style={{ background: C.bg }}>
      <div className="aurion-container">
        <SectionHeader num="03" label="System Adoption Training"
          title="Behavioural training that makes new systems stick."
          sub="Friction mapping, role-specific use cases and adoption KPIs  built into every programme."
        />
        <div className="sv-2col">
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="font-body" style={{ fontSize: "1.02rem", color: C.muted, lineHeight: 1.8, marginBottom: "1.75rem" }}>
              Behaviourally informed training that helps teams adopt new systems without overwhelm or resistance. We support adoption for:
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem" }}>
              {platforms.map((p, i) => (
                <li key={i} ref={el => { itemRefs.current[i] = el; }} style={{ opacity: 0, display: "flex", alignItems: "center", gap: "0.9rem", padding: "0.85rem 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.primary, flexShrink: 0, opacity: 0.65 }} />
                  <span className="font-body" style={{ fontSize: "0.9rem", color: C.fg }}>{p}</span>
                </li>
              ))}
            </ul>
            <ShimmerBtn to="/contact">Talk to us about your system rollout</ShimmerBtn>
          </div>
          <div ref={rightRef} style={{ opacity: 0 }}>
            {[
              { label: "Friction mapping",        body: "We identify where resistance is most likely before training begins  so we design around it." },
              { label: "Role-specific use cases", body: "Every session is built around how each team actually uses the system in their real work." },
              { label: "Adoption KPIs",           body: "We define measurable outcomes from the start so confidence and usage can be tracked over time." },
            ].map((item, i) => (
              <div key={i}
                style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.primary}`, borderRadius: "0 4px 4px 0", padding: "1.5rem 1.75rem", marginBottom: i < 2 ? "1rem" : 0, transition: "box-shadow 0.22s ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <p className="font-body font-semibold" style={{ fontSize: "0.9rem", color: C.fg, marginBottom: "0.4rem" }}>{item.label}</p>
                <p className="font-body" style={{ fontSize: "0.8125rem", color: C.muted, lineHeight: 1.68, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. AUTOMATION
// ══════════════════════════════════════════════════════════════════════════════
function AutomationSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  useReveal(ctaRef as React.RefObject<HTMLElement>, { y: 14, delay: 0.32 });

  const cards = [
    { num: "01", title: "Workflow Automation",    body: "Approvals, notifications, data processing and multi-step workflows using Power Automate and Power Apps.",                    accent: C.primary },
    { num: "02", title: "Agentic AI",             body: "AI agents built inside your tenant using Copilot Studio  knowledge assistants, HR support and policy guidance agents.",     accent: "hsl(0,48%,38%)" },
    { num: "03", title: "SharePoint Automations", body: "Document workflows, metadata automation, approvals and knowledge hubs.",                                                      accent: "hsl(16,42%,36%)" },
    { num: "04", title: "Onboarding Automations", body: "End-to-end onboarding journeys including access provisioning, learning paths and manager check-ins.",                        accent: "hsl(32,40%,34%)" },
  ];

  return (
    <section id="section-automation" className="sv-pad" style={{ background: C.warm }}>
      <div className="aurion-container">
        <SectionHeader num="04" label="Automation Solutions"
          title="Remove manual work. Free your teams."
          sub="We design and build automations that remove repetitive tasks and let your people focus on what actually matters."
        />
        <div className="sv-cards" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          {cards.map((c, i) => <ServiceCard key={c.num} {...c} delay={i * 0.09} />)}
        </div>
        <div ref={ctaRef} style={{ opacity: 0 }}>
          <ShimmerBtn to="/contact">Explore automation opportunities for your organisation</ShimmerBtn>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. ADVISORY
// ══════════════════════════════════════════════════════════════════════════════
function AdvisorySection() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  useReveal(leftRef  as React.RefObject<HTMLElement>);
  useReveal(rightRef as React.RefObject<HTMLElement>, { delay: 0.14 });

  return (
    <section id="section-advisory" className="sv-pad" style={{ background: C.dark, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", bottom: "-20%", left: "50%", transform: "translateX(-50%)", width: "70vw", height: "55vh", background: "radial-gradient(ellipse, hsla(38,45%,55%,0.07) 0%, transparent 65%)", filter: "blur(55px)", pointerEvents: "none" }} />
      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <SectionHeader num="05" label="Advisory & Partnership"
          title="Build an AI-ready culture with governance that holds."
          sub="We work with leadership teams on readiness assessments, adoption strategy, governance frameworks and ongoing advisory."
          light
        />
        <div className="sv-2col">
          <div ref={leftRef} style={{ opacity: 0 }}>
            <div style={{ background: "hsl(15,18%,16%)", border: "1px solid rgba(245,238,228,0.09)", borderRadius: "4px", padding: "clamp(1.5rem, 3vw, 2.25rem)" }}>
              {["Readiness assessments","Adoption strategy design","Governance frameworks","Ongoing advisory support"].map((item, i, arr) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.9rem 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(245,238,228,0.07)" : "none" }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: C.primary, flexShrink: 0 }} />
                  <span className="font-body" style={{ fontSize: "0.875rem", color: "rgba(245,238,228,0.6)" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div ref={rightRef} style={{ opacity: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem" }}>
            <p className="font-body" style={{ fontSize: "1.02rem", color: "rgba(245,238,228,0.55)", lineHeight: 1.82 }}>
              Leadership doesn't need more tools  it needs a clear strategy for how AI fits into the organisation, communicated in a way that builds rather than erodes trust.
            </p>
            <ShimmerBtn to="/contact" light>Book a leadership consultation</ShimmerBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PULL QUOTE — matches CaseStudies PullQuote exactly
// ══════════════════════════════════════════════════════════════════════════════
function PullQuote() {
  const ref     = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(textRef.current, { opacity: 0, x: -28 });
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top 85%", once: true, invalidateOnRefresh: true };
      gsap.to(lineRef.current, { scaleY: 1, duration: 0.65, ease: "power3.out", scrollTrigger: st });
      gsap.to(textRef.current, { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.2, scrollTrigger: st });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{ background: C.warm, padding: "clamp(48px, 8vw, 88px) 0" }}>
      <div className="aurion-container max-w-4xl">
        <div style={{ display: "flex", gap: "2.25rem", alignItems: "flex-start" }}>
          <div ref={lineRef} style={{ width: "4px", minHeight: "88px", flexShrink: 0, borderRadius: "2px", background: `linear-gradient(to bottom, ${C.gold}, ${C.primary}55)` }} />
          <p ref={textRef} className="sv-pull font-heading font-medium" style={{
            lineHeight: 1.52, color: C.fg, opacity: 0, letterSpacing: "-0.012em",
          }}>
            "AI adoption only works when people feel supported, understood and set up for success — not pressured into change they don't yet understand."
          </p>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DARK METRICS BAR — matches CaseStudies MetricsBar
// ══════════════════════════════════════════════════════════════════════════════
function MetricsBar() {
  const ref     = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".sv-mi");
    gsap.set(items, { opacity: 0, y: 20 });
    gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });
    const ctx = gsap.context(() => {
      const st = { trigger: el, start: "top 88%", once: true, invalidateOnRefresh: true };
      gsap.to(ruleRef.current, { scaleX: 1, duration: 1.0, ease: "power2.inOut", scrollTrigger: st });
      gsap.to(items, { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: st, delay: 0.2 });
    }, el);
    return () => ctx.revert();
  }, []);

  const metrics = [
    { value: 4,   suffix: "",  label: "Training pathways"     },
    { value: 94,  suffix: "%", label: "Avg. satisfaction"     },
    { value: 12,  suffix: "+", label: "Engagements delivered" },
    { value: 100, suffix: "%", label: "Tailored delivery"     },
  ];

  return (
    <div style={{ background: C.dark, padding: "clamp(48px, 7vw, 80px) 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(hsla(38,45%,55%,0.03) 1px, transparent 1px), linear-gradient(90deg, hsla(38,45%,55%,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "360px", height: "360px", background: `radial-gradient(circle at top right, hsla(38,45%,55%,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative", height: "1px", marginBottom: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(245,238,228,0.07)" }} />
          <div ref={ruleRef} style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.gold}, ${C.primary}70, transparent)` }} />
        </div>
        <div ref={ref} className="sv-metrics">
          {metrics.map((m, i) => (
            <div key={i} className="sv-mi" style={{ opacity: 0 }}>
              <span className="font-heading font-bold block" style={{ fontSize: "clamp(2rem, 4vw, 3.8rem)", color: C.offW, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
                <CountUp value={m.value} suffix={m.suffix} />
              </span>
              <span className="font-body" style={{ fontSize: "0.72rem", color: C.offM, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CLOSING CTA — mirrors CaseStudies BottomCta
// ══════════════════════════════════════════════════════════════════════════════
function ClosingCta() {
  const ref    = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".sv-ci");
    gsap.set(items, { opacity: 0, y: 28 });
    const ctx = gsap.context(() => {
      gsap.to(items, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true, invalidateOnRefresh: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.set(bar, { scaleY: 0, transformOrigin: "top center", immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(bar, { scaleY: 1, duration: 0.72, ease: "power2.inOut", scrollTrigger: { trigger: bar, start: "top 88%", once: true, invalidateOnRefresh: true } });
    }, bar);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sv-pad" style={{ background: C.bg }}>
      <div className="aurion-container">
        <div ref={ref}>
          {/* Two-col CTA */}
          <style>{`
            .sv-cta-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: clamp(1.5rem, 5vw, 4rem) clamp(2rem, 8vw, 6rem);
              align-items: start;
            }
            @media (max-width: 768px) { .sv-cta-grid { grid-template-columns: 1fr; } }
            .sv-cta-right { padding-top: 0; }
            @media (min-width: 768px) { .sv-cta-right { padding-top: 3.5rem; } }
          `}</style>
          <div className="sv-cta-grid">
            <div>
              <span className="sv-ci aurion-label block mb-5" style={{ opacity: 0, color: C.gold }}>Work With Aurion</span>
              <h2 className="sv-ci font-heading font-semibold" style={{ opacity: 0, fontSize: "clamp(1.5rem, 3vw, 2.8rem)", color: C.fg, lineHeight: 1.22, letterSpacing: "-0.022em" }}>
                Ready to build confident, responsible AI adoption?
              </h2>
            </div>
            <div className="sv-cta-right">
              <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", marginBottom: "clamp(2rem, 4vw, 3rem)", flexWrap: "wrap" }}>
                <div ref={barRef} style={{ width: "3px", minHeight: "110px", flexShrink: 0, background: `linear-gradient(to bottom, ${C.primary}, ${C.gold}55)`, borderRadius: "2px" }} />
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <span className="sv-ci font-body font-semibold uppercase block mb-3" style={{ opacity: 0, fontSize: "10px", letterSpacing: "0.22em", color: C.primary }}>Founder Note</span>
                  <p className="sv-ci font-heading font-medium" style={{ opacity: 0, fontSize: "clamp(1rem, 1.55vw, 1.25rem)", color: C.fg, lineHeight: 1.6, fontStyle: "italic", marginBottom: "0.75rem" }}>
                    "My work blends behavioural psychology with practical enablement so your teams can adopt AI with confidence, not pressure."
                  </p>
                  <p className="sv-ci font-body font-semibold" style={{ opacity: 0, fontSize: "0.84rem", color: C.fg }}>Founder, Aurion</p>
                  <p className="sv-ci font-body" style={{ opacity: 0, fontSize: "0.76rem", color: C.muted, marginTop: "2px" }}>AI Adoption &amp; Enablement Consultant</p>
                </div>
              </div>
              <p className="sv-ci font-body mb-8" style={{ opacity: 0, fontSize: "0.95rem", color: C.muted, lineHeight: 1.82 }}>
                Every engagement starts with a short conversation  no pitch deck, no agenda. Just a real discussion about where you are and where you want to be.
              </p>
              <Link to="/contact"
                className="sv-ci group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden"
                style={{ opacity: 0, padding: "0.9rem 2rem", fontSize: "0.875rem", background: C.primary, color: "hsl(35,30%,96%)", textDecoration: "none", transition: "opacity 0.18s ease" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.87"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                <span aria-hidden className="absolute inset-0 bg-white/[0.08] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Start a conversation</span>
                <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE
// ══════════════════════════════════════════════════════════════════════════════
const Services = () => {
  usePageMount();
  return (
    <>
      <style>{css}</style>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <CopilotSection />
        <ClaudeSection />
        <SystemAdoptionSection />
        <AutomationSection />
        <AdvisorySection />
        <PullQuote />
        <MetricsBar />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
};

export default Services;