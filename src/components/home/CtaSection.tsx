import { Link } from "react-router-dom";
import SectionReveal from "@/motion/SectionReveal";
import HoverAnimator from "@/motion/HoverAnimator";

const CtaSection = () => (
  <section className="aurion-section">
    <div className="aurion-container text-center">
      <SectionReveal>
        <span className="aurion-label mb-6 block">Get Started</span>
        <h2 className="aurion-heading-lg max-w-2xl mx-auto mb-6">
          Book a free 30-minute clarity call.
        </h2>
        <p className="aurion-body-lg max-w-xl mx-auto mb-10">
          A space to discuss where AI is showing up in your organisation and what kind of enablement might be useful.
        </p>
        <HoverAnimator className="inline-block">
          <Link to="/contact" className="aurion-btn-primary">
            Book your clarity call
          </Link>
        </HoverAnimator>
      </SectionReveal>
    </div>
  </section>
);

export default CtaSection;
