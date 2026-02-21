import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

type Resource = {
  title: string;
  desc: string;
  url: string | null;
  status: string;
};

const resources: Resource[] = [
  {
    title: "AI Panic Meter",
    desc: "A lightweight diagnostic tool to help organisations gauge where they sit on the AI adoption spectrum. Use it to open honest conversations about readiness.",
    url: "https://ai-panic-meter.netlify.app/",
    status: "Live",
  },
  {
    title: "AI-Enabled Onboarding Workflow",
    desc: "An example of how AI can be embedded into an existing onboarding process — demonstrating practical integration without disruption.",
    url: "https://ai-onboarding-assistant.netlify.app/",
    status: "Live",
  },
  {
    title: "More tools coming",
    desc: "We're developing additional resources to support organisations at different stages of AI adoption. These will be clearly marked as evolving.",
    url: null,
    status: "Coming soon",
  },
];

const Resources = () => (
  <>
    <Navbar />
    <main>
      <section className="aurion-section">
        <div className="aurion-container">
          <SectionReveal>
            <span className="aurion-label mb-4 block">Resources</span>
            <h1 className="aurion-heading-xl max-w-3xl mb-6">
              Conversation starters, not products.
            </h1>
            <p className="aurion-body-lg max-w-2xl mb-14">
              Practical tools designed to open useful conversations about AI
              adoption in your organisation.
            </p>
          </SectionReveal>

          {/* 1 col mobile → 2 col tablet → 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {resources.map((resource, i) => (
              <SectionReveal key={i} delay={i * 0.12}>
                <HoverAnimator>
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="aurion-card flex flex-col h-full group"
                    >
                      <span className="aurion-label mb-3 block">
                        {resource.status}
                      </span>
                      <h2 className="aurion-heading-md mb-4 leading-snug group-hover:text-primary transition-colors duration-200">
                        {resource.title}
                      </h2>
                      <p className="flex-1 text-sm md:text-base font-body leading-relaxed text-muted-foreground mb-6">
                        {resource.desc}
                      </p>
                      <span className="aurion-label text-primary mt-auto">
                        Try it →
                      </span>
                    </a>
                  ) : (
                    <div className="aurion-card flex flex-col h-full opacity-70">
                      <span className="aurion-label mb-3 block">
                        {resource.status}
                      </span>
                      <h2 className="aurion-heading-md mb-4 leading-snug">
                        {resource.title}
                      </h2>
                      <p className="flex-1 text-sm md:text-base font-body leading-relaxed text-muted-foreground">
                        {resource.desc}
                      </p>
                    </div>
                  )}
                </HoverAnimator>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Resources;