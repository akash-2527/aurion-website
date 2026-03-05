import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, useScrollReveal, PageHero, ShimmerBtn, SLabel } from "./shared";

gsap.registerPlugin(ScrollTrigger);

const phasesData = [
  {
    number: "1", title: "Discover", color: "hsla(0,55%,32%,0.08)",
    desc: "Understand the current state of AI use and the behavioural patterns shaping it.",
    items: ["Stakeholder conversations", "Behavioural and readiness diagnostics", "Mapping current AI usage and shadow patterns", "Understanding leadership alignment and gaps", "Identifying opportunities and risks"],
    outcome: "Discover gives leaders a clear, honest picture of what is happening on the ground.",
  },
  {
    number: "2", title: "Design", color: "hsla(0,55%,32%,0.06)",
    desc: "Create practical, responsible workflows and enablement assets that fit real work.",
    items: ["Designing priority workflows", "Creating learning assets, playbooks, and prompts", "Developing decision guidelines and human-in-the-loop rules", "Building communication frameworks for leaders and managers", "Aligning workflows with governance and risk expectations"],
    outcome: "Design turns insights into practical, usable tools.",
  },
  {
    number: "3", title: "Deploy", color: "hsla(0,55%,32%,0.04)",
    desc: "Build confidence and momentum across teams through supported, practical engagement.",
    items: ["Champion enablement", "Communication cascades", "Office hours and support structures", "Team-level workflow practice", "Normalising AI as part of everyday work"],
    outcome: "Deploy helps teams move from theory to confident practice.",
  },
  {
    number: "4", title: "Demonstrate", color: "hsla(0,55%,32%,0.03)",
    desc: "Measure impact, refine workflows, and scale adoption responsibly over time.",
    items: ["Tracking behavioural and adoption metrics", "Measuring workflow impact", "Identifying friction points", "Refining workflows and guidelines", "Scaling adoption across teams"],
    outcome: "Demonstrate helps organisations sustain responsible AI use over time.",
  },
];

function PhaseBlock({ phase, index }: { phase: typeof phasesData[0]; index: number }) {
  const ref      = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLSpanElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el  = ref.current;
    const num = numRef.current;
    const line = lineRef.current;
    if (!el || !num) return;
    const isEven = index % 2 === 0;
    gsap.set(el,  { opacity: 0, x: isEven ? -32 : 32, force3D: true });
    gsap.set(num, { color: T.border });
    if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center", force3D: true });

    const ctx = gsap.context(() => {
      const st = { trigger: el, start: () => "top 88%", toggleActions: "play none none none", once: true, invalidateOnRefresh: true };
      gsap.to(el,  { opacity: 1, x: 0, duration: 0.85, ease: "power3.out", force3D: true, scrollTrigger: st });
      gsap.to(num, { color: T.primary, duration: 0.6, ease: "power2.out", delay: 0.3, scrollTrigger: st });
      if (line) gsap.to(line, { scaleX: 1, duration: 0.8, ease: "power2.inOut", delay: 0.4, force3D: true, scrollTrigger: st });
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start py-12"
      style={{ opacity: 0, borderBottom: index < phasesData.length - 1 ? `1px solid ${T.border}` : "none" }}>

      {/* Number col */}
      <div className="md:col-span-2 flex md:flex-col items-center md:items-start gap-4 md:gap-0">
        <span ref={numRef} className="font-heading font-bold select-none"
          style={{ fontSize: "clamp(3rem,6vw,5rem)", lineHeight: 1, color: T.border, transition: "color 0.35s ease" }} aria-hidden="true">
          {phase.number}
        </span>
        <span className="font-heading font-semibold md:mt-2"
          style={{ fontSize: "clamp(1.1rem,1.5vw,1.3rem)", color: T.fg }}>
          {phase.title}
        </span>
      </div>

      {/* Content col */}
      <div className="md:col-span-10">
        {/* Animated rule */}
        <div style={{ position: "relative", height: "2px", marginBottom: "1.5rem" }}>
          <div style={{ position: "absolute", inset: 0, background: T.border }} />
          <div ref={lineRef} style={{ position: "absolute", inset: 0, background: T.primary, opacity: 0.5, transform: "scaleX(0)", transformOrigin: "left center", willChange: "transform" }} />
        </div>

        <p className="font-body mb-7" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.7 }}>{phase.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-6">
          {phase.items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 font-body" style={{ fontSize: "0.875rem", color: T.muted, lineHeight: 1.6 }}>
              <span style={{ flexShrink: 0, marginTop: "7px", width: "5px", height: "5px", borderRadius: "50%", background: T.primary, opacity: 0.6 }} aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>

        <div style={{ background: phase.color, borderLeft: `3px solid ${T.primary}`, padding: "0.875rem 1.25rem", borderRadius: "0 4px 4px 0" }}>
          <p className="font-body italic" style={{ fontSize: "0.9rem", color: T.primary, fontWeight: 500 }}>{phase.outcome}</p>
        </div>
      </div>
    </div>
  );
}

const FourPhases = () => {
  usePageMount();
  const headerRef = useRef<HTMLDivElement>(null);
  useScrollReveal(headerRef as React.RefObject<HTMLDivElement>, { y: 20 });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          section="The Four Phase Model"
          headline="One clear path. Four focused phases."
          sub="Every engagement follows a structured but flexible model — designed to meet organisations where they are and move them toward embedded, responsible AI usage."
          ctaTo="/contact"
        />

        <section style={{ background: T.bg, padding: "88px 0" }}>
          <div className="aurion-container">
            <div ref={headerRef} className="mb-4" style={{ opacity: 0 }}>
              <SLabel>The Model</SLabel>
              <h2 className="aurion-heading-lg max-w-2xl mb-4">Each phase builds on the last.</h2>
              <p className="font-body max-w-xl" style={{ fontSize: "1.05rem", color: T.muted, lineHeight: 1.7 }}>
                The model is flexible — some engagements start at Phase 2 or 3. But the logic always flows the same way: understand first, then build, then deploy, then demonstrate.
              </p>
            </div>

            <div>
              {phasesData.map((phase, i) => <PhaseBlock key={phase.number} phase={phase} index={i} />)}
            </div>
          </div>
        </section>

        <section style={{ background: T.warm, padding: "72px 0" }}>
          <div className="aurion-container text-center">
            <h2 className="aurion-heading-lg max-w-xl mx-auto mb-6">Not sure where your organisation sits?</h2>
            <ShimmerBtn to="/contact">Book a discovery conversation</ShimmerBtn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FourPhases;