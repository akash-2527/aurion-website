import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { studies } from "@/data/caseStudies";

gsap.registerPlugin(ScrollTrigger);

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  bg:      "hsl(35, 30%, 96%)",
  warm:    "hsl(30, 20%, 92%)",
  dark:    "hsl(15, 20%, 12%)",
  primary: "hsl(0, 55%, 32%)",
  gold:    "hsl(38, 45%, 55%)",
  fg:      "hsl(15, 20%, 15%)",
  muted:   "hsl(15, 10%, 45%)",
  border:  "hsl(30, 15%, 85%)",
  offW:    "rgba(245,238,228,1)",
  offD:    "rgba(245,238,228,0.55)",
  offM:    "rgba(245,238,228,0.28)",
};

// ─── usePageMount ─────────────────────────────────────────────────────────────
function usePageMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 50);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
}

// ═══════════════════════════════════════════════════════════════════════════════
// DIAMOND IMAGE
// Technique: "Diamond split reveal → landscape morph"
//
// The image starts at scale(0) inside a diamond clip-path.
// Phase 1 — Expand: scale 0→1 + clip diamond grows from point
// Phase 2 — Morph: clip-path morphs from diamond → wide rounded rectangle
//   simultaneously the diamond SVG border traces itself
// Phase 3 — Settle: subtle scale-down breathe, badge pops in
//
// Post-reveal:
//   - Scroll parallax (image drifts up)
//   - Mouse: subtle parallax shift on the whole panel
//
// Completely different from: parallelogram, venetian blinds, iris circle
// ═══════════════════════════════════════════════════════════════════════════════
function DiamondImage({ src, delay = 0.6 }: { src: string; delay?: number }) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLImageElement>(null);

  const badgeRef  = useRef<HTMLDivElement>(null);

  // ── Diamond expand → rectangle morph ──────────────────────────────────────
  useEffect(() => {
    const wrap  = wrapRef.current;
    const img   = imgRef.current;
    const badge = badgeRef.current;
    if (!wrap || !img) return;

    // Phase 1 initial state: tiny diamond point
    gsap.set(wrap, {
      clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
      scale: 0.3,
      force3D: true,
      immediateRender: true,
    });
    gsap.set(img, { scale: 1.18, force3D: true, immediateRender: true });
    if (badge) gsap.set(badge, { opacity: 0, scale: 0.85, y: 16, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });

      // Phase 1: scale up from point, clip opens as diamond
      tl.to(wrap, {
        scale: 1,
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        duration: 0.7,
        ease: "expo.out",
        force3D: true,
      });

      // Phase 2: diamond → full rectangle (the "snap open" moment)
      tl.to(wrap, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.55,
        ease: "power4.inOut",
        force3D: true,
      }, ">-0.05");

      // Image breathes in simultaneously
      tl.to(img, {
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        force3D: true,
      }, "<-0.4");

      // Badge pops in after reveal
      if (badge) {
        tl.to(badge, {
          opacity: 1, scale: 1, y: 0,
          duration: 0.6, ease: "back.out(1.6)", force3D: true,
        }, ">-0.1");
      }
    }, wrap);

    return () => ctx.revert();
  }, [delay]);

  // ── Scroll parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    const img   = imgRef.current;
    if (!panel || !img) return;
    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: -50, ease: "none",
        scrollTrigger: {
          trigger: panel, start: "top bottom", end: "bottom top",
          scrub: 1.4, invalidateOnRefresh: true,
        },
      });
    }, panel);
    return () => ctx.revert();
  }, []);

  // ── Mouse parallax on panel ────────────────────────────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    let rafId: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: MouseEvent) => {
      tx = ((e.clientX / window.innerWidth)  - 0.5) * -10;
      ty = ((e.clientY / window.innerHeight) - 0.5) * -6;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
      panel.style.transform = `translate(${cx}px, ${cy}px)`;
      rafId = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <div ref={panelRef} style={{ position: "relative", willChange: "transform" }}>

      {/* Image wrapper — clip-path target */}
      <div
        ref={wrapRef}
        style={{
          width: "100%",
          aspectRatio: "4/3",
          overflow: "hidden",
          borderRadius: "6px",
          position: "relative",
          willChange: "transform, clip-path",
          transformOrigin: "center center",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Professional team reviewing work"
          style={{
            width: "100%",
            height: "115%",
            objectFit: "cover",
            objectPosition: "center 25%",
            display: "block",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />

        {/* Warm grade */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, hsla(0,55%,32%,0.1) 0%, hsla(38,45%,55%,0.05) 40%, transparent 65%)`,
          mixBlendMode: "multiply", pointerEvents: "none",
        }} />

        {/* Bottom fade */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "38%",
          background: `linear-gradient(to top, ${C.bg} 0%, transparent 100%)`,
          pointerEvents: "none",
        }} />
      </div>

      {/* Floating badge — bottom right */}
      <div
        ref={badgeRef}
        style={{
          position: "absolute",
          bottom: "1.75rem",
          right: "-1.25rem",
          opacity: 0,
          zIndex: 10,
        }}
      >
        <div style={{
          background: C.bg,
          border: `1px solid ${C.border}`,
          borderRadius: "4px",
          padding: "1rem 1.4rem",
          boxShadow: "0 8px 28px -6px rgba(0,0,0,0.13)",
          minWidth: "172px",
        }}>
          <div style={{ height: "2px", width: "24px", background: C.primary, borderRadius: "1px", marginBottom: "0.65rem" }} />
          <p className="font-heading font-semibold" style={{ fontSize: "0.96rem", color: C.fg, lineHeight: 1.2, marginBottom: "0.2rem" }}>
            Real outcomes
          </p>
          <p className="font-body" style={{ fontSize: "0.72rem", color: C.muted, letterSpacing: "0.04em" }}>
            Details anonymised
          </p>
        </div>
      </div>

    </div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────
const WORDS = [
  "Cultural Institution","·","HR & Learning","·",
  "Operations","·","Responsible AI","·",
  "Real Organisations","·","Practical Outcomes","·",
];

function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.set(wrapRef.current, { opacity: 0 });
    gsap.to(wrapRef.current, { opacity: 1, duration: 0.8, delay: 1.3, ease: "power2.out" });
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { x: "-50%", duration: 36, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={wrapRef} style={{ overflow: "hidden", borderBottom: `1px solid ${C.border}`, opacity: 0 }}>
      <div ref={trackRef} style={{ display: "flex", whiteSpace: "nowrap", width: "200%", padding: "12px 0" }}>
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} className="font-heading text-sm font-medium"
            style={{ padding: "0 1.5rem", color: w === "·" ? C.gold : "hsl(15,10%,54%)" }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
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

  // Entrance
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".hl");
    gsap.set(items, { opacity: 0, y: 56, skewY: 1.5, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1, y: 0, skewY: 0,
        stagger: 0.11, duration: 1.05, ease: "power4.out",
        delay: 0.2, force3D: true,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Rule draw
  useEffect(() => {
    const el = ruleRef.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    gsap.to(el, { scaleX: 1, duration: 1.3, ease: "power3.inOut", delay: 1.0 });
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative", overflow: "hidden",
      padding: "112px 0 80px", background: C.bg,
    }}>
      {/* Noise */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, opacity: 0.02,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "160px 160px",
      }} />
      {/* Grid */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(hsla(0,55%,32%,0.025) 1px, transparent 1px), linear-gradient(90deg, hsla(0,55%,32%,0.025) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }} />
      {/* Orb */}
      <div ref={orbRef} aria-hidden style={{
        position: "absolute", top: "42%", left: "66%",
        width: "620px", height: "620px", borderRadius: "50%",
        background: `radial-gradient(circle, hsla(38,45%,55%,0.09) 0%, hsla(0,55%,32%,0.04) 48%, transparent 72%)`,
        filter: "blur(56px)", transform: "translate(-50%,-50%)",
        pointerEvents: "none", zIndex: 0, willChange: "transform",
      }} />

      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Split: copy left (6fr) | diamond image right (5fr) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "6fr 5fr",
          gap: "3.5rem",
          alignItems: "center",
        }}>

          {/* ── Left: copy ── */}
          <div ref={contentRef}>
            <span className="hl aurion-label mb-6 block" style={{ opacity: 0 }}>
              Evidence in Practice
            </span>

            <h1 className="hl font-heading font-semibold leading-tight" style={{
              opacity: 0,
              fontSize: "clamp(2.4rem,6vw,5rem)",
              color: C.fg, letterSpacing: "-0.025em",
              maxWidth: "14ch",
            }}>
              Real work.<br />
              <span style={{ color: C.primary }}>Real outcomes.</span>
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
              opacity: 0, fontSize: "clamp(1rem,1.4vw,1.1rem)",
              color: C.muted, lineHeight: 1.82, maxWidth: "42ch",
            }}>
              Helping organisations move from fragmented AI experimentation to structured,
              confident, responsible adoption. Details have been anonymised.
            </p>
          </div>

          {/* ── Right: diamond image ── */}
          <DiamondImage
            src="/src/assets/case-studies-team.webp"
            delay={0.65}
          />

        </div>
      </div>
    </section>
  );
}

// ─── Editorial Study Row ──────────────────────────────────────────────────────
function StudyRow({ study, index, isLast }: {
  study: typeof studies[0];
  index: number;
  isLast: boolean;
}) {
  const rowRef   = useRef<HTMLDivElement>(null);
  const ruleRef  = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLDivElement>(null);
  const metaRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef  = useRef<HTMLParagraphElement>(null);
  const tagsRef  = useRef<HTMLDivElement>(null);
  const statRef  = useRef<HTMLDivElement>(null);
  const ctaRef   = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const els = [numRef.current, metaRef.current, titleRef.current, bodyRef.current, tagsRef.current, statRef.current, ctaRef.current].filter(Boolean) as HTMLElement[];
    gsap.set(ruleRef.current, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(els, { opacity: 0, y: 22, force3D: true });
    const ctx = gsap.context(() => {
      const st = { trigger: rowRef.current, start: "top 87%", once: true, invalidateOnRefresh: true };
      gsap.to(ruleRef.current, { scaleX: 1, duration: 0.85, ease: "power3.inOut", scrollTrigger: st, delay: index * 0.04 });
      gsap.to(els, { opacity: 1, y: 0, stagger: 0.065, duration: 0.75, ease: "power3.out", force3D: true, scrollTrigger: st, delay: index * 0.04 + 0.08 });
    });
    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    const arrow = arrowRef.current;
    if (!arrow) return;
    if (hovered) gsap.to(arrow, { x: 5, duration: 0.3, ease: "power2.out" });
    else         gsap.to(arrow, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.55)" });
  }, [hovered]);

  const stat = study.stats[0];
  const tags: string[] = (study.outcomes?.tags ?? []).slice(0, 3);

  return (
    <div ref={rowRef}>
      <div style={{ position: "relative", height: "1px" }}>
        <div style={{ position: "absolute", inset: 0, background: C.border }} />
        <div ref={ruleRef} style={{
          position: "absolute", inset: 0,
          background: hovered
            ? `linear-gradient(90deg, ${C.primary}, ${C.gold} 55%, transparent)`
            : `linear-gradient(90deg, hsla(0,55%,32%,0.35), transparent)`,
          transition: "background 0.45s ease",
        }} />
      </div>

      <div
        style={{ padding: "clamp(2rem,4vw,3.5rem) 0", background: hovered ? `hsla(0,55%,32%,0.018)` : "transparent", transition: "background 0.35s ease", cursor: "default" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aurion-container">
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 200px", gap: "2rem 3.5rem", alignItems: "start" }}>
            <div ref={numRef} style={{ opacity: 0, paddingTop: "4px" }}>
              <span className="font-heading font-bold" style={{ fontSize: "clamp(3rem,4.5vw,4.5rem)", lineHeight: 1, letterSpacing: "-0.05em", color: C.primary, display: "block", opacity: hovered ? 0.25 : 0.09, transition: "opacity 0.35s ease", userSelect: "none" }}>
                {study.index}
              </span>
            </div>
            <div>
              <div ref={metaRef} style={{ opacity: 0, display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <span className="aurion-label" style={{ color: C.gold }}>{study.label}</span>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: C.border, flexShrink: 0 }} />
                <span className="font-body" style={{ fontSize: "0.7rem", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>Case Study</span>
              </div>
              <h2 ref={titleRef} className="font-heading font-semibold" style={{ opacity: 0, fontSize: "clamp(1.25rem,2vw,1.8rem)", color: hovered ? C.primary : C.fg, lineHeight: 1.25, letterSpacing: "-0.018em", maxWidth: "48ch", marginBottom: "0.9rem", transition: "color 0.3s ease" }}>
                {study.title}
              </h2>
              <p ref={bodyRef} className="font-body" style={{ opacity: 0, fontSize: "0.88rem", color: C.muted, lineHeight: 1.8, maxWidth: "58ch", marginBottom: "1.25rem" }}>
                {study.intro}
              </p>
              {tags.length > 0 && (
                <div ref={tagsRef} style={{ opacity: 0, display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                  {tags.map((tag, i) => (
                    <span key={i} className="font-body" style={{ fontSize: "0.68rem", fontWeight: 500, padding: "0.28rem 0.75rem", borderRadius: "999px", border: `1px solid ${hovered ? `hsla(0,55%,32%,0.25)` : C.border}`, color: hovered ? C.primary : C.muted, textTransform: "uppercase", letterSpacing: "0.07em", transition: "border-color 0.3s ease, color 0.3s ease" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1.75rem" }}>
              <div ref={statRef} style={{ opacity: 0, textAlign: "right" }}>
                <span className="font-heading font-bold block" style={{ fontSize: "clamp(2rem,3.2vw,3rem)", color: C.primary, lineHeight: 1, letterSpacing: "-0.03em", opacity: hovered ? 1 : 0.65, transition: "opacity 0.3s ease" }}>
                  {stat.value}
                </span>
                <span className="font-body" style={{ fontSize: "0.7rem", color: C.muted, display: "block", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {stat.label}
                </span>
              </div>
              <Link ref={ctaRef} to={`/case-studies/${study.id}`}
                style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: "0.45rem", textDecoration: "none", fontFamily: "inherit", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: hovered ? C.primary : C.muted, borderBottom: `1px solid ${hovered ? C.primary : "transparent"}`, paddingBottom: "2px", transition: "color 0.25s ease, border-color 0.25s ease" }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span>View case study</span>
                <span ref={arrowRef} style={{ display: "inline-block", willChange: "transform" }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isLast && <div style={{ height: "1px", background: C.border }} />}
    </div>
  );
}

// ─── Pull Quote ───────────────────────────────────────────────────────────────
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
    <div ref={ref} style={{ background: C.warm, padding: "88px 0" }}>
      <div className="aurion-container max-w-4xl">
        <div style={{ display: "flex", gap: "2.25rem", alignItems: "flex-start" }}>
          <div ref={lineRef} style={{ width: "4px", minHeight: "88px", flexShrink: 0, borderRadius: "2px", background: `linear-gradient(to bottom, ${C.gold}, ${C.primary}55)` }} />
          <p ref={textRef} className="font-heading font-medium" style={{ fontSize: "clamp(1.3rem,2.4vw,2rem)", lineHeight: 1.52, color: C.fg, opacity: 0, letterSpacing: "-0.012em" }}>
            "AI adoption is not a technology problem. It is a trust problem and trust is built through clarity, not tools."
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Count-up ─────────────────────────────────────────────────────────────────
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, { val: value, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%", once: true, invalidateOnRefresh: true }, onUpdate: () => { if (el) el.textContent = `${Math.round(obj.val)}${suffix}`; } });
    }, el);
    return () => ctx.revert();
  }, [value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Metrics Bar ──────────────────────────────────────────────────────────────
function MetricsBar() {
  const ref     = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".mi");
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
    { value: 3,   suffix: "",  label: "Sectors covered"        },
    { value: 94,  suffix: "%", label: "Avg. satisfaction"      },
    { value: 12,  suffix: "+", label: "Interventions run"      },
    { value: 100, suffix: "%", label: "Anonymised engagements"  },
  ];
  return (
    <div style={{ background: C.dark, padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(hsla(38,45%,55%,0.03) 1px, transparent 1px), linear-gradient(90deg, hsla(38,45%,55%,0.03) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div aria-hidden style={{ position: "absolute", top: 0, right: 0, width: "360px", height: "360px", background: `radial-gradient(circle at top right, hsla(38,45%,55%,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ position: "relative", height: "1px", marginBottom: "3.5rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(245,238,228,0.07)" }} />
          <div ref={ruleRef} style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${C.gold}, ${C.primary}70, transparent)` }} />
        </div>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2.5rem" }}>
          {metrics.map((m, i) => (
            <div key={i} className="mi" style={{ opacity: 0 }}>
              <span className="font-heading font-bold block" style={{ fontSize: "clamp(2.4rem,4vw,3.8rem)", color: C.offW, lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "0.5rem" }}>
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

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCta() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".ci");
    gsap.set(items, { opacity: 0, y: 28 });
    const ctx = gsap.context(() => {
      gsap.to(items, { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true, invalidateOnRefresh: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section style={{ background: C.bg, padding: "96px 0 120px" }}>
      <div className="aurion-container">
        <div ref={ref}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem 6rem", alignItems: "start" }}>
            <div>
              <span className="ci aurion-label block mb-5" style={{ opacity: 0, color: C.gold }}>Work With Aurion</span>
              <h2 className="ci font-heading font-semibold" style={{ opacity: 0, fontSize: "clamp(1.7rem,3vw,2.8rem)", color: C.fg, lineHeight: 1.22, letterSpacing: "-0.022em" }}>
                Recognise any of these patterns in your organisation?
              </h2>
            </div>
            <div style={{ paddingTop: "3.5rem" }}>
              <p className="ci font-body mb-8" style={{ opacity: 0, fontSize: "0.95rem", color: C.muted, lineHeight: 1.82 }}>
                Every engagement starts with listening. We work with organisations already experimenting and help bring coherence without killing momentum.
              </p>
              <Link to="/contact"
                className="ci group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden"
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

// ─── Page ─────────────────────────────────────────────────────────────────────
const CaseStudies = () => {
  usePageMount();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <section style={{ background: C.bg, padding: "56px 0 0" }}>
          {studies.map((study, i) => (
            <StudyRow key={study.id} study={study} index={i} isLast={i === studies.length - 1} />
          ))}
        </section>
        <PullQuote />
        <MetricsBar />
        <BottomCta />
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;