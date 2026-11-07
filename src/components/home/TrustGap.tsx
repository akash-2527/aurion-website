import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:      "hsl(35, 30%, 96%)",
  bgCard:  "hsl(35, 30%, 99%)",
  primary: "hsl(0, 55%, 32%)",
  fg:      "hsl(15, 20%, 12%)",
  muted:   "hsl(15, 10%, 42%)",
  faint:   "hsl(15, 10%, 62%)",
  border:  "hsl(30, 15%, 84%)",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const nodes = [
  {
    index: "01",
    label: "The Fear",
    title: "People fear getting it wrong",
    body: "Teams want clarity, permission, and psychological safety. Without it, they stay quiet or experiment in the shadows  not because they resist change, but because nobody told them what's okay.",
    aside: "We hear this in almost every discovery session.",
    accent:    "hsl(0, 55%, 38%)",
    accentBg:  "hsla(0, 55%, 38%, 0.06)",
    accentMid: "hsla(0, 55%, 38%, 0.2)",
  },
  {
    index: "02",
    label: "The Gap",
    title: "Leaders assume a tooling shift",
    body: "Leaders see a software rollout. Teams experience an identity shift  'What does this mean for my role?' When those realities don't meet, people fill the silence with peer norms instead of governance.",
    aside: "The gap between intent and lived experience is where most adoption fails.",
    accent:    "hsl(12, 58%, 40%)",
    accentBg:  "hsla(12, 58%, 40%, 0.06)",
    accentMid: "hsla(12, 58%, 40%, 0.2)",
  },
  {
    index: "03",
    label: "The Drift",
    title: "Peer norms replace policy",
    body: "Without clear guidance, people look sideways. They watch what colleagues do, what seems safe, what seems valued. This creates uneven adoption and hidden pockets of risk.",
    aside: "Drift isn't rebellion. It's people doing their best with what they have.",
    accent:    "hsl(24, 55%, 38%)",
    accentBg:  "hsla(24, 55%, 38%, 0.06)",
    accentMid: "hsla(24, 55%, 38%, 0.2)",
  },
  {
    index: "04",
    label: "The Risk",
    title: "Shadow AI becomes the default",
    body: "Shadow AI is not misuse. It is a message. It tells you exactly where governance is unclear and trust is missing. The organisations that name it directly are the ones that close the gap.",
    aside: "This is where we find the most important conversations.",
    accent:    "hsl(36, 50%, 36%)",
    accentBg:  "hsla(36, 50%, 36%, 0.06)",
    accentMid: "hsla(36, 50%, 36%, 0.2)",
  },
];

// ─── TrustCard ────────────────────────────────────────────────────────────────
// Single div — no wrapper. Border, background, tilt, glow all on one element.
// This eliminates the double-border issue entirely.
function TrustCard({
  node,
  cardRef,
}: {
  node: typeof nodes[0];
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const debRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovRef  = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let tGX = 50, tGY = 50, cGX = 50, cGY = 50;

    const tick = () => {
      if (!hovRef.current) { rafRef.current = null; return; }
      cRX += (tRX - cRX) * 0.1;
      cRY += (tRY - cRY) * 0.1;
      cGX += (tGX - cGX) * 0.07;
      cGY += (tGY - cGY) * 0.07;
      // Apply 3D tilt directly on the card div
      card.style.transform = `perspective(900px) rotateX(${cRX}deg) rotateY(${cRY}deg) translateY(-7px)`;
      glow.style.background =
        `radial-gradient(circle at ${cGX}% ${cGY}%, ${node.accentMid} 0%, transparent 58%)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = (e: MouseEvent) => {
      if (debRef.current) clearTimeout(debRef.current);
      hovRef.current = true;
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top)  / r.height) - 0.5) * 13;
      tRY =  (((e.clientX - r.left) / r.width)  - 0.5) * 17;
      tGX = ((e.clientX - r.left) / r.width)  * 100;
      tGY = ((e.clientY - r.top)  / r.height) * 100;
      // Single border → accent colour
      card.style.borderColor = node.accent;
      card.style.boxShadow   = `0 22px 52px -8px rgba(80,25,8,0.13)`;
    };

    const onLeave = () => {
      debRef.current = setTimeout(() => {
        hovRef.current = false;
        tRX = 0; tRY = 0; tGX = 50; tGY = 50;
        // Smoothly return to rest
        gsap.to(card, {
          rotateX: 0, rotateY: 0, y: 0,
          boxShadow: "0 4px 20px -4px rgba(80,25,8,0.08)",
          duration: 0.65, ease: "power3.out", overwrite: "auto",
          onUpdate: () => {
            // Keep perspective while GSAP resets
          },
        });
        card.style.borderColor = T.border;
        gsap.to(glow, {
          opacity: 0, duration: 0.4, overwrite: "auto",
          onComplete: () => {
            glow.style.opacity = "1";
            glow.style.background = "none";
          },
        });
      }, 40);
    };

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top)  / r.height) - 0.5) * 13;
      tRY =  (((e.clientX - r.left) / r.width)  - 0.5) * 17;
      tGX = ((e.clientX - r.left) / r.width)  * 100;
      tGY = ((e.clientY - r.top)  / r.height) * 100;
    };

    card.addEventListener("mouseenter", onEnter, { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });
    card.addEventListener("mousemove",  onMove,  { passive: true });

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove",  onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debRef.current) clearTimeout(debRef.current);
    };
  }, [cardRef, node]);

  return (
    /*
     * RESPONSIVE CHANGES — card padding:
     * — Fixed "2.25rem 2.1rem 2rem" becomes a fluid clamp so cards don't
     *   feel cramped on narrow screens. On xs the horizontal padding drops
     *   to ~1.25rem; on md+ it restores to the original ~2.1rem.
     * — All inner styles are untouched.
     */
    <div
      ref={cardRef}
      style={{
        position: "relative",
        background: T.bgCard,
        border: `1px solid ${T.border}`,
        borderRadius: "8px",
        padding: "clamp(1.25rem, 4vw, 2.25rem) clamp(1.1rem, 3.5vw, 2.1rem) clamp(1.1rem, 3.5vw, 2rem)",
        overflow: "hidden",
        boxShadow: "0 4px 20px -4px rgba(80,25,8,0.08)",
        willChange: "transform, box-shadow",
        transition: "border-color 0.3s ease",
        opacity: 0,
      }}
    >
      {/* Radial glow follows cursor */}
      <div
        ref={glowRef}
        style={{
          position: "absolute", inset: 0,
          borderRadius: "8px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${node.accent} 0%, transparent 70%)`,
        borderRadius: "8px 8px 0 0",
        zIndex: 1,
      }} />

      {/*
       * RESPONSIVE CHANGES — ghost number:
       * — Fixed 7.5rem font size becomes clamp(4rem, 10vw, 7.5rem) so it
       *   doesn't overflow card bounds on narrow single-column layouts.
       */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-1.5rem", right: "1.1rem",
          fontFamily: "Georgia, serif",
          fontSize: "clamp(4rem, 10vw, 7.5rem)", fontWeight: 700,
          color: node.accent, opacity: 0.052,
          lineHeight: 1, userSelect: "none",
          pointerEvents: "none", letterSpacing: "-0.04em",
          zIndex: 0,
        }}
      >
        {node.index}
      </span>

      {/* All content above glow + ghost */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header row */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-start", marginBottom: "1.35rem",
          gap: "0.5rem",
        }}>
          <span style={{
            display: "inline-block",
            fontSize: "9.5px", fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: node.accent,
            background: node.accentBg,
            border: `1px solid ${node.accentMid}`,
            borderRadius: "20px",
            padding: "0.28rem 0.85rem",
            flexShrink: 0,
          }}>
            {node.label}
          </span>
          <span style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.05rem",
            color: node.accent, opacity: 0.38, lineHeight: 1,
            flexShrink: 0,
          }}>
            {node.index}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(1.05rem, 1.55vw, 1.26rem)",
          fontWeight: 600, color: T.fg, lineHeight: 1.32,
          fontFamily: "Georgia, serif", marginBottom: "0.9rem",
        }}>
          {node.title}
        </h3>

        {/* Divider */}
        <div style={{ height: "1px", background: T.border, marginBottom: "0.9rem" }} />

        {/* Body */}
        <p style={{
          fontSize: "clamp(0.875rem, 1.15vw, 0.95rem)",
          color: T.muted, lineHeight: 1.8, marginBottom: "1.25rem",
        }}>
          {node.body}
        </p>

        {/* Aside */}
        <div style={{ borderLeft: `2px solid ${node.accent}80`, paddingLeft: "1rem" }}>
          <p style={{
            fontSize: "0.82rem", color: T.faint,
            fontStyle: "italic", lineHeight: 1.65, margin: 0,
          }}>
            {node.aside}
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── TrustGap ─────────────────────────────────────────────────────────────────
const TrustGap = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<React.RefObject<HTMLDivElement | null>[]>(
    nodes.map(() => ({ current: null } as React.RefObject<HTMLDivElement | null>))
  );

  useEffect(() => {
    const section = sectionRef.current;
    const header  = headerRef.current;
    const grid    = gridRef.current;
    if (!section || !header || !grid) return;

    const ctx = gsap.context(() => {

      // Header fade-up
      gsap.set(header, { opacity: 0, y: 28, force3D: true });
      gsap.to(header, {
        opacity: 1, y: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: {
          trigger: header, start: () => "top 88%",
          once: true, invalidateOnRefresh: true,
        },
      });

      // Cards drop from above, staggered, with bounce
      cardRefs.current.forEach((ref, i) => {
        const el = ref.current;
        if (!el) return;

        gsap.set(el, { opacity: 0, y: -100, scale: 0.85, force3D: true });
        gsap.to(el, {
          opacity: 1, y: 0, scale: 1,
          duration: 1.0, ease: "back.out(1.4)",
          delay: 0.08 + i * 0.13, force3D: true,
          scrollTrigger: {
            trigger: grid, start: () => "top 83%",
            once: true, invalidateOnRefresh: true,
          },
        });
      });

    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    /*
     * RESPONSIVE CHANGES — section padding:
     * — Fixed "96px 0 108px" becomes fluid via clamp so the section breathes
     *   on desktop but doesn't feel oversized on mobile.
     */
    <section
      ref={sectionRef}
      style={{
        background: T.bg,
        padding: "clamp(56px, 8vw, 96px) 0 clamp(64px, 9vw, 108px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, ${T.border} 1px, transparent 1px)`,
        backgroundSize: "28px 28px", opacity: 0.6,
      }} />

      {/* Warm glow top-right */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-18%", right: "-6%",
        width: "48vw", height: "70vh",
        background: "radial-gradient(ellipse at top right, hsla(0,55%,32%,0.065) 0%, transparent 65%)",
        filter: "blur(52px)", pointerEvents: "none",
      }} />

      {/* Warm glow bottom-left */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-10%", left: "-4%",
        width: "38vw", height: "48vh",
        background: "radial-gradient(ellipse at bottom left, hsla(30,45%,55%,0.05) 0%, transparent 65%)",
        filter: "blur(44px)", pointerEvents: "none",
      }} />

      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            maxWidth: "600px",
            /*
             * RESPONSIVE CHANGES — header bottom margin:
             * — Scales down on mobile so the gap to the grid isn't huge.
             */
            marginBottom: "clamp(2rem, 5vw, 3.5rem)",
            opacity: 0,
          }}
        >
          <span style={{
            display: "block", marginBottom: "1.1rem",
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: T.primary,
          }}>
            The AI Trust Gap
          </span>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            fontWeight: 600, color: T.fg, lineHeight: 1.18,
            marginBottom: "1.1rem", fontFamily: "Georgia, serif",
          }}>
            Four forces quietly sabotage every AI deployment.
          </h2>
          <p style={{
            fontSize: "clamp(0.95rem, 1.35vw, 1.08rem)",
            color: T.muted, lineHeight: 1.75,
          }}>
            They're not technical. They're human. And they compound silently until adoption stalls.
          </p>
        </div>

        {/*
         * RESPONSIVE CHANGES — card grid:
         * — Fixed "repeat(2, 1fr)" becomes 1 column on xs/sm and 2 columns
         *   on md+ using a CSS responsive grid via a <style> tag + className.
         * — Gap scales down on narrow screens via clamp.
         * — No Tailwind classes used on the grid itself to avoid conflicts
         *   with the existing inline-style pattern used throughout this file.
         */}
        <style>{`
          .tg-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: clamp(1rem, 3vw, 2.25rem);
          }
          @media (min-width: 640px) {
            .tg-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
        `}</style>

        <div ref={gridRef} className="tg-grid">
          {nodes.map((node, i) => (
            <TrustCard
              key={node.label}
              node={node}
              cardRef={cardRefs.current[i]}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustGap;