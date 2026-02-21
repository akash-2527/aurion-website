import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

type CaseStudy = {
  label: string;
  title: string;
  desc: string;
};

const caseStudies: CaseStudy[] = [
  {
    label: "Public Sector",
    title: "Organisational AI Enablement",
    desc: "Supporting a cultural institution to move from ad-hoc AI experimentation to structured, responsible adoption across teams.",
  },
  {
    label: "Demo",
    title: "AI-Enabled Onboarding Workflow",
    desc: "A demonstration of how AI can be woven into existing onboarding processes to improve consistency and reduce manual effort.",
  },
  {
    label: "Small Business",
    title: "AI Adoption in Events",
    desc: "Helping a small events organisation understand where AI could add value without overwhelming existing workflows.",
  },
];

const ProofSection = () => (
  <section className="aurion-section">
    <div className="aurion-container">
      <SectionReveal>
        <span className="aurion-label mb-4 block">Proof & Credibility</span>
        <h2 className="aurion-heading-lg max-w-2xl mb-6">
          Applied work. Real organisations. Practical outcomes.
        </h2>
        <div className="aurion-divider mb-14" />
      </SectionReveal>

      {/* 1 col mobile → 2 col tablet → 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {caseStudies.map((study, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <HoverAnimator>
              <div className="aurion-card h-full flex flex-col">
                <span className="aurion-label mb-3 block">{study.label}</span>
                <h3 className="aurion-heading-md mb-4 leading-snug">
                  {study.title}
                </h3>
                <p className="flex-1 text-sm md:text-base font-body leading-relaxed text-muted-foreground">
                  {study.desc}
                </p>
              </div>
            </HoverAnimator>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProofSection;