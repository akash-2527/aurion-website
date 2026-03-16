import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, useScrollReveal, PageHero, ShimmerBtn, SLabel } from "./shared";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import the image directly
import teamImage from "@/assets/how-we-work-team.webp";

// shared.tsx already registers ScrollTrigger — do NOT call registerPlugin again here.
// Double registration causes ScrollTrigger to reset its internal state mid-session,
// which drops triggers registered by child components on navigation.

// ─── Data ─────────────────────────────────────────────────────────────────────
const subPages = [
  { number: "01", label: "What Aurion Does",        path: "/how-we-work/what-we-do",      desc: "Three pillars of practical AI enablement." },
  { number: "02", label: "Four Phase Model",         path: "/how-we-work/phases",           desc: "One clear path. Four focused phases." },
  { number: "03", label: "AI Trust Gap & Framework", path: "/how-we-work/trust-gap",        desc: "The flagship behavioural lens for AI adoption." },
  { number: "04", label: "Who We Work With",         path: "/how-we-work/who-we-work-with", desc: "Organisations that want responsible adoption." },
];

const STRIP_COUNT = 6; // number of venetian blind slices

// ─── VenetianImage ────────────────────────────────────────────────────────────
// NEW animation — completely different from HeroSection's parallelogram sweep.
//
// Technique: "Venetian blind reveal"
// The image is overlaid with STRIP_COUNT absolutely-positioned cover divs that
// all start at scaleX(1) (fully covering their slice) and snap to scaleX(0)
// in a fast stagger from right-to-left, revealing the image strip by strip.
//
// After the covers retract, the image itself scales from 1.1→1 and the
// scroll parallax + brightness-on-hover take over.
//
// Nothing about this shares code or visual logic with the parallelogram reveal.
// ─────────────────────────────────────────────────────────────────────────────
function VenetianImage({
  src,
  alt = "",
  delay = 0.5,
}: {
  src: string;
  alt?: string;
  delay?: number;
}) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLImageElement>(null);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef  = useRef<HTMLDivElement>(null);

  // ── Strip reveal + image scale ───────────────────────────────────────────
  useEffect(() => {
    const outer  = outerRef.current;
    const img    = imgRef.current;
    const covers = coverRefs.current.filter(Boolean) as HTMLDivElement[];
    const badge  = badgeRef.current;
    if (!outer || !img || !covers.length) return;

    const ctx = gsap.context(() => {
      // Set initial states INSIDE context so ctx.revert() restores them on unmount
      gsap.set(covers, { scaleX: 1, transformOrigin: "right center", force3D: true, immediateRender: true });
      gsap.set(img,    { scale: 1.1, force3D: true, immediateRender: true });
      if (badge) gsap.set(badge, { opacity: 0, y: -22, scale: 0.92, force3D: true, immediateRender: true });

      const tl = gsap.timeline({ delay });

      // Each cover snaps open from right to left — fast, crisp, like blinds
      tl.to(covers, {
        scaleX: 0,
        duration: 0.42,
        ease: "power3.inOut",
        stagger: {
          each: 0.065,
          from: "end", // start from bottom strip upward
        },
        force3D: true,
      });

      // Simultaneously: image breathes in (scales down to natural size)
      tl.to(img, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out",
        force3D: true,
      }, "<+0.1");

      // Badge drops in from top after reveal
      if (badge) {
        tl.to(badge, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, ease: "back.out(1.4)", force3D: true,
        }, ">-0.1");
      }
    }, outer);

    return () => ctx.revert();
  }, [delay]);

  // ── Scroll parallax — image drifts up as section scrolls ────────────────
  useEffect(() => {
    const outer = outerRef.current;
    const img   = imgRef.current;
    if (!outer || !img) return;
    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: -50, ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top bottom", end: "bottom top",
          scrub: 1.4, invalidateOnRefresh: true,
        },
      });
    }, outer);
    return () => ctx.revert();
  }, []);

  // ── Hover: gentle brightness lift ────────────────────────────────────────
  useEffect(() => {
    const outer = outerRef.current;
    const img   = imgRef.current;
    if (!outer || !img) return;
    const onEnter = () => gsap.to(img, { filter: "brightness(1.08)", duration: 0.45, ease: "power2.out", overwrite: true });
    const onLeave = () => gsap.to(img, { filter: "brightness(1)",    duration: 0.45, ease: "power2.out", overwrite: true });
    outer.addEventListener("mouseenter", onEnter, { passive: true });
    outer.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      outer.removeEventListener("mouseenter", onEnter);
      outer.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Main image wrapper */}
      <div
        ref={outerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "480px",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 24px 64px -12px rgba(0,0,0,0.18)",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={{
            width: "100%", height: "110%", // extra height for parallax travel
            objectFit: "cover", objectPosition: "center 30%",
            display: "block",
            willChange: "transform, filter",
            transformOrigin: "center center",
          }}
        />

        {/* Warm colour grade */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, hsla(0,55%,32%,0.10) 0%, hsla(38,45%,55%,0.06) 40%, transparent 70%)`,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }} />

        {/* Bottom fade to background */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
          background: `linear-gradient(to top, ${T.warm} 0%, transparent 100%)`,
          pointerEvents: "none",
        }} />

        {/* Venetian blind covers — one per strip */}
        {Array.from({ length: STRIP_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={el => { coverRefs.current[i] = el; }}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0, right: 0,
              top:    `${(i / STRIP_COUNT) * 100}%`,
              height: `${(1 / STRIP_COUNT) * 100}%`,
              background: T.warm, // matches section bg — seamless
              zIndex: 2,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Floating badge — drops in after reveal ──────────────────────────── */}
      <div
        ref={badgeRef}
        style={{
          position: "absolute",
          top: "-1.25rem",
          right: "-1.25rem",
          opacity: 0,
          zIndex: 10,
        }}
      >
        <div style={{
          background: T.bg,
          border: `1px solid ${T.border}`,
          borderRadius: "4px",
          padding: "1rem 1.4rem",
          boxShadow: "0 8px 28px -6px rgba(0,0,0,0.13)",
          minWidth: "182px",
        }}>
          {/* Small primary rule */}
          <div style={{ height: "2px", width: "28px", background: T.primary, borderRadius: "1px", marginBottom: "0.75rem" }} />
          <p className="font-heading font-semibold"
            style={{ fontSize: "1rem", color: T.fg, lineHeight: 1.25, marginBottom: "0.25rem" }}>
            Structured adoption
          </p>
          <p className="font-body"
            style={{ fontSize: "0.75rem", color: T.muted, letterSpacing: "0.04em" }}>
            Not scattered experimentation
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── QuoteBlock ───────────────────────────────────────────────────────────────
function QuoteBlock() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { x: 24, y: 0, delay: 0.1 });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div style={{ borderLeft: `3px solid ${T.primary}`, paddingLeft: "1.75rem" }}>
        <p className="font-heading"
          style={{ fontSize: "clamp(1.2rem,2vw,1.55rem)", color: T.fg, lineHeight: 1.5, fontWeight: 500 }}>
          "AI adoption does not fail because people resist technology. It fails because people do not trust what it means for their work."
        </p>
        <span className="font-body block mt-5"
          style={{ fontSize: "0.78rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600 }}>
          Aurion's founding insight
        </span>
      </div>
    </div>
  );
}

// ─── IntroBlock ───────────────────────────────────────────────────────────────
function IntroBlock() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { x: -24, y: 0 });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <SLabel>Overview</SLabel>
      <h2 className="aurion-heading-lg mb-7 leading-tight">
        Behavioural, operational, and governance combined.
      </h2>
      <p className="font-body mb-5" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.75 }}>
        Our approach combines behavioural psychology, organisational design, and responsible AI governance.
        We help leaders understand what is happening on the ground, design workflows that fit real work,
        and build adoption rhythms that sustain momentum.
      </p>
      <p className="font-body" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.75 }}>
        Every engagement is different. But the foundation is always the same: start with what is really happening,
        then build from there.
      </p>
    </div>
  );
}

// ─── SubPageCard ──────────────────────────────────────────────────────────────
function SubPageCard({ item, delay }: { item: typeof subPages[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { y: 36, delay });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <Link to={item.path} style={{ display: "block", textDecoration: "none" }} className="group">
        <div
          style={{
            background: "hsl(35,30%,98%)", border: `1px solid ${T.border}`,
            borderRadius: "4px", padding: "1.75rem 2rem",
            transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
            boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 14px 36px -6px rgba(0,0,0,0.11)";
            e.currentTarget.style.borderColor = `hsla(0,55%,32%,0.25)`;
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 2px 10px -2px rgba(0,0,0,0.06)";
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <span className="font-body font-semibold"
              style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.primary }}>
              {item.number}
            </span>
            <span style={{ color: T.muted, fontSize: "1rem", transition: "transform 0.2s ease" }}
              className="group-hover:translate-x-1 inline-block transition-transform duration-200">
              →
            </span>
          </div>
          <h3 className="font-heading font-semibold mb-2"
            style={{ fontSize: "clamp(1.05rem,1.5vw,1.25rem)", color: T.fg }}>
            {item.label}
          </h3>
          <p className="font-body" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.65 }}>
            {item.desc}
          </p>
        </div>
      </Link>
    </div>
  );
}

// ─── Overview page ────────────────────────────────────────────────────────────
const Overview = () => {
  usePageMount();
  const gridHeaderRef = useRef<HTMLDivElement>(null);
  useScrollReveal(gridHeaderRef as React.RefObject<HTMLDivElement>, { y: 20 });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          section="How We Work"
          headline="A structured path to responsible AI adoption."
          sub="AI adoption is not a tooling project. It is a behavioural shift. Aurion helps organisations move from scattered experimentation to confident, responsible everyday use."
          ctaTo="/contact"
        />

        {/* ── Intro + image + quote ── */}
        <section style={{ background: T.warm, padding: "84px 0", overflow: "hidden" }}>
          <div className="aurion-container">
            {/* Top row: intro text left, image right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <IntroBlock />

              {/* Image with venetian reveal - using imported image */}
              <VenetianImage
                src={teamImage}
                alt="Team in a structured discussion around a boardroom table"
                delay={0.55}
              />
            </div>

            {/* Quote sits below, full-width feel but constrained */}
            <div className="max-w-2xl">
              <QuoteBlock />
            </div>
          </div>
        </section>

        {/* ── Sub-page navigator ── */}
        <section style={{ background: T.bg, padding: "84px 0" }}>
          <div className="aurion-container">
            <div ref={gridHeaderRef} className="mb-12" style={{ opacity: 0 }}>
              <SLabel>Explore the approach</SLabel>
              <h2 className="aurion-heading-lg max-w-2xl">Everything you need to know.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subPages.map((item, i) => (
                <SubPageCard key={item.path} item={item} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: T.warm, padding: "72px 0" }}>
          <div className="aurion-container text-center">
            <h2 className="aurion-heading-lg max-w-xl mx-auto mb-6">Ready to start?</h2>
            <ShimmerBtn to="/contact">Book a clarity call</ShimmerBtn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Overview;