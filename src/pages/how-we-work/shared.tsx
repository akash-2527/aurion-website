/**
 * shared.tsx
 * Single source of truth for all How We Work page components.
 * Tokens, animation hooks, reusable UI pieces.
 */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Design tokens ─────────────────────────────────────────────────────────────
export const T = {
  bg:       "hsl(35, 30%, 96%)",
  warm:     "hsl(30, 20%, 92%)",
  dark:     "hsl(15, 20%, 12%)",
  primary:  "hsl(0, 55%, 32%)",
  fg:       "hsl(15, 20%, 15%)",
  muted:    "hsl(15, 10%, 45%)",
  border:   "hsl(30, 15%, 85%)",
  offWhite: "rgba(245, 238, 228, 1)",
  offDim:   "rgba(245, 238, 228, 0.56)",
  offMute:  "rgba(245, 238, 228, 0.32)",
  offRule:  "rgba(245, 238, 228, 0.13)",
} as const;

// ─── usePageMount ──────────────────────────────────────────────────────────────
export function usePageMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 50);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
}

// ─── useScrollReveal ──────────────────────────────────────────────────────────
export function useScrollReveal(
  ref:  React.RefObject<HTMLElement | HTMLDivElement | null>,
  opts?: { x?: number; y?: number; delay?: number; start?: string; duration?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { x = 0, y = 28, delay = 0, start = "top 92%", duration = 0.85 } = opts ?? {};
    gsap.set(el, { opacity: 0, x, y, force3D: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, x: 0, y: 0,
        duration, ease: "power3.out", force3D: true, delay,
        scrollTrigger: {
          trigger: el,
          start: () => start,
          toggleActions: "play none none none",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── use3DTilt ────────────────────────────────────────────────────────────────
// FIXED: Added safe gradient handling to prevent GSAP color parsing errors
export function use3DTilt(
  outerRef: React.RefObject<HTMLDivElement | null>,
  innerRef: React.RefObject<HTMLDivElement | null>,
  glowRef:  React.RefObject<HTMLDivElement | null>,
  maxTilt = 10
) {
  const isHovered = useRef(false);
  const rafRef    = useRef<number | null>(null);
  const debRef    = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const card  = outerRef.current;
    const inner = innerRef.current;
    const glow  = glowRef.current;
    if (!card || !inner || !glow) return;

    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let tGX = 50, tGY = 50, cGX = 50, cGY = 50;

    const startRAF = () => {
      if (rafRef.current !== null) return;
      const tick = () => {
        if (!isHovered.current) { rafRef.current = null; return; }
        cRX += (tRX - cRX) * 0.09; cRY += (tRY - cRY) * 0.09;
        cGX += (tGX - cGX) * 0.07; cGY += (tGY - cGY) * 0.07;
        inner.style.transform =
          `perspective(900px) rotateX(${cRX}deg) rotateY(${cRY}deg)`;
        
        // FIXED: Safely set gradient - ensure values are valid numbers
        const safeGX = Math.min(100, Math.max(0, cGX));
        const safeGY = Math.min(100, Math.max(0, cGY));
        
        if (!isNaN(safeGX) && !isNaN(safeGY)) {
          glow.style.background =
            `radial-gradient(circle at ${safeGX}% ${safeGY}%, hsla(0,55%,32%,0.055) 0%, transparent 65%)`;
        } else {
          glow.style.background = 'none';
        }
        
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      if (debRef.current) clearTimeout(debRef.current);
      isHovered.current = true;
      startRAF();
      const r  = card.getBoundingClientRect();
      
      // FIXED: Add bounds checking
      if (r.width === 0 || r.height === 0) return;
      
      const nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const ny = Math.min(1, Math.max(0, (e.clientY - r.top)  / r.height));
      
      tRY = (nx - 0.5) * maxTilt * 1.6;
      tRX = -(ny - 0.5) * maxTilt;
      tGX = nx * 100; tGY = ny * 100;
    };

    const onLeave = () => {
      debRef.current = setTimeout(() => {
        isHovered.current = false;
        tRX = 0; tRY = 0; tGX = 50; tGY = 50;
        
        // FIXED: Use GSAP to animate to safe values
        gsap.to(inner, { 
          rotateX: 0, 
          rotateY: 0, 
          duration: 0.5, 
          ease: "power3.out", 
          force3D: true, 
          overwrite: true 
        });
        
        gsap.to(glow, { 
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.out", 
          overwrite: true,
          onComplete: () => { 
            glow.style.opacity = "1"; 
            glow.style.background = "none"; 
          } 
        });
      }, 40);
    };

    const onMove = (e: MouseEvent) => {
      const r  = card.getBoundingClientRect();
      
      // FIXED: Add bounds checking
      if (r.width === 0 || r.height === 0) return;
      
      const nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const ny = Math.min(1, Math.max(0, (e.clientY - r.top)  / r.height));
      
      tRY = (nx - 0.5) * maxTilt * 1.6;
      tRX = -(ny - 0.5) * maxTilt;
      tGX = nx * 100; tGY = ny * 100;
    };

    card.addEventListener("mouseenter", onEnter, { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });
    card.addEventListener("mousemove",  onMove,  { passive: true });

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove",  onMove);
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      if (debRef.current) clearTimeout(debRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxTilt]);
}

// ─── WordReveal ───────────────────────────────────────────────────────────────
export function WordReveal({
  text, baseDelay = 0, stagger = 0.055, className = "",
}: {
  text: string; baseDelay?: number; stagger?: number; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>(".ww"));
    gsap.set(words, { opacity: 0, y: 16, filter: "blur(4px)", force3D: true });
    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.68, ease: "power3.out",
        stagger, delay: baseDelay, force3D: true,
      });
    }, el);
    return () => ctx.revert();
  }, [baseDelay, stagger]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="ww inline-block" style={{ marginRight: "0.25em", opacity: 0 }} aria-hidden="true">{w}</span>
      ))}
    </span>
  );
}

// ─── ShimmerBtn ───────────────────────────────────────────────────────────────
export function ShimmerBtn({
  to, children, light = false,
}: {
  to: string; children: React.ReactNode; light?: boolean;
}) {
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ padding: "0.875rem 1.8rem", fontSize: "0.95rem", background: light ? T.offWhite : T.primary, color: light ? T.primary : T.offWhite, transition: "opacity 0.18s ease", textDecoration: "none" }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.87"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-white/[0.08] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
    </Link>
  );
}

// ─── SLabel ───────────────────────────────────────────────────────────────────
export function SLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className="font-body font-semibold uppercase block mb-5"
      style={{ fontSize: "11px", letterSpacing: "0.22em", color: light ? T.offMute : T.primary }}>
      {children}
    </span>
  );
}

// ─── PageHero ─────────────────────────────────────────────────────────────────
export function PageHero({
  section, headline, sub, ctaTo, ctaLabel = "Book a clarity call",
}: {
  section: string;
  headline: string;
  sub: string;
  ctaTo: string;
  ctaLabel?: string;
}) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const subRef   = useRef<HTMLParagraphElement>(null);
  const ctaRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const label = labelRef.current, sub = subRef.current, cta = ctaRef.current;
    if (!label || !sub || !cta) return;
    gsap.set([label, sub, cta], { opacity: 0, y: 12, force3D: true });
    const ctx = gsap.context(() => {
      const wordCount = headline.split(" ").length;
      const revealEnd = 0.32 + wordCount * 0.055 + 0.68;
      gsap.to(label, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1, force3D: true });
      gsap.to(sub,   { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: revealEnd + 0.1, force3D: true });
      gsap.to(cta,   { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: revealEnd + 0.28, force3D: true });
    });
    return () => ctx.revert();
  }, [headline]);

  return (
    <section style={{ background: T.bg, padding: "80px 0 88px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-8%", width: "50vw", height: "75vh", background: `radial-gradient(ellipse at top right, hsla(0,55%,32%,0.055) 0%, transparent 65%)`, filter: "blur(44px)", pointerEvents: "none" }} />
      <div className="aurion-container relative z-10">
        <span ref={labelRef} style={{ opacity: 0 }}><SLabel>{section}</SLabel></span>
        <h1 className="aurion-heading-xl max-w-4xl mb-9 leading-tight">
          <WordReveal text={headline} baseDelay={0.32} stagger={0.055} />
        </h1>
        <p ref={subRef} className="font-body max-w-2xl mb-12"
          style={{ fontSize: "clamp(1rem,1.4vw,1.15rem)", color: T.muted, lineHeight: 1.75, opacity: 0 }}>
          {sub}
        </p>
        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center" style={{ opacity: 0 }}>
          <ShimmerBtn to={ctaTo}>{ctaLabel}</ShimmerBtn>
        </div>
      </div>
    </section>
  );
}