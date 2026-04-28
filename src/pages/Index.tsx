import HeroSection from "@/components/HeroSection";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Between Bodies — Physical Theatre Workshops & Laboratories"
        description="Between Bodies is an international series of physical and relational theatre laboratories for trained performers. Founded by Laurențiu Tudor. Workshops in Italy, Romania, and across Europe."
        canonical="/"
      />
      <HeroSection />
      <NewsletterSection variant="light" />
      <FooterSection />
    </div>
  );
};

export default Index;
