import SectionReveal from "@/motion/SectionReveal";
import PhaseTimeline from "@/motion/PhaseTimeline";

const phases = [
  {
    title: "Discover",
    items: [
      "Stakeholder conversations",
      "Readiness diagnostics",
      "Mapping current AI usage",
    ],
  },
  {
    title: "Design",
    items: [
      "Priority workflows",
      "Enablement assets",
      "Learning design and playbooks",
    ],
  },
  {
    title: "Deploy",
    items: [
      "Champion enablement",
      "Communication cascades",
      "Office hours and support structures",
    ],
  },
  {
    title: "Demonstrate",
    items: [
      "Impact tracking",
      "Iteration and refinement",
      "Scaling adoption responsibly",
    ],
  },
];

const HowWeWorkSection = () => (
  <section className="aurion-section bg-aurion-warm">
    <div className="aurion-container">
      <SectionReveal>
        <span className="aurion-label mb-4 block">How We Work</span>
        <h2 className="aurion-heading-lg max-w-2xl mb-6">
          Four phases. One clear path forward.
        </h2>
        <p className="aurion-body-lg max-w-2xl mb-14">
          Every engagement follows a structured but flexible model — designed to meet organisations where they are.
        </p>
      </SectionReveal>

      <PhaseTimeline phases={phases} />
    </div>
  </section>
);

export default HowWeWorkSection;
