import SectionReveal from "@/motion/SectionReveal";

const points = [
  "AI is already present in most organisations — often in informal, individual ways.",
  "Usage is frequently inconsistent and unstructured across teams.",
  "Leaders want responsible, measured adoption — not reckless experimentation.",
  "Teams want clarity, permission, and support to use AI well.",
];

const CurrentReality = () => (
  <section className="aurion-section bg-aurion-warm">
    <div className="aurion-container">
      <SectionReveal>
        <span className="aurion-label mb-4 block">The Current Reality</span>
        <h2 className="aurion-heading-lg max-w-2xl mb-6">
          AI is already here. The question is how to adopt it well.
        </h2>
        <div className="aurion-divider mb-10" />
      </SectionReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((point, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <div className="aurion-card flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-semibold text-sm">
                {i + 1}
              </span>
              <p className="aurion-body">{point}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default CurrentReality;
