import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, useScrollReveal, PageHero, ShimmerBtn, SLabel } from "./shared";

// Quick-nav cards to sub-pages
const subPages = [
  { number: "01", label: "What Aurion Does",         path: "/how-we-work/what-we-do",       desc: "Three pillars of practical AI enablement." },
  { number: "02", label: "Four Phase Model",          path: "/how-we-work/phases",            desc: "One clear path. Four focused phases." },
  { number: "03", label: "AI Trust Gap & Framework",  path: "/how-we-work/trust-gap",         desc: "The flagship behavioural lens for AI adoption." },
  { number: "04", label: "Who We Work With",          path: "/how-we-work/who-we-work-with",  desc: "Organisations that want responsible adoption." },
];

function QuoteBlock() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { x: 24, y: 0, delay: 0.1 });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div style={{ borderLeft: `3px solid ${T.primary}`, paddingLeft: "1.75rem" }}>
        <p className="font-heading" style={{ fontSize: "clamp(1.2rem,2vw,1.55rem)", color: T.fg, lineHeight: 1.5, fontWeight: 500 }}>
          "AI adoption does not fail because people resist technology. It fails because people do not trust what it means for their work."
        </p>
        <span className="font-body block mt-5"
          style={{ fontSize: "0.78rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600 }}>
          — Aurion's founding insight
        </span>
      </div>
    </div>
  );
}

function IntroBlock() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { x: -24, y: 0 });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <SLabel>Overview</SLabel>
      <h2 className="aurion-heading-lg mb-7 leading-tight">Behavioural, operational, and governance — combined.</h2>
      <p className="font-body mb-5" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.75 }}>
        Our approach combines behavioural psychology, organisational design, and responsible AI governance. We help leaders understand what is happening on the ground, design workflows that fit real work, and build adoption rhythms that sustain momentum.
      </p>
      <p className="font-body" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.75 }}>
        Every engagement is different. But the foundation is always the same — start with what is really happening, then build from there.
      </p>
    </div>
  );
}

function SubPageCard({ item, delay }: { item: typeof subPages[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { y: 36, delay });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <Link
        to={item.path}
        style={{ display: "block", textDecoration: "none" }}
        className="group"
      >
        <div
          style={{
            background: "hsl(35,30%,98%)", border: `1px solid ${T.border}`,
            borderRadius: "4px", padding: "1.75rem 2rem",
            transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
            boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 14px 36px -6px rgba(0,0,0,0.11)";
            e.currentTarget.style.borderColor = `hsla(0,55%,32%,0.25)`;
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
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

        {/* Intro + quote */}
        <section style={{ background: T.warm, padding: "84px 0" }}>
          <div className="aurion-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <IntroBlock />
              <QuoteBlock />
            </div>
          </div>
        </section>

        {/* Sub-page navigator */}
        <section style={{ background: T.bg, padding: "84px 0" }}>
          <div className="aurion-container">
            <div ref={gridHeaderRef} className="mb-12" style={{ opacity: 0 }}>
              <SLabel>Explore the approach</SLabel>
              <h2 className="aurion-heading-lg max-w-2xl">Everything you need to know.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {subPages.map((item, i) => <SubPageCard key={item.path} item={item} delay={i * 0.08} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
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