import ArticleHero from "@/components/articles/ArticleHero";
import ArticleBody from "@/components/articles/ArticleBody";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

const WhenTheBodyKnowsFirst = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="When the Body Knows First: Physical Theatre and Mental Health Across Europe | Between Bodies"
        description="Notes from a physical theatre practice in Craiova, Padova, and Bonn, on presence, impulse, and inhabiting Shakespeare through the body."
        canonical="/notes-from-the-room/when-the-body-knows-first"
      />
      <ArticleHero />
      <ArticleBody />
      <FooterSection />
    </div>
  );
};

export default WhenTheBodyKnowsFirst;
