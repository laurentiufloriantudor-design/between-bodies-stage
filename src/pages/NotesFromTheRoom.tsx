import { Helmet } from "react-helmet-async";
import ArticleHero from "@/components/articles/ArticleHero";
import ArticleBody from "@/components/articles/ArticleBody";
import FooterSection from "@/components/FooterSection";

const NotesFromTheRoom = () => {
  return (
    <>
      <Helmet>
        <title>When the Body Knows First: Physical Theatre and Mental Health Across Europe | Between Bodies</title>
        <meta name="description" content="Laurențiu Tudor on three physical theatre laboratories across Romania, Italy and Germany — exploring contact improvisation, Laban, Grotowski and somatic work as tools for presence, vulnerability and applied theatre." />
        <meta name="keywords" content="physical theatre workshops, applied theatre, contact improvisation, Laban movement analysis, Grotowski, somatic work, devised theatre, theatre and mental health, acting training, physical theatre Europe, theatre pedagogy, presence training actors, Shakespeare devised work" />
        <meta name="author" content="Laurențiu Tudor" />
        <meta property="og:title" content="When the Body Knows First | Between Bodies" />
        <meta property="og:description" content="Notes from a physical theatre practice across three countries — on the body as instrument, vulnerability as resource, and what Shakespeare offers when you stop performing him." />
        <meta property="og:type" content="article" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://betweenbodies.eu/articles/when-the-body-knows-first" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "When the Body Knows First: Physical Theatre and Mental Health Across Europe",
          "description": "Notes from three physical theatre workshops across Romania, Italy, and Germany — on somatic practice, vulnerability, and applied theatre.",
          "author": { "@type": "Person", "name": "Laurențiu Tudor" },
          "publisher": { "@type": "Organization", "name": "Between Bodies" },
          "keywords": "physical theatre, applied theatre, contact improvisation, Laban, Grotowski, somatic work, Shakespeare"
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background text-foreground">
        <ArticleHero />
        <ArticleBody />
        <FooterSection />
      </div>
    </>
  );
};

export default NotesFromTheRoom;
