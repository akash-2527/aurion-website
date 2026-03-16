// import { Link } from "react-router-dom";
// import SectionReveal from "@/motion/SectionReveal";
// import HoverAnimator from "@/motion/HoverAnimator";

// type Pillar = {
//   title: string;
//   oneLiner: string;
// };

// const pillars: Pillar[] = [
//   {
//     title: "Sensemaking & Readiness",
//     oneLiner:
//       "Organisations cannot design responsible AI adoption until they understand what is already happening.",
//   },
//   {
//     title: "Workflow Enablement",
//     oneLiner: "AI becomes sustainable when it fits naturally into real work.",
//   },
//   {
//     title: "Adoption Operations",
//     oneLiner:
//       "Adoption grows when communication, champions, and rhythms support it.",
//   },
// ];

// const CorePillars = () => (
//   <section className="aurion-section">
//     <div className="aurion-container">
//       <SectionReveal>
//         <span className="aurion-label mb-4 block">What We Do</span>
//         <h2 className="aurion-heading-lg max-w-2xl mb-6">
//           Three pillars of practical AI enablement.
//         </h2>
//         <div className="aurion-divider mb-14" />
//       </SectionReveal>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//         {pillars.map((pillar, i) => (
//           <SectionReveal key={pillar.title} delay={i * 0.12}>
//             <HoverAnimator>
//               <div className="aurion-card h-full flex flex-col">
//                 <span className="aurion-label text-primary mb-3 block">
//                   Pillar {i + 1}
//                 </span>
//                 <h3 className="aurion-heading-md mb-4 leading-snug">
//                   {pillar.title}
//                 </h3>
//                 <p className="aurion-body text-sm md:text-base flex-1">
//                   {pillar.oneLiner}
//                 </p>
//               </div>
//             </HoverAnimator>
//           </SectionReveal>
//         ))}
//       </div>

//       <SectionReveal delay={0.25}>
//         <div className="mt-12">
//           <Link to="/how-we-work" className="aurion-btn-primary">
//             See the full approach
//           </Link>
//         </div>
//       </SectionReveal>
//     </div>
//   </section>
// );

// export default CorePillars;