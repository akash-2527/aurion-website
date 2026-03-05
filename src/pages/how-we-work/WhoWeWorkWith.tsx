import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { T, usePageMount, useScrollReveal, PageHero, ShimmerBtn, SLabel } from "./shared";

const goodFit = [
  { label: "Mid-to-large organisations navigating AI rollout",         desc: "Organisations with enough scale that AI adoption becomes a governance and culture challenge, not just a tooling decision." },
  { label: "Leadership teams seeking clarity and alignment",            desc: "Senior teams who recognise they need a shared framework before they can lead AI adoption effectively." },
  { label: "HR, L&D, and enablement teams building capability",        desc: "Functions responsible for making AI adoption practical, safe, and sustainable across the workforce." },
  { label: "Operations teams redesigning workflows for AI",             desc: "Teams looking to embed AI into real work processes — not just experiment with tools." },
  { label: "Organisations experiencing shadow AI",                     desc: "Where informal AI use is already happening and leadership wants to understand and govern it." },
  { label: "Organisations wanting to reduce risk and increase confidence", desc: "Leadership teams who see adoption as a risk management priority as much as a capability one." },
];

const notFit = [
  { label: "Technical implementation or engineering",   desc: "Aurion does not build, deploy, or integrate AI systems or infrastructure." },
  { label: "One-off AI training sessions",              desc: "We do not run standalone training events or e-learning modules." },
  { label: "Tool-specific certification programmes",    desc: "We do not certify people in specific AI platforms or products." },
];

function GoodFitCard({ item, delay }: { item: typeof goodFit[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref as React.RefObject<HTMLDivElement>, { y: 28, delay });
  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <div style={{ background: "hsl(30,22%,94%)", border: `1px solid ${T.border}`, borderRadius: "4px", padding: "1.5rem 1.75rem", height: "100%", transition: "box-shadow 0.22s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.09)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}>
        <div className="flex items-start gap-3 mb-3">
          <span style={{ flexShrink: 0, marginTop: "7px", width: "6px", height: "6px", borderRadius: "50%", background: T.primary, opacity: 0.65 }} aria-hidden="true" />
          <h3 className="font-body font-semibold" style={{ fontSize: "0.9rem", color: T.fg, lineHeight: 1.45 }}>{item.label}</h3>
        </div>
        <p className="font-body ml-[18px]" style={{ fontSize: "0.8125rem", color: T.muted, lineHeight: 1.65 }}>{item.desc}</p>
      </div>
    </div>
  );
}

const WhoWeWorkWith = () => {
  usePageMount();
  const headerRef   = useRef<HTMLDivElement>(null);
  const notFitRef   = useRef<HTMLDivElement>(null);
  const closingRef  = useRef<HTMLDivElement>(null);

  useScrollReveal(headerRef  as React.RefObject<HTMLDivElement>, { y: 20 });
  useScrollReveal(notFitRef  as React.RefObject<HTMLDivElement>, { y: 24, delay: 0.05 });
  useScrollReveal(closingRef as React.RefObject<HTMLDivElement>, { y: 18 });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          section="Who We Work With"
          headline="Organisations that want to adopt AI responsibly."
          sub="Aurion works with organisations that recognise AI adoption is an organisational challenge — not just a technology one — and want to approach it with clarity, governance, and practical enablement."
          ctaTo="/contact"
        />

        {/* Good fit */}
        <section style={{ background: T.bg, padding: "88px 0" }}>
          <div className="aurion-container">
            <div ref={headerRef} className="mb-12" style={{ opacity: 0 }}>
              <SLabel>Aurion is the right fit for</SLabel>
              <h2 className="aurion-heading-lg max-w-2xl">Organisations navigating the human side of AI.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {goodFit.map((item, i) => <GoodFitCard key={i} item={item} delay={i * 0.07} />)}
            </div>
          </div>
        </section>

        {/* Not a fit */}
        <section style={{ background: T.warm, padding: "72px 0" }}>
          <div className="aurion-container">
            <div ref={notFitRef} className="max-w-3xl" style={{ opacity: 0 }}>
              <SLabel>Aurion is not the right fit for</SLabel>
              <h2 className="aurion-heading-lg mb-10">Being honest about fit.</h2>
              <div className="space-y-5">
                {notFit.map((item, i) => (
                  <div key={i} className="flex items-start gap-5" style={{ paddingBottom: "1.25rem", borderBottom: i < notFit.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ flexShrink: 0, marginTop: "8px", width: "6px", height: "6px", borderRadius: "50%", background: "hsl(30,15%,70%)" }} aria-hidden="true" />
                    <div>
                      <p className="font-body font-semibold mb-1" style={{ fontSize: "0.9rem", color: "hsl(15,10%,40%)" }}>{item.label}</p>
                      <p className="font-body" style={{ fontSize: "0.8125rem", color: T.muted, lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing statement + CTA */}
        <section style={{ background: T.bg, padding: "72px 0" }}>
          <div className="aurion-container">
            <div ref={closingRef} className="max-w-2xl" style={{ opacity: 0 }}>
              <div style={{ borderLeft: `3px solid ${T.primary}`, paddingLeft: "1.75rem", marginBottom: "2.5rem" }}>
                <p className="font-heading" style={{ fontSize: "clamp(1.1rem,1.8vw,1.4rem)", color: T.fg, lineHeight: 1.55, fontWeight: 500 }}>
                  Aurion is the right fit for organisations that want behavioural clarity, responsible adoption, and practical workflows that support everyday use.
                </p>
              </div>
              <ShimmerBtn to="/contact">Explore if we are the right fit</ShimmerBtn>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default WhoWeWorkWith;