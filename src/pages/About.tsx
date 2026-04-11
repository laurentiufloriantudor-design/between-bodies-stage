import AboutSection from "@/components/AboutSection";
import FacilitatorSection from "@/components/FacilitatorSection";
import FooterSection from "@/components/FooterSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AboutSection />
      <FacilitatorSection />
      <FooterSection />
    </div>
  );
};

export default About;
