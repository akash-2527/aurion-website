import { useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { studies, type Study } from "@/data/caseStudies";

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
  offM:    "rgba(245,238,228,0.30)",
  offR:    "rgba(245,238,228,0.12)",
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

// ─── useScrollReveal ──────────────────────────────────────────────────────────
function useScrollReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts?: { x?: number; y?: number; delay?: number; duration?: number }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { x=0, y=28, delay=0, duration=0.85 } = opts ?? {};
    gsap.set(el, { opacity: 0, x, y, force3D: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, x: 0, y: 0, duration, ease: "power3.out", force3D: true, delay,
        scrollTrigger: {
          trigger: el, start: () => "top 90%",
          toggleActions: "play none none none", once: true, invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── Animated stat counter ────────────────────────────────────────────────────
function StatCounter({ stat, delay }: { stat: { value: string; label: string }; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = ref.current;
    const num  = numRef.current;
    if (!card || !num) return;

    // Extract numeric part for counting, keep prefix/suffix
    const raw    = stat.value;
    const match  = raw.match(/[\d,.]+/);
    const numStr = match ? match[0].replace(/,/g, "") : null;

    gsap.set(card, { opacity: 0, y: 32, scale: 0.94, force3D: true });
    
    const ctx = gsap.context(() => {
      // Create scroll trigger config
      const scrollTrigger = {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
        invalidateOnRefresh: true,
      };

      // Card entrance animation
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power3.out",
        force3D: true,
        delay,
        scrollTrigger,
      });

      // Count-up for numeric values
      if (numStr && !isNaN(parseFloat(numStr))) {
        const finalNum = parseFloat(numStr);
        const prefix   = raw.slice(0, raw.indexOf(match![0]));
        const suffix   = raw.slice(raw.indexOf(match![0]) + match![0].length);
        const isInt    = !numStr.includes(".");

        // Create a proper object for GSAP to animate
        const counterObj = { val: 0 };
        
        gsap.to(counterObj, {
          val: finalNum,
          duration: 1.2,
          ease: "power2.out",
          delay: delay + 0.1,
          scrollTrigger,
          onUpdate: function() {
            const v = isInt ? Math.round(counterObj.val) : counterObj.val.toFixed(1);
            num.textContent = `${prefix}${v}${suffix}`;
          }
        });
      }
    }, card);
    
    return () => ctx.revert();
  }, [stat.value, delay]);

  return (
    <div ref={ref} style={{
      opacity: 0,
      background: `hsla(0,55%,32%,0.065)`,
      borderLeft: `3px solid ${C.primary}`,
      borderRadius: "2px",
      padding: "1.25rem 1.5rem",
    }}>
      <span ref={numRef} className="font-heading font-bold block mb-1.5"
        style={{ fontSize: "clamp(1.6rem,3.5vw,2.5rem)", color: C.primary, lineHeight: 1 }}>
        {stat.value}
      </span>
      <span className="font-body" style={{ fontSize: "0.8rem", color: C.muted, lineHeight: 1.5 }}>
        {stat.label}
      </span>
    </div>
  );
}

// ─── Animated rule draw ───────────────────────────────────────────────────────
function RuleDraw({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1, duration: 0.9, ease: "power2.inOut", delay,
        scrollTrigger: { trigger: el, start: () => "top 90%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);
  return (
    <div style={{ position: "relative", height: "1px", marginBottom: "2.5rem" }}>
      <div style={{ position: "absolute", inset: 0, background: C.border }} />
      <div ref={ref} style={{ position: "absolute", inset: 0, background: C.gold, opacity: 0.6, transformOrigin: "left center", willChange: "transform" }} />
    </div>
  );
}

// ─── Staggered list ───────────────────────────────────────────────────────────
function AnimList({ items, dotColor = C.primary }: { items: string[]; dotColor?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lis = Array.from(el.querySelectorAll<HTMLLIElement>("li"));
    gsap.set(lis, { opacity: 0, x: -14, force3D: true });
    const ctx = gsap.context(() => {
      gsap.to(lis, {
        opacity: 1, x: 0, stagger: 0.07, duration: 0.6, ease: "power2.out", force3D: true,
        scrollTrigger: { trigger: el, start: () => "top 90%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <ul ref={ref} className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 font-body" style={{ opacity: 0, fontSize: "0.9rem", color: C.muted, lineHeight: 1.7 }}>
          <span style={{ flexShrink: 0, marginTop: "8px", width: "5px", height: "5px", borderRadius: "50%", background: dotColor, opacity: 0.65 }} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Pull-quote ───────────────────────────────────────────────────────────────
function PullQuote({ text, light = false }: { text: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>, { x: -36, y: 0 });
  return (
    <div ref={ref} className="my-10 pl-6 py-1" style={{ opacity: 0, borderLeft: `4px solid ${C.gold}` }}>
      <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed"
        style={{ color: light ? C.offD : C.fg }}>
        {text}
      </p>
    </div>
  );
}

// ─── Hero for detail page ─────────────────────────────────────────────────────
function DetailHero({ study }: { study: Study }) {
  const ref     = useRef<HTMLDivElement>(null);
  const bgRef   = useRef<HTMLDivElement>(null);

  // Parallax background drift
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(bg, { y: 0 }, {
        y: -60, ease: "none",
        scrollTrigger: { trigger: bg, start: "top top", end: "bottom top", scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);

  // Entrance stagger (skewY, like About.tsx)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".hl");
    gsap.set(items, { opacity: 0, y: 50, skewY: 1.5 });
    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1, y: 0, skewY: 0,
        stagger: 0.12, duration: 1.0, ease: "power4.out", delay: 0.15, force3D: true,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: C.dark, position: "relative", overflow: "hidden", padding: "96px 0 88px" }}>
      {/* Parallax bg texture */}
      <div ref={bgRef} aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: `radial-gradient(ellipse at 70% 30%, hsla(38,45%,50%,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, hsla(0,55%,32%,0.12) 0%, transparent 55%)`,
        willChange: "transform",
      }} />

      <div className="aurion-container relative z-10">
        <div ref={ref}>
          {/* Back link */}
          <Link to="/case-studies"
            className="hl inline-flex items-center gap-2 font-body text-sm mb-10"
            style={{ opacity: 0, color: C.offM, textDecoration: "none", letterSpacing: "0.04em",
              transition: "color 0.18s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color=C.offW; }}
            onMouseLeave={(e) => { e.currentTarget.style.color=C.offM; }}>
            ← Back to case studies
          </Link>

          <span className="hl aurion-label block mb-5" style={{ opacity: 0, color: C.gold }}>
            {study.label}
          </span>

          <div className="overflow-hidden mb-2">
            <h1 className="hl font-heading font-semibold max-w-4xl leading-tight"
              style={{ opacity: 0, fontSize: "clamp(1.8rem,4.5vw,3.4rem)", color: C.offW }}>
              {study.title}
            </h1>
          </div>

          <div className="hl aurion-divider mb-8 mt-6" style={{ opacity: 0, borderColor: C.offR }} />

          <p className="hl font-body max-w-2xl"
            style={{ opacity: 0, fontSize: "clamp(1rem,1.4vw,1.12rem)", color: C.offD, lineHeight: 1.75 }}>
            {study.intro}
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Outcomes grid ────────────────────────────────────────────────────────────
function OutcomesGrid({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLDivElement>(".oc");
    gsap.set(cards, { opacity: 0, y: 22, scale: 0.97 });
    const ctx = gsap.context(() => {
      gsap.to(cards, {
        opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.72, ease: "power3.out",
        scrollTrigger: { trigger: el, start: () => "top 90%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {items.map((o, i) => (
        <div key={i} className="oc" style={{ opacity: 0, padding: "1.25rem 1.5rem", borderRadius: "4px", background: `hsla(0,55%,32%,0.055)`, border: `1px solid hsla(0,55%,32%,0.1)` }}>
          <p className="font-body" style={{ fontSize: "0.875rem", color: C.fg, lineHeight: 1.7 }}>{o}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Why it matters (dark) ────────────────────────────────────────────────────
function WhyMatters({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>, { y: 24 });
  return (
    <div ref={ref} style={{ opacity: 0, background: C.dark, borderRadius: "4px", padding: "2.5rem 2.75rem" }}>
      <span className="aurion-label block mb-6" style={{ color: C.gold }}>Why This Matters</span>
      <div className="space-y-4">
        {items.map((w, i) => (
          <p key={i} className="font-body" style={{ fontSize: "0.9rem", color: C.offD, lineHeight: 1.78 }}>{w}</p>
        ))}
      </div>
    </div>
  );
}

// ─── Approach callout ─────────────────────────────────────────────────────────
function ApproachCallout({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>, { x: -28, y: 0 });
  return (
    <div ref={ref} style={{ opacity: 0, background: "hsl(35,30%,93%)", borderLeft: `4px solid ${C.gold}`, borderRadius: "0 4px 4px 0", padding: "1.5rem 1.75rem", marginBottom: "2rem" }}>
      <p className="font-heading text-lg font-medium leading-relaxed" style={{ color: C.fg }}>
        "{text}"
      </p>
    </div>
  );
}

// ─── Prev / Next navigator ────────────────────────────────────────────────────
function StudyNav({ current }: { current: Study }) {
  const idx  = studies.findIndex(s => s.id === current.id);
  const prev = idx > 0 ? studies[idx - 1] : null;
  const next = idx < studies.length - 1 ? studies[idx + 1] : null;
  const ref  = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>, { y: 20 });

  return (
    <div ref={ref} style={{ opacity: 0, borderTop: `1px solid ${C.border}`, padding: "2.5rem 0 0" }}>
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        {prev ? (
          <Link to={`/case-studies/${prev.id}`} style={{ textDecoration: "none" }}
            className="group flex flex-col gap-1.5">
            <span className="font-body text-xs" style={{ color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>← Previous</span>
            <span className="font-heading font-medium transition-colors duration-200 group-hover:text-primary"
              style={{ fontSize: "0.95rem", color: C.fg }}>{prev.title}</span>
          </Link>
        ) : <div />}
        {next ? (
          <Link to={`/case-studies/${next.id}`} style={{ textDecoration: "none" }}
            className="group flex flex-col gap-1.5 text-right">
            <span className="font-body text-xs" style={{ color: C.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Next →</span>
            <span className="font-heading font-medium transition-colors duration-200 group-hover:text-primary"
              style={{ fontSize: "0.95rem", color: C.fg }}>{next.title}</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLElement>, { y: 18 });
  return (
    <div ref={ref} style={{ opacity: 0, marginBottom: "1.75rem" }}>
      <span className="aurion-label block mb-3">{label}</span>
      {title && <h2 className="aurion-heading-md" style={{ color: C.fg }}>{title}</h2>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const CaseStudyDetail = () => {
  usePageMount();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const study = studies.find(s => s.id === id);

  // Redirect to /case-studies if ID not found
  useEffect(() => {
    if (!study) navigate("/case-studies", { replace: true });
  }, [study, navigate]);

  if (!study) return null;

  const nextStudy = studies[(studies.indexOf(study) + 1) % studies.length];

  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <DetailHero study={study} />

        {/* ── STATS ── */}
        <section style={{ background: C.bg, padding: "72px 0" }}>
          <div className="aurion-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {study.stats.map((stat, i) => (
                <StatCounter key={i} stat={stat} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CHALLENGE ── */}
        <section style={{ background: C.warm, padding: "72px 0" }}>
          <div className="aurion-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <SectionHeader label="The Challenge" title="What was getting in the way." />
                <RuleDraw />
                <AnimList items={study.challenge} />
              </div>
              <div>
                <PullQuote text="Most organisations are not struggling with AI because they lack tools. They are struggling because people do not know how it fits into their real work." />
              </div>
            </div>
          </div>
        </section>

        {/* ── APPROACH ── */}
        <section style={{ background: C.bg, padding: "72px 0" }}>
          <div className="aurion-container">
            <SectionHeader label="The Approach" />
            <ApproachCallout text={study.approach.heading} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
              <AnimList items={study.approach.points.slice(0, Math.ceil(study.approach.points.length / 2))} dotColor={C.gold} />
              <AnimList items={study.approach.points.slice(Math.ceil(study.approach.points.length / 2))} dotColor={C.gold} />
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section style={{ background: C.warm, padding: "72px 0" }}>
          <div className="aurion-container">
            <SectionHeader label="Outcomes" title="What changed." />
            <RuleDraw />
            <OutcomesGrid items={study.outcomes.headline} />
            {/* Outcome tags */}
            <div className="flex flex-wrap gap-3">
              {study.outcomes.tags.map((tag, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full font-body text-xs font-medium"
                  style={{ background: C.gold, color: C.dark }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY IT MATTERS ── */}
        <section style={{ background: C.bg, padding: "72px 0" }}>
          <div className="aurion-container max-w-3xl">
            <WhyMatters items={study.whyMatters} />
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section style={{ background: C.warm, padding: "56px 0" }}>
          <div className="aurion-container">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8"
              style={{ borderRadius: "4px", background: "hsl(35,25%,94%)", border: `1px solid ${C.border}`, padding: "2rem 2.5rem" }}>
              <p className="font-body max-w-xl" style={{ fontSize: "0.925rem", color: C.muted, lineHeight: 1.7 }}>
                {study.cta.text}
              </p>
              <Link to="/contact"
                className="group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden shrink-0"
                style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem", background: C.primary, color: "hsl(35,30%,96%)", textDecoration: "none", transition: "opacity 0.18s ease", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity="0.87"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity="1"; }}>
                <span aria-hidden="true" className="absolute inset-0 bg-white/[0.08] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">{study.cta.label}</span>
                <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── PREV / NEXT ── */}
        <section style={{ background: C.bg, padding: "56px 0" }}>
          <div className="aurion-container">
            <StudyNav current={study} />
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-24" style={{ background: C.dark }}>
          <div className="aurion-container text-center">
            <span className="aurion-label mb-5 block" style={{ color: C.gold }}>Work With Aurion</span>
            <h2 className="aurion-heading-lg max-w-2xl mx-auto mb-6" style={{ color: "hsl(35,25%,92%)" }}>
              Recognise any of these patterns?
            </h2>
            <p className="aurion-body max-w-xl mx-auto mb-10" style={{ color: "hsl(35,15%,65%)" }}>
              Every engagement starts with listening.
            </p>
            <Link to="/contact"
              className="group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden"
              style={{ padding: "0.875rem 1.9rem", fontSize: "0.95rem", background: "hsl(35,25%,92%)", color: C.dark, textDecoration: "none", transition: "opacity 0.18s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity="0.88"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity="1"; }}>
              <span aria-hidden="true" className="absolute inset-0 bg-black/[0.06] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Start a conversation</span>
              <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudyDetail;