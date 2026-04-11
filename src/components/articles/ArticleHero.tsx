import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DancingText from "@/components/DancingText";

const ArticleHero = () => {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal/[0.08] blur-3xl pointer-events-none" />

      {/* Back nav */}
      <div className="relative z-10 px-6 md:px-12 pt-6">
        <Link
          to="/notes-from-the-room"
          className="inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-cream/50 hover:text-teal transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          All Articles
        </Link>
      </div>

      <div className="relative z-10 text-center px-6 md:px-12 pt-12 pb-16">
        {/* Kicker */}
        <span className="inline-block font-display text-[0.65rem] tracking-[0.18em] uppercase text-teal border border-teal/30 px-4 py-1.5 mb-6">
          Latest Project · STORM
        </span>

        {/* Title */}
        <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-cream max-w-[760px] mx-auto mb-5">
          <DancingText>When the Body Knows First</DancingText>
        </h1>

        {/* Subtitle */}
        <p className="font-body text-base md:text-lg text-cream/65 max-w-[600px] mx-auto mb-10 font-light leading-relaxed">
          Notes from a physical theatre practice in three countries, on presence, impulse, and what happens when you stop performing Shakespeare and start inhabiting him.
        </p>

        {/* Meta */}
        <div className="flex items-center justify-center gap-4 md:gap-8 font-display text-[0.75rem] tracking-[0.06em] uppercase text-cream/45 flex-wrap">
          <span>Laurențiu Tudor</span>
          <span className="text-teal">·</span>
          <span>April 2026</span>
          <span className="text-teal">·</span>
          <span>Craiova · Padova · Bonn</span>
        </div>

        {/* Project tag */}
        <div className="mt-12 max-w-[760px] mx-auto text-left bg-navy-light border-l-[3px] border-teal px-6 md:px-8 py-5 rounded-r">
          <p className="font-body text-[0.82rem] text-cream/60 leading-relaxed">
            <strong className="text-teal font-medium">STORM</strong>, Shakespeare and Theatre for Outlasting Resilience in Mental Health, is a Creative Europe project developed in partnership between Teatro Stabile del Veneto (Italy), Teatrul Național "Marin Sorescu" Craiova (Romania), fringe ensemble Bonn (Germany), and Fondazione Fitzcarraldo, with the support of the Department of General Psychology at the University of Padova. The project explores the intersection of Shakespearean theatre and the mental health of young adults, through participatory creative processes culminating in an international co-production.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
