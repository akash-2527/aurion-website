import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AurionLine from "@/motion/AurionLine";
import HeroSection from "@/components/home/HeroSection";
import CurrentReality from "@/components/home/CurrentReality";
import CorePillars from "@/components/home/CorePillars";
import HowWeWorkSection from "@/components/home/HowWeWorkSection";
import ProofSection from "@/components/home/ProofSection";
import ToolsSection from "@/components/home/ToolsSection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <>
      <Navbar />
      <AurionLine />
      <main className="relative z-10">
        <HeroSection />
        <CurrentReality />
        <CorePillars />
        <HowWeWorkSection />
        <ProofSection />
        <ToolsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
