import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ResidencyTeaser from "@/components/ResidencyTeaser";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

const Workshop = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Summer 2026 Theatre Lab in Turin | Between Bodies"
        description="An intensive physical theatre laboratory in Turin, Summer 2026. Led by Laurențiu Tudor for trained performers seeking presence, contact, and relational practice."
        canonical="/workshop"
      />
      <div className="px-6 md:px-12 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-foreground/50 hover:text-teal transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>
      <ResidencyTeaser />
      <NewsletterSection variant="light" />
      <FooterSection />
    </div>
  );
};

export default Workshop;
