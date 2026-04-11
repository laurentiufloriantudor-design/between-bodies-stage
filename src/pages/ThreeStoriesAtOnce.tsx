import { useEffect } from "react";
import FooterSection from "@/components/FooterSection";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DancingText from "@/components/DancingText";
import ArticlePoll from "@/components/ArticlePoll";

const ArticleHero = () => (
  <section className="relative bg-navy overflow-hidden">
    <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal/[0.08] blur-3xl pointer-events-none" />

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
      <span className="inline-block font-display text-[0.65rem] tracking-[0.18em] uppercase text-teal border border-teal/30 px-4 py-1.5 mb-6">
        Notes from the Room
      </span>

      <h1 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] text-cream max-w-[760px] mx-auto mb-5">
        <DancingText>Three Stories at Once</DancingText>
      </h1>

      <p className="font-body text-base md:text-lg text-cream/65 max-w-[600px] mx-auto mb-10 font-light leading-relaxed">
        On the first Between Bodies laboratory in Turin, and what happens when bodies begin to listen.
      </p>

      <div className="flex items-center justify-center gap-4 md:gap-8 font-display text-[0.75rem] tracking-[0.06em] uppercase text-cream/45 flex-wrap">
        <span>Laurențiu Tudor</span>
        <span className="text-teal">·</span>
        <span>March 2025</span>
        <span className="text-teal">·</span>
        <span>Turin</span>
      </div>
    </div>
  </section>
);

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="my-12 mx-0 md:-mx-8 px-6 md:px-10 py-8 bg-cream border-l-4 border-coral">
    <p className="font-display text-xl md:text-2xl italic text-navy leading-snug normal-case" style={{ lineHeight: 1.55 }}>
      {children}
    </p>
  </blockquote>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl text-navy mt-12 mb-4 pt-10 border-t border-cream normal-case">
    {children}
  </h2>
);

const ArticleBody = () => (
  <article className="max-w-[680px] mx-auto px-6 md:px-8 py-16 md:py-20">
    <p className="font-body text-base leading-[1.85] text-foreground mb-6 first-letter:font-display first-letter:text-[3.8rem] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-[0.1em] first-letter:mt-[0.12em] first-letter:text-coral">
      There is a particular quality of attention that a room holds before anything
      has been asked of it. Turin, early March. Eleven people. A space. The first
      moments of a laboratory that had not yet found its shape. What I felt in that
      room was curiosity, the open kind, not the kind that tests, but the kind that
      arrives already leaning toward something it cannot yet name.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      I made a choice not to begin where I usually begin.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      No names, no introductions, no warmth of social ritual. Instead: a circle, and
      a sequence so simple it almost seemed like nothing. One person steps to the
      center, finds someone's eyes, and says <em>I</em>, pointing to themselves.
      Then <em>You</em>, pointing outward. The other person walks in and stands
      beside them. Together: <em>We.</em> And then the whole group: <em>We.</em>
    </p>

    <PullQuote>
      You must first locate yourself before you can truly locate another, and only
      through that double act of location does something genuinely shared become
      possible.
    </PullQuote>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      The <em>We</em> that arrives at the end is earned, not assumed. What I watched
      in those first minutes was not an exercise being executed, it was people
      discovering that they had permission to actually look. To take the time. To let
      the seeing be something that happened to them.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      Most groups rush through the looking. This one slowed down.
    </p>

    <SectionHeading>Stay. Leave. I cannot.</SectionHeading>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      Later, I offered three lines: <em>Stay. Leave. I cannot.</em>
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      At first they were tasks, directions to embody, problems to solve with the
      body. Then, slowly, they became inhabited. The words traveled inward and
      reorganized something. <em>Leave</em> stopped being a word and became a pull
      in the sternum, a pressure in the feet, a particular quality of held breath.{" "}
      <em>Stay</em> became resistance, weight, the decision of the spine.{" "}
      <em>I cannot</em>, that one opened into something larger: the gap between
      wanting and being able to, the architecture of a person caught between forces
      that do not resolve.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      Then came the contrast: <em>Leave</em> in the voice, <em>Stay</em> in the
      body. Or the reverse.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      This is where I believe theatre lives, not in resolution, not in the emotion
      correctly delivered, but in the simultaneous. In the human being who is going
      and staying at the same time. The group found this not through analysis but
      through accumulation. They kept doing it until the doing became something else.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      At that point I brought two of the participants to the side of the room and
      gave them a text. A repetitive monologue, I had not broken it into lines, had
      not assigned it. Their only task was to negotiate: which part belongs to whom,
      which parts are said together, when to let silence hold. And the negotiation
      could not happen by speaking to each other. It had to happen while doing it,
      in real time, in front of the others who were still moving.
    </p>

    <PullQuote>
      What emerged was a score. Not a script, a score.
    </PullQuote>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      The voice became one more element of the composition, like breath, like the
      relationship between two bodies finding each other across the space. When they
      finally knew the text well enough, we dissolved the boundary: the whole group
      took the words into the movement, or the movement took the words into itself.
      The text arrived as texture, not instruction. Because by then the bodies
      already had a story to tell. It was becoming legible.
    </p>

    <SectionHeading>Not reproduced. Welcomed.</SectionHeading>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      No movement in that composition was generated by me. Each one came from a body
      in relation with the space, and with the other bodies. No emotion was assigned,
      analyzed, or set as a target. What we were not doing, across all three days,
      was learning to reproduce a feeling. We were doing something quieter and more
      demanding: acknowledging that emotions exist, that they arrive, and that when
      they do, they can be welcomed rather than managed. Let come. Watched. Followed
      to see where they lead.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      The difference sounds subtle. It is not. One approach treats emotion as
      material to be shaped. The other treats it as a guest, unexpected,
      informative, worth listening to.
    </p>

    <SectionHeading>What the three days asked of me</SectionHeading>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      There was a moment when something unplanned entered the room, a mistake, or
      what I first perceived as one. The old reflex moved in me: correct, restore,
      return to the intended shape. Instead I stayed with it. I said to myself, and
      then to the group: <em>what if we integrate it?</em> I have said those words
      to every group I have ever worked with. But there is a distance between knowing
      something to be true and inhabiting it in the moment it costs something. In
      Turin, I had to inhabit it.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      What the three days clarified, not for the first time, but more fully, is
      that a workshop is not transmission. It is exchange, in the most structural
      sense: what each person brings reshapes what is possible. What I bring changes
      them. What they bring changes me. This is not a pedagogy of humility. It is
      simply an accurate description of what actually happens when people work
      together in a space with attention and honesty.
    </p>

    <SectionHeading>Three stories at once</SectionHeading>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      What I carried out of the room at the end of the third day was not a result.
      It was a sensation.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      Bodies in a space. No set, no costume, no design. Breath and movement and a
      few words, and music that held the atmosphere without shaping it, that
      belonged to the air rather than to any choreography. And the discovery, which
      feels new each time despite years of living it: when one body receives
      something and makes it into a story inside itself, and then shares that story
      with another body, a third story is born in the space between them.
    </p>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6">
      Watching two people work, I could follow three narratives at once: the story
      each body was telling from within itself, and the one that neither was telling
      alone. The one that existed only in the between.
    </p>

    <PullQuote>
      Between bodies, something always happens that neither body planned. That is not
      a complication. It is the whole point.
    </PullQuote>

    <hr className="border-t border-cream my-12" />

    <div className="pt-8 border-t-2 border-navy">
      <h3 className="font-display text-xl text-navy mb-1.5 normal-case">Laurențiu Tudor</h3>
      <p className="font-body text-[0.85rem] text-muted-foreground leading-relaxed">
        Theatre director, pedagogue, and artistic researcher with over 16 years of professional practice. Associate director on productions by Declan Donnellan (Hamlet, Oedipus Rex) and Robert Wilson. Artistic Consultant at Teatrul Național "Marin Sorescu" Craiova and Executive Producer of the International Shakespeare Festival Craiova. He leads Between Bodies, an international series of physical theatre laboratories and residencies.
      </p>
    </div>

    {/* --- Tags --- */}
    <div className="mt-12 flex flex-wrap gap-2 items-center">
      <span className="font-display text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground mr-2">
        Topics
      </span>
      {["Physical theatre", "Applied theatre", "Contact improvisation", "Laban", "Grotowski", "Somatic work", "Presence training", "Devised theatre"].map((t) => (
        <span
          key={t}
          className="font-body text-[0.75rem] px-3 py-1 border border-muted text-muted-foreground rounded-sm hover:border-teal hover:text-navy transition-colors duration-300"
        >
          {t}
        </span>
      ))}
    </div>

    <ArticlePoll
      articleSlug="three-stories-at-once"
      question="What happens when you genuinely listen to someone with your whole body?"
      options={[
        { label: "Something shifts — in me, not just in them", value: "shift" },
        { label: "I lose track of what I was going to say", value: "lost" },
        { label: "I rarely get that far — something pulls me back", value: "rarely" },
        { label: "I'm not sure I've ever done it fully", value: "never" },
      ]}
    />
  </article>
);

const ThreeStoriesAtOnce = () => {
  useEffect(() => {
    document.title = "Three Stories at Once | Between Bodies";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ArticleHero />
      <ArticleBody />
      <FooterSection />
    </div>
  );
};

export default ThreeStoriesAtOnce;
