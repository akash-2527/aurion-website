import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/motion/SectionReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Principles data ──────────────────────────────────────────────────────────

const principles = [
  {
    label: "Human-Centred Adoption",
    body: "We believe AI adoption is fundamentally about people — their confidence, their workflows, and their willingness to change. Technology is secondary.",
  },
  {
    label: "Calm Leadership",
    body: "In a world full of AI hype, we bring measured, thoughtful guidance. No panic, no pressure — just clarity.",
  },
  {
    label: "Practical Over Theoretical",
    body: "We focus on enablement that sticks — playbooks, workflows, and support structures that teams actually use.",
  },
];

const focusPoints = [
  "practical workflows rather than abstract strategies",
  "learning that fits into real work, not separate training events",
  "internal ownership instead of long-term external dependency",
];

const listeningPoints = [
  "how teams actually work, not how processes look on paper",
  "where effort is being duplicated or wasted",
  "where uncertainty or fear is blocking progress",
];

// ─── Animated pull-quote ──────────────────────────────────────────────────────

const PullQuote = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={ref}
      className="my-8 pl-6 py-1"
      style={{
        opacity: 0,
        borderLeft: "4px solid hsl(38,45%,55%)",
      }}
    >
      <p
        className="font-heading text-xl md:text-2xl font-medium leading-relaxed"
        style={{ color: "hsl(15,20%,18%)" }}
      >
        {text}
      </p>
    </div>
  );
};

// ─── Principle card ───────────────────────────────────────────────────────────

const PrincipleCard = ({
  principle,
  index,
}: {
  principle: (typeof principles)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 36, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        delay: index * 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className="p-6 md:p-8 rounded-sm"
      style={{
        opacity: 0,
        background: "hsl(35,25%,94%)",
        border: "1px solid hsl(30,15%,87%)",
      }}
    >
      <span className="aurion-label block mb-3">{principle.label}</span>
      <p className="font-body text-base leading-relaxed text-muted-foreground">
        {principle.body}
      </p>
    </div>
  );
};

// ─── Animated word reveal for hero ───────────────────────────────────────────

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".hero-line");
    gsap.fromTo(
      items,
      { opacity: 0, y: 60, skewY: 2 },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        stagger: 0.14,
        duration: 1.0,
        ease: "power4.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section className="aurion-section pb-16">
      <div className="aurion-container">
        <div ref={ref} className="overflow-hidden">
          <span
            className="hero-line aurion-label mb-5 block"
            style={{ opacity: 0 }}
          >
            About Aurion
          </span>
          <div className="overflow-hidden mb-2">
            <h1
              className="hero-line aurion-heading-xl max-w-4xl"
              style={{ opacity: 0 }}
            >
              Someone who understands
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1
              className="hero-line aurion-heading-xl max-w-4xl"
              style={{ opacity: 0 }}
            >
              how organisations actually work.
            </h1>
          </div>
          <div
            className="hero-line aurion-divider mb-10"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </section>
  );
};

// ─── Scrolling marquee text ───────────────────────────────────────────────────

const MarqueeStrip = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      x: "-50%",
      duration: 28,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const words = [
    "People-First AI",
    "·",
    "Calm Adoption",
    "·",
    "Practical Workflows",
    "·",
    "Human Judgement",
    "·",
    "Responsible Use",
    "·",
    "Organisational Clarity",
    "·",
  ];

  return (
    <div
      className="overflow-hidden py-4 border-y"
      style={{ borderColor: "hsl(30,15%,85%)" }}
    >
      <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
        {[...words, ...words].map((w, i) => (
          <span
            key={i}
            className="font-heading text-sm font-medium px-6"
            style={{
              color:
                w === "·" ? "hsl(38,45%,55%)" : "hsl(15,10%,52%)",
            }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Horizontal scroll timeline ───────────────────────────────────────────────

const TimelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      label: "Listen",
      body: "Understand how teams actually work, not how processes look on paper.",
    },
    {
      num: "02",
      label: "Diagnose",
      body: "Surface where effort is duplicated, where fear blocks progress, where AI could genuinely help.",
    },
    {
      num: "03",
      label: "Design",
      body: "Embed AI carefully into existing workflows — documented clearly, aligned with how decisions already get made.",
    },
    {
      num: "04",
      label: "Enable",
      body: "Build internal confidence, shared language, and repeatable practice — not dependency.",
    },
    {
      num: "05",
      label: "Hand Over",
      body: "Leave the organisation stronger, clearer, and more self-sufficient than before.",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const totalWidth =
      trackRef.current.scrollWidth - sectionRef.current.clientWidth;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex items-stretch"
        style={{ width: "fit-content" }}
      >
        {/* Label panel */}
        <div
          className="flex flex-col justify-center px-12 md:px-20 shrink-0"
          style={{
            width: "min(380px, 90vw)",
            minHeight: "100vh",
            background: "hsl(15,20%,12%)",
          }}
        >
          <span
            className="aurion-label mb-4 block"
            style={{ color: "hsl(38,45%,62%)" }}
          >
            How We Work
          </span>
          <h2
            className="font-heading text-3xl md:text-4xl font-semibold leading-tight"
            style={{ color: "hsl(35,25%,92%)" }}
          >
            Five steps to lasting AI adoption.
          </h2>
          <p
            className="font-body text-sm mt-4 leading-relaxed"
            style={{ color: "hsl(35,10%,58%)" }}
          >
            Scroll to explore →
          </p>
        </div>

        {/* Step cards */}
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex flex-col justify-center px-12 md:px-16 shrink-0 border-l"
            style={{
              width: "min(340px, 85vw)",
              minHeight: "100vh",
              borderColor: "hsl(30,15%,85%)",
              background: i % 2 === 0 ? "hsl(35,30%,96%)" : "hsl(35,25%,93%)",
            }}
          >
            <span
              className="font-heading text-6xl font-bold leading-none mb-4 opacity-15"
              style={{ color: "hsl(0,55%,32%)" }}
            >
              {step.num}
            </span>
            <h3
              className="font-heading text-2xl font-semibold mb-3"
              style={{ color: "hsl(15,20%,15%)" }}
            >
              {step.label}
            </h3>
            <p className="font-body text-base leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const About = () => {
  // Parallax on the background of a section
  const originRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!originRef.current) return;
    gsap.fromTo(
      originRef.current.querySelector(".parallax-text"),
      { y: 0 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: originRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Marquee ── */}
        <MarqueeStrip />

        {/* ── Origin story ── */}
        <section ref={originRef} className="aurion-section">
          <div className="aurion-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left: main narrative */}
              <div className="parallax-text">
                <SectionReveal>
                  <p className="aurion-body-lg mb-6">
                    Aurion was born out of a simple, uncomfortable observation.
                  </p>
                </SectionReveal>

                <PullQuote text="Most organisations are not struggling with AI because they lack tools. They are struggling because people do not know how AI fits into their real, everyday work." />

                <SectionReveal delay={0.1}>
                  <p className="aurion-body mb-5">
                    By the time AI becomes visible at leadership level, it is
                    usually already being used quietly across teams. Sometimes
                    confidently. Often inconsistently. Almost always without
                    shared standards, clarity, or reassurance.
                  </p>
                  <p className="aurion-body mb-5">
                    Aurion exists to bring calm to that moment.
                  </p>
                  <p
                    className="aurion-body font-medium"
                    style={{ color: "hsl(15,20%,18%)" }}
                  >
                    Not by rushing adoption. Not by overwhelming teams with
                    technical complexity. But by helping organisations slow down
                    just enough to understand what is already happening — and then
                    shape it deliberately.
                  </p>
                </SectionReveal>
              </div>

              {/* Right: principles */}
              <div className="space-y-4">
                {principles.map((p, i) => (
                  <PrincipleCard key={i} principle={p} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Horizontal scroll timeline ── */}
        <TimelineSection />

        {/* ── How the work happens ── */}
        <section className="aurion-section">
          <div className="aurion-container">
            <SectionReveal>
              <span className="aurion-label mb-4 block">The Work</span>
              <h2 className="aurion-heading-lg max-w-2xl mb-6">
                The work Aurion does sits between people and systems.
              </h2>
              <div className="aurion-divider mb-12" />
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <SectionReveal delay={0.1}>
                  <p className="aurion-body mb-5">
                    It starts by listening: how teams actually work, not how
                    processes look on paper. Where effort is being duplicated or
                    wasted. Where uncertainty or fear is blocking progress.
                  </p>
                  <p className="aurion-body mb-5">
                    Only then does AI enter the conversation.
                  </p>
                  <p className="aurion-body mb-5">
                    When it does, it is introduced carefully — embedded into
                    existing workflows, documented clearly, and aligned with how
                    the organisation already makes decisions.
                  </p>
                </SectionReveal>

                <PullQuote text="AI should make work feel lighter. Not louder." />

                <SectionReveal delay={0.15}>
                  <p className="aurion-body mb-5">
                    Aurion does not treat AI adoption as a one-off transformation
                    project. Real adoption happens slowly, through habit, trust,
                    and repetition. It happens when people feel confident using AI
                    without second-guessing themselves or worrying about getting it
                    wrong.
                  </p>
                  <p className="aurion-body">
                    It happens when teams understand not just how to use tools,
                    but when and why.
                  </p>
                </SectionReveal>
              </div>

              <div>
                <SectionReveal delay={0.2}>
                  <h3 className="aurion-heading-md mb-6">
                    That is why Aurion focuses on:
                  </h3>
                  <ul className="space-y-4 mb-10">
                    {focusPoints.map((f, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span
                          className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: "hsl(38,45%,55%)" }}
                        />
                        <span className="aurion-body">{f}</span>
                      </li>
                    ))}
                  </ul>
                </SectionReveal>

                {/* Dark callout box */}
                <SectionReveal delay={0.25}>
                  <div
                    className="rounded-sm p-6 md:p-8"
                    style={{ background: "hsl(15,20%,12%)" }}
                  >
                    <p
                      className="font-heading text-lg font-medium mb-2"
                      style={{ color: "hsl(35,25%,92%)" }}
                    >
                      This is not technology-first consulting.
                    </p>
                    <p
                      className="font-body text-base leading-relaxed"
                      style={{ color: "hsl(35,10%,60%)" }}
                    >
                      It is people-first AI adoption.
                    </p>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section
          className="aurion-section"
          style={{ background: "hsl(35,25%,93%)" }}
        >
          <div className="aurion-container">
            <SectionReveal>
              <span className="aurion-label mb-4 block">Who Aurion Works With</span>
              <h2 className="aurion-heading-lg max-w-2xl mb-6">
                Already experimenting. Ready to bring coherence.
              </h2>
              <div className="aurion-divider mb-12" />
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <SectionReveal delay={0.1}>
                <p className="aurion-body mb-5">
                  Aurion works best with organisations that are already
                  experimenting — even informally — and want to bring coherence to
                  that experimentation without killing momentum.
                </p>
                <p className="aurion-body mb-5">
                  Teams that value clarity, responsibility, and human judgement as
                  much as efficiency.
                </p>
                <p className="aurion-body">
                  This work is especially relevant where trust, compliance, and
                  culture matter. Where decisions are complex. Where people, not
                  just systems, carry the risk.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div
                  className="p-6 md:p-8 rounded-sm h-full"
                  style={{
                    background: "hsl(35,30%,96%)",
                    border: "1px solid hsl(30,15%,86%)",
                  }}
                >
                  <span className="aurion-label mb-4 block">
                    The Practitioner Behind Aurion
                  </span>
                  <p className="aurion-body mb-4">
                    Aurion is led by a practitioner with a background in
                    psychology, learning, and organisational change.
                  </p>
                  <p className="aurion-body mb-4">
                    This perspective comes from working within both complex
                    institutions and fast-moving teams, where real decisions happen
                    under real pressure.
                  </p>
                  <p className="aurion-body font-medium" style={{ color: "hsl(15,20%,18%)" }}>
                    The work is grounded in how organisations operate in practice,
                    not in idealised models.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* ── Closing statement ── */}
        <SectionReveal>
          <section
            className="py-24 md:py-36"
            style={{ background: "hsl(15,20%,12%)" }}
          >
            <div className="aurion-container max-w-3xl text-center mx-auto px-6">
              <span
                className="aurion-label mb-6 block"
                style={{ color: "hsl(38,45%,62%)" }}
              >
                The Aim
              </span>
              <p
                className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium leading-snug mb-8"
                style={{ color: "hsl(35,25%,92%)" }}
              >
                AI will continue to evolve. What matters is how calmly
                organisations adapt to it.
              </p>
              <p
                className="font-body text-base md:text-lg leading-relaxed mb-10"
                style={{ color: "hsl(35,10%,58%)" }}
              >
                Aurion exists to make that adaptation possible.
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

export default About;