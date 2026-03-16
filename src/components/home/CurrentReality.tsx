import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/motion/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  number: string;
  title: string;
  summary: string;
  insight: string;
  insightLabel: string;
};

const cards: Card[] = [
  {
    number: "01",
    title: "AI is already here",
    summary: "People are using AI in pockets. Some confidently. Some quietly. Some with hesitation.",
    insightLabel: "What this means",
    insight: "The question is no longer whether AI is present  it's whether your organisation has the frameworks to guide it.",
  },
  {
    number: "02",
    title: "Shadow AI is normal",
    summary: "When governance is unclear, people rely on peers. This creates inconsistency and risk.",
    insightLabel: "What this means",
    insight: "Shadow AI is not misconduct. It's a signal. It tells you exactly where trust and clarity are missing.",
  },
  {
    number: "03",
    title: "Leaders want clarity",
    summary: "Most leadership teams want responsible adoption but lack visibility into what is actually happening.",
    insightLabel: "What this means",
    insight: "Clarity starts with understanding what your people are already doing  before designing what they should do.",
  },
  {
    number: "04",
    title: "Teams want permission",
    summary: "People want to use AI well. They want to know what is safe, what is expected, and what good looks like.",
    insightLabel: "What this means",
    insight: "Without clear expectations, people default to caution or peer norms. Neither of those is governance.",
  },
  {
    number: "05",
    title: "Managers feel exposed",
    summary: "Managers are expected to guide AI use without the language, confidence, or frameworks to do so.",
    insightLabel: "What this means",
    insight: "Middle management is the hinge point. Enabling them is one of the highest-leverage moves in any adoption programme.",
  },
  {
    number: "06",
    title: "The result",
    summary: "AI use grows, but alignment does not. This slows adoption and quietly increases risk.",
    insightLabel: "What this means",
    insight: "Unstructured growth is not adoption. Structured enablement is. That distinction is what Aurion is built on.",
  },
];

// ─── MagneticCard ─────────────────────────────────────────────────────────────
const MagneticCard = ({
  card,
  scrollDelay,
}: {
  card: Card;
  scrollDelay: number;
}) => {
  const cardRef      = useRef<HTMLDivElement>(null);
  const innerRef     = useRef<HTMLDivElement>(null);
  const insightRef   = useRef<HTMLDivElement>(null);
  const insightInner = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);

  // RAF / magnetic state — kept in refs so they never trigger re-renders
  const rafRef      = useRef<number | null>(null);
  const isHovered   = useRef(false);
  const tiltDebRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Insight panel state — single source of truth
  const [active, setActive] = useState(false);
  // Separate debounce for insight panel open/close
  const insightDebRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether a close tween is already queued so we don't double-schedule
  const pendingClose  = useRef(false);

  // ── Scroll entrance ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 48, rotateX: 10, transformPerspective: 900, force3D: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.9, ease: "power3.out", force3D: true,
        delay: scrollDelay,
        scrollTrigger: {
          trigger: el, start: () => "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);
    return () => ctx.revert();
  }, [scrollDelay]);

  // ── Magnetic tilt ─────────────────────────────────────────────────────────
  useEffect(() => {
    const card  = cardRef.current;
    const inner = innerRef.current;
    const glow  = glowRef.current;
    if (!card || !inner || !glow) return;

    let targetRX = 0, targetRY = 0, currentRX = 0, currentRY = 0;
    let targetGX = 50, targetGY = 50, currentGX = 50, currentGY = 50;

    const startRAF = () => {
      if (rafRef.current !== null) return;
      const tick = () => {
        if (!isHovered.current) { rafRef.current = null; return; }
        currentRX += (targetRX - currentRX) * 0.1;
        currentRY += (targetRY - currentRY) * 0.1;
        currentGX += (targetGX - currentGX) * 0.08;
        currentGY += (targetGY - currentGY) * 0.08;
        inner.style.transform =
          `perspective(900px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
        glow.style.background =
          `radial-gradient(circle at ${currentGX}% ${currentGY}%, hsl(var(--primary)/0.07) 0%, transparent 65%)`;
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const updateTargets = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top)  / rect.height;
      targetRY = (nx - 0.5) * 16;
      targetRX = -(ny - 0.5) * 10;
      targetGX = nx * 100;
      targetGY = ny * 100;
    };

    const onEnter = (e: MouseEvent) => {
      if (tiltDebRef.current) clearTimeout(tiltDebRef.current);
      isHovered.current = true;
      updateTargets(e);
      startRAF();
    };

    const onMove = (e: MouseEvent) => { updateTargets(e); };

    const onLeave = () => {
      // Use a 60ms debounce — enough to absorb the cursor crossing the gap
      // between cards or hitting the section boundary, without feeling sluggish.
      if (tiltDebRef.current) clearTimeout(tiltDebRef.current);
      tiltDebRef.current = setTimeout(() => {
        isHovered.current = false;
        targetRX = 0; targetRY = 0; targetGX = 50; targetGY = 50;
        gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 0.55, ease: "power3.out", force3D: true, overwrite: true });
        gsap.to(glow, {
          opacity: 0, duration: 0.35, ease: "power2.out", overwrite: true,
          onComplete: () => {
            glow.style.background = "radial-gradient(circle at 50% 50%, hsl(var(--primary)/0) 0%, transparent 65%)";
            glow.style.opacity = "1";
          },
        });
      }, 60);
    };

    card.addEventListener("mouseenter", onEnter, { passive: true });
    card.addEventListener("mousemove",  onMove,  { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mousemove",  onMove);
      card.removeEventListener("mouseleave", onLeave);
      if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      if (tiltDebRef.current) clearTimeout(tiltDebRef.current);
    };
  }, []);

  // ── Insight panel open / close ────────────────────────────────────────────
  // Root cause of the flicker:
  // mouseenter fires → 30ms timer starts → mouseleave fires before timer
  // completes → setActive(false) → setActive(true) from the first timer fires
  // anyway → two competing gsap tweens on the same element → visible flash.
  //
  // Fix: a single debounce ref controls the pending state transition.
  // Any new signal (enter or leave) clears the previous pending transition
  // before scheduling a new one. pendingClose tracks whether the *intended*
  // next state is "closed" so re-entry during the debounce window can cancel it.

  const scheduleOpen = () => {
    pendingClose.current = false;
    if (insightDebRef.current) clearTimeout(insightDebRef.current);
    insightDebRef.current = setTimeout(() => {
      if (!pendingClose.current) setActive(true);
    }, 50);
  };

  const scheduleClose = () => {
    pendingClose.current = true;
    if (insightDebRef.current) clearTimeout(insightDebRef.current);
    insightDebRef.current = setTimeout(() => {
      if (pendingClose.current) setActive(false);
    }, 80); // slightly longer than open so re-hover during gap cancels the close
  };

  const handleToggle = () => {
    if (insightDebRef.current) clearTimeout(insightDebRef.current);
    pendingClose.current = false;
    setActive((a) => !a);
  };

  // ── Insight panel GSAP tween ──────────────────────────────────────────────
  useEffect(() => {
    const panel = insightRef.current;
    const inner = insightInner.current;
    if (!panel || !inner) return;

    // Always kill any in-flight tween before starting a new one.
    // This is the key guard against competing open/close animations.
    gsap.killTweensOf(panel);

    if (active) {
      const targetH = inner.scrollHeight;
      gsap.fromTo(
        panel,
        { height: panel.offsetHeight, opacity: panel.style.opacity === "" ? 0 : parseFloat(panel.style.opacity) },
        {
          height: targetH, opacity: 1,
          duration: 0.4, ease: "power3.out", overwrite: true,
          onComplete: () => { panel.style.height = "auto"; },
        }
      );
    } else {
      // Lock to current pixel height before animating to 0 (can't tween from "auto")
      const currentH = panel.offsetHeight;
      if (currentH === 0) return; // already closed — nothing to do
      gsap.fromTo(
        panel,
        { height: currentH, opacity: parseFloat(panel.style.opacity) || 1 },
        { height: 0, opacity: 0, duration: 0.28, ease: "power2.in", overwrite: true }
      );
    }
  }, [active]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (insightDebRef.current) clearTimeout(insightDebRef.current);
      if (tiltDebRef.current)   clearTimeout(tiltDebRef.current);
    };
  }, []);

  return (
    <div ref={cardRef} style={{ opacity: 0 }} className="relative">
      <div
        ref={innerRef}
        className="relative"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <div
          className="relative bg-card border border-border rounded-sm overflow-hidden cursor-pointer select-none"
          style={{
            transition: "box-shadow 0.35s ease, border-color 0.35s ease",
            boxShadow: active
              ? "0 20px 48px -8px hsl(var(--primary)/0.14), 0 8px 20px -4px hsl(var(--foreground)/0.08)"
              : "0 2px 12px -2px hsl(var(--foreground)/0.06)",
            borderColor: active ? "hsl(var(--primary)/0.35)" : undefined,
          }}
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
          onClick={handleToggle}
          role="button"
          tabIndex={0}
          aria-expanded={active}
          aria-label={`${card.title} — ${active ? "collapse" : "expand"} insight`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          {/* Specular glow */}
          <div
            ref={glowRef}
            className="absolute inset-0 pointer-events-none rounded-sm"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--primary)/0) 0%, transparent 65%)",
            }}
          />

          <div className="relative p-8 md:p-10">
            {/* Top row */}
            <div className="flex items-start justify-between mb-6">
              <span
                className="font-body font-semibold text-xs tracking-[0.2em] uppercase"
                style={{
                  color: active ? "hsl(var(--primary))" : "hsl(var(--accent))",
                  transition: "color 0.3s ease",
                }}
              >
                {card.number}
              </span>

              <span
                className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: active ? "hsl(var(--primary)/0.5)" : "hsl(var(--border))",
                  transition: "border-color 0.3s ease, transform 0.35s ease",
                  transform: active ? "rotate(45deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path
                    d="M5 1v8M1 5h8"
                    stroke={active ? "hsl(var(--primary))" : "hsl(var(--foreground)/0.5)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ transition: "stroke 0.3s ease" }}
                  />
                </svg>
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-heading font-semibold text-xl md:text-2xl leading-snug mb-4"
              style={{
                color: active ? "hsl(var(--foreground))" : "hsl(var(--foreground)/0.85)",
                transition: "color 0.3s ease",
              }}
            >
              {card.title}
            </h3>

            {/* Summary */}
            <p
              className="font-body text-sm md:text-base leading-relaxed"
              style={{
                color: active
                  ? "hsl(var(--muted-foreground)/0.8)"
                  : "hsl(var(--muted-foreground))",
                transition: "color 0.3s ease",
              }}
            >
              {card.summary}
            </p>

            {/* Insight panel */}
            <div
              ref={insightRef}
              style={{ height: 0, overflow: "hidden", opacity: 0 }}
              aria-hidden={!active}
            >
              <div ref={insightInner} className="pt-6">
                <div
                  className="w-full h-px mb-5"
                  style={{ backgroundColor: "hsl(var(--primary)/0.15)" }}
                />
                <p
                  className="font-body text-xs font-semibold uppercase tracking-[0.18em] mb-3"
                  style={{ color: "hsl(var(--primary)/0.7)" }}
                >
                  {card.insightLabel}
                </p>
                <p className="font-body text-sm md:text-base leading-relaxed text-foreground">
                  {card.insight}
                </p>
              </div>
            </div>

            {/* Hint */}
            <p
              className="font-body text-[10px] uppercase tracking-[0.18em] mt-5"
              style={{
                color: "hsl(var(--accent))",
                opacity: active ? 0 : 0.7,
                transition: "opacity 0.25s ease",
              }}
            >
              {active ? "" : "Hover to explore"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const CurrentReality = () => (
  <section className="aurion-section bg-aurion-warm">
    <div className="aurion-container">
      <SectionReveal>
        <span className="aurion-label mb-4 block">The Current Reality</span>
        <h2 className="aurion-heading-lg max-w-2xl mb-6">
          Most organisations are in the middle of an informal AI moment.
        </h2>
        <div className="aurion-divider mb-14" />
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, i) => (
          <MagneticCard
            key={card.number}
            card={card}
            scrollDelay={i * 0.08}
          />
        ))}
      </div>
    </div>
  </section>
);

export default CurrentReality;