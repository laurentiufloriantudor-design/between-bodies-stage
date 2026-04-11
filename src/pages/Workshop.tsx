import ResidencyTeaser from "@/components/ResidencyTeaser";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";

const Workshop = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ResidencyTeaser />
      <NewsletterSection variant="light" />
      <FooterSection />
    </div>
  );
};

export default Workshop;
