import PartnerHero from "@/components/partner/PartnerHero";
import WhatWeOffer from "@/components/partner/WhatWeOffer";
import WhatWeNeed from "@/components/partner/WhatWeNeed";
import PastEditions from "@/components/partner/PastEditions";
import PdfDownload from "@/components/partner/PdfDownload";
import NewsletterSection from "@/components/NewsletterSection";
import PartnerContact from "@/components/partner/PartnerContact";
import PartnerFooter from "@/components/partner/PartnerFooter";

const PartnerWithUs = () => {
  return (
    <div className="min-h-screen bg-foreground text-cream">
      <PartnerHero />
      <WhatWeOffer />
      <WhatWeNeed />
      <PastEditions />
      <PdfDownload />
      <PartnerContact />
      <NewsletterSection variant="dark" />
      <PartnerFooter />
    </div>
  );
};

export default PartnerWithUs;
