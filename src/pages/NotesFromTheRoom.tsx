import { useEffect } from "react";
import ArticleHero from "@/components/articles/ArticleHero";
import ArticleBody from "@/components/articles/ArticleBody";
import FooterSection from "@/components/FooterSection";

const NotesFromTheRoom = () => {
  useEffect(() => {
    document.title = "When the Body Knows First: Physical Theatre and Mental Health Across Europe | Between Bodies";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ArticleHero />
      <ArticleBody />
      <FooterSection />
    </div>
  );
};

export default NotesFromTheRoom;
