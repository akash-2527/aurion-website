import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";

const About = () => (
  <>
    <Navbar />
    <main>
      <section className="aurion-section">
        <div className="aurion-container">
          <SectionReveal>
            <span className="aurion-label mb-4 block">About Aurion</span>
            <h1 className="aurion-heading-xl max-w-3xl mb-6">
              Someone who understands how organisations actually work.
            </h1>
            <div className="aurion-divider mb-10" />
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SectionReveal delay={0.1}>
              <div className="space-y-6">
                <p className="aurion-body-lg">
                  Aurion exists at the intersection of AI adoption, organisational change, learning design, and responsible technology use.
                </p>
                <p className="aurion-body">
                  We are not a technical AI, ML, or engineering consultancy. Our work focuses on helping organisations move from fragmented, individual AI experimentation to structured, responsible, everyday AI usage — embedded into workflows and ways of working.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h3 className="aurion-heading-md mb-3">Human-Centred Adoption</h3>
                  <p className="aurion-body">
                    We believe AI adoption is fundamentally about people — their confidence, their workflows, and their willingness to change. Technology is secondary.
                  </p>
                </div>
                <div>
                  <h3 className="aurion-heading-md mb-3">Calm Leadership</h3>
                  <p className="aurion-body">
                    In a world full of AI hype, we bring measured, thoughtful guidance. No panic, no pressure — just clarity.
                  </p>
                </div>
                <div>
                  <h3 className="aurion-heading-md mb-3">Practical Over Theoretical</h3>
                  <p className="aurion-body">
                    We focus on enablement that sticks — playbooks, workflows, and support structures that teams actually use.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
