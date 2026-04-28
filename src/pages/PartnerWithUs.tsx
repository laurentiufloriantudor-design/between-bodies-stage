import PartnerHero from "@/components/partner/PartnerHero";
import WhatWeOffer from "@/components/partner/WhatWeOffer";
import WhatWeNeed from "@/components/partner/WhatWeNeed";
import HowItWorks from "@/components/partner/HowItWorks";
import PastEditions from "@/components/partner/PastEditions";
import PdfDownload from "@/components/partner/PdfDownload";
import NewsletterSection from "@/components/NewsletterSection";
import PartnerContact from "@/components/partner/PartnerContact";
import PartnerFooter from "@/components/partner/PartnerFooter";
import SEOHead from "@/components/SEOHead";

const PartnerWithUs = () => {
  return (
    <div className="min-h-screen bg-foreground text-cream">
      <SEOHead
        title="Partner With Between Bodies | Host an International Theatre Lab"
        description="Partner with Between Bodies to host international physical theatre laboratories. For institutions, festivals, and cultural organizations across Europe."
        canonical="/partner"
      />
      <PartnerHero />
      <WhatWeOffer />
      <WhatWeNeed />
      <HowItWorks />
      <PastEditions />
      <PdfDownload />
      <PartnerContact />
      <NewsletterSection variant="dark" />
      <PartnerFooter />
    </div>
  );
};

export default PartnerWithUs;
