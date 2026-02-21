import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ────────────────────────────────────────────────────────────────────

type Stat = { value: string; label: string };
type Study = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro: string;
  stats: Stat[];
  challenge: string[];
  approach: { heading: string; points: string[] };
  outcomes: { headline: string[]; bottom: string[] };
  whyMatters: string[];
  cta: { text: string; link: string; label: string };
  link?: string;
};

const studies: Study[] = [
  {
    id: "cultural-institution",
    index: "01",
    label: "Public Sector · Cultural Institution",
    title: "Creating Confidence Around AI in a Complex Cultural Institution",
    intro:
      "A large, publicly funded cultural institution with 1,200+ staff — spanning curatorial, security, education, visitor services, operations, and corporate teams. Work was deeply values-led, highly regulated, and publicly accountable. AI was already entering the organisation quietly. An internal review showed ~35–40% of staff had experimented with AI tools informally, fewer than 10% felt confident discussing it openly, and managers reported uncertainty around accountability, risk, and boundaries. There was no formal resistance — but there was hesitation, silence, and fragmented experimentation.",
    stats: [
      { value: "1,200+", label: "Staff reached across departments" },
      { value: "70%+", label: "Increase in manager confidence" },
      { value: "50%", label: "Reduction in hidden AI use" },
      { value: "3×", label: "Increase in shared AI use-cases" },
    ],
    challenge: [
      "AI use was happening in pockets, without shared language",
      "Training focused on awareness, not real decision-making",
      "Managers felt responsible for AI risk, but lacked frameworks",
      "Staff were unsure when AI use was acceptable, ethical, or valuable",
      "62% of staff were unsure what 'good AI use' looked like in their role",
      "58% of managers avoided AI conversations due to fear of getting it wrong",
    ],
    approach: {
      heading:
        "The intervention focused on normalising AI as a work practice, not a technical capability.",
      points: [
        "Scenario-based learning grounded in real organisational workflows",
        "Manager-led conversations to support psychological safety",
        "Clear framing around ethics, accountability, and judgement",
        "Embedding AI discussions into existing learning systems",
        "Live manager workshops using real internal scenarios",
        "Organisation-wide learning modules accessed by 80%+ of staff",
        "Practical decision frameworks rather than tool-specific training",
      ],
    },
    outcomes: {
      headline: [
        "1,200+ staff engaged across learning and communications within four months",
        "75% of managers reported increased confidence handling AI-related queries",
        "40% uplift in staff reporting clarity around acceptable AI use",
        "AI conversations shifted from informal to documented and shared",
      ],
      bottom: [
        "Staff stopped hiding experimentation",
        "Managers stopped avoiding the topic",
        "AI became discussable, not divisive",
      ],
    },
    whyMatters: [
      "In highly accountable environments, AI adoption fails when it is framed as a technology rollout.",
      "It succeeds when people are given shared language, decision-making confidence, and permission to think critically.",
      "This project demonstrated that psychological readiness precedes technical maturity.",
    ],
    cta: {
      text: "If your organisation is seeing fragmented AI use, managerial hesitation, or unspoken anxiety around AI, this is the type of adoption work we specialise in.",
      link: "/contact",
      label: "See how this approach can translate to your teams",
    },
  },
  {
    id: "hr-learning-workflows",
    index: "02",
    label: "Professional Services · HR & Learning",
    title: "Embedding AI Into Everyday HR & Learning Workflows",
    intro:
      "This organisation was already digitally capable, but AI use was inconsistent and uneven. HR and Learning teams were under pressure to move faster, produce more content, and support managers at scale. AI tools had started to appear organically — recruiters experimenting with prompts, L&D teams testing content generation, managers asking informal questions. An internal review showed 45–50% of the HR/L&D team had tried AI tools, but only 15% felt confident using them in live work. No shared standards, examples, or workflow integration existed. AI was seen as 'helpful but risky.'",
    stats: [
      { value: "30+", label: "HR & L&D professionals supported" },
      { value: "35–40%", label: "Reduction in repeat content task time" },
      { value: "2×", label: "Increase in day-to-day AI confidence" },
      { value: "20+", label: "Documented use-cases shared across teams" },
    ],
    challenge: [
      "Teams struggled knowing where AI actually fit into their workflow",
      "Understanding what was acceptable vs risky was unclear",
      "Turning one-off experiments into repeatable practice was difficult",
      "60% were unsure if AI use would be supported by leadership",
      "55% avoided using AI on 'important' tasks",
      "AI was treated as an experiment, not a capability",
    ],
    approach: {
      heading: "The work focused on workflow-level adoption, not tool training.",
      points: [
        "Mapped existing HR and L&D workflows to identify pressure points",
        "Co-designed prompts and decision rules with the team",
        "Embedded AI use into existing processes, not on top of them",
        "Workflow mapping sessions covering recruitment, onboarding, learning design",
        "Prompt playbooks tailored to real, recurring tasks",
        "Decision guidelines for when not to use AI",
      ],
    },
    outcomes: {
      headline: [
        "Content development cycles shortened by 30–40% within eight weeks",
        "Teams reported higher confidence using AI without escalation",
        "Managers gained clarity on oversight and accountability",
        "AI use shifted from 'quiet' to openly discussed",
      ],
      bottom: [
        "AI stopped feeling experimental",
        "It became a normal part of work",
        "Internal enablement beat external tooling",
      ],
    },
    whyMatters: [
      "HR and L&D teams sit at the centre of organisational change.",
      "When they adopt AI with clarity — managers follow, standards spread, adoption scales responsibly.",
      "This work demonstrated how internal enablement beats external tooling.",
    ],
    cta: {
      text: "If your people teams are experimenting with AI but lack structure or confidence, this approach helps turn curiosity into capability.",
      link: "/contact",
      label: "Explore how this model works in practice",
    },
  },
  {
    id: "small-business-workflows",
    index: "03",
    label: "Small Business · Operations",
    title: "Building AI-Enabled Workflows in a Small, Fast-Moving Organisation",
    intro:
      "This organisation was small, ambitious, and resource-constrained. Like many growing teams, they faced increasing operational load, limited headcount, and reliance on manual processes. AI interest was high, but clarity was low. Initial conversations revealed 70% of team members were using AI in some form, usage varied widely by role and confidence, and no shared workflows or standards existed. AI was helping individuals — but not the organisation.",
    stats: [
      { value: "10–12", label: "Core workflows redesigned with AI" },
      { value: "25–30%", label: "Reduction in manual operational effort" },
      { value: "15+", label: "Hours saved per week across the team" },
      { value: "100%", label: "Team adoption of shared AI workflows" },
    ],
    challenge: [
      "Knowledge lived in individuals' heads, creating fragility",
      "Processes broke when people were unavailable",
      "AI use was unrepeatable and undocumented",
      "Leadership wanted speed, consistency, and internal ownership",
      "Not dependency on external consultants",
    ],
    approach: {
      heading: "The intervention centred on co-creation, not delivery.",
      points: [
        "The team mapped their own processes to identify friction points",
        "Designed AI-assisted steps together, not imposed from outside",
        "Documented workflows in plain language for ongoing use",
        "Live workflow design sessions with full team involvement",
        "Simple, tool-agnostic AI patterns that aren't vendor-dependent",
        "Clear ownership and handover rules for sustainability",
      ],
    },
    outcomes: {
      headline: [
        "Core processes became repeatable and resilient within one month",
        "Operational load reduced by 25–30% across the team",
        "New team members onboarded faster using shared workflows",
        "AI use became visible, discussable, and improvable",
      ],
      bottom: [
        "The organisation gained leverage — not complexity",
        "AI became something the team owned, not outsourced",
        "Single-source documentation created for ongoing use",
      ],
    },
    whyMatters: [
      "Small teams do not need sophisticated AI systems.",
      "They need clarity, ownership, and workflows that scale with them.",
      "This approach ensures AI strengthens the organisation, not individuals only.",
    ],
    cta: {
      text: "If your team is moving fast but feeling stretched, AI-enabled workflows can create breathing room without adding risk.",
      link: "/contact",
      label: "See how workflow-first adoption works",
    },
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

const StatCard = ({
  stat,
  delay,
}: {
  stat: Stat;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 30, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-start p-6 rounded-sm"
      style={{
        opacity: 0,
        background: "hsla(0,55%,32%,0.06)",
        borderLeft: "3px solid hsl(0,55%,32%)",
      }}
    >
      <span
        className="font-heading text-3xl md:text-4xl font-bold mb-1"
        style={{ color: "hsl(0,55%,32%)" }}
      >
        {stat.value}
      </span>
      <span className="font-body text-sm text-muted-foreground leading-snug">
        {stat.label}
      </span>
    </div>
  );
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────

const ProgressLine = ({ delay }: { delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        delay,
        ease: "power2.inOut",
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
      }
    );
  }, [delay]);

  return (
    <div
      className="h-px w-full my-12"
      style={{ background: "hsl(30,15%,85%)" }}
    >
      <div
        ref={ref}
        className="h-full"
        style={{
          background: "hsl(38,45%,55%)",
          scaleX: 0,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
};

// ─── Single Case Study Block ──────────────────────────────────────────────────

const CaseStudyBlock = ({
  study,
  index,
}: {
  study: Study;
  index: number;
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;
    const children = headerRef.current.querySelectorAll(".animate-child");
    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  // Animate expanded content
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!detailRef.current || !expanded) return;
    const items = detailRef.current.querySelectorAll(".detail-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, [expanded]);

  return (
    <article className="mb-0">
      {/* Header row */}
      <div ref={headerRef} className="mb-10">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <span
              className="animate-child font-heading text-5xl font-bold opacity-20 select-none leading-none"
              style={{ color: "hsl(0,55%,32%)" }}
            >
              {study.index}
            </span>
            <span
              className="animate-child aurion-label"
              style={{ opacity: 0 }}
            >
              {study.label}
            </span>
          </div>
        </div>

        <h2
          className="animate-child aurion-heading-lg mb-6 max-w-3xl"
          style={{ opacity: 0 }}
        >
          {study.title}
        </h2>

        <p
          className="animate-child aurion-body max-w-3xl mb-8 leading-relaxed"
          style={{ opacity: 0 }}
        >
          {study.intro}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {study.stats.map((stat, i) => (
          <StatCard key={i} stat={stat} delay={i * 0.08} />
        ))}
      </div>

      {/* Attention callout */}
      <div
        className="rounded-sm p-6 md:p-8 mb-10"
        style={{
          background: "hsl(35,30%,93%)",
          borderLeft: "4px solid hsl(38,45%,55%)",
        }}
      >
        <p
          className="font-heading text-lg md:text-xl font-medium leading-relaxed"
          style={{ color: "hsl(15,20%,18%)" }}
        >
          "{study.approach.heading}"
        </p>
      </div>

      {/* Toggle details */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex items-center gap-3 mb-6 group"
        style={{ color: "hsl(0,55%,32%)" }}
      >
        <span className="aurion-label">
          {expanded ? "Hide full case study" : "Read full case study"}
        </span>
        <span
          className="text-lg transition-transform duration-300 group-hover:translate-x-1"
          style={{
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
            transition: "transform 0.3s ease",
          }}
        >
          →
        </span>
      </button>

      {/* Expandable detail */}
      {expanded && (
        <div ref={detailRef} className="space-y-10 mb-10">
          {/* Challenge */}
          <div className="detail-item" style={{ opacity: 0 }}>
            <h3 className="aurion-label mb-4 block">The Challenge</h3>
            <ul className="space-y-2">
              {study.challenge.map((c, i) => (
                <li key={i} className="flex items-start gap-3 aurion-body">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "hsl(0,55%,32%)" }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Approach */}
          <div className="detail-item" style={{ opacity: 0 }}>
            <h3 className="aurion-label mb-4 block">The Approach</h3>
            <ul className="space-y-2">
              {study.approach.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 aurion-body">
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "hsl(38,45%,55%)" }}
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="detail-item" style={{ opacity: 0 }}>
            <h3 className="aurion-label mb-4 block">Outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {study.outcomes.headline.map((o, i) => (
                <div
                  key={i}
                  className="p-4 rounded-sm"
                  style={{ background: "hsla(0,55%,32%,0.05)" }}
                >
                  <p className="font-body text-sm leading-relaxed text-foreground">
                    {o}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {study.outcomes.bottom.map((b, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 rounded-full font-body text-xs font-medium"
                  style={{
                    background: "hsl(38,45%,55%)",
                    color: "hsl(15,20%,12%)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Why it matters */}
          <div
            className="detail-item p-6 md:p-8 rounded-sm"
            style={{
              opacity: 0,
              background: "hsl(15,20%,12%)",
              color: "hsl(35,30%,93%)",
            }}
          >
            <h3
              className="aurion-label mb-4 block"
              style={{ color: "hsl(38,45%,62%)" }}
            >
              Why This Matters
            </h3>
            <div className="space-y-3">
              {study.whyMatters.map((w, i) => (
                <p key={i} className="font-body text-sm leading-relaxed" style={{ color: "hsl(35,25%,82%)" }}>
                  {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA strip */}
      <div
        className="rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: "hsl(35,25%,94%)",
          border: "1px solid hsl(30,15%,85%)",
        }}
      >
        <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
          {study.cta.text}
        </p>
        <Link
          to={study.cta.link}
          className="aurion-btn-primary whitespace-nowrap text-sm shrink-0"
          style={{ borderRadius: "2px" }}
        >
          {study.cta.label} →
        </Link>
      </div>

      {index < studies.length - 1 && <ProgressLine delay={0.2} />}
    </article>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CaseStudies = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll(".hero-item");
    gsap.fromTo(
      els,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="aurion-section pb-12">
          <div className="aurion-container">
            <div ref={heroRef}>
              <span
                className="hero-item aurion-label mb-4 block"
                style={{ opacity: 0 }}
              >
                Evidence in Practice
              </span>
              <h1
                className="hero-item aurion-heading-xl max-w-3xl mb-6"
                style={{ opacity: 0 }}
              >
                Real work. Real organisations. Practical outcomes.
              </h1>
              <div
                className="hero-item aurion-divider mb-8"
                style={{ opacity: 0 }}
              />
              <p
                className="hero-item aurion-body-lg max-w-2xl"
                style={{ opacity: 0 }}
              >
                These case studies reflect the kind of work Aurion does — helping
                organisations move from fragmented AI experimentation to
                structured, confident, responsible adoption. The details have been
                anonymised to protect confidentiality.
              </p>
            </div>
          </div>
        </section>

        {/* ── Index strip ── */}
        <section
          className="border-y py-8"
          style={{ borderColor: "hsl(30,15%,85%)" }}
        >
          <div className="aurion-container">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              {studies.map((s, i) => (
                <a
                  key={i}
                  href={`#${s.id}`}
                  className="flex items-start gap-3 group"
                >
                  <span
                    className="font-heading text-2xl font-bold opacity-30 leading-none pt-0.5"
                    style={{ color: "hsl(0,55%,32%)" }}
                  >
                    {s.index}
                  </span>
                  <div>
                    <span className="aurion-label block mb-1">{s.label}</span>
                    <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-snug">
                      {s.title}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Case Studies ── */}
        <section className="aurion-section">
          <div className="aurion-container">
            {studies.map((study, i) => (
              <div key={study.id} id={study.id}>
                <CaseStudyBlock study={study} index={i} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <SectionReveal>
          <section
            className="py-20 md:py-28"
            style={{ background: "hsl(15,20%,12%)" }}
          >
            <div className="aurion-container text-center">
              <span
                className="aurion-label mb-4 block"
                style={{ color: "hsl(38,45%,62%)" }}
              >
                Work With Aurion
              </span>
              <h2
                className="aurion-heading-lg mb-6 max-w-2xl mx-auto"
                style={{ color: "hsl(35,25%,92%)" }}
              >
                Recognise any of these patterns in your organisation?
              </h2>
              <p
                className="aurion-body max-w-xl mx-auto mb-10"
                style={{ color: "hsl(35,15%,65%)" }}
              >
                Every engagement starts with listening. We work with organisations
                already experimenting — and help bring coherence to that
                experimentation without killing momentum.
              </p>
              <Link
                to="/contact"
                className="aurion-btn-primary"
                style={{ borderRadius: "2px" }}
              >
                Start a conversation →
              </Link>
            </div>
          </section>
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
};

export default CaseStudies;