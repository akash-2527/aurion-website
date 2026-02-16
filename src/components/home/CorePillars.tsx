import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

const pillars = [
  {
    title: "Sensemaking & Readiness",
    items: [
      "Understand how AI is currently being used",
      "Surface risks, opportunities, and behaviours",
      "Create shared language and alignment",
    ],
  },
  {
    title: "Workflow Enablement",
    items: [
      "Design repeatable AI-supported workflows",
      "Create learning assets, playbooks, and prompts",
      "Move from individual experimentation to team standards",
    ],
  },
  {
    title: "Adoption Operations",
    items: [
      "Enable champion communities",
      "Establish communication and enablement rhythms",
      "Measure adoption and iterate",
    ],
  },
];

const CorePillars = () => (
  <section className="aurion-section">
    <div className="aurion-container">
      <SectionReveal>
        <span className="aurion-label mb-4 block">What We Do</span>
        <h2 className="aurion-heading-lg max-w-2xl mb-6">
          Three pillars of practical AI enablement.
        </h2>
        <div className="aurion-divider mb-14" />
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, i) => (
          <SectionReveal key={i} delay={i * 0.12}>
            <HoverAnimator>
              <div className="aurion-card h-full">
                <span className="aurion-label text-primary mb-3 block">Pillar {i + 1}</span>
                <h3 className="aurion-heading-md mb-6">{pillar.title}</h3>
                <ul className="space-y-3">
                  {pillar.items.map((item, j) => (
                    <li key={j} className="aurion-body flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </HoverAnimator>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CorePillars;
