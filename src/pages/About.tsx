import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AboutSection from "@/components/AboutSection";
import FacilitatorSection from "@/components/FacilitatorSection";
import FooterSection from "@/components/FooterSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-6 md:px-12 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-foreground/50 hover:text-teal transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>
      <AboutSection />
      <FacilitatorSection />
      <FooterSection />
    </div>
  );
};

export default About;
