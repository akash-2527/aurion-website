import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const CaseStudies       = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail   = lazy(() => import("./pages/CaseStudyDetail"));
const About             = lazy(() => import("./pages/About"));
const Resources         = lazy(() => import("./pages/Resources"));
const Contact           = lazy(() => import("./pages/Contact"));
const Services          = lazy(() => import("./pages/Services"));

// How We Work sub-pages
const HWWOverview       = lazy(() => import("./pages/how-we-work/Overview"));
const HWWWhatWeDo       = lazy(() => import("./pages/how-we-work/WhatWeDo"));
const HWWFourPhases     = lazy(() => import("./pages/how-we-work/FourPhases"));
const HWWTrustGap       = lazy(() => import("./pages/how-we-work/TrustGap"));
const HWWWhoWeWorkWith  = lazy(() => import("./pages/how-we-work/WhoWeWorkWith"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "hsl(35,30%,96%)" }}>
    <span className="font-heading text-xl" style={{ color: "hsl(15,10%,52%)" }}>Loading…</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;