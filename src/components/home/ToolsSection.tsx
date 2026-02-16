import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

const tools = [
  {
    title: "AI Panic Meter",
    desc: "A lightweight diagnostic tool to help organisations gauge where they sit on the AI adoption spectrum.",
    url: "https://ai-panic-meter.netlify.app/",
  },
  {
    title: "Workflow Demo",
    desc: "An example of an AI-enabled onboarding workflow showing how AI fits into real processes.",
    url: "https://ai-onboarding-assistant.netlify.app/",
  },
];

const ToolsSection = () => (
  <section className="aurion-section bg-aurion-warm">
    <div className="aurion-container">
      <SectionReveal>
        <span className="aurion-label mb-4 block">Tools & Resources</span>
        <h2 className="aurion-heading-lg max-w-2xl mb-6">
          Conversation starters, not products.
        </h2>
        <p className="aurion-body-lg max-w-2xl mb-14">
          These resources are designed to open useful conversations about AI adoption in your organisation.
        </p>
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool, i) => (
          <SectionReveal key={i} delay={i * 0.12}>
            <HoverAnimator>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aurion-card block h-full group"
              >
                <h3 className="aurion-heading-md mb-4 group-hover:text-primary transition-colors">{tool.title}</h3>
                <p className="aurion-body mb-6">{tool.desc}</p>
                <span className="aurion-label text-primary">Explore →</span>
              </a>
            </HoverAnimator>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ToolsSection;
