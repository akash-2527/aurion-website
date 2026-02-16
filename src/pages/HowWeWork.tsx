import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";
import PhaseTimeline from "@/motion/PhaseTimeline";

const phases = [
  {
    title: "Discover",
    items: [
      "Stakeholder conversations to understand priorities and concerns",
      "Readiness diagnostics to baseline where the organisation sits",
      "Mapping current AI usage — formal and informal",
    ],
  },
  {
    title: "Design",
    items: [
      "Identify priority workflows for AI integration",
      "Build enablement assets — playbooks, prompts, learning paths",
      "Design learning experiences tailored to roles and contexts",
    ],
  },
  {
    title: "Deploy",
    items: [
      "Champion enablement — equipping internal advocates",
      "Communication cascades to build awareness and trust",
      "Office hours and support structures for ongoing guidance",
    ],
  },
  {
    title: "Demonstrate",
    items: [
      "Impact tracking tied to real outcomes",
      "Iteration and refinement based on feedback",
      "Scaling adoption responsibly across the organisation",
    ],
  },
];

const HowWeWork = () => (
  <>
    <Navbar />
    <main className="pt-24">
      <section className="aurion-section">
        <div className="aurion-container">
          <SectionReveal>
            <span className="aurion-label mb-4 block">How We Work</span>
            <h1 className="aurion-heading-xl max-w-3xl mb-6">
              A structured path to confident AI adoption.
            </h1>
            <p className="aurion-body-lg max-w-2xl mb-14">
              Every engagement follows our four-phase model — designed to meet organisations where they are and move them toward embedded, responsible AI usage.
            </p>
          </SectionReveal>
          <PhaseTimeline phases={phases} />
        </div>
      </section>

      <section className="aurion-section bg-aurion-warm">
        <div className="aurion-container">
          <SectionReveal>
            <span className="aurion-label mb-4 block">Who We Work With</span>
            <h2 className="aurion-heading-lg max-w-2xl mb-6">
              Built for mid to large organisations navigating AI.
            </h2>
            <p className="aurion-body-lg max-w-2xl">
              We partner with leadership teams, operations, learning & development, and enablement functions who recognise that AI adoption is an organisational challenge — not just a technology one.
            </p>
          </SectionReveal>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default HowWeWork;
