import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import HoverAnimator from "@/motion/HoverAnimator";

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

    const words = Array.from(
      container.querySelectorAll<HTMLSpanElement>(".w-word")
    );
    if (!words.length) return;

    gsap.set(words, { opacity: 0, y: 20, filter: "blur(5px)" });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
        stagger,
        delay: baseDelay,
      });
    }, container);

    return () => ctx.revert();
  }, [baseDelay, stagger]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="w-word inline-block"
          style={{ marginRight: "0.26em", opacity: 0 }}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </span>
  );
}

// ─── Cycling voices widget ────────────────────────────────────────────────────
const voices = [
  {
    quote: "We know people are using ChatGPT for work. We just don't know how.",
    role: "Head of Operations",
  },
  {
    quote: "I want to say yes to AI — I just don't know what yes looks like yet.",
    role: "Senior Manager",
  },
  {
    quote:
      "Our team is ready. The organisation hasn't caught up with them yet.",
    role: "L&D Director",
  },
  {
    quote:
      "We rolled out the tool. Nobody told us adoption was a different problem.",
    role: "Chief Digital Officer",
  },
];

function VoicesWidget() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setFading(false);
    }, 320);
  };

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % voices.length);
        setFading(false);
      }, 320);
    }, 4200);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const v = voices[active];

  return (
    <div className="bg-card/80 border border-border rounded-sm p-7 backdrop-blur-sm">
      {/* Label */}
      <p className="aurion-label mb-5 block">
        Heard in organisations we work with
      </p>

      {/* Quote — fixed min-height prevents layout shift during transition */}
      <div style={{ minHeight: "96px" }}>
        <p
          className="font-heading text-lg md:text-xl text-foreground leading-snug mb-3 transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          "{v.quote}"
        </p>
        <p
          className="text-xs font-body text-muted-foreground/70 tracking-wide transition-opacity duration-300"
          style={{ opacity: fading ? 0 : 1 }}
        >
          — {v.role}
        </p>
      </div>

      {/* Progress dots — clickable */}
      <div className="flex gap-2 mt-6">
        {voices.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show quote ${i + 1}`}
            className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-full"
          >
            <span
              className="block rounded-full transition-all duration-400"
              style={{
                width: i === active ? "20px" : "6px",
                height: "6px",
                backgroundColor:
                  i === active
                    ? "hsl(var(--primary))"
                    : "hsl(var(--border))",
              }}
            />
          </button>
        ))}
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
  const widgetRef  = useRef<HTMLDivElement>(null);

  // ── Mouse-reactive orb ────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const orb     = orbRef.current;
    if (!section || !orb) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 55;
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
    const section = sectionRef.current;
    const label   = labelRef.current;
    const sub     = subRef.current;
    const cta     = ctaRef.current;
    const note    = noteRef.current;
    const widget  = widgetRef.current;

    if (!section || !label || !sub || !cta) return;

    gsap.set(label,  { opacity: 0, y: 10 });
    gsap.set(sub,    { opacity: 0, y: 16 });
    gsap.set(cta,    { opacity: 0, y: 12 });
    if (note)   gsap.set(note,   { opacity: 0 });
    if (widget) gsap.set(widget, { opacity: 0, y: 18 });

    const ctx = gsap.context(() => {
      gsap.to(label, {
        opacity: 1, y: 0, duration: 0.65, ease: "power2.out", delay: 0.15,
      });

      const afterWords = 1.9;
      gsap.to(sub, {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: afterWords,
      });
      gsap.to(cta, {
        opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: afterWords + 0.2,
      });
      if (note) {
        gsap.to(note, {
          opacity: 1, duration: 0.6, ease: "power2.out", delay: afterWords + 0.45,
        });
      }
      if (widget) {
        gsap.to(widget, {
          opacity: 1, y: 0, duration: 0.85, ease: "power2.out", delay: afterWords + 0.15,
        });
      }
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
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/93 to-background/68" />
      </div>

      {/* Mouse-reactive warm orb */}
      <div
        ref={orbRef}
        aria-hidden="true"
        className="absolute pointer-events-none rounded-full"
        style={{
          top: "44%",
          left: "60%",
          width: "580px",
          height: "580px",
          background:
            "radial-gradient(circle, hsl(var(--primary)/0.11) 0%, hsl(var(--accent)/0.05) 55%, transparent 78%)",
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

      <div className="relative z-10 aurion-container w-full pt-28 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-12 items-start">

          {/* ── Main copy ─────────────────────────────────────────────────── */}
          <div className="lg:col-span-8">

            <span
              ref={labelRef}
              className="aurion-label mb-7 block"
              style={{ opacity: 0 }}
            >
              AI Adoption &amp; Enablement
            </span>

            <h1 className="aurion-heading-xl mb-9 leading-tight">
              <WordReveal
                text="Turn scattered AI experimentation into structured, responsible everyday use."
                baseDelay={0.4}
                stagger={0.06}
              />
            </h1>

            <p
              ref={subRef}
              className="aurion-body-lg max-w-[540px] mb-12"
              style={{ opacity: 0 }}
            >
              Aurion helps organisations move from quiet, inconsistent AI use to
              confident, aligned, everyday practice that{" "}
              <strong className="text-foreground font-medium">
                strengthens workflows and reduces risk.
              </strong>
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 items-start"
              style={{ opacity: 0 }}
            >
              <HoverAnimator>
                <Link
                  to="/how-we-work"
                  className="aurion-btn-primary group relative overflow-hidden"
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
                  className="group inline-flex items-center gap-2.5 px-7 py-4 font-body font-medium text-base text-foreground border border-border rounded-sm hover:border-primary/50 transition-colors duration-200"
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
              className="mt-5 text-xs font-body text-muted-foreground/50 tracking-wide"
              style={{ opacity: 0 }}
            >
              No pitch deck. No agenda. Just a real conversation.
            </p>
          </div>

          {/* ── Voices widget ─────────────────────────────────────────────── */}
          <div
            ref={widgetRef}
            className="lg:col-span-4 hidden lg:block lg:mt-6"
            style={{ opacity: 0 }}
          >
            <VoicesWidget />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[9px] font-body uppercase tracking-[0.25em] text-muted-foreground/35">
          Scroll
        </span>
        <span className="w-px h-7 bg-muted-foreground/25 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;