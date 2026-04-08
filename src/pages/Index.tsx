import HeroSection from "@/components/HeroSection";
import WorkshopSection from "@/components/WorkshopSection";
import ResidencyTeaser from "@/components/ResidencyTeaser";
import FacilitatorSection from "@/components/FacilitatorSection";
import AboutSection from "@/components/AboutSection";
import ApplySection from "@/components/ApplySection";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <WorkshopSection />
      <ResidencyTeaser />
      <FacilitatorSection />
      <AboutSection />
      <ApplySection />
      <NewsletterSection variant="light" />
      <FooterSection />
    </div>
  );
};

export default Index;
