import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

const studies = [
  {
    label: "Public Sector / Cultural Institution",
    title: "Organisational AI Enablement",
    desc: "Supporting a cultural institution to move from ad-hoc AI experimentation to structured, responsible adoption across teams. This involved stakeholder alignment, readiness diagnostics, and the development of practical enablement resources.",
  },
  {
    label: "Demo",
    title: "AI-Enabled Onboarding Workflow",
    desc: "A demonstration project showing how AI can be integrated into existing onboarding processes to improve consistency, reduce manual effort, and create a better experience for new starters.",
    link: "https://ai-onboarding-assistant.netlify.app/",
  },
  {
    label: "Small Business / Events Organisation",
    title: "AI Adoption in a Small Business",
    desc: "Helping a small events organisation understand where AI could genuinely add value without overwhelming existing workflows or requiring significant technical investment.",
  },
];

const CaseStudies = () => (
  <>
    <Navbar />
    <main className="pt-24">
      <section className="aurion-section">
        <div className="aurion-container">
          <SectionReveal>
            <span className="aurion-label mb-4 block">Case Studies</span>
            <h1 className="aurion-heading-xl max-w-3xl mb-6">
              Real work. Practical outcomes.
            </h1>
            <p className="aurion-body-lg max-w-2xl mb-14">
              Examples of how Aurion has supported organisations in moving toward structured, responsible AI adoption.
            </p>
          </SectionReveal>

          <div className="space-y-8">
            {studies.map((study, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <HoverAnimator>
                  <div className="aurion-card">
                    <span className="aurion-label mb-3 block">{study.label}</span>
                    <h2 className="aurion-heading-md mb-4">{study.title}</h2>
                    <p className="aurion-body mb-4">{study.desc}</p>
                    {study.link && (
                      <a href={study.link} target="_blank" rel="noopener noreferrer" className="aurion-label text-primary">
                        View demo →
                      </a>
                    )}
                  </div>
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

export default CaseStudies;
