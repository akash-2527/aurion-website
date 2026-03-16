import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, useScrollReveal, use3DTilt, PageHero, ShimmerBtn, SLabel } from "./shared";

gsap.registerPlugin(ScrollTrigger);

const pillarsData = [
  {
    number: "01", title: "Sensemaking & Readiness",
    tagline: "Organisations cannot design responsible AI adoption until they understand what is already happening.",
    desc: "Sensemaking creates a shared picture of reality across leaders, managers, and teams — giving organisations a grounded starting point.",
    items: ["Understanding how AI is being used across teams", "Surfacing behavioural patterns, risks, and opportunities", "Identifying where misalignment is blocking adoption", "Creating shared language across leadership and staff", "Mapping shadow AI patterns and the reasons behind them"],
  },
  {
    number: "02", title: "Workflow Enablement",
    tagline: "AI becomes sustainable when it fits naturally into real work.",
    desc: "Workflow enablement focuses on practical, repeatable patterns that reduce effort and increase confidence.",
    items: ["Designing AI-supported workflows that match real tasks", "Creating learning assets, playbooks, and prompts", "Moving from individual experimentation to team-level standards", "Reducing cognitive load and ambiguity", "Helping teams understand what good AI use looks like"],
  },
  {
    number: "03", title: "Adoption Operations",
    tagline: "Adoption grows when communication, champions, and rhythms support it.",
    desc: "Adoption is not a one-time rollout. It is a rhythm that needs reinforcement, communication, and support.",
    items: ["Enabling champion communities", "Establishing communication rhythms that reinforce governance", "Building confidence through practice, not theory", "Creating feedback loops between teams and leadership", "Measuring adoption and refining over time"],
  },
];

function PillarCard({ pillar, scrollDelay }: { pillar: typeof pillarsData[0]; scrollDelay: number }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  use3DTilt(outerRef, innerRef, glowRef, 9);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 42, rotateX: 8, transformPerspective: 900, force3D: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.85, ease: "power3.out", force3D: true, delay: scrollDelay,
        scrollTrigger: {
          trigger: el, start: () => "top 92%",
          toggleActions: "play none none none", once: true, invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [scrollDelay]);

  return (
    <div ref={outerRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
      <div ref={innerRef} style={{ transformStyle: "preserve-3d", willChange: "transform", height: "100%" }}>
        <div className="h-full" style={{ background: "hsl(35,30%,98%)", border: `1px solid ${T.border}`, borderRadius: "4px", overflow: "hidden", position: "relative", transition: "box-shadow 0.28s ease, border-color 0.28s ease", boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 18px 44px -8px rgba(0,0,0,0.11), 0 5px 16px -4px rgba(0,0,0,0.07)"; e.currentTarget.style.borderColor = "hsla(0,55%,32%,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 10px -2px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = T.border; }}>
          <div ref={glowRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div style={{ height: "3px", background: T.primary, opacity: 0.55 }} />
          <div className="p-8 md:p-10">
            <span className="font-body font-semibold block mb-6" style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: T.primary }}>{pillar.number}</span>
            <h3 className="font-heading font-semibold mb-3" style={{ fontSize: "clamp(1.15rem,1.7vw,1.45rem)", color: T.fg, lineHeight: 1.3 }}>{pillar.title}</h3>
            <p className="font-body mb-5" style={{ fontSize: "0.875rem", color: T.primary, fontWeight: 500, lineHeight: 1.6 }}>{pillar.tagline}</p>
            <div style={{ height: "1px", background: T.border, marginBottom: "1.1rem" }} />
            <p className="font-body mb-6" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.72 }}>{pillar.desc}</p>
            <ul className="space-y-2.5">
              {pillar.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 font-body" style={{ fontSize: "0.8125rem", color: T.muted, lineHeight: 1.6 }}>
                  <span style={{ flexShrink: 0, marginTop: "6px", width: "4px", height: "4px", borderRadius: "50%", background: T.primary, opacity: 0.6 }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const WhatWeDo = () => {
  usePageMount();
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef as React.RefObject<HTMLDivElement>, { y: 22 });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          section="What Aurion Does"
          headline="Three pillars of practical AI enablement."
          sub="Aurion's work is built on three pillars that address the behavioural, operational, and governance needs of modern organisations navigating AI adoption."
          ctaTo="/contact"
          backTo="/how-we-work"
          backLabel="How We Work"
        />

        <section style={{ background: T.bg, padding: "88px 0" }}>
          <div className="aurion-container">
            <div ref={headerRef} className="mb-16" style={{ opacity: 0 }}>
              <SLabel>The Three Pillars</SLabel>
              <h2 className="aurion-heading-lg max-w-2xl">Each pillar addresses a different layer of adoption.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {pillarsData.map((p, i) => <PillarCard key={p.number} pillar={p} scrollDelay={i * 0.1} />)}
            </div>
          </div>
        </section>

        <section style={{ background: T.warm, padding: "72px 0" }}>
          <div className="aurion-container text-center">
            <h2 className="aurion-heading-lg max-w-xl mx-auto mb-6">Want to understand the approach in depth?</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <ShimmerBtn to="/contact">Book a clarity call</ShimmerBtn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WhatWeDo;    