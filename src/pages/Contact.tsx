import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

const Contact = () => (
  <>
    <Navbar />
    <main>
      <section className="aurion-section">
        <div className="aurion-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <SectionReveal>
              <span className="aurion-label mb-4 block">Contact</span>
              <h1 className="aurion-heading-xl mb-6">
                Let's have a conversation.
              </h1>
              <p className="aurion-body-lg mb-8">
                No pitch. No pressure. Just a space to discuss where AI is showing up in your organisation and what kind of enablement might be useful.
              </p>
              <div className="aurion-divider mb-8" />
              <div className="space-y-4">
                <p className="aurion-body">
                  <span className="font-medium text-foreground">Email: </span>
                  <a href="mailto:hello@aurion.co" className="text-primary hover:underline">hello@aurion.co</a>
                </p>
                <p className="aurion-body">
                  <span className="font-medium text-foreground">Clarity Call: </span>
                  Free 30-minute session
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="aurion-card">
                <h2 className="aurion-heading-md mb-6">Book a clarity call</h2>
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div>
                    <label className="aurion-label block mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="aurion-label block mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="aurion-label block mb-2">Organisation</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Your organisation"
                    />
                  </div>
                  <div>
                    <label className="aurion-label block mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px] resize-y"
                      placeholder="Tell us briefly about your AI adoption situation..."
                    />
                  </div>
                  <HoverAnimator className="inline-block">
                    <button type="submit" className="aurion-btn-primary w-full md:w-auto">
                      Send message
                    </button>
                  </HoverAnimator>
                </form>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Contact;
