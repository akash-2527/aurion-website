// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   HWWPageHero,
//   HWWOverview,
//   HWWWhatWeDo,
//   HWWFourPhases,
//   HWWTrustGap,
//   HWWWhoWeWorkWith,
//   HWWBookCta,
// } from "./how-we-work";

// // ─── HowWeWork page ───────────────────────────────────────────────────────────
// //
// //  This file is intentionally thin:
// //    • Wires Navbar + Footer
// //    • Handles hash navigation from the navbar dropdown
// //    • Clears stale ScrollTrigger state on mount
// //    • Composes section components in order
// //
// //  To edit any section open its file in src/pages/how-we-work/
// //
// const HowWeWork = () => {
//   const location = useLocation();

//   // ── Hash scroll (navbar dropdown links use /how-we-work#section-id) ───────
//   useEffect(() => {
//     const hash = location.hash;
//     if (hash) {
//       // 120ms defer — React finishes render + section heights settle first
//       const t = setTimeout(() => {
//         const el = document.querySelector(hash);
//         if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//       }, 120);
//       return () => clearTimeout(t);
//     }
//     window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
//   }, [location.hash]);

//   // ── Clear stale ScrollTrigger positions on every page visit ───────────────
//   useEffect(() => {
//     ScrollTrigger.clearScrollMemory();
//     const t = setTimeout(() => ScrollTrigger.refresh(), 280);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main>
//         <HWWPageHero />
//         <HWWOverview />
//         <HWWWhatWeDo />
//         <HWWFourPhases />
//         <HWWTrustGap />
//         <HWWWhoWeWorkWith />
//         <HWWBookCta />
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default HowWeWork;