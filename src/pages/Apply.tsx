import ApplySection from "@/components/ApplySection";
import NewsletterSection from "@/components/NewsletterSection";
import FooterSection from "@/components/FooterSection";

const Apply = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ApplySection />
      <NewsletterSection variant="light" />
      <FooterSection />
    </div>
  );
};

export default Apply;
