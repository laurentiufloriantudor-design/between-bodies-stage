import HeroSection from "@/components/HeroSection";
import WorkshopSection from "@/components/WorkshopSection";
import AboutSection from "@/components/AboutSection";
import ApplySection from "@/components/ApplySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <WorkshopSection />
      <AboutSection />
      <ApplySection />
      <FooterSection />
    </div>
  );
};

export default Index;
