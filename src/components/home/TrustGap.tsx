import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ────────────────────────────────────────────────────────────────
const BG       = "hsl(15, 20%, 12%)";
const TEXT      = "rgba(245, 238, 228, 1)";
const TEXT_DIM  = "rgba(245, 238, 228, 0.55)";
const TEXT_MUTE = "rgba(245, 238, 228, 0.32)";
const RULE      = "rgba(245, 238, 228, 0.14)";

// ─── Data ─────────────────────────────────────────────────────────────────────
const nodes = [
  {
    index: "01",
    label: "The Fear",
    title: "People fear getting it wrong",
    body: "Teams want clarity, permission, and psychological safety. Without it, they stay quiet or experiment in the shadows — not because they resist change, but because nobody told them what's okay.",
    aside: "We hear this in almost every discovery session.",
  },
  {
    index: "02",
    label: "The Gap",
    title: "Leaders assume a tooling shift",
    body: "Leaders see a software rollout. Teams experience an identity shift — 'What does this mean for my role?' When those realities don't meet, people fill the silence with peer norms instead of governance.",
    aside: "The gap between intent and lived experience is where most adoption fails.",
  },
  {
    index: "03",
    label: "The Drift",
    title: "Peer norms replace policy",
    body: "Without clear guidance, people look sideways. They watch what colleagues do, what seems safe, what seems valued. This creates uneven adoption and hidden pockets of risk.",
    aside: "Drift isn't rebellion. It's people doing their best with what they have.",
  },
  {
    index: "04",
    label: "The Risk",
    title: "Shadow AI becomes the default",
    body: "Shadow AI is not misuse. It is a message. It tells you exactly where governance is unclear and trust is missing. The organisations that name it directly are the ones that close the gap.",
    aside: "This is where we find the most important conversations.",
  },
];

// ─── TrustGap ─────────────────────────────────────────────────────────────────
const TrustGap = () => {
  const pinRef      = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const outroRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const nodeRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pin    = pinRef.current;
    const header = headerRef.current;
    const outro  = outroRef.current;
    const bar    = progressRef.current;

    if (!pin || !header || !outro) return;

    // Clear any stale scroll position memory from previous renders / hot-reloads
    ScrollTrigger.clearScrollMemory();

    const nodeEls = nodeRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const dotEls  = dotRefs.current.filter((el): el is HTMLDivElement => el !== null);

    let refreshTimer: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ paused: true });

      // GSAP owns all opacity + transform — set hard initial states
      tl.set(header,  { opacity: 1, y: 0,  force3D: true });
      tl.set(nodeEls, { opacity: 0, y: 32, force3D: true });
      tl.set(outro,   { opacity: 0, y: 28, force3D: true });
      if (bar) tl.set(bar, { scaleY: 0, transformOrigin: "top center", force3D: true });

      // Segment 0 → 0.6: header visible
      // Segment 0.6 → 1.0: header exits
      tl.to(header, {
        opacity: 0,
        y: -24,
        duration: 0.4,
        ease: "power2.inOut",
        force3D: true,
      }, 0.6);

      // Segments 1 → nodes.length: each node cross-fades in then out
      nodeEls.forEach((node, i) => {
        const inAt  = i + 1;
        const outAt = i + 1.65;

        tl.to(node, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          force3D: true,
        }, inAt);

        tl.to(node, {
          opacity: 0,
          y: -26,
          duration: 0.3,
          ease: "power2.in",
          force3D: true,
        }, outAt);

        if (dotEls[i]) {
          tl.to(dotEls[i], {
            backgroundColor: "rgba(245,238,228,0.9)",
            scale: 1.6,
            duration: 0.2,
            force3D: true,
          }, inAt);
          tl.to(dotEls[i], {
            backgroundColor: "rgba(245,238,228,0.2)",
            scale: 1,
            duration: 0.2,
            force3D: true,
          }, outAt);
        }

        if (bar) {
          tl.to(bar, {
            scaleY: (i + 1) / nodeEls.length,
            duration: 0.4,
            ease: "power1.inOut",
            force3D: true,
          }, inAt);
        }
      });

      // Last segment: outro fades in
      tl.to(outro, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        force3D: true,
      }, nodes.length + 1);

      // ── ScrollTrigger ──────────────────────────────────────────────────────
      // start is a FUNCTION — re-evaluated on every refresh() call,
      // not locked to the stale mount-time offset.
      // anticipatePin: 1 — GSAP watches ~1vh early so the pin fires
      // before the section reaches the viewport top, preventing the
      // "35% scroll to activate" issue.
      ScrollTrigger.create({
        trigger: pin,
        start: () => "top top",
        pin: true,
        anticipatePin: 1,
        end: () => `+=${(nodes.length + 1) * window.innerHeight * 0.65}`,
        scrub: 0.4,
        animation: tl,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
      });

    }, pin);

    // Deferred refresh — runs after React paint, font load, and any
    // above-section layout shifts have fully settled.
    // 200ms is imperceptible to users but enough for Libre Baskerville
    // and hero section images to reflow their final heights.
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      ctx.revert();
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <section
      ref={pinRef}
      className="relative h-screen overflow-hidden"
      style={{ background: BG }}
    >
      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      {/* Warm radial glow — top right */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          right: "-5%",
          width: "50vw",
          height: "70vh",
          background: "radial-gradient(ellipse at top right, rgba(160,50,30,0.12) 0%, transparent 65%)",
          filter: "blur(32px)",
        }}
      />

      {/* Left progress track */}
      <div
        className="absolute left-6 md:left-9 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4"
        aria-hidden="true"
      >
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: "1px", height: "96px", background: RULE }}
        >
          <div
            ref={progressRef}
            className="absolute inset-x-0 top-0 rounded-full"
            style={{
              height: "100%",
              background: "rgba(245,238,228,0.55)",
              transform: "scaleY(0)",
              transformOrigin: "top center",
              willChange: "transform",
            }}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          {nodes.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="rounded-full"
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "rgba(245,238,228,0.2)",
                willChange: "transform, background-color",
              }}
            />
          ))}
        </div>
      </div>

      {/* Section label */}
      <span
        aria-hidden="true"
        className="absolute top-7 right-8 md:right-12 font-body font-semibold uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.22em", color: TEXT_MUTE }}
      >
        The AI Trust Gap
      </span>

      {/* Slides container */}
      <div className="relative h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto px-16 md:px-24 lg:px-40">

          {/* Header slide */}
          <div
            ref={headerRef}
            className="absolute inset-0 flex items-center px-16 md:px-24 lg:px-40"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="max-w-3xl">
              <p
                className="font-body font-semibold uppercase mb-8"
                style={{ fontSize: "11px", letterSpacing: "0.22em", color: TEXT_MUTE }}
              >
                What Leaders Miss When Deploying AI at Scale
              </p>
              <h2
                className="font-heading font-semibold leading-tight mb-7"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3.1rem)", color: TEXT }}
              >
                AI adoption does not fail because people resist technology.
              </h2>
              <p
                className="font-body leading-relaxed max-w-xl"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: TEXT_DIM }}
              >
                It fails because people do not trust what it means for their work.
              </p>
            </div>
          </div>

          {/* Node slides */}
          {nodes.map((node, i) => (
            <div
              key={node.label}
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="absolute inset-0 flex items-center px-16 md:px-24 lg:px-40"
              style={{ willChange: "opacity, transform" }}
            >
              <div className="max-w-3xl w-full">

                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="font-body font-semibold"
                    style={{ fontSize: "11px", letterSpacing: "0.2em", color: TEXT_MUTE }}
                  >
                    {node.index}
                  </span>
                  <span
                    className="block flex-shrink-0"
                    style={{ width: "28px", height: "1px", background: RULE }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-body font-semibold uppercase"
                    style={{ fontSize: "11px", letterSpacing: "0.2em", color: TEXT_MUTE }}
                  >
                    {node.label}
                  </span>
                </div>

                <h3
                  className="font-heading font-semibold leading-tight mb-8"
                  style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.75rem)", color: TEXT }}
                >
                  {node.title}
                </h3>

                <p
                  className="font-body leading-relaxed mb-8 max-w-2xl"
                  style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", color: TEXT_DIM }}
                >
                  {node.body}
                </p>

                <p
                  className="font-body italic max-w-lg"
                  style={{
                    fontSize: "0.875rem",
                    color: TEXT_MUTE,
                    borderLeft: `2px solid ${RULE}`,
                    paddingLeft: "1.25rem",
                    lineHeight: 1.6,
                  }}
                >
                  {node.aside}
                </p>

              </div>
            </div>
          ))}

          {/* Outro slide */}
          <div
            ref={outroRef}
            className="absolute inset-0 flex items-center px-16 md:px-24 lg:px-40"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="max-w-4xl w-full">

              <p
                className="font-body italic mb-12 max-w-2xl leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: TEXT_DIM }}
              >
                "The Trust Gap is not a mystery. It is the psychological contract
                shifting in real time — the heart of Aurion's flagship lens, the{" "}
                <span style={{ fontStyle: "normal", fontWeight: 600, color: TEXT }}>
                  AI Psychological Contract Framework.
                </span>
                "
              </p>

              <div className="mb-10">
                <span
                  aria-hidden="true"
                  className="block font-heading select-none leading-none"
                  style={{ fontSize: "4.5rem", color: "rgba(245,238,228,0.07)", marginBottom: "-0.75rem" }}
                >
                  "
                </span>
                <blockquote className="max-w-3xl">
                  <p
                    className="font-heading font-medium leading-snug mb-7"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.85rem)", color: "rgba(245,238,228,0.85)" }}
                  >
                    This is fundamentally a psychological contract issue. People
                    want to know what is safe, what is valued, and what will change.
                    When leaders do not say it, teams fill the gaps themselves.
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Replace with <img> when founder photo is available */}
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: "48px",
                        height: "48px",
                        background: "rgba(245,238,228,0.08)",
                        border: "1px solid rgba(245,238,228,0.15)",
                      }}
                    />
                    <div>
                      <p
                        className="font-body font-semibold"
                        style={{ fontSize: "0.875rem", color: TEXT }}
                      >
                        Founder, Aurion
                      </p>
                      <p
                        className="font-body mt-0.5"
                        style={{ fontSize: "0.75rem", color: TEXT_MUTE }}
                      >
                        AI Adoption &amp; Enablement Consultant
                      </p>
                    </div>
                  </div>
                </blockquote>
              </div>

              <Link
                to="/how-we-work"
                className="group inline-flex items-center gap-3 font-body font-medium rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  background: TEXT,
                  color: BG,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                See how we close the Trust Gap
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustGap;