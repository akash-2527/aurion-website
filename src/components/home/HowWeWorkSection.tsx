import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data — matches client brief exactly ─────────────────────────────────────
const pillars = [
  {
    number: "01",
    title: "Sensemaking & Readiness",
    oneLiner:
      "Organisations cannot design responsible AI adoption until they understand what is already happening.",
  },
  {
    number: "02",
    title: "Workflow Enablement",
    oneLiner:
      "AI becomes sustainable when it fits naturally into real work.",
  },
  {
    number: "03",
    title: "Adoption Operations",
    oneLiner:
      "Adoption grows when communication, champions, and rhythms support it.",
  },
];

// ─── HowWeWorkSection ─────────────────────────────────────────────────────────
const HowWeWorkSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const ruleRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header  = headerRef.current;
    const grid    = gridRef.current;
    const cta     = ctaRef.current;

    if (!section || !header || !grid) return;

    const cardEls = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const ruleEls = ruleRefs.current.filter((el): el is HTMLSpanElement => el !== null);

    // ── Set initial states — GSAP owns these from the start ───────────────
    gsap.set(header, { opacity: 0, y: 28, force3D: true });
    gsap.set(cardEls, { opacity: 0, y: 44, rotateX: 6, force3D: true });
    gsap.set(ruleEls, { scaleX: 0, transformOrigin: "left center", force3D: true });
    if (cta) gsap.set(cta, { opacity: 0, y: 18, force3D: true });

    let refreshTimer: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {

      // ── Header entrance ────────────────────────────────────────────────
      gsap.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: header,
          start: () => "top 82%",
          toggleActions: "play none none none",
        },
      });

      // ── Cards stagger — each card scrolls into view independently ──────
      // Using individual ScrollTriggers (not batch) so each card
      // fires at its own scroll position — correct on all screen heights.
      cardEls.forEach((card, i) => {
        const rule = ruleEls[i];

        // Card lift-in
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          ease: "power3.out",
          force3D: true,
          delay: i * 0.1,           // stagger via delay — simpler than batch
          scrollTrigger: {
            trigger: grid,           // trigger on the grid so all fire together
            start: () => "top 78%",
            toggleActions: "play none none none",
          },
        });

        // Rule draws after card is in view
        if (rule) {
          gsap.to(rule, {
            scaleX: 1,
            duration: 0.65,
            ease: "power2.inOut",
            force3D: true,
            delay: i * 0.1 + 0.35,  // slightly after card enters
            scrollTrigger: {
              trigger: grid,
              start: () => "top 78%",
              toggleActions: "play none none none",
            },
          });
        }
      });

      // ── CTA entrance ───────────────────────────────────────────────────
      if (cta) {
        gsap.to(cta, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: cta,
            start: () => "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

    }, section);

    // Deferred refresh — lets fonts + above-section layout fully settle
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  // ── Hover handlers — pure DOM, no React re-render ─────────────────────────
  const onCardEnter = (el: HTMLDivElement) => {
    gsap.to(el, {
      y: -6,
      boxShadow: "0 20px 48px -8px rgba(0,0,0,0.12), 0 6px 16px -4px rgba(0,0,0,0.07)",
      borderColor: "hsl(var(--primary)/0.3)",
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
    });
  };

  const onCardLeave = (el: HTMLDivElement) => {
    gsap.to(el, {
      y: 0,
      boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)",
      borderColor: "hsl(var(--border))",
      duration: 0.35,
      ease: "power2.out",
      force3D: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="aurion-section bg-aurion-warm"
    >
      <div className="aurion-container">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-16 md:mb-20" style={{ opacity: 0 }}>
          <span className="aurion-label mb-4 block">What Aurion Does</span>
          <h2 className="aurion-heading-lg max-w-2xl mb-0">
            Three pillars. One clear path forward.
          </h2>
        </div>

        {/* ── Pillar cards ─────────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative group"
              style={{
                opacity: 0,
                willChange: "transform, opacity",
                // Right border divider between cards — hidden on last
                borderRight: i < pillars.length - 1
                  ? "1px solid hsl(var(--border))"
                  : "none",
              }}
              onMouseEnter={(e) => onCardEnter(e.currentTarget)}
              onMouseLeave={(e) => onCardLeave(e.currentTarget)}
            >
              {/* Outer padding */}
              <div
                className="p-8 md:p-10 lg:p-12 h-full flex flex-col"
                style={{
                  // Subtle left accent line on first card
                  borderLeft: i === 0
                    ? "3px solid hsl(var(--primary)/0.6)"
                    : "3px solid transparent",
                  transition: "border-color 0.3s ease",
                }}
              >
                {/* Number */}
                <span
                  className="font-body font-semibold uppercase mb-7 block"
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    color: "hsl(var(--primary)/0.7)",
                  }}
                >
                  {pillar.number}
                </span>

                {/* Title */}
                <h3
                  className="font-heading font-semibold leading-snug mb-5"
                  style={{
                    fontSize: "clamp(1.2rem, 1.8vw, 1.55rem)",
                    color: "hsl(var(--foreground))",
                    transition: "color 0.25s ease",
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Animated rule — draws on scroll entry */}
                <span
                  ref={(el) => { ruleRefs.current[i] = el; }}
                  className="block mb-6 flex-shrink-0"
                  style={{
                    height: "1px",
                    width: "100%",
                    background: "hsl(var(--border))",
                    transformOrigin: "left center",
                    transform: "scaleX(0)",
                    willChange: "transform",
                  }}
                  aria-hidden="true"
                />

                {/* One-liner */}
                <p
                  className="font-body leading-relaxed flex-1"
                  style={{
                    fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
                    color: "hsl(var(--muted-foreground))",
                    lineHeight: 1.75,
                  }}
                >
                  {pillar.oneLiner}
                </p>

                {/* Hover arrow — appears on hover via opacity transition */}
                <span
                  className="mt-8 flex items-center gap-2 font-body font-semibold uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "hsl(var(--primary))",
                    opacity: 0,
                    transform: "translateX(-6px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                  }}
                  // Show on group hover via inline style — avoids Tailwind JIT issue
                  ref={(el) => {
                    if (!el) return;
                    const card = cardRefs.current[i];
                    if (!card) return;
                    const show  = () => { el.style.opacity = "1"; el.style.transform = "translateX(0)"; };
                    const hide  = () => { el.style.opacity = "0"; el.style.transform = "translateX(-6px)"; };
                    card.addEventListener("mouseenter", show);
                    card.addEventListener("mouseleave", hide);
                  }}
                  aria-hidden="true"
                >
                  Learn more →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Top border above grid ─────────────────────────────────────────── */}
        {/* Rendered above grid via CSS order / margin trick */}

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="mt-14 md:mt-16 pt-12 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{ opacity: 0 }}
        >
          <p
            className="font-body max-w-md"
            style={{
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              color: "hsl(var(--muted-foreground))",
              lineHeight: 1.7,
            }}
          >
            Full detail  including how each pillar works in practice  lives on
            the How We Work page.
          </p>

          <Link
            to="/how-we-work"
            className="group inline-flex items-center gap-3 font-body font-medium rounded-sm flex-shrink-0 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            style={{
              padding: "0.9rem 1.85rem",
              fontSize: "0.95rem",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {/* Subtle shimmer fill on hover */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-white/[0.07] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
            />
            <span className="relative z-10">See the full approach</span>
            <span className="relative z-10 inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HowWeWorkSection;