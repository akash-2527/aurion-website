import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RouteEffects from "./motion/RouteEffects";

const pageLoaders = {
  CaseStudies:      () => import("./pages/CaseStudies"),
  CaseStudyDetail:  () => import("./pages/CaseStudyDetail"),
  About:            () => import("./pages/About"),
  Resources:        () => import("./pages/Resources"),
  Contact:          () => import("./pages/Contact"),
  Services:         () => import("./pages/Services"),
  HWWOverview:      () => import("./pages/how-we-work/Overview"),
  HWWWhatWeDo:      () => import("./pages/how-we-work/WhatWeDo"),
  HWWFourPhases:    () => import("./pages/how-we-work/FourPhases"),
  HWWTrustGap:      () => import("./pages/how-we-work/TrustGap"),
  HWWWhoWeWorkWith: () => import("./pages/how-we-work/WhoWeWorkWith"),
};

const CaseStudies       = lazy(pageLoaders.CaseStudies);
const CaseStudyDetail   = lazy(pageLoaders.CaseStudyDetail);
const About             = lazy(pageLoaders.About);
const Resources         = lazy(pageLoaders.Resources);
const Contact           = lazy(pageLoaders.Contact);
const Services          = lazy(pageLoaders.Services);

// How We Work sub-pages
const HWWOverview       = lazy(pageLoaders.HWWOverview);
const HWWWhatWeDo       = lazy(pageLoaders.HWWWhatWeDo);
const HWWFourPhases     = lazy(pageLoaders.HWWFourPhases);
const HWWTrustGap       = lazy(pageLoaders.HWWTrustGap);
const HWWWhoWeWorkWith  = lazy(pageLoaders.HWWWhoWeWorkWith);

// Warm the route chunks once the first page is idle, so later navigations
// render immediately instead of flashing the Loading screen.
const usePrefetchRoutes = () => {
  useEffect(() => {
    const prefetch = () => Object.values(pageLoaders).forEach((load) => load().catch(() => {}));
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(prefetch, 2500);
    return () => clearTimeout(t);
  }, []);
};

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(35,30%,96%)" }}>
    <span className="font-heading text-xl" style={{ color: "hsl(15,10%,52%)" }}>Loading…</span>
  </div>
);

const App = () => {
  usePrefetchRoutes();
  return (
    <BrowserRouter>
      <RouteEffects />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/"                             element={<Index />} />

          {/* Case Studies */}
          <Route path="/case-studies"                 element={<CaseStudies />} />
          <Route path="/case-studies/:id"             element={<CaseStudyDetail />} />

          {/* How We Work */}
          <Route path="/how-we-work"                  element={<HWWOverview />} />
          <Route path="/how-we-work/what-we-do"       element={<HWWWhatWeDo />} />
          <Route path="/how-we-work/phases"           element={<HWWFourPhases />} />
          <Route path="/how-we-work/trust-gap"        element={<HWWTrustGap />} />
          <Route path="/how-we-work/who-we-work-with" element={<HWWWhoWeWorkWith />} />

          {/* Other pages */}
          <Route path="/about"                        element={<About />} />
          <Route path="/resources"                    element={<Resources />} />
          <Route path="/contact"                      element={<Contact />} />
          <Route path="/services"                     element={<Services />} />
          <Route path="*"                             element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
