import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import aboutTeam    from "@/assets/about-team.webp";
import founderPhoto from "@/assets/dp.webp";

gsap.registerPlugin(ScrollTrigger);

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  bg:       "hsl(35, 30%, 96%)",
  bgWarm:   "hsl(30, 20%, 92%)",
  bgCard:   "hsl(35, 30%, 98%)",
  bgDark:   "hsl(15, 20%, 12%)",
  primary:  "hsl(0, 55%, 32%)",
  gold:     "hsl(38, 45%, 55%)",
  fg:       "hsl(15, 20%, 15%)",
  fgMid:    "hsl(15, 12%, 30%)",
  fgMuted:  "hsl(15, 10%, 45%)",
  border:   "hsl(30, 15%, 85%)",
  offWhite: "rgba(245, 238, 228, 1)",
  offDim:   "rgba(245, 238, 228, 0.56)",
  offMute:  "rgba(245, 238, 228, 0.32)",
  offRule:  "rgba(245, 238, 228, 0.13)",
  dkGold:   "hsl(38, 45%, 62%)",
};

// ─── Global responsive CSS ────────────────────────────────────────────────────
const css = `
  /* ── Hero ── */
  .ab-hero-grid {
    display: grid;
    grid-template-columns: 7fr 5fr;
    gap: clamp(2.5rem, 5vw, 4rem);
    align-items: center;
  }
  @media (max-width: 900px) {
    .ab-hero-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  /* ── Founder story ── */
  .ab-story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }
  @media (max-width: 768px) {
    .ab-story-grid { grid-template-columns: 1fr; gap: 2rem; }
  }

  /* ── Values 3-col ── */
  .ab-values-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(0.85rem, 1.5vw, 1.25rem);
  }
  @media (max-width: 900px) {
    .ab-values-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .ab-values-grid { grid-template-columns: 1fr; }
  }

  /* ── Contract 3-col ── */
  .ab-contract-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(0.85rem, 1.5vw, 1.25rem);
  }
  @media (max-width: 860px) {
    .ab-contract-grid { grid-template-columns: 1fr; }
  }

  /* ── Who 2-col ── */
  .ab-who-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: start;
  }
  @media (max-width: 768px) {
    .ab-who-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  }

  /* ── Founder section 2-col ── */
  .ab-founder-grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: clamp(2.5rem, 6vw, 5.5rem);
    align-items: center;
  }
  @media (max-width: 900px) {
    .ab-founder-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }

  /* ── Section padding ── */
  .ab-pad { padding: clamp(64px, 9vw, 96px) 0; }
  .ab-pad-sm { padding: clamp(48px, 7vw, 72px) 0; }

  /* ── IrisImage panel ── */
  .ab-iris-panel { height: clamp(320px, 40vw, 520px); }

  /* ── Founder photo panel ── */
  .ab-founder-photo { height: clamp(380px, 52vw, 580px); }

  /* ── Approach row ── */
  .ab-approach-row {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 2rem;
    align-items: start;
    padding: 2.5rem 0;
  }
  @media (max-width: 480px) {
    .ab-approach-row {
      grid-template-columns: 48px 1fr;
      gap: 1rem;
    }
  }

  /* ── Who callout inline ── */
  .ab-callout-inline {
    display: inline-flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  /* ── Credential chips wrap ── */
  .ab-creds {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  /* ── Founder badge position ── */
  .ab-founder-badge {
    position: absolute;
    bottom: 1.75rem;
    right: -0.75rem;
  }
  @media (max-width: 900px) {
    .ab-founder-badge { right: 0.75rem; }
  }
`;

// ─── usePageMount ─────────────────────────────────────────────────────────────
function usePageMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      clearTimeout(t);
    };
  }, []);
}

// ─── useReveal ────────────────────────────────────────────────────────────────
function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts?: { y?: number; x?: number; delay?: number; duration?: number; start?: string }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { y = 24, x = 0, delay = 0, duration = 0.8, start = "top 88%" } = opts ?? {};
    gsap.set(el, { opacity: 0, y, x, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, y: 0, x: 0, duration, ease: "power2.out", delay, force3D: true,
        scrollTrigger: {
          trigger: el, start: () => start,
          toggleActions: "play none none none",
          once: true, invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── useLineDraw ──────────────────────────────────────────────────────────────
function useLineDraw(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center", immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1, duration: 1.0, ease: "power2.inOut", delay,
        scrollTrigger: {
          trigger: el, start: () => "top 91%",
          once: true, invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── use3DTilt ────────────────────────────────────────────────────────────────
function use3DTilt(
  cardRef: React.RefObject<HTMLDivElement | null>,
  glowRef: React.RefObject<HTMLDivElement | null>,
  opts?: { accentMid?: string; borderHover?: string }
) {
  const rafRef = useRef<number | null>(null);
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const {
      accentMid   = "hsla(0,55%,32%,0.07)",
      borderHover = "hsla(0,55%,32%,0.25)",
    } = opts ?? {};
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let tGX = 50, tGY = 50, cGX = 50, cGY = 50;

    const tick = () => {
      if (!hovRef.current) { rafRef.current = null; return; }
      cRX += (tRX - cRX) * 0.09; cRY += (tRY - cRY) * 0.09;
      cGX += (tGX - cGX) * 0.07; cGY += (tGY - cGY) * 0.07;
      card.style.transform = `perspective(1100px) rotateX(${cRX}deg) rotateY(${cRY}deg) translateY(-4px)`;
      glow.style.background = `radial-gradient(circle at ${cGX}% ${cGY}%, ${accentMid} 0%, transparent 60%)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    const enter = (e: MouseEvent) => {
      if (debRef.current) clearTimeout(debRef.current);
      hovRef.current = true;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 9;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 12;
      tGX = ((e.clientX - r.left) / r.width) * 100;
      tGY = ((e.clientY - r.top) / r.height) * 100;
      card.style.borderColor = borderHover;
      card.style.boxShadow   = "0 14px 36px -6px rgba(0,0,0,0.11)";
    };
    const leave = () => {
      debRef.current = setTimeout(() => {
        hovRef.current = false; tRX = 0; tRY = 0; tGX = 50; tGY = 50;
        gsap.to(card, {
          rotateX: 0, rotateY: 0, y: 0,
          boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)",
          duration: 0.6, ease: "power2.out", overwrite: true,
        });
        card.style.borderColor = T.border;
        gsap.to(glow, {
          opacity: 0, duration: 0.35, overwrite: true,
          onComplete: () => { glow.style.opacity = "1"; glow.style.background = "none"; },
        });
      }, 40);
    };
    const move = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 9;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 12;
      tGX = ((e.clientX - r.left) / r.width) * 100;
      tGY = ((e.clientY - r.top) / r.height) * 100;
    };
    card.addEventListener("mouseenter", enter, { passive: true });
    card.addEventListener("mouseleave", leave, { passive: true });
    card.addEventListener("mousemove",  move,  { passive: true });
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
      card.removeEventListener("mousemove",  move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debRef.current) clearTimeout(debRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── SLabel ───────────────────────────────────────────────────────────────────
const SLabel = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <span
    className="font-body font-semibold uppercase block mb-4"
    style={{ fontSize: "11px", letterSpacing: "0.22em", color: light ? T.dkGold : T.primary }}
  >
    {children}
  </span>
);

// ─── ReadingBar ───────────────────────────────────────────────────────────────
const ReadingBar = () => {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${Math.min(window.scrollY / total, 1)})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", zIndex: 999, pointerEvents: "none",
      background: T.border,
    }}>
      <div
        ref={barRef}
        style={{
          height: "100%", background: T.primary,
          transform: "scaleX(0)", transformOrigin: "left center",
          willChange: "transform",
        }}
      />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// IRIS IMAGE — hero animation (unchanged)
// ═══════════════════════════════════════════════════════════════════════════════
function IrisImage({ src, delay = 0.8 }: { src: string; delay?: number }) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLImageElement>(null);
  const svgRef    = useRef<SVGRectElement>(null);
  const badgeRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const img   = imgRef.current;
    const rect  = svgRef.current;
    const badge = badgeRef.current;
    if (!wrap || !img || !rect) return;

    const perimeter = 2 * (440 + 520);
    gsap.set(wrap,  { scale: 0, borderRadius: "50%", force3D: true, immediateRender: true });
    gsap.set(img,   { scale: 1.15, force3D: true, immediateRender: true });
    gsap.set(rect,  { strokeDasharray: perimeter, strokeDashoffset: perimeter });
    if (badge) gsap.set(badge, { opacity: 0, scale: 0.88, y: 12, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });
      tl.to(wrap,  { scale: 1, borderRadius: "12px", duration: 0.95, ease: "expo.out", force3D: true });
      tl.to(img,   { scale: 1, duration: 1.1, ease: "power2.out", force3D: true }, "<+0.05");
      tl.to(rect,  { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, "<+0.4");
      if (badge) {
        tl.to(badge, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.5)", force3D: true }, ">-0.2");
      }
    }, wrap);

    return () => ctx.revert();
  }, [delay]);

  useEffect(() => {
    const img   = imgRef.current;
    const panel = panelRef.current;
    if (!img || !panel) return;
    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: -55, ease: "none",
        scrollTrigger: {
          trigger: panel, start: "top bottom", end: "bottom top",
          scrub: 1.3, invalidateOnRefresh: true,
        },
      });
    }, panel);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    let rafId: number;
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    const tick = () => {
      cRX += (tRX - cRX) * 0.07; cRY += (tRY - cRY) * 0.07;
      panel.style.transform = `perspective(1200px) rotateX(${cRX}deg) rotateY(${cRY}deg)`;
      rafId = requestAnimationFrame(tick);
    };
    const enter = (e: MouseEvent) => {
      const r = panel.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 7;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 9;
    };
    const move = (e: MouseEvent) => {
      const r = panel.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 7;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 9;
    };
    const leave = () => {
      tRX = 0; tRY = 0;
      gsap.to(panel, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out", overwrite: true });
    };
    rafId = requestAnimationFrame(tick);
    panel.addEventListener("mouseenter", enter, { passive: true });
    panel.addEventListener("mousemove",  move,  { passive: true });
    panel.addEventListener("mouseleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      panel.removeEventListener("mouseenter", enter);
      panel.removeEventListener("mousemove",  move);
      panel.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={panelRef} style={{ position: "relative", willChange: "transform" }}>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute", top: "-6px", left: "-6px",
          width: "calc(100% + 12px)", height: "calc(100% + 12px)",
          pointerEvents: "none", zIndex: 3, overflow: "visible",
        }}
        viewBox="0 0 452 532"
        preserveAspectRatio="none"
      >
        <rect
          ref={svgRef}
          x="3" y="3" width="446" height="526" rx="14"
          fill="none" stroke={T.primary} strokeWidth="1.5"
          strokeDasharray="1920" strokeDashoffset="1920" opacity="0.5"
        />
      </svg>

      <div
        ref={wrapRef}
        className="ab-iris-panel"
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "50%",
          position: "relative",
          willChange: "transform, border-radius",
          transformOrigin: "center center",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Team collaborating"
          style={{
            width: "100%", height: "115%",
            objectFit: "cover", objectPosition: "center 15%",
            display: "block", transformOrigin: "center center",
            willChange: "transform",
          }}
        />
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(150deg, hsla(0,55%,32%,0.09) 0%, hsla(38,45%,55%,0.05) 45%, transparent 70%)`,
          mixBlendMode: "multiply", pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: `linear-gradient(to top, ${T.bg} 0%, transparent 100%)`,
          pointerEvents: "none",
        }} />
      </div>

      <div ref={badgeRef} style={{
        position: "absolute", bottom: "2rem", left: "-1.5rem",
        opacity: 0, zIndex: 10,
      }}>
        <div style={{
          background: T.bgCard, border: `1px solid ${T.border}`,
          borderRadius: "4px", padding: "1rem 1.4rem",
          boxShadow: "0 10px 32px -6px rgba(0,0,0,0.15)", minWidth: "196px",
        }}>
          <div style={{ height: "2px", width: "28px", background: T.primary, borderRadius: "1px", marginBottom: "0.7rem" }} />
          <p className="font-heading font-semibold" style={{ fontSize: "0.98rem", color: T.fg, lineHeight: 1.2, marginBottom: "0.2rem" }}>Human first</p>
          <p className="font-body" style={{ fontSize: "0.74rem", color: T.fgMuted, letterSpacing: "0.05em" }}>Behavioural approach to AI adoption</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO
// ═══════════════════════════════════════════════════════════════════════════════
const HeroSection = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sub  = subRef.current;
    const cta  = ctaRef.current;
    if (!wrap || !sub || !cta) return;

    const h1Els = Array.from(wrap.querySelectorAll<HTMLElement>(".hero-h1"));
    h1Els.forEach(el => {
      const words = el.innerText.split(" ");
      el.innerHTML = words
        .map(w => `<span class="hw" style="display:inline-block;margin-right:0.25em">${w}</span>`)
        .join("");
    });
    const words = Array.from(wrap.querySelectorAll<HTMLElement>(".hw"));
    gsap.set(words,      { opacity: 0, y: 28, force3D: true, immediateRender: true });
    gsap.set([sub, cta], { opacity: 0, y: 16, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(wrap.querySelector(".hero-label"),
        { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" })
        .to(words, { opacity: 1, y: 0, stagger: 0.04, duration: 0.65, ease: "power3.out", force3D: true }, "-=0.2")
        .to(sub,   { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", force3D: true }, "-=0.2")
        .to(cta,   { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", force3D: true }, "-=0.35");
    }, wrap);
    return () => ctx.revert();
  }, []);

  useLineDraw(lineRef as React.RefObject<HTMLElement>);

  return (
    <section style={{
      background: T.bg,
      padding: "clamp(72px, 10vw, 104px) 0 clamp(48px, 7vw, 84px)",
      position: "relative", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "52vw",
        background: `radial-gradient(ellipse at top right, hsla(0,55%,32%,0.055) 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${T.border} 1px, transparent 1px)`,
        backgroundSize: "28px 28px", opacity: 0.45,
      }} />

      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="ab-hero-grid">
          <div ref={wrapRef}>
            <span className="hero-label font-body font-semibold uppercase block mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.22em", color: T.primary, opacity: 0 }}>
              About Aurion
            </span>
            <h1 className="hero-h1 aurion-heading-xl leading-tight" style={{ margin: "0 0 0.1em" }}>
              Aurion began with a simple question
            </h1>
            <h1 className="hero-h1 aurion-heading-xl leading-tight" style={{ margin: "0 0 1.8rem" }}>
              that kept showing up everywhere.
            </h1>
            <p ref={subRef} className="font-body" style={{
              opacity: 0, fontSize: "clamp(1rem, 1.45vw, 1.15rem)",
              color: T.fgMuted, lineHeight: 1.78, maxWidth: "460px",
              marginBottom: "2.5rem", fontStyle: "italic",
            }}>
              A human, behavioural approach to responsible AI adoption.
            </p>
            <div ref={ctaRef} style={{ opacity: 0, marginBottom: "2.5rem" }}>
              <Link to="/contact"
                className="group inline-flex items-center gap-3 font-body font-medium"
                style={{ fontSize: "0.9rem", color: T.primary, textDecoration: "none", letterSpacing: "0.04em" }}
                onMouseEnter={e => { (e.currentTarget.querySelector(".arr-line") as HTMLElement).style.width = "40px"; }}
                onMouseLeave={e => { (e.currentTarget.querySelector(".arr-line") as HTMLElement).style.width = "24px"; }}
              >
                <span className="arr-line" style={{ display: "inline-block", height: "1px", width: "24px", background: T.primary, transition: "width 0.25s ease" }} />
                Book a clarity call
              </Link>
            </div>
            <div ref={lineRef} style={{ height: "2px", width: "56px", background: T.gold }} />
          </div>

          <IrisImage src={aboutTeam} delay={0.75} />
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. MARQUEE
// ═══════════════════════════════════════════════════════════════════════════════
const MarqueeStrip = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { x: "-50%", duration: 32, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);
  const words = ["People-First AI","·","Calm Adoption","·","Practical Workflows","·","Human Judgement","·","Responsible Use","·","Behavioural Clarity","·"];
  return (
    <div style={{
      overflow: "hidden", padding: "12px 0",
      borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`,
      background: T.bgWarm,
    }}>
      <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
        {[...words, ...words].map((w, i) => (
          <span key={i} className="font-heading font-medium px-6"
            style={{ fontSize: "0.78rem", letterSpacing: "0.08em", color: w === "·" ? T.gold : T.fgMuted }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. FOUNDER STORY
// ═══════════════════════════════════════════════════════════════════════════════
const FounderStory = () => {
  const headerRef   = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);
  const quoteBarRef = useRef<HTMLDivElement>(null);

  useReveal(headerRef  as React.RefObject<HTMLElement>);
  useLineDraw(dividerRef as React.RefObject<HTMLElement>, 0.08);
  useReveal(leftRef    as React.RefObject<HTMLElement>, { y: 24, delay: 0.1 });

  useEffect(() => {
    const qt = quoteRef.current;
    const qb = quoteBarRef.current;
    if (!qt || !qb) return;
    gsap.set(qt, { opacity: 0, x: 28, force3D: true, immediateRender: true });
    gsap.set(qb, { scaleY: 0, transformOrigin: "top center", immediateRender: true });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: qt, start: () => "top 86%", once: true, invalidateOnRefresh: true },
      });
      tl.to(qb, { scaleY: 1, duration: 0.55, ease: "power2.inOut", delay: 0.1 })
        .to(qt, { opacity: 1, x: 0, duration: 0.75, ease: "power2.out", force3D: true }, "-=0.3");
    }, qt);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ab-pad" style={{ background: T.bg }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "1.75rem" }}>
          <SLabel>The Origin</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ maxWidth: "540px", margin: 0 }}>
            Aurion was born out of a simple, uncomfortable observation.
          </h2>
        </div>
        <div ref={dividerRef} className="aurion-divider" style={{ marginBottom: "3rem" }} />
        <div className="ab-story-grid">
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="font-body mb-5" style={{ fontSize: "1.05rem", color: T.fgMid, lineHeight: 1.82 }}>
              Teams wanted to know what good AI use looked like in their real work. Managers wanted to know how to guide their teams without feeling exposed. Leaders wanted to know what was actually happening on the ground. Everyone was experimenting quietly, but no one was talking about it openly.
            </p>
            <p className="font-body mb-5" style={{ fontSize: "1.05rem", color: T.fgMid, lineHeight: 1.82 }}>
              I realised the real challenge was not technology.
            </p>
            <p className="font-heading font-medium" style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: T.fg, lineHeight: 1.65, fontStyle: "italic" }}>
              It was the silence around it.
            </p>
          </div>
          <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
            <div ref={quoteBarRef} style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: "3px", background: T.primary, borderRadius: "2px",
            }} />
            <div ref={quoteRef} style={{ opacity: 0 }}>
              <p className="font-heading font-medium leading-relaxed" style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: T.fg,
                lineHeight: 1.5, marginBottom: "1.1rem",
              }}>
                "People were not asking for more AI tools. They were asking for clarity."
              </p>
              <span className="font-body font-semibold uppercase block" style={{
                fontSize: "10px", letterSpacing: "0.22em", color: T.fgMuted,
              }}>
                Founding insight
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. VALUES CARDS
// ═══════════════════════════════════════════════════════════════════════════════
const valuesData = [
  { word: "Clarity",   body: "Helping organisations slow down just enough to understand what is already happening, and then shape it with intention.", accent: T.primary, accentBg: "hsla(0,55%,32%,0.05)", accentMid: "hsla(0,55%,32%,0.09)" },
  { word: "Judgement", body: "Grounded in real workflows, real decisions, and real human judgement. Not idealised models or abstract strategies.",     accent: T.gold,    accentBg: "hsla(38,45%,55%,0.07)", accentMid: "hsla(38,45%,55%,0.13)" },
  { word: "Ease",      body: "The goal is to make work feel lighter, not louder. AI introduced carefully, with confidence and without anxiety.",       accent: "hsl(16,42%,36%)", accentBg: "hsla(16,42%,36%,0.05)", accentMid: "hsla(16,42%,36%,0.1)" },
];

function ValueCard({ v, idx }: { v: typeof valuesData[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, glowRef, { accentMid: v.accentMid, borderHover: v.accent });
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 32, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: idx * 0.1, force3D: true, scrollTrigger: { trigger: el, start: () => "top 89%", once: true, invalidateOnRefresh: true } });
    }, el);
    return () => ctx.revert();
  }, [idx]);
  return (
    <div ref={cardRef} style={{
      opacity: 0, position: "relative",
      background: T.bgCard, border: `1px solid ${T.border}`,
      borderRadius: "4px", padding: "clamp(1.5rem, 3vw, 2.25rem) clamp(1.25rem, 2.5vw, 2rem)",
      boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)",
      willChange: "transform, box-shadow",
      transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      overflow: "hidden",
    }}>
      <div ref={glowRef} style={{ position: "absolute", inset: 0, borderRadius: "4px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: v.accent, borderRadius: "4px 4px 0 0" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <span className="font-body font-semibold uppercase" style={{
          display: "inline-block", fontSize: "9.5px", letterSpacing: "0.2em",
          color: v.accent, background: v.accentBg, border: `1px solid ${v.accentMid}`,
          borderRadius: "2px", padding: "0.22rem 0.7rem", marginBottom: "1.25rem",
        }}>{v.word}</span>
        <h3 className="font-heading font-semibold leading-tight mb-4" style={{
          fontSize: "clamp(1.15rem, 2vw, 1.5rem)", color: T.fg,
        }}>{v.word}</h3>
        <div style={{ height: "1px", background: T.border, marginBottom: "0.9rem" }} />
        <p className="font-body" style={{ fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.82 }}>{v.body}</p>
      </div>
    </div>
  );
}

const ValuesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef as React.RefObject<HTMLElement>);
  return (
    <section className="ab-pad" style={{ background: T.bgWarm }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "2.75rem" }}>
          <SLabel>What Aurion Stands For</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ maxWidth: "520px", margin: 0 }}>
            Aurion was created to bring ease into that moment.
          </h2>
        </div>
        <div className="ab-values-grid">
          {valuesData.map((v, i) => <ValueCard key={v.word} v={v} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. APPROACH
// ═══════════════════════════════════════════════════════════════════════════════
const approachData = [
  { num: "01", label: "Understanding real work",   body: "How teams actually work. Where effort is being duplicated. Where uncertainty is creeping in. Where people are hesitating even though they want to move forward." },
  { num: "02", label: "Embedding into workflows",  body: "When AI enters the conversation, it is always grounded in real workflows, real decisions, and real human judgement. Introduced carefully and documented clearly." },
  { num: "03", label: "Building confidence",       body: "When people understand what is safe, what is valued, and what will change, they stop experimenting in the shadows and start using AI with confidence." },
];

function ApproachRow({ item, idx }: { item: typeof approachData[0]; idx: number }) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useReveal(rowRef  as React.RefObject<HTMLElement>, { x: idx % 2 === 0 ? -20 : 20, y: 0, delay: idx * 0.08, duration: 0.7 });
  useLineDraw(lineRef as React.RefObject<HTMLElement>, idx * 0.06);
  return (
    <div>
      <div ref={lineRef} style={{ height: "1px", background: T.border }} />
      <div ref={rowRef} className="ab-approach-row" style={{ opacity: 0 }}>
        <span className="font-heading font-bold leading-none" style={{
          fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: T.primary,
          opacity: 0.14, letterSpacing: "-0.03em", userSelect: "none",
        }}>{item.num}</span>
        <div>
          <h3 className="font-heading font-semibold mb-3" style={{
            fontSize: "clamp(1rem, 1.55vw, 1.18rem)", color: T.fg, lineHeight: 1.3,
          }}>{item.label}</h3>
          <p className="font-body" style={{ fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.82, margin: 0 }}>{item.body}</p>
        </div>
      </div>
    </div>
  );
}

const ApproachSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef as React.RefObject<HTMLElement>);
  return (
    <section className="ab-pad" style={{ background: T.bg }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, maxWidth: "540px", marginBottom: "2.5rem" }}>
          <SLabel>The Approach</SLabel>
          <h2 className="aurion-heading-lg leading-tight mb-4" style={{ margin: "0 0 0.9rem" }}>
            My work sits in the space between people and systems.
          </h2>
          <p className="font-body" style={{ fontSize: "1.05rem", color: T.fgMuted, lineHeight: 1.75 }}>
            It starts with listening. Only after that do we talk about AI.
          </p>
        </div>
        <div style={{ maxWidth: "700px" }}>
          {approachData.map((item, i) => <ApproachRow key={item.num} item={item} idx={i} />)}
          <div style={{ height: "1px", background: T.border }} />
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. FOUNDER SECTION — dedicated showcase
//
// Animation: "Curtain Wipe Reveal"
//
// The portrait begins fully hidden behind a warm-coloured curtain div.
// On scroll trigger, the curtain's transformOrigin is anchored to the RIGHT,
// then scaleX animates 1 → 0. This means the left edge of the curtain sweeps
// rightward, progressively revealing the photo from LEFT to RIGHT — like a
// cinema screen opening or a stage curtain pulling aside.
//
// Simultaneously:
//   • The image breathes in from scale 1.1 → 1.0
//   • A warm colour grade fades onto the photo post-reveal
//   • A floating name-plate badge slides in from the right edge
//
// Content side:
//   • Header reveals upward via useReveal
//   • Divider line draws left → right via useLineDraw
//   • Two bio paragraphs stagger in with slight delay
//   • Intention quote slides in from the right with a left-border treatment
//   • Credential chips appear last as a flex row
// ═══════════════════════════════════════════════════════════════════════════════
function FounderSection() {
  // Photo refs
  const photoRef   = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const gradeRef   = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  // Content refs
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef   = useRef<HTMLDivElement>(null);
  const para1Ref  = useRef<HTMLParagraphElement>(null);
  const para2Ref  = useRef<HTMLParagraphElement>(null);
  const quoteRef  = useRef<HTMLDivElement>(null);
  const credsRef  = useRef<HTMLDivElement>(null);

  // ── Curtain wipe ────────────────────────────────────────────────────────────
  useEffect(() => {
    const photo   = photoRef.current;
    const curtain = curtainRef.current;
    const img     = imgRef.current;
    const badge   = badgeRef.current;
    const grade   = gradeRef.current;
    if (!photo || !curtain || !img) return;

    // Initial states
    // Curtain starts fully covering the image
    gsap.set(curtain, {
      scaleX: 1,
      transformOrigin: "right center", // RIGHT anchor → left edge sweeps right on reveal
      immediateRender: true,
    });
    gsap.set(img,   { scale: 1.1, force3D: true, immediateRender: true });
    if (grade) gsap.set(grade, { opacity: 0, immediateRender: true });
    if (badge) gsap.set(badge, { opacity: 0, x: 20, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: photo,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Curtain wipes away LEFT to RIGHT
      tl.to(curtain, {
        scaleX: 0,
        duration: 1.0,
        ease: "power3.inOut",
      });

      // Phase 2: Image breathes into focus
      tl.to(img, {
        scale: 1,
        duration: 1.15,
        ease: "power2.out",
        force3D: true,
      }, "<+0.06");

      // Phase 3: Warm grade settles
      if (grade) {
        tl.to(grade, { opacity: 1, duration: 0.7, ease: "power2.out" }, ">-0.5");
      }

      // Phase 4: Badge slides in from right
      if (badge) {
        tl.to(badge, {
          opacity: 1, x: 0,
          duration: 0.55, ease: "back.out(1.5)", force3D: true,
        }, ">-0.3");
      }
    }, photo);

    return () => ctx.revert();
  }, []);

  // ── Content reveals (scroll-triggered via hooks) ─────────────────────────
  useReveal(headerRef as React.RefObject<HTMLElement>, { y: 22 });
  useLineDraw(lineRef as React.RefObject<HTMLElement>, 0.12);
  useReveal(para1Ref  as React.RefObject<HTMLElement>, { y: 18, delay: 0.1 });
  useReveal(para2Ref  as React.RefObject<HTMLElement>, { y: 18, delay: 0.18 });
  useReveal(quoteRef  as React.RefObject<HTMLElement>, { x: 28, y: 0, delay: 0.26 });
  useReveal(credsRef  as React.RefObject<HTMLElement>, { y: 14, delay: 0.34 });

  const creds = [
    "Behavioural Psychology",
    "Organisational Learning",
    "Human-Centred AI",
  ];

  return (
    <section
      className="ab-pad"
      style={{ background: T.bg, position: "relative", overflow: "hidden" }}
    >
      {/* Warm radial atmosphere — top right */}
      <div aria-hidden style={{
        position: "absolute", top: 0, right: 0,
        width: "50vw", height: "100%",
        background: `radial-gradient(ellipse at top right, hsla(38,45%,55%,0.065) 0%, transparent 62%)`,
        pointerEvents: "none",
      }} />

      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Section label row */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1.5rem",
          marginBottom: "clamp(2.5rem, 4vw, 3.5rem)",
        }}>
          <SLabel>The Practitioner</SLabel>
          <div style={{ flex: 1, height: "1px", background: T.border, maxWidth: "220px" }} />
        </div>

        <div className="ab-founder-grid">

          {/* ── Left: Portrait photo ── */}
          <div ref={photoRef} style={{ position: "relative" }}>

            {/* Curtain overlay — scaleX 1→0 left-to-right on scroll */}
            <div
              ref={curtainRef}
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                background: T.bg, // matches page bg — seamless entry
                zIndex: 4,
                borderRadius: "5px",
                willChange: "transform",
              }}
            />

            {/* Shadow bloom beneath the card */}
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(ellipse at 50% 80%, hsla(0,55%,32%,0.2) 0%, transparent 68%)`,
              transform: "translateY(18px) scale(0.94)",
              filter: "blur(30px)",
              zIndex: 0, borderRadius: "8px", pointerEvents: "none",
            }} />

            {/* Image container */}
            <div style={{
              position: "relative", zIndex: 1,
              overflow: "hidden", borderRadius: "5px",
              boxShadow: "0 22px 60px -14px rgba(0,0,0,0.30)",
            }}>
              <img
                ref={imgRef}
                src={founderPhoto}
                alt="Founder of Aurion"
                className="ab-founder-photo"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center 12%",
                  display: "block",
                  transformOrigin: "center top",
                  willChange: "transform",
                }}
              />

              {/* Warm colour grade */}
              <div ref={gradeRef} aria-hidden style={{
                position: "absolute", inset: 0, opacity: 0,
                background: `linear-gradient(155deg, hsla(0,55%,32%,0.13) 0%, hsla(38,45%,55%,0.05) 48%, transparent 70%)`,
                mixBlendMode: "multiply", pointerEvents: "none",
              }} />

              {/* Bottom fade to page bg */}
              <div aria-hidden style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "32%",
                background: `linear-gradient(to top, ${T.bg} 0%, transparent 100%)`,
                pointerEvents: "none",
              }} />
            </div>

            {/* Floating name badge */}
            <div ref={badgeRef} className="ab-founder-badge" style={{ opacity: 0, zIndex: 10 }}>
              <div style={{
                background: T.bgCard,
                border: `1px solid ${T.border}`,
                borderRadius: "3px",
                padding: "0.9rem 1.35rem",
                boxShadow: "0 10px 28px -6px rgba(0,0,0,0.15)",
                minWidth: "178px",
              }}>
                <div style={{ height: "2px", width: "22px", background: T.primary, borderRadius: "1px", marginBottom: "0.6rem" }} />
                <p className="font-heading font-semibold" style={{ fontSize: "0.88rem", color: T.fg, lineHeight: 1.2, marginBottom: "0.2rem" }}>
                  Founder, Aurion
                </p>
                <p className="font-body" style={{ fontSize: "0.68rem", color: T.fgMuted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  AI Adoption &amp; Enablement
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>

            {/* Heading */}
            <div ref={headerRef} style={{ opacity: 0, marginBottom: "1.4rem" }}>
              <h2 className="aurion-heading-lg leading-tight" style={{ margin: 0 }}>
                Grounded in psychology.<br />
                <span style={{ color: T.primary }}>Built for practice.</span>
              </h2>
            </div>

            {/* Animated divider */}
            <div ref={lineRef} style={{
              height: "2px", maxWidth: "220px",
              background: `linear-gradient(90deg, ${T.primary}, ${T.gold}, transparent)`,
              opacity: 0.7, marginBottom: "1.75rem",
            }} />

            {/* Bio paras */}
            <p ref={para1Ref} className="font-body" style={{
              opacity: 0,
              fontSize: "clamp(0.92rem, 1.25vw, 1.02rem)",
              color: T.fgMid, lineHeight: 1.84, marginBottom: "1rem",
            }}>
              My background sits at the intersection of behavioural psychology, learning design, and organisational change. I have worked inside complex institutions and fast-moving teams — where real decisions happen under real pressure, not in workshops.
            </p>

            <p ref={para2Ref} className="font-body" style={{
              opacity: 0,
              fontSize: "clamp(0.92rem, 1.25vw, 1.02rem)",
              color: T.fgMid, lineHeight: 1.84, marginBottom: "1.75rem",
            }}>
              That experience is what Aurion is built on. Not frameworks borrowed from elsewhere — a direct understanding of how people actually behave when change arrives uninvited.
            </p>

            {/* Intention quote — bordered left */}
            <div ref={quoteRef} style={{
              opacity: 0,
              borderLeft: `3px solid ${T.primary}`,
              paddingLeft: "1.35rem",
              marginBottom: "2rem",
            }}>
              <p className="font-heading font-medium" style={{
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                color: T.fg, lineHeight: 1.65, fontStyle: "italic", marginBottom: "0.65rem",
              }}>
                "I built Aurion because organisations deserve AI adoption that feels like a natural evolution — not a forced march managed by people who have never worked inside one."
              </p>
              <span className="font-body font-semibold uppercase" style={{
                fontSize: "9.5px", letterSpacing: "0.2em", color: T.fgMuted,
              }}>
                The founding intention
              </span>
            </div>

            {/* Credential tags */}
            <div ref={credsRef} className="ab-creds" style={{ opacity: 0 }}>
              {creds.map((c) => (
                <span key={c} className="font-body font-semibold" style={{
                  fontSize: "0.72rem", letterSpacing: "0.13em",
                  textTransform: "uppercase", color: T.primary,
                  background: "hsla(0,55%,32%,0.06)",
                  border: `1px solid hsla(0,55%,32%,0.16)`,
                  borderRadius: "2px", padding: "0.35rem 0.9rem",
                  display: "inline-block",
                }}>{c}</span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. PSYCHOLOGICAL CONTRACT
// ═══════════════════════════════════════════════════════════════════════════════
const contractData = [
  { label: "Expectations", body: "What people believe AI will do and what it means for their role, their value, and their future at work." },
  { label: "Assumptions",  body: "The unspoken beliefs about safety, value, and change that nobody says out loud but everyone acts on." },
  { label: "Behaviours",   body: "What actually happens on the ground: experimentation, hesitation, shadow use, and quiet avoidance." },
];

function ContractCard({ item, idx }: { item: typeof contractData[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, glowRef, { accentMid: "hsla(38,45%,55%,0.1)", borderHover: "hsla(38,45%,55%,0.35)" });
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 28, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: idx * 0.12, force3D: true, scrollTrigger: { trigger: el, start: () => "top 88%", once: true, invalidateOnRefresh: true } });
    }, el);
    return () => ctx.revert();
  }, [idx]);
  return (
    <div ref={cardRef} style={{
      opacity: 0, position: "relative",
      background: "hsl(15,18%,16%)", border: `1px solid ${T.offRule}`,
      borderRadius: "4px", padding: "clamp(1.5rem, 3vw, 2.25rem) clamp(1.25rem, 2.5vw, 2rem)",
      boxShadow: "0 2px 12px -3px rgba(0,0,0,0.22)",
      willChange: "transform, box-shadow",
      transition: "border-color 0.25s ease", overflow: "hidden",
    }}>
      <div ref={glowRef} style={{ position: "absolute", inset: 0, borderRadius: "4px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: T.gold, borderRadius: "4px 4px 0 0" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-heading font-bold" style={{
            fontSize: "1.2rem", color: T.dkGold, opacity: 0.3, lineHeight: 1,
          }}>{String(idx + 1).padStart(2, "0")}</span>
          <div style={{ flex: 1, height: "1px", background: T.offRule }} />
        </div>
        <h3 className="font-heading font-semibold mb-3" style={{
          fontSize: "clamp(1rem, 1.5vw, 1.18rem)", color: T.offWhite, lineHeight: 1.25,
        }}>{item.label}</h3>
        <p className="font-body" style={{ fontSize: "0.875rem", color: T.offDim, lineHeight: 1.82, margin: 0 }}>{item.body}</p>
      </div>
    </div>
  );
}

const ContractSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const paraRef   = useRef<HTMLParagraphElement>(null);
  const callRef   = useRef<HTMLDivElement>(null);
  useReveal(headerRef as React.RefObject<HTMLElement>);
  useReveal(paraRef   as React.RefObject<HTMLElement>, { y: 18, delay: 0.1 });
  useReveal(callRef   as React.RefObject<HTMLElement>, { y: 16, delay: 0.24 });
  return (
    <section className="ab-pad" style={{ background: T.bgDark, position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
        width: "68vw", height: "55vh",
        background: "radial-gradient(ellipse, hsla(0,55%,32%,0.18) 0%, transparent 65%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />
      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "1rem" }}>
          <SLabel light>The Flagship Lens</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ color: T.offWhite, maxWidth: "580px", margin: 0 }}>
            The AI Psychological Contract Framework
          </h2>
        </div>
        <p ref={paraRef} className="font-body" style={{
          opacity: 0, fontSize: "1.05rem", color: T.offDim,
          lineHeight: 1.78, maxWidth: "580px", marginBottom: "3rem",
        }}>
          Aurion's approach is rooted in behavioural psychology and organisational practice. This framework helps leaders understand the expectations, assumptions, and trust dynamics that shape adoption long before any tool does.
        </p>
        <div className="ab-contract-grid" style={{ marginBottom: "2rem" }}>
          {contractData.map((item, i) => <ContractCard key={item.label} item={item} idx={i} />)}
        </div>
        <div ref={callRef} style={{ opacity: 0 }}>
          <div className="ab-callout-inline" style={{
            background: "hsl(15,18%,16%)",
            border: `1px solid ${T.offRule}`,
            borderRadius: "3px",
            padding: "1.1rem 1.75rem",
          }}>
            <span className="font-heading font-medium" style={{ fontSize: "0.95rem", fontStyle: "italic", color: T.offWhite }}>
              This is not technology-first consulting.
            </span>
            <span style={{ width: "1px", height: "16px", background: T.offRule, flexShrink: 0 }} />
            <span className="font-body font-semibold uppercase" style={{ fontSize: "10px", letterSpacing: "0.18em", color: T.dkGold }}>
              People-first AI adoption.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 8. WHO IT'S FOR — simplified (founder portrait now in dedicated section above)
// ═══════════════════════════════════════════════════════════════════════════════
const whoItems = [
  "Organisations already experimenting, even informally",
  "Teams that value clarity and human judgement as much as efficiency",
  "Leaders who want clarity without losing momentum",
  "Places where trust, culture, and responsibility matter",
  "Work where compliance and culture are as important as output",
  "Decisions where people, not just systems, carry the risk",
];

const WhoSection = () => {
  const headerRef  = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const itemRefs   = whoItems.map(() => useRef<HTMLLIElement>(null));

  useReveal(headerRef as React.RefObject<HTMLElement>);
  useReveal(rightRef  as React.RefObject<HTMLElement>, { x: 24, y: 0, delay: 0.1 });

  useEffect(() => {
    itemRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { opacity: 0, x: -18, force3D: true, immediateRender: true });
      const ctx = gsap.context(() => {
        gsap.to(el, {
          opacity: 1, x: 0, duration: 0.6, ease: "power2.out",
          delay: i * 0.06, force3D: true,
          scrollTrigger: { trigger: el, start: () => "top 92%", once: true, invalidateOnRefresh: true },
        });
      }, el);
      return () => ctx.revert();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="ab-pad" style={{ background: T.bgWarm }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "2.75rem" }}>
          <SLabel>Who Aurion Works Best With</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ maxWidth: "500px", margin: 0 }}>
            Already experimenting. Ready to bring coherence.
          </h2>
        </div>

        <div className="ab-who-grid">

          {/* Left: list */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {whoItems.map((item, i) => (
              <li
                key={i}
                ref={itemRefs[i]}
                style={{
                  opacity: 0, display: "flex", alignItems: "flex-start",
                  gap: "0.9rem", padding: "0.95rem 0",
                  borderBottom: `1px solid ${T.border}`,
                }}
              >
                <span style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: T.gold, flexShrink: 0, marginTop: "0.6rem",
                }} />
                <span className="font-body" style={{ fontSize: "0.9rem", color: T.fgMid, lineHeight: 1.68 }}>
                  {item}
                </span>
              </li>
            ))}
            <li style={{ borderBottom: `1px solid ${T.border}` }} />
          </ul>

          {/* Right: context card */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div style={{
              background: T.bgCard, border: `1px solid ${T.border}`,
              borderRadius: "4px", overflow: "hidden", position: "relative",
            }}>
              {/* Top accent */}
              <div style={{
                height: "3px",
                background: `linear-gradient(90deg, ${T.primary}, ${T.gold}66)`,
              }} />

              <div style={{ padding: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                <SLabel>Where This Work Is Most Relevant</SLabel>
                <p className="font-body mb-5" style={{
                  fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.85,
                }}>
                  Aurion works best with organisations that are already experimenting — even informally — and want to bring coherence to that experimentation without killing momentum.
                </p>
                <p className="font-body mb-5" style={{
                  fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.85,
                }}>
                  Teams that value clarity, responsibility, and human judgement as much as efficiency. This work is especially relevant where trust, compliance, and culture matter — where decisions are complex and people carry the risk.
                </p>

                {/* Dark callout */}
                <div style={{
                  background: T.bgDark,
                  borderRadius: "3px",
                  padding: "1.25rem 1.5rem",
                  marginTop: "0.5rem",
                }}>
                  <p className="font-heading font-medium" style={{
                    fontSize: "0.95rem", color: T.offWhite,
                    lineHeight: 1.6, marginBottom: "0.4rem",
                  }}>
                    This is not technology-first consulting.
                  </p>
                  <p className="font-body" style={{
                    fontSize: "0.8rem", color: T.offDim, lineHeight: 1.6,
                  }}>
                    It is people-first AI adoption.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 9. CLOSING CTA
// ═══════════════════════════════════════════════════════════════════════════════
const ClosingCTA = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLDivElement>(null);
  useReveal(wrapRef as React.RefObject<HTMLElement>, { y: 28 });
  useReveal(btnRef  as React.RefObject<HTMLElement>, { y: 18, delay: 0.3 });
  return (
    <section className="ab-pad" style={{ background: T.bgDark, position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-25%", left: "50%", transform: "translateX(-50%)",
        width: "60vw", height: "50vh",
        background: "radial-gradient(ellipse, hsla(38,45%,55%,0.07) 0%, transparent 65%)",
        filter: "blur(50px)", pointerEvents: "none",
      }} />
      <div
        className="aurion-container"
        style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1 }}
      >
        <div ref={wrapRef} style={{ opacity: 0, marginBottom: "2.75rem" }}>
          <SLabel light>The Belief</SLabel>
          <p className="font-heading font-medium leading-snug mb-6" style={{
            fontSize: "clamp(1.35rem, 2.8vw, 2.2rem)", color: T.offWhite,
            letterSpacing: "-0.01em",
          }}>
            When people feel confident, AI becomes a tool for clarity, not confusion.
          </p>
          <p className="font-body" style={{
            fontSize: "clamp(0.875rem, 1.2vw, 1rem)", color: T.offDim,
            lineHeight: 1.78, fontStyle: "italic",
          }}>
            A conversation about where AI is showing up in your organisation.
          </p>
        </div>
        <div ref={btnRef} style={{ opacity: 0 }}>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden"
            style={{
              padding: "0.875rem 1.8rem", fontSize: "0.95rem",
              background: T.offWhite, color: T.bgDark,
              transition: "opacity 0.18s ease", textDecoration: "none",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.87"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            <span aria-hidden="true" className="absolute inset-0 bg-white/[0.08] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Book a clarity call</span>
            <span className="relative z-10 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const About = () => {
  usePageMount();
  return (
    <>
      <style>{css}</style>
      <ReadingBar />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <FounderStory />
        <ValuesSection />
        <ApproachSection />
        <FounderSection />
        <ContractSection />
        <WhoSection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
};

export default About;