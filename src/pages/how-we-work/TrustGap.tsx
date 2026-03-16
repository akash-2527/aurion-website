import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, useScrollReveal, PageHero, ShimmerBtn, SLabel } from "./shared";

gsap.registerPlugin(ScrollTrigger);

const trustNodes = [
  { n: "01", heading: "People do not know what is safe",         body: "Teams stay quiet or experiment informally — not because they resist, but because expectations have not been clearly set." },
  { n: "02", heading: "Peer norms replace policy",               body: "When governance is absent, people copy colleagues. This creates uneven, ungoverned adoption across the organisation." },
  { n: "03", heading: "Shadow AI becomes the default",           body: "Shadow AI is a signal — not a failure. It tells you precisely where trust and clarity are missing." },
  { n: "04", heading: "Leaders see tools; teams feel identity",  body: "A technology rollout at the leadership level is an identity question at the team level. That gap is where adoption fails." },
];

const frameworkItems = [
  "What people fear about AI in their work",
  "What people assume will happen to their role",
  "What people need to feel psychologically safe",
  "How trust is built or broken through communication",
  "How expectations must be set and maintained",
  "How governance and behaviour interact over time",
];

const outcomes = [
  "Reduce shadow AI across teams",
  "Build clarity and organisational alignment",
  "Strengthen psychological safety around AI use",
  "Support managers in guiding their teams",
  "Enable confident, everyday AI use",
];

function TrustGapNodes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nodeRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = nodeRefs.current.filter((el): el is HTMLDivElement => el !== null);
    gsap.set(nodes, { opacity: 0, x: -20, force3D: true });
    const ctx = gsap.context(() => {
      nodes.forEach((node, i) => {
        gsap.to(node, {
          opacity: 1, x: 0, duration: 0.72, ease: "power2.out", force3D: true,
          delay: i * 0.09,
          scrollTrigger: { trigger: node, start: () => "top 92%", toggleActions: "play none none none", once: true, invalidateOnRefresh: true },
        });
      });
    }, sectionRef.current ?? undefined);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {trustNodes.map((node, i) => (
        <div key={node.n} ref={(el) => { nodeRefs.current[i] = el; }}
          className="py-6" style={{ opacity: 0, borderBottom: i < trustNodes.length - 1 ? `1px solid ${T.offRule}` : "none", willChange: "opacity, transform" }}>
          <div className="flex items-start gap-5">
            <span className="font-body font-semibold flex-shrink-0 mt-0.5" style={{ fontSize: "11px", letterSpacing: "0.2em", color: T.offMute }}>{node.n}</span>
            <div>
              <h3 className="font-heading font-medium mb-2" style={{ fontSize: "clamp(0.95rem,1.25vw,1.08rem)", color: T.offWhite }}>{node.heading}</h3>
              <p className="font-body" style={{ fontSize: "0.875rem", color: T.offDim, lineHeight: 1.72 }}>{node.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const TrustGap = () => {
  usePageMount();

  const darkHeaderRef  = useRef<HTMLDivElement>(null);
  const frameworkRef   = useRef<HTMLDivElement>(null);
  const outcomesRef    = useRef<HTMLDivElement>(null);
  const quoteRef       = useRef<HTMLDivElement>(null);

  useScrollReveal(darkHeaderRef  as React.RefObject<HTMLDivElement>, { y: 22, start: "top 90%" });
  useScrollReveal(frameworkRef   as React.RefObject<HTMLDivElement>, { x: 24, y: 0, delay: 0.08 });
  useScrollReveal(outcomesRef    as React.RefObject<HTMLDivElement>, { y: 20, delay: 0.1 });
  useScrollReveal(quoteRef       as React.RefObject<HTMLDivElement>, { y: 18, delay: 0.05 });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          section="AI Trust Gap & Framework"
          headline="AI adoption fails when people do not trust what it means for their work."
          sub="The Trust Gap is not a mystery. It is the psychological contract shifting in real time — and the organisations that name it directly are the ones that close it."
          ctaTo="/contact"
          backTo="/how-we-work"
          backLabel="How We Work"
        />

        {/* Dark section — Trust Gap signals */}
        <section style={{ background: T.dark, padding: "88px 0" }}>
          <div className="aurion-container">
            <div ref={darkHeaderRef} className="mb-12 max-w-2xl" style={{ opacity: 0 }}>
              <span className="font-body font-semibold uppercase block mb-6" style={{ fontSize: "11px", letterSpacing: "0.22em", color: T.offMute }}>
                The AI Trust Gap
              </span>
              <h2 className="font-heading font-semibold leading-tight mb-6" style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", color: T.offWhite }}>
                Where the Trust Gap appears
              </h2>
              <p className="font-body" style={{ fontSize: "clamp(0.95rem,1.3vw,1.05rem)", color: T.offDim, lineHeight: 1.75 }}>
                The Trust Gap appears when the unwritten expectations between people and their organisation shift — and nobody names it.
              </p>
            </div>
            <TrustGapNodes />
          </div>
        </section>

        {/* Framework — warm bg */}
        <section style={{ background: T.warm, padding: "88px 0" }}>
          <div className="aurion-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

              <div ref={frameworkRef} style={{ opacity: 0 }}>
                <SLabel>The Framework</SLabel>
                <h2 className="aurion-heading-lg mb-6 leading-tight">AI Psychological Contract Framework</h2>
                <p className="font-body mb-8" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.75 }}>
                  The psychological contract is the unwritten set of expectations between people and their organisation. When AI enters the workflow, this contract changes — and people feel it before leaders see it.
                </p>
                <p className="font-body mb-8" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.75 }}>
                  The AI Psychological Contract Framework helps leaders understand:
                </p>
                <ul className="space-y-3">
                  {frameworkItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 font-body" style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.65 }}>
                      <span style={{ flexShrink: 0, marginTop: "7px", width: "5px", height: "5px", borderRadius: "50%", background: T.primary, opacity: 0.65 }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div ref={outcomesRef} style={{ opacity: 0 }}>
                <div style={{ background: "hsl(35,30%,98%)", border: `1px solid ${T.border}`, borderRadius: "4px", padding: "2.25rem", marginBottom: "1.5rem" }}>
                  <SLabel>What this framework enables</SLabel>
                  <ul className="space-y-3.5">
                    {outcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 font-body" style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.65 }}>
                        <span style={{ flexShrink: 0, marginTop: "7px", width: "5px", height: "5px", borderRadius: "50%", background: T.primary, opacity: 0.6 }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: "hsl(35,30%,98%)", border: `1px solid ${T.border}`, borderRadius: "4px", padding: "2rem", borderLeft: `3px solid ${T.primary}` }}>
                  <p className="font-body font-semibold uppercase mb-3" style={{ fontSize: "10px", letterSpacing: "0.2em", color: T.primary }}>Aurion's signature lens</p>
                  <p className="font-body" style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.7 }}>
                    This framework is the foundation of Aurion's approach to responsible AI adoption and the anchor of all adoption work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder quote + CTA */}
        <section style={{ background: T.bg, padding: "72px 0" }}>
          <div className="aurion-container">
            <div ref={quoteRef} className="max-w-3xl mx-auto text-center" style={{ opacity: 0 }}>
              <span className="font-heading select-none block" style={{ fontSize: "5rem", color: `${T.primary}18`, lineHeight: 1, marginBottom: "-1rem" }} aria-hidden="true">"</span>
              <blockquote>
                <p className="font-heading font-medium mb-8" style={{ fontSize: "clamp(1.1rem,2vw,1.55rem)", color: T.fg, lineHeight: 1.55 }}>
                  This is fundamentally a psychological contract issue. People want to know what is safe, what is valued, and what will change. When leaders do not say it, teams fill the gaps themselves.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `${T.primary}12`, border: `1px solid ${T.border}`, flexShrink: 0 }} />
                  <div className="text-left">
                    <p className="font-body font-semibold" style={{ fontSize: "0.85rem", color: T.fg }}>Founder, Aurion</p>
                    <p className="font-body" style={{ fontSize: "0.76rem", color: T.muted, marginTop: "2px" }}>AI Adoption &amp; Enablement Consultant</p>
                  </div>
                </div>
              </blockquote>
            </div>

            <div className="text-center mt-12">
              <ShimmerBtn to="/contact">Book a clarity call to discuss the Trust Gap</ShimmerBtn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TrustGap;