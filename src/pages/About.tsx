// import { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import SectionReveal from "@/motion/SectionReveal";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // ─── Principles data ──────────────────────────────────────────────────────────

// const principles = [
//   {
//     label: "Human-Centred Adoption",
//     body: "We believe AI adoption is fundamentally about people  their confidence, their workflows, and their willingness to change. Technology is secondary.",
//   },
//   {
//     label: "Calm Leadership",
//     body: "In a world full of AI hype, we bring measured, thoughtful guidance. No panic, no pressure  just clarity.",
//   },
//   {
//     label: "Practical Over Theoretical",
//     body: "We focus on enablement that sticks  playbooks, workflows, and support structures that teams actually use.",
//   },
// ];

// const focusPoints = [
//   "practical workflows rather than abstract strategies",
//   "learning that fits into real work, not separate training events",
//   "internal ownership instead of long-term external dependency",
// ];

// const listeningPoints = [
//   "how teams actually work, not how processes look on paper",
//   "where effort is being duplicated or wasted",
//   "where uncertainty or fear is blocking progress",
// ];

// // ─── Animated pull-quote ──────────────────────────────────────────────────────

// const PullQuote = ({
//   text,
//   delay = 0,
// }: {
//   text: string;
//   delay?: number;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     gsap.fromTo(
//       ref.current,
//       { opacity: 0, x: -40 },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.9,
//         delay,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ref.current,
//           start: "top 85%",
//           toggleActions: "play none none none",
//         },
//       }
//     );
//   }, [delay]);

//   return (
//     <div
//       ref={ref}
//       className="my-8 pl-6 py-1"
//       style={{
//         opacity: 0,
//         borderLeft: "4px solid hsl(38,45%,55%)",
//       }}
//     >
//       <p
//         className="font-heading text-xl md:text-2xl font-medium leading-relaxed"
//         style={{ color: "hsl(15,20%,18%)" }}
//       >
//         {text}
//       </p>
//     </div>
//   );
// };

// // ─── Principle card ───────────────────────────────────────────────────────────

// const PrincipleCard = ({
//   principle,
//   index,
// }: {
//   principle: (typeof principles)[0];
//   index: number;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     gsap.fromTo(
//       ref.current,
//       { opacity: 0, y: 36, scale: 0.97 },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         duration: 0.75,
//         delay: index * 0.12,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ref.current,
//           start: "top 88%",
//           toggleActions: "play none none none",
//         },
//       }
//     );
//   }, [index]);

//   return (
//     <div
//       ref={ref}
//       className="p-6 md:p-8 rounded-sm"
//       style={{
//         opacity: 0,
//         background: "hsl(35,25%,94%)",
//         border: "1px solid hsl(30,15%,87%)",
//       }}
//     >
//       <span className="aurion-label block mb-3">{principle.label}</span>
//       <p className="font-body text-base leading-relaxed text-muted-foreground">
//         {principle.body}
//       </p>
//     </div>
//   );
// };

// // ─── Animated word reveal for hero ───────────────────────────────────────────

// const HeroSection = () => {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     const items = ref.current.querySelectorAll(".hero-line");
//     gsap.fromTo(
//       items,
//       { opacity: 0, y: 60, skewY: 2 },
//       {
//         opacity: 1,
//         y: 0,
//         skewY: 0,
//         stagger: 0.14,
//         duration: 1.0,
//         ease: "power4.out",
//         delay: 0.3,
//       }
//     );
//   }, []);

//   return (
//     <section className="aurion-section pb-16">
//       <div className="aurion-container">
//         <div ref={ref} className="overflow-hidden">
//           <span
//             className="hero-line aurion-label mb-5 block"
//             style={{ opacity: 0 }}
//           >
//             About Aurion
//           </span>
//           <div className="overflow-hidden mb-2">
//             <h1
//               className="hero-line aurion-heading-xl max-w-4xl"
//               style={{ opacity: 0 }}
//             >
//               Someone who understands
//             </h1>
//           </div>
//           <div className="overflow-hidden mb-8">
//             <h1
//               className="hero-line aurion-heading-xl max-w-4xl"
//               style={{ opacity: 0 }}
//             >
//               how organisations actually work.
//             </h1>
//           </div>
//           <div
//             className="hero-line aurion-divider mb-10"
//             style={{ opacity: 0 }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── Scrolling marquee text ───────────────────────────────────────────────────

// const MarqueeStrip = () => {
//   const trackRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!trackRef.current) return;
//     gsap.to(trackRef.current, {
//       x: "-50%",
//       duration: 28,
//       ease: "none",
//       repeat: -1,
//     });
//   }, []);

//   const words = [
//     "People-First AI",
//     "·",
//     "Calm Adoption",
//     "·",
//     "Practical Workflows",
//     "·",
//     "Human Judgement",
//     "·",
//     "Responsible Use",
//     "·",
//     "Organisational Clarity",
//     "·",
//   ];

//   return (
//     <div
//       className="overflow-hidden py-4 border-y"
//       style={{ borderColor: "hsl(30,15%,85%)" }}
//     >
//       <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
//         {[...words, ...words].map((w, i) => (
//           <span
//             key={i}
//             className="font-heading text-sm font-medium px-6"
//             style={{
//               color:
//                 w === "·" ? "hsl(38,45%,55%)" : "hsl(15,10%,52%)",
//             }}
//           >
//             {w}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ─── Horizontal scroll timeline ───────────────────────────────────────────────

// const TimelineSection = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const trackRef = useRef<HTMLDivElement>(null);

//   const steps = [
//     {
//       num: "01",
//       label: "Listen",
//       body: "Understand how teams actually work, not how processes look on paper.",
//     },
//     {
//       num: "02",
//       label: "Diagnose",
//       body: "Surface where effort is duplicated, where fear blocks progress, where AI could genuinely help.",
//     },
//     {
//       num: "03",
//       label: "Design",
//       body: "Embed AI carefully into existing workflows  documented clearly, aligned with how decisions already get made.",
//     },
//     {
//       num: "04",
//       label: "Enable",
//       body: "Build internal confidence, shared language, and repeatable practice  not dependency.",
//     },
//     {
//       num: "05",
//       label: "Hand Over",
//       body: "Leave the organisation stronger, clearer, and more self-sufficient than before.",
//     },
//   ];

//   useEffect(() => {
//     if (!sectionRef.current || !trackRef.current) return;

//     const totalWidth =
//       trackRef.current.scrollWidth - sectionRef.current.clientWidth;

//     const ctx = gsap.context(() => {
//       gsap.to(trackRef.current, {
//         x: -totalWidth,
//         ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: () => `+=${totalWidth}`,
//           pin: true,
//           scrub: 1,
//           anticipatePin: 1,
//         },
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="overflow-hidden">
//       <div
//         ref={trackRef}
//         className="flex items-stretch"
//         style={{ width: "fit-content" }}
//       >
//         {/* Label panel */}
//         <div
//           className="flex flex-col justify-center px-12 md:px-20 shrink-0"
//           style={{
//             width: "min(380px, 90vw)",
//             minHeight: "100vh",
//             background: "hsl(15,20%,12%)",
//           }}
//         >
//           <span
//             className="aurion-label mb-4 block"
//             style={{ color: "hsl(38,45%,62%)" }}
//           >
//             How We Work
//           </span>
//           <h2
//             className="font-heading text-3xl md:text-4xl font-semibold leading-tight"
//             style={{ color: "hsl(35,25%,92%)" }}
//           >
//             Five steps to lasting AI adoption.
//           </h2>
//           <p
//             className="font-body text-sm mt-4 leading-relaxed"
//             style={{ color: "hsl(35,10%,58%)" }}
//           >
//             Scroll to explore →
//           </p>
//         </div>

//         {/* Step cards */}
//         {steps.map((step, i) => (
//           <div
//             key={i}
//             className="flex flex-col justify-center px-12 md:px-16 shrink-0 border-l"
//             style={{
//               width: "min(340px, 85vw)",
//               minHeight: "100vh",
//               borderColor: "hsl(30,15%,85%)",
//               background: i % 2 === 0 ? "hsl(35,30%,96%)" : "hsl(35,25%,93%)",
//             }}
//           >
//             <span
//               className="font-heading text-6xl font-bold leading-none mb-4 opacity-15"
//               style={{ color: "hsl(0,55%,32%)" }}
//             >
//               {step.num}
//             </span>
//             <h3
//               className="font-heading text-2xl font-semibold mb-3"
//               style={{ color: "hsl(15,20%,15%)" }}
//             >
//               {step.label}
//             </h3>
//             <p className="font-body text-base leading-relaxed text-muted-foreground">
//               {step.body}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// // ─── Page ─────────────────────────────────────────────────────────────────────

// const About = () => {
//   // Parallax on the background of a section
//   const originRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!originRef.current) return;
//     gsap.fromTo(
//       originRef.current.querySelector(".parallax-text"),
//       { y: 0 },
//       {
//         y: -60,
//         ease: "none",
//         scrollTrigger: {
//           trigger: originRef.current,
//           start: "top bottom",
//           end: "bottom top",
//           scrub: true,
//         },
//       }
//     );
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main>
//         {/* ── Hero ── */}
//         <HeroSection />

//         {/* ── Marquee ── */}
//         <MarqueeStrip />

//         {/* ── Origin story ── */}
//         <section ref={originRef} className="aurion-section">
//           <div className="aurion-container">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
//               {/* Left: main narrative */}
//               <div className="parallax-text">
//                 <SectionReveal>
//                   <p className="aurion-body-lg mb-6">
//                     Aurion was born out of a simple, uncomfortable observation.
//                   </p>
//                 </SectionReveal>

//                 <PullQuote text="Most organisations are not struggling with AI because they lack tools. They are struggling because people do not know how AI fits into their real, everyday work." />

//                 <SectionReveal delay={0.1}>
//                   <p className="aurion-body mb-5">
//                     By the time AI becomes visible at leadership level, it is
//                     usually already being used quietly across teams. Sometimes
//                     confidently. Often inconsistently. Almost always without
//                     shared standards, clarity, or reassurance.
//                   </p>
//                   <p className="aurion-body mb-5">
//                     Aurion exists to bring calm to that moment.
//                   </p>
//                   <p
//                     className="aurion-body font-medium"
//                     style={{ color: "hsl(15,20%,18%)" }}
//                   >
//                     Not by rushing adoption. Not by overwhelming teams with
//                     technical complexity. But by helping organisations slow down
//                     just enough to understand what is already happening  and then
//                     shape it deliberately.
//                   </p>
//                 </SectionReveal>
//               </div>

//               {/* Right: principles */}
//               <div className="space-y-4">
//                 {principles.map((p, i) => (
//                   <PrincipleCard key={i} principle={p} index={i} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Horizontal scroll timeline ── */}
//         <TimelineSection />

//         {/* ── How the work happens ── */}
//         <section className="aurion-section">
//           <div className="aurion-container">
//             <SectionReveal>
//               <span className="aurion-label mb-4 block">The Work</span>
//               <h2 className="aurion-heading-lg max-w-2xl mb-6">
//                 The work Aurion does sits between people and systems.
//               </h2>
//               <div className="aurion-divider mb-12" />
//             </SectionReveal>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//               <div>
//                 <SectionReveal delay={0.1}>
//                   <p className="aurion-body mb-5">
//                     It starts by listening: how teams actually work, not how
//                     processes look on paper. Where effort is being duplicated or
//                     wasted. Where uncertainty or fear is blocking progress.
//                   </p>
//                   <p className="aurion-body mb-5">
//                     Only then does AI enter the conversation.
//                   </p>
//                   <p className="aurion-body mb-5">
//                     When it does, it is introduced carefully  embedded into
//                     existing workflows, documented clearly, and aligned with how
//                     the organisation already makes decisions.
//                   </p>
//                 </SectionReveal>

//                 <PullQuote text="AI should make work feel lighter. Not louder." />

//                 <SectionReveal delay={0.15}>
//                   <p className="aurion-body mb-5">
//                     Aurion does not treat AI adoption as a one-off transformation
//                     project. Real adoption happens slowly, through habit, trust,
//                     and repetition. It happens when people feel confident using AI
//                     without second-guessing themselves or worrying about getting it
//                     wrong.
//                   </p>
//                   <p className="aurion-body">
//                     It happens when teams understand not just how to use tools,
//                     but when and why.
//                   </p>
//                 </SectionReveal>
//               </div>

//               <div>
//                 <SectionReveal delay={0.2}>
//                   <h3 className="aurion-heading-md mb-6">
//                     That is why Aurion focuses on:
//                   </h3>
//                   <ul className="space-y-4 mb-10">
//                     {focusPoints.map((f, i) => (
//                       <li key={i} className="flex items-start gap-4">
//                         <span
//                           className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
//                           style={{ background: "hsl(38,45%,55%)" }}
//                         />
//                         <span className="aurion-body">{f}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </SectionReveal>

//                 {/* Dark callout box */}
//                 <SectionReveal delay={0.25}>
//                   <div
//                     className="rounded-sm p-6 md:p-8"
//                     style={{ background: "hsl(15,20%,12%)" }}
//                   >
//                     <p
//                       className="font-heading text-lg font-medium mb-2"
//                       style={{ color: "hsl(35,25%,92%)" }}
//                     >
//                       This is not technology-first consulting.
//                     </p>
//                     <p
//                       className="font-body text-base leading-relaxed"
//                       style={{ color: "hsl(35,10%,60%)" }}
//                     >
//                       It is people-first AI adoption.
//                     </p>
//                   </div>
//                 </SectionReveal>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ── Who it's for ── */}
//         <section
//           className="aurion-section"
//           style={{ background: "hsl(35,25%,93%)" }}
//         >
//           <div className="aurion-container">
//             <SectionReveal>
//               <span className="aurion-label mb-4 block">Who Aurion Works With</span>
//               <h2 className="aurion-heading-lg max-w-2xl mb-6">
//                 Already experimenting. Ready to bring coherence.
//               </h2>
//               <div className="aurion-divider mb-12" />
//             </SectionReveal>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
//               <SectionReveal delay={0.1}>
//                 <p className="aurion-body mb-5">
//                   Aurion works best with organisations that are already
//                   experimenting  even informally  and want to bring coherence to
//                   that experimentation without killing momentum.
//                 </p>
//                 <p className="aurion-body mb-5">
//                   Teams that value clarity, responsibility, and human judgement as
//                   much as efficiency.
//                 </p>
//                 <p className="aurion-body">
//                   This work is especially relevant where trust, compliance, and
//                   culture matter. Where decisions are complex. Where people, not
//                   just systems, carry the risk.
//                 </p>
//               </SectionReveal>

//               <SectionReveal delay={0.2}>
//                 <div
//                   className="p-6 md:p-8 rounded-sm h-full"
//                   style={{
//                     background: "hsl(35,30%,96%)",
//                     border: "1px solid hsl(30,15%,86%)",
//                   }}
//                 >
//                   <span className="aurion-label mb-4 block">
//                     The Practitioner Behind Aurion
//                   </span>
//                   <p className="aurion-body mb-4">
//                     Aurion is led by a practitioner with a background in
//                     psychology, learning, and organisational change.
//                   </p>
//                   <p className="aurion-body mb-4">
//                     This perspective comes from working within both complex
//                     institutions and fast-moving teams, where real decisions happen
//                     under real pressure.
//                   </p>
//                   <p className="aurion-body font-medium" style={{ color: "hsl(15,20%,18%)" }}>
//                     The work is grounded in how organisations operate in practice,
//                     not in idealised models.
//                   </p>
//                 </div>
//               </SectionReveal>
//             </div>
//           </div>
//         </section>

//         {/* ── Closing statement ── */}
//         <SectionReveal>
//           <section
//             className="py-24 md:py-36"
//             style={{ background: "hsl(15,20%,12%)" }}
//           >
//             <div className="aurion-container max-w-3xl text-center mx-auto px-6">
//               <span
//                 className="aurion-label mb-6 block"
//                 style={{ color: "hsl(38,45%,62%)" }}
//               >
//                 The Aim
//               </span>
//               <p
//                 className="font-heading text-2xl md:text-3xl lg:text-4xl font-medium leading-snug mb-8"
//                 style={{ color: "hsl(35,25%,92%)" }}
//               >
//                 AI will continue to evolve. What matters is how calmly
//                 organisations adapt to it.
//               </p>
//               <p
//                 className="font-body text-base md:text-lg leading-relaxed mb-10"
//                 style={{ color: "hsl(35,10%,58%)" }}
//               >
//                 Aurion exists to make that adaptation possible.
//               </p>
//               <Link
//                 to="/contact"
//                 className="aurion-btn-primary"
//                 style={{ borderRadius: "2px" }}
//               >
//                 Start a conversation →
//               </Link>
//             </div>
//           </section>
//         </SectionReveal>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default About;


import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Tokens ───────────────────────────────────────────────────────────────────
const T = {
  bg:       "hsl(35, 30%, 96%)",
  bgWarm:   "hsl(30, 20%, 92%)",
  bgCard:   "hsl(35, 30%, 98%)",
  bgDark:   "hsl(15, 20%, 12%)",
  primary:  "hsl(0, 55%, 32%)",
  gold:     "hsl(38, 45%, 55%)",
  fg:       "hsl(15, 20%, 15%)",
  fgMid:    "hsl(15, 12%, 30%)",
  fgMuted:  "hsl(15, 10%, 45%)",
  border:   "hsl(30, 15%, 85%)",
  offWhite: "rgba(245, 238, 228, 1)",
  offDim:   "rgba(245, 238, 228, 0.56)",
  offMute:  "rgba(245, 238, 228, 0.32)",
  offRule:  "rgba(245, 238, 228, 0.13)",
  dkGold:   "hsl(38, 45%, 62%)",
};

// ─── usePageMount ─────────────────────────────────────────────────────────────
function usePageMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.clearScrollMemory();
    let r1: number, r2: number;
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); clearTimeout(t); };
  }, []);
}

// ─── useReveal ────────────────────────────────────────────────────────────────
function useReveal(
  ref: React.RefObject<HTMLElement | null>,
  opts?: { y?: number; x?: number; delay?: number; duration?: number; start?: string }
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { y = 24, x = 0, delay = 0, duration = 0.8, start = "top 88%" } = opts ?? {};
    gsap.set(el, { opacity: 0, y, x, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1, y: 0, x: 0, duration, ease: "power2.out", delay, force3D: true,
        scrollTrigger: {
          trigger: el, start: () => start,
          toggleActions: "play none none none",
          once: true, invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── useLineDraw ──────────────────────────────────────────────────────────────
function useLineDraw(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { scaleX: 0, transformOrigin: "left center", immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        scaleX: 1, duration: 1.0, ease: "power2.inOut", delay,
        scrollTrigger: { trigger: el, start: () => "top 91%", once: true, invalidateOnRefresh: true },
      });
    }, el);
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── use3DTilt ────────────────────────────────────────────────────────────────
function use3DTilt(
  cardRef: React.RefObject<HTMLDivElement | null>,
  glowRef: React.RefObject<HTMLDivElement | null>,
  opts?: { accentMid?: string; borderHover?: string }
) {
  const rafRef = useRef<number | null>(null);
  const debRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hovRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const { accentMid = "hsla(0,55%,32%,0.07)", borderHover = "hsla(0,55%,32%,0.25)" } = opts ?? {};
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let tGX = 50, tGY = 50, cGX = 50, cGY = 50;

    const tick = () => {
      if (!hovRef.current) { rafRef.current = null; return; }
      cRX += (tRX - cRX) * 0.09; cRY += (tRY - cRY) * 0.09;
      cGX += (tGX - cGX) * 0.07; cGY += (tGY - cGY) * 0.07;
      card.style.transform = `perspective(1100px) rotateX(${cRX}deg) rotateY(${cRY}deg) translateY(-4px)`;
      glow.style.background = `radial-gradient(circle at ${cGX}% ${cGY}%, ${accentMid} 0%, transparent 60%)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    const enter = (e: MouseEvent) => {
      if (debRef.current) clearTimeout(debRef.current);
      hovRef.current = true;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 9;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 12;
      tGX = ((e.clientX - r.left) / r.width) * 100;
      tGY = ((e.clientY - r.top) / r.height) * 100;
      card.style.borderColor = borderHover;
      card.style.boxShadow   = "0 14px 36px -6px rgba(0,0,0,0.11)";
    };
    const leave = () => {
      debRef.current = setTimeout(() => {
        hovRef.current = false; tRX = 0; tRY = 0; tGX = 50; tGY = 50;
        gsap.to(card, { rotateX: 0, rotateY: 0, y: 0, boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)", duration: 0.6, ease: "power2.out", overwrite: true });
        card.style.borderColor = T.border;
        gsap.to(glow, { opacity: 0, duration: 0.35, overwrite: true, onComplete: () => { glow.style.opacity = "1"; glow.style.background = "none"; } });
      }, 40);
    };
    const move = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 9;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 12;
      tGX = ((e.clientX - r.left) / r.width) * 100;
      tGY = ((e.clientY - r.top) / r.height) * 100;
    };
    card.addEventListener("mouseenter", enter, { passive: true });
    card.addEventListener("mouseleave", leave, { passive: true });
    card.addEventListener("mousemove",  move,  { passive: true });
    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
      card.removeEventListener("mousemove",  move);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (debRef.current) clearTimeout(debRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

// ─── SLabel ───────────────────────────────────────────────────────────────────
const SLabel = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <span className="font-body font-semibold uppercase block mb-4"
    style={{ fontSize: "11px", letterSpacing: "0.22em", color: light ? T.dkGold : T.primary }}>
    {children}
  </span>
);

// ─── ReadingBar ───────────────────────────────────────────────────────────────
const ReadingBar = () => {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${Math.min(window.scrollY / total, 1)})`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 999, pointerEvents: "none", background: T.border }}>
      <div ref={barRef} style={{ height: "100%", background: T.primary, transform: "scaleX(0)", transformOrigin: "left center", willChange: "transform" }} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// IRIS IMAGE — completely new animation concept
//
// Technique: "Iris open + traced border"
// The image starts as a dot (scale 0, borderRadius 50%) and expands to fill
// its container while the border-radius eases from 50% → 12px (circle → rect).
// This mimics a camera iris / aperture opening — unexpected, organic, premium.
//
// Simultaneously:
// - A primary-coloured SVG border "draws" itself around the frame (strokeDashoffset)
// - The image scales from 1.12 → 1.0 (breathes in)
// - After reveal: scroll parallax drifts image upward
// - After reveal: mouse tilt on the panel gives 3D depth
// ═══════════════════════════════════════════════════════════════════════════════
function IrisImage({ src, delay = 0.8 }: { src: string; delay?: number }) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const imgRef    = useRef<HTMLImageElement>(null);
  const svgRef    = useRef<SVGRectElement>(null);
  const badgeRef  = useRef<HTMLDivElement>(null);

  // ── Iris open ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const wrap  = wrapRef.current;
    const img   = imgRef.current;
    const rect  = svgRef.current;
    const badge = badgeRef.current;
    if (!wrap || !img || !rect) return;

    const perimeter = 2 * (440 + 520); // SVG rect perimeter px

    // Initial state: dot
    gsap.set(wrap, {
      scale: 0,
      borderRadius: "50%",
      force3D: true,
      immediateRender: true,
    });
    gsap.set(img, { scale: 1.15, force3D: true, immediateRender: true });
    // SVG border starts invisible
    gsap.set(rect, { strokeDasharray: perimeter, strokeDashoffset: perimeter });
    if (badge) gsap.set(badge, { opacity: 0, scale: 0.88, y: 12, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });

      // 1. Iris opens: scale 0→1 + borderRadius 50%→12px
      tl.to(wrap, {
        scale: 1,
        borderRadius: "12px",
        duration: 0.95,
        ease: "expo.out",
        force3D: true,
      });

      // 2. Simultaneously: image breathes in
      tl.to(img, {
        scale: 1,
        duration: 1.1,
        ease: "power2.out",
        force3D: true,
      }, "<+0.05");

      // 3. Border traces itself after iris opens
      tl.to(rect, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.inOut",
      }, "<+0.4");

      // 4. Badge pops in
      if (badge) {
        tl.to(badge, {
          opacity: 1, scale: 1, y: 0,
          duration: 0.55, ease: "back.out(1.5)", force3D: true,
        }, ">-0.2");
      }
    }, wrap);

    return () => ctx.revert();
  }, [delay]);

  // ── Scroll parallax ────────────────────────────────────────────────────────
  useEffect(() => {
    const img   = imgRef.current;
    const panel = panelRef.current;
    if (!img || !panel) return;
    const ctx = gsap.context(() => {
      gsap.to(img, {
        y: -55, ease: "none",
        scrollTrigger: {
          trigger: panel, start: "top bottom", end: "bottom top",
          scrub: 1.3, invalidateOnRefresh: true,
        },
      });
    }, panel);
    return () => ctx.revert();
  }, []);

  // ── Mouse tilt on panel ────────────────────────────────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    let rafId: number;
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;
    let hov = false;
    const tick = () => {
      cRX += (tRX - cRX) * 0.07; cRY += (tRY - cRY) * 0.07;
      panel.style.transform = `perspective(1200px) rotateX(${cRX}deg) rotateY(${cRY}deg)`;
      rafId = requestAnimationFrame(tick);
    };
    const enter = (e: MouseEvent) => {
      hov = true;
      const r = panel.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 7;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 9;
    };
    const move = (e: MouseEvent) => {
      const r = panel.getBoundingClientRect();
      tRX = -(((e.clientY - r.top) / r.height) - 0.5) * 7;
      tRY =  (((e.clientX - r.left) / r.width) - 0.5) * 9;
    };
    const leave = () => {
      hov = false; tRX = 0; tRY = 0;
      gsap.to(panel, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power2.out", overwrite: true });
    };
    rafId = requestAnimationFrame(tick);
    panel.addEventListener("mouseenter", enter, { passive: true });
    panel.addEventListener("mousemove",  move,  { passive: true });
    panel.addEventListener("mouseleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      panel.removeEventListener("mouseenter", enter);
      panel.removeEventListener("mousemove",  move);
      panel.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        position: "relative",
        willChange: "transform",
        // height matches hero section rhythm
        height: "520px",
      }}
    >
      {/* SVG traced border — sits outside the image wrapper */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-6px", left: "-6px",
          width: "calc(100% + 12px)",
          height: "calc(100% + 12px)",
          pointerEvents: "none",
          zIndex: 3,
          overflow: "visible",
        }}
        viewBox="0 0 452 532"
        preserveAspectRatio="none"
      >
        <rect
          ref={svgRef}
          x="3" y="3"
          width="446" height="526"
          rx="14"
          fill="none"
          stroke={T.primary}
          strokeWidth="1.5"
          strokeDasharray="1920"
          strokeDashoffset="1920"
          opacity="0.5"
        />
      </svg>

      {/* Image wrapper — this is what irises open */}
      <div
        ref={wrapRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: "50%", // starts as circle, GSAP will open it
          position: "relative",
          willChange: "transform, border-radius",
          transformOrigin: "center center",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Team collaborating at a whiteboard"
          style={{
            width: "100%",
            height: "115%", // extra for parallax travel
            objectFit: "cover",
            objectPosition: "center 15%",
            display: "block",
            transformOrigin: "center center",
            willChange: "transform",
          }}
        />

        {/* Warm colour grade overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(150deg, hsla(0,55%,32%,0.09) 0%, hsla(38,45%,55%,0.05) 45%, transparent 70%)`,
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }} />

        {/* Bottom fade */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: `linear-gradient(to top, ${T.bg} 0%, transparent 100%)`,
          pointerEvents: "none",
        }} />
      </div>

      {/* Floating badge — bottom left, pops in after iris */}
      <div
        ref={badgeRef}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "-1.5rem",
          opacity: 0,
          zIndex: 10,
        }}
      >
        <div style={{
          background: T.bgCard,
          border: `1px solid ${T.border}`,
          borderRadius: "4px",
          padding: "1rem 1.4rem",
          boxShadow: "0 10px 32px -6px rgba(0,0,0,0.15)",
          minWidth: "196px",
        }}>
          <div style={{ height: "2px", width: "28px", background: T.primary, borderRadius: "1px", marginBottom: "0.7rem" }} />
          <p className="font-heading font-semibold" style={{ fontSize: "0.98rem", color: T.fg, lineHeight: 1.2, marginBottom: "0.2rem" }}>
            Human first
          </p>
          <p className="font-body" style={{ fontSize: "0.74rem", color: T.fgMuted, letterSpacing: "0.05em" }}>
            Behavioural approach to AI adoption
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HERO — split screen: copy left, iris image right
// ═══════════════════════════════════════════════════════════════════════════════
const HeroSection = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sub  = subRef.current;
    const cta  = ctaRef.current;
    if (!wrap || !sub || !cta) return;

    const h1Els = Array.from(wrap.querySelectorAll<HTMLElement>(".hero-h1"));
    h1Els.forEach(el => {
      const words = el.innerText.split(" ");
      el.innerHTML = words
        .map(w => `<span class="hw" style="display:inline-block;margin-right:0.25em">${w}</span>`)
        .join("");
    });
    const words = Array.from(wrap.querySelectorAll<HTMLElement>(".hw"));
    gsap.set(words,      { opacity: 0, y: 28, force3D: true, immediateRender: true });
    gsap.set([sub, cta], { opacity: 0, y: 16, force3D: true, immediateRender: true });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(wrap.querySelector(".hero-label"), { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" })
        .to(words, { opacity: 1, y: 0, stagger: 0.04, duration: 0.65, ease: "power3.out", force3D: true }, "-=0.2")
        .to(sub,   { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", force3D: true }, "-=0.2")
        .to(cta,   { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", force3D: true }, "-=0.35");
    }, wrap);
    return () => ctx.revert();
  }, []);

  useLineDraw(lineRef as React.RefObject<HTMLElement>);

  return (
    <section style={{
      background: T.bg,
      padding: "104px 0 84px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Warm radial — top right */}
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "52vw",
        background: `radial-gradient(ellipse at top right, hsla(0,55%,32%,0.055) 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />
      {/* Dot grid */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `radial-gradient(${T.border} 1px, transparent 1px)`,
        backgroundSize: "28px 28px", opacity: 0.45,
      }} />

      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Split: copy left (7 cols) | image right (5 cols) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "4rem",
          alignItems: "center",
        }}>

          {/* ── Left: copy ── */}
          <div ref={wrapRef}>
            <span className="hero-label font-body font-semibold uppercase block mb-5"
              style={{ fontSize: "11px", letterSpacing: "0.22em", color: T.primary, opacity: 0 }}>
              About Aurion
            </span>

            <h1 className="hero-h1 aurion-heading-xl leading-tight" style={{ margin: "0 0 0.1em" }}>
              Aurion began with a simple question
            </h1>
            <h1 className="hero-h1 aurion-heading-xl leading-tight" style={{ margin: "0 0 1.8rem" }}>
              that kept showing up everywhere.
            </h1>

            <p ref={subRef} className="font-body" style={{
              opacity: 0,
              fontSize: "clamp(1rem, 1.45vw, 1.15rem)",
              color: T.fgMuted, lineHeight: 1.78,
              maxWidth: "460px", marginBottom: "2.5rem",
              fontStyle: "italic",
            }}>
              A human, behavioural approach to responsible AI adoption.
            </p>

            <div ref={ctaRef} style={{ opacity: 0, marginBottom: "2.5rem" }}>
              <Link to="/contact"
                className="group inline-flex items-center gap-3 font-body font-medium"
                style={{ fontSize: "0.9rem", color: T.primary, textDecoration: "none", letterSpacing: "0.04em" }}
                onMouseEnter={e => { (e.currentTarget.querySelector(".arr-line") as HTMLElement).style.width = "40px"; }}
                onMouseLeave={e => { (e.currentTarget.querySelector(".arr-line") as HTMLElement).style.width = "24px"; }}
              >
                <span className="arr-line" style={{ display: "inline-block", height: "1px", width: "24px", background: T.primary, transition: "width 0.25s ease" }} />
                Book a clarity call
              </Link>
            </div>

            <div ref={lineRef} style={{ height: "2px", width: "56px", background: T.gold }} />
          </div>

          {/* ── Right: Iris image ── */}
          <IrisImage
            src="/src/assets/about-team.webp"
            delay={0.75}
          />

        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. MARQUEE
// ═══════════════════════════════════════════════════════════════════════════════
const MarqueeStrip = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, { x: "-50%", duration: 32, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);
  const words = ["People-First AI","·","Calm Adoption","·","Practical Workflows","·","Human Judgement","·","Responsible Use","·","Behavioural Clarity","·"];
  return (
    <div style={{ overflow: "hidden", padding: "12px 0", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: T.bgWarm }}>
      <div ref={trackRef} className="flex whitespace-nowrap" style={{ width: "200%" }}>
        {[...words, ...words].map((w, i) => (
          <span key={i} className="font-heading font-medium px-6"
            style={{ fontSize: "0.78rem", letterSpacing: "0.08em", color: w === "·" ? T.gold : T.fgMuted }}>{w}</span>
        ))}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. FOUNDER STORY
// ═══════════════════════════════════════════════════════════════════════════════
const FounderStory = () => {
  const headerRef   = useRef<HTMLDivElement>(null);
  const dividerRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);
  const quoteBarRef = useRef<HTMLDivElement>(null);

  useReveal(headerRef  as React.RefObject<HTMLElement>);
  useLineDraw(dividerRef as React.RefObject<HTMLElement>, 0.08);
  useReveal(leftRef    as React.RefObject<HTMLElement>, { y: 24, delay: 0.1 });

  useEffect(() => {
    const qt = quoteRef.current;
    const qb = quoteBarRef.current;
    if (!qt || !qb) return;
    gsap.set(qt, { opacity: 0, x: 28, force3D: true, immediateRender: true });
    gsap.set(qb, { scaleY: 0, transformOrigin: "top center", immediateRender: true });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: qt, start: () => "top 86%", once: true, invalidateOnRefresh: true },
      });
      tl.to(qb, { scaleY: 1, duration: 0.55, ease: "power2.inOut", delay: 0.1 })
        .to(qt, { opacity: 1, x: 0, duration: 0.75, ease: "power2.out", force3D: true }, "-=0.3");
    }, qt);
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: T.bg, padding: "88px 0" }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "1.75rem" }}>
          <SLabel>The Origin</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ maxWidth: "540px", margin: 0 }}>
            Aurion was born out of a simple, uncomfortable observation.
          </h2>
        </div>
        <div ref={dividerRef} className="aurion-divider" style={{ marginBottom: "3rem" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div ref={leftRef} style={{ opacity: 0 }}>
            <p className="font-body mb-5" style={{ fontSize: "1.05rem", color: T.fgMid, lineHeight: 1.82 }}>
              Teams wanted to know what good AI use looked like in their real work. Managers wanted to know how to guide their teams without feeling exposed. Leaders wanted to know what was actually happening on the ground. Everyone was experimenting quietly, but no one was talking about it openly.
            </p>
            <p className="font-body mb-5" style={{ fontSize: "1.05rem", color: T.fgMid, lineHeight: 1.82 }}>
              I realised the real challenge was not technology.
            </p>
            <p className="font-heading font-medium" style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", color: T.fg, lineHeight: 1.65, fontStyle: "italic" }}>
              It was the silence around it.
            </p>
          </div>
          <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
            <div ref={quoteBarRef} style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: T.primary, borderRadius: "2px" }} />
            <div ref={quoteRef} style={{ opacity: 0 }}>
              <p className="font-heading font-medium leading-relaxed" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: T.fg, lineHeight: 1.5, marginBottom: "1.1rem" }}>
                "People were not asking for more AI tools. They were asking for clarity."
              </p>
              <span className="font-body font-semibold uppercase block" style={{ fontSize: "10px", letterSpacing: "0.22em", color: T.fgMuted }}>
                Founding insight
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. VALUES CARDS
// ═══════════════════════════════════════════════════════════════════════════════
const valuesData = [
  { word: "Clarity",   body: "Helping organisations slow down just enough to understand what is already happening, and then shape it with intention.", accent: T.primary, accentBg: "hsla(0,55%,32%,0.05)", accentMid: "hsla(0,55%,32%,0.09)" },
  { word: "Judgement", body: "Grounded in real workflows, real decisions, and real human judgement. Not idealised models or abstract strategies.",     accent: T.gold,    accentBg: "hsla(38,45%,55%,0.07)", accentMid: "hsla(38,45%,55%,0.13)" },
  { word: "Ease",      body: "The goal is to make work feel lighter, not louder. AI introduced carefully, with confidence and without anxiety.",       accent: "hsl(16,42%,36%)", accentBg: "hsla(16,42%,36%,0.05)", accentMid: "hsla(16,42%,36%,0.1)" },
];

function ValueCard({ v, idx }: { v: typeof valuesData[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, glowRef, { accentMid: v.accentMid, borderHover: v.accent });
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 32, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: idx * 0.1, force3D: true, scrollTrigger: { trigger: el, start: () => "top 89%", once: true, invalidateOnRefresh: true } });
    }, el);
    return () => ctx.revert();
  }, [idx]);
  return (
    <div ref={cardRef} style={{ opacity: 0, position: "relative", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "4px", padding: "2.25rem 2rem", boxShadow: "0 2px 10px -2px rgba(0,0,0,0.06)", willChange: "transform, box-shadow", transition: "box-shadow 0.25s ease, border-color 0.25s ease", overflow: "hidden" }}>
      <div ref={glowRef} style={{ position: "absolute", inset: 0, borderRadius: "4px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: v.accent, borderRadius: "4px 4px 0 0" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <span className="font-body font-semibold uppercase" style={{ display: "inline-block", fontSize: "9.5px", letterSpacing: "0.2em", color: v.accent, background: v.accentBg, border: `1px solid ${v.accentMid}`, borderRadius: "2px", padding: "0.22rem 0.7rem", marginBottom: "1.25rem" }}>{v.word}</span>
        <h3 className="font-heading font-semibold leading-tight mb-4" style={{ fontSize: "clamp(1.25rem, 2vw, 1.65rem)", color: T.fg }}>{v.word}</h3>
        <div style={{ height: "1px", background: T.border, marginBottom: "0.9rem" }} />
        <p className="font-body" style={{ fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.82 }}>{v.body}</p>
      </div>
    </div>
  );
}

const ValuesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef as React.RefObject<HTMLElement>);
  return (
    <section style={{ background: T.bgWarm, padding: "88px 0" }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "2.75rem" }}>
          <SLabel>What Aurion Stands For</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ maxWidth: "520px", margin: 0 }}>Aurion was created to bring ease into that moment.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {valuesData.map((v, i) => <ValueCard key={v.word} v={v} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. APPROACH
// ═══════════════════════════════════════════════════════════════════════════════
const approachData = [
  { num: "01", label: "Understanding real work",  body: "How teams actually work. Where effort is being duplicated. Where uncertainty is creeping in. Where people are hesitating even though they want to move forward." },
  { num: "02", label: "Embedding into workflows", body: "When AI enters the conversation, it is always grounded in real workflows, real decisions, and real human judgement. Introduced carefully and documented clearly." },
  { num: "03", label: "Building confidence",      body: "When people understand what is safe, what is valued, and what will change, they stop experimenting in the shadows and start using AI with confidence." },
];

function ApproachRow({ item, idx }: { item: typeof approachData[0]; idx: number }) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  useReveal(rowRef  as React.RefObject<HTMLElement>, { x: idx % 2 === 0 ? -20 : 20, y: 0, delay: idx * 0.08, duration: 0.7 });
  useLineDraw(lineRef as React.RefObject<HTMLElement>, idx * 0.06);
  return (
    <div>
      <div ref={lineRef} style={{ height: "1px", background: T.border }} />
      <div ref={rowRef} style={{ opacity: 0, display: "grid", gridTemplateColumns: "64px 1fr", gap: "2rem", alignItems: "start", padding: "2.5rem 0" }}>
        <span className="font-heading font-bold leading-none" style={{ fontSize: "2.6rem", color: T.primary, opacity: 0.14, letterSpacing: "-0.03em", userSelect: "none" }}>{item.num}</span>
        <div>
          <h3 className="font-heading font-semibold mb-3" style={{ fontSize: "clamp(1rem, 1.55vw, 1.18rem)", color: T.fg, lineHeight: 1.3 }}>{item.label}</h3>
          <p className="font-body" style={{ fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.82, margin: 0 }}>{item.body}</p>
        </div>
      </div>
    </div>
  );
}

const ApproachSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef as React.RefObject<HTMLElement>);
  return (
    <section style={{ background: T.bg, padding: "88px 0" }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, maxWidth: "540px", marginBottom: "2.5rem" }}>
          <SLabel>The Approach</SLabel>
          <h2 className="aurion-heading-lg leading-tight mb-4" style={{ margin: "0 0 0.9rem" }}>My work sits in the space between people and systems.</h2>
          <p className="font-body" style={{ fontSize: "1.05rem", color: T.fgMuted, lineHeight: 1.75 }}>It starts with listening. Only after that do we talk about AI.</p>
        </div>
        <div style={{ maxWidth: "700px" }}>
          {approachData.map((item, i) => <ApproachRow key={item.num} item={item} idx={i} />)}
          <div style={{ height: "1px", background: T.border }} />
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. PSYCHOLOGICAL CONTRACT
// ═══════════════════════════════════════════════════════════════════════════════
const contractData = [
  { label: "Expectations", body: "What people believe AI will do and what it means for their role, their value, and their future at work." },
  { label: "Assumptions",  body: "The unspoken beliefs about safety, value, and change that nobody says out loud but everyone acts on." },
  { label: "Behaviours",   body: "What actually happens on the ground: experimentation, hesitation, shadow use, and quiet avoidance." },
];

function ContractCard({ item, idx }: { item: typeof contractData[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  use3DTilt(cardRef, glowRef, { accentMid: "hsla(38,45%,55%,0.1)", borderHover: "hsla(38,45%,55%,0.35)" });
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 28, force3D: true, immediateRender: true });
    const ctx = gsap.context(() => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: idx * 0.12, force3D: true, scrollTrigger: { trigger: el, start: () => "top 88%", once: true, invalidateOnRefresh: true } });
    }, el);
    return () => ctx.revert();
  }, [idx]);
  return (
    <div ref={cardRef} style={{ opacity: 0, position: "relative", background: "hsl(15,18%,16%)", border: `1px solid ${T.offRule}`, borderRadius: "4px", padding: "2.25rem 2rem", boxShadow: "0 2px 12px -3px rgba(0,0,0,0.22)", willChange: "transform, box-shadow", transition: "border-color 0.25s ease", overflow: "hidden" }}>
      <div ref={glowRef} style={{ position: "absolute", inset: 0, borderRadius: "4px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: T.gold, borderRadius: "4px 4px 0 0" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="flex items-center gap-3 mb-5">
          <span className="font-heading font-bold" style={{ fontSize: "1.2rem", color: T.dkGold, opacity: 0.3, lineHeight: 1 }}>{String(idx + 1).padStart(2, "0")}</span>
          <div style={{ flex: 1, height: "1px", background: T.offRule }} />
        </div>
        <h3 className="font-heading font-semibold mb-3" style={{ fontSize: "clamp(1rem, 1.5vw, 1.18rem)", color: T.offWhite, lineHeight: 1.25 }}>{item.label}</h3>
        <p className="font-body" style={{ fontSize: "0.875rem", color: T.offDim, lineHeight: 1.82, margin: 0 }}>{item.body}</p>
      </div>
    </div>
  );
}

const ContractSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const paraRef   = useRef<HTMLParagraphElement>(null);
  const callRef   = useRef<HTMLDivElement>(null);
  useReveal(headerRef as React.RefObject<HTMLElement>);
  useReveal(paraRef   as React.RefObject<HTMLElement>, { y: 18, delay: 0.1 });
  useReveal(callRef   as React.RefObject<HTMLElement>, { y: 16, delay: 0.24 });
  return (
    <section style={{ background: T.bgDark, padding: "88px 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "68vw", height: "55vh", background: "radial-gradient(ellipse, hsla(0,55%,32%,0.18) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div className="aurion-container" style={{ position: "relative", zIndex: 1 }}>
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "1rem" }}>
          <SLabel light>The Flagship Lens</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ color: T.offWhite, maxWidth: "580px", margin: 0 }}>The AI Psychological Contract Framework</h2>
        </div>
        <p ref={paraRef} className="font-body" style={{ opacity: 0, fontSize: "1.05rem", color: T.offDim, lineHeight: 1.78, maxWidth: "580px", marginBottom: "3rem" }}>
          Aurion's approach is rooted in behavioural psychology and organisational practice. This framework helps leaders understand the expectations, assumptions, and trust dynamics that shape adoption long before any tool does.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {contractData.map((item, i) => <ContractCard key={item.label} item={item} idx={i} />)}
        </div>
        <div ref={callRef} style={{ opacity: 0, display: "inline-flex", alignItems: "center", gap: "1.25rem", background: "hsl(15,18%,16%)", border: `1px solid ${T.offRule}`, borderRadius: "3px", padding: "1.1rem 1.75rem" }}>
          <span className="font-heading font-medium" style={{ fontSize: "0.95rem", fontStyle: "italic", color: T.offWhite }}>This is not technology-first consulting.</span>
          <span style={{ width: "1px", height: "16px", background: T.offRule, flexShrink: 0 }} />
          <span className="font-body font-semibold uppercase" style={{ fontSize: "10px", letterSpacing: "0.18em", color: T.dkGold }}>People-first AI adoption.</span>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 7. WHO IT'S FOR
// ═══════════════════════════════════════════════════════════════════════════════
const whoItems = [
  "Organisations already experimenting, even informally",
  "Teams that value clarity and human judgement as much as efficiency",
  "Leaders who want clarity without losing momentum",
  "Places where trust, culture, and responsibility matter",
  "Work where compliance and culture are as important as output",
  "Decisions where people, not just systems, carry the risk",
];

const WhoSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bioRef    = useRef<HTMLDivElement>(null);
  const itemRefs  = whoItems.map(() => useRef<HTMLLIElement>(null));
  useReveal(headerRef as React.RefObject<HTMLElement>);
  useReveal(bioRef    as React.RefObject<HTMLElement>, { x: 24, y: 0, delay: 0.12 });
  useEffect(() => {
    itemRefs.forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { opacity: 0, x: -18, force3D: true, immediateRender: true });
      const ctx = gsap.context(() => {
        gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: i * 0.06, force3D: true, scrollTrigger: { trigger: el, start: () => "top 92%", once: true, invalidateOnRefresh: true } });
      }, el);
      return () => ctx.revert();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section style={{ background: T.bgWarm, padding: "88px 0" }}>
      <div className="aurion-container">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "2.75rem" }}>
          <SLabel>Who Aurion Works Best With</SLabel>
          <h2 className="aurion-heading-lg leading-tight" style={{ maxWidth: "500px", margin: 0 }}>Already experimenting. Ready to bring coherence.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {whoItems.map((item, i) => (
              <li key={i} ref={itemRefs[i]} style={{ opacity: 0, display: "flex", alignItems: "flex-start", gap: "0.9rem", padding: "0.95rem 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.gold, flexShrink: 0, marginTop: "0.6rem" }} />
                <span className="font-body" style={{ fontSize: "0.9rem", color: T.fgMid, lineHeight: 1.68 }}>{item}</span>
              </li>
            ))}
            <li style={{ borderBottom: `1px solid ${T.border}` }} />
          </ul>
          <div ref={bioRef} style={{ opacity: 0, background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: "4px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: T.primary, borderRadius: "4px 4px 0 0" }} />
            <SLabel>The Practitioner Behind Aurion</SLabel>
            <p className="font-body mb-4" style={{ fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.85 }}>My background is in psychology, learning, and organisational change. I have worked inside complex institutions and fast moving teams, and I understand how decisions actually get made under pressure.</p>
            <p className="font-body mb-4" style={{ fontSize: "0.875rem", color: T.fgMuted, lineHeight: 1.85 }}>This perspective comes from working within both complex institutions and fast-moving teams, where real decisions happen under real pressure.</p>
            <p className="font-body font-medium" style={{ fontSize: "0.875rem", color: T.fg, lineHeight: 1.7 }}>That experience shapes everything Aurion does.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// 8. CLOSING CTA
// ═══════════════════════════════════════════════════════════════════════════════
const ClosingCTA = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef  = useRef<HTMLDivElement>(null);
  useReveal(wrapRef as React.RefObject<HTMLElement>, { y: 28 });
  useReveal(btnRef  as React.RefObject<HTMLElement>, { y: 18, delay: 0.3 });
  return (
    <section style={{ background: T.bgDark, padding: "104px 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-25%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "50vh", background: "radial-gradient(ellipse, hsla(38,45%,55%,0.07) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }} />
      <div className="aurion-container text-center" style={{ maxWidth: "600px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={wrapRef} style={{ opacity: 0, marginBottom: "2.75rem" }}>
          <SLabel light>The Belief</SLabel>
          <p className="font-heading font-medium leading-snug mb-6" style={{ fontSize: "clamp(1.35rem, 2.8vw, 2.2rem)", color: T.offWhite, letterSpacing: "-0.01em" }}>
            When people feel confident, AI becomes a tool for clarity, not confusion.
          </p>
          <p className="font-body" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", color: T.offDim, lineHeight: 1.78, fontStyle: "italic" }}>
            A conversation about where AI is showing up in your organisation.
          </p>
        </div>
        <div ref={btnRef} style={{ opacity: 0 }}>
          <Link to="/contact"
            className="group relative inline-flex items-center gap-3 font-body font-medium rounded-sm overflow-hidden"
            style={{ padding: "0.875rem 1.8rem", fontSize: "0.95rem", background: T.offWhite, color: T.bgDark, transition: "opacity 0.18s ease", textDecoration: "none" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.87"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            <span aria-hidden="true" className="absolute inset-0 bg-white/[0.08] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Book a clarity call</span>
            <span className="relative z-10 inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const About = () => {
  usePageMount();
  return (
    <>
      <ReadingBar />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <FounderStory />
        <ValuesSection />
        <ApproachSection />
        <ContractSection />
        <WhoSection />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
};

export default About;