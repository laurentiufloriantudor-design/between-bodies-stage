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
        <DancingText>The Space Between Us</DancingText>
      </h1>

      <p className="font-body text-base md:text-lg text-cream/65 max-w-[600px] mx-auto mb-10 font-light leading-relaxed">
        Notes from a Between Bodies physical theatre workshop, Turin, April 2026.
      </p>

      <div className="flex items-center justify-center gap-4 md:gap-8 font-display text-[0.75rem] tracking-[0.06em] uppercase text-cream/45 flex-wrap">
        <span>Laurențiu Tudor</span>
        <span className="text-teal">·</span>
        <span>April 2026</span>
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

const Para = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-base leading-[1.85] text-foreground mb-6">{children}</p>
);

const ArticleBody = () => (
  <article className="max-w-[680px] mx-auto px-6 md:px-8 py-16 md:py-20">
    <SectionHeading>What the Body Already Knows</SectionHeading>

    <p className="font-body text-base leading-[1.85] text-foreground mb-6 first-letter:font-display first-letter:text-[3.8rem] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-[0.1em] first-letter:mt-[0.12em] first-letter:text-coral">
      There is a moment in rehearsal, and in workshops, and sometimes in performance, when you can see two things operating simultaneously in the same body.
    </p>

    <Para>
      The first is instinct: what the person actually feels, what they want to do, where they want to move, whether they want to make contact or hold back or stay exactly where they are. The second is the internal committee that convenes the moment instinct arises: has this been permitted? Will I be too much? What will happen if I follow this?
    </Para>

    <Para>
      Most of the time, in most contexts, this committee operates invisibly. Its decisions appear as choices. In a room designed specifically to make the gap visible, it becomes something you can see from across the space.
    </Para>

    <Para>
      This is what the proximity exercise gave us, across both days of the Turin workshop, and it is something that physical theatre training keeps returning to, regardless of method or tradition: the gap between impulse and permission.
    </Para>

    <SectionHeading>A Corridor You Cannot Pass Through</SectionHeading>

    <Para>
      Thirteen participants on the first day. More on the second. Different backgrounds, different relationships to performance, actors, voice artists, students arriving from Italy, Romania, the UK, France, and India. What they shared, almost universally, was the habit of self-monitoring: the body's impulse arriving a half-second before the mind's assessment of whether to follow it.
    </Para>

    <Para>
      In the proximity exercise, one group moves toward partners across the room. Distance changes. Partners change. The instruction is simple: notice what happens in the space between you.
    </Para>

    <Para>
      What was visible was not hesitation. It was something more specific: the gap between what the body already knew it wanted and what the mind would allow. This is one of the central questions in somatic performance practice, and one that no purely intellectual approach to actor training can adequately address.
    </Para>

    <Para>
      The intention to touch, or to move closer, or to stay, was legible in every person in the room. So was the question running underneath it: has this been permitted? Will I be too much? The social conditioning that usually operates invisibly was suddenly visible, written in the body's held breath, in the slight pause before a step forward.
    </Para>

    <PullQuote>
      I feel like I can't walk through that space between you.
    </PullQuote>

    <Para>
      At one point I stopped moving through the room because I genuinely could not bring myself to interrupt what was happening between two people standing several meters apart, not looking at each other, in complete and palpable contact. The corridor between them had become something with its own gravity. I said it out loud: I feel like I can't walk through that space between you.
    </Para>

    <Para>
      I chose not to resolve the larger question the exercise had opened. Not to give permission, not to withhold it. I let it be what it was: a room full of people discovering, in real time, the distance between instinct and habit.
    </Para>

    <Para>
      When we spoke about it afterward, they confirmed what had been visible. Of course they did. The body doesn't lie about these things. It just waits to be asked.
    </Para>

    <SectionHeading>The Fear Underneath</SectionHeading>

    <Para>
      What holds the gap in place is not simply social conditioning. Underneath the question has this been permitted is usually something older and less rational: the fear of being seen wanting something. Of exposing a need and having it met with discomfort, or indifference, or too much.
    </Para>

    <Para>
      Vulnerability, real vulnerability, not performed openness, means allowing the other person to see what you actually feel before you've decided whether it's safe to feel it. This is what makes genuine contact possible on stage, between scene partners, between performer and audience. It is also what makes it frightening. And it is, in the end, what relational theatre practice keeps trying to find its way back to.
    </Para>

    <Para>
      A two-day workshop cannot process this. It can only make it visible. What shifts in the room is not the fear itself but the relationship to it: from something to be hidden, to something that can be acknowledged, even briefly, even without resolution.
    </Para>

    <Para>
      Several participants named this in the closing circle. The relief of a space without judgment. The discovery that the body could move differently when the internal committee quieted, even slightly. The recognition that this, presence without performance, contact without guarantee, is what they're actually trying to do when they work.
    </Para>

    <PullQuote>
      Not a technique. A condition.
    </PullQuote>

    <SectionHeading>What Two Days Gave Us</SectionHeading>

    <Para>
      Across both sessions, different groups, the same thing kept surfacing underneath the differences.
    </Para>

    <Para>
      The body knows things the mind argues with. It knows what it wants to do with another body in the room. It knows when contact is real and when it's managed. It knows the difference between a scene that's happening and a scene that's being demonstrated. This is the terrain that Between Bodies workshops are built around: not the transmission of a method, but the conditions under which presence becomes available.
    </Para>

    <Para>
      Given enough space, and the right conditions, the body stops arguing, or argues less. The exercises were not designed to eliminate the committee but to give it less to work with: simpler structures, clearer physical tasks, music that moved in the room like another presence. When the mind runs out of things to assess, the body gets on with it.
    </Para>

    <Para>
      The corridor you cannot pass through, the space charged by proximity and breath and unspoken intention, is not an obstacle to the work. It is the work. What happens in that space, between two performers who are genuinely present with each other, is what theatre has always been trying to do.
    </Para>

    <Para>
      We spent two days practicing how to get there.
    </Para>

    <hr className="border-t border-cream my-12" />

    <p className="font-body text-[0.9rem] italic text-muted-foreground leading-relaxed">
      Turin, April 2026. Between Bodies in Turin was made possible by the generosity of Associazione Libere Gabbie and EcoMuseo Nesta, who offered not only a space but the conditions for this kind of work to happen.
    </p>

    <div className="pt-8 mt-12 border-t-2 border-navy">
      <h3 className="font-display text-xl text-navy mb-1.5 normal-case">Laurențiu Tudor</h3>
      <p className="font-body text-[0.85rem] text-muted-foreground leading-relaxed">
        Theatre director, pedagogue, and artistic researcher with over 16 years of professional practice. Associate director on productions by Declan Donnellan (Hamlet, Oedipus Rex) and Robert Wilson. Artistic Consultant at Teatrul Național "Marin Sorescu" Craiova and Executive Producer of the International Shakespeare Festival Craiova. He leads Between Bodies, an international series of physical theatre laboratories and intensive workshops.
      </p>
    </div>

    <div className="mt-12 flex flex-wrap gap-2 items-center">
      <span className="font-display text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground mr-2">
        Topics
      </span>
      {["Physical theatre", "Proximity work", "Somatic practice", "Presence", "Vulnerability", "Contact", "Devised theatre"].map((t) => (
        <span
          key={t}
          className="font-body text-[0.75rem] px-3 py-1 border border-muted text-muted-foreground rounded-sm hover:border-teal hover:text-navy transition-colors duration-300"
        >
          {t}
        </span>
      ))}
    </div>

    <ArticlePoll
      articleSlug="the-space-between-us"
      question="When instinct arrives in your body, what usually happens next?"
      options={[
        { label: "I follow it before the committee can speak", value: "follow" },
        { label: "I pause, then negotiate", value: "negotiate" },
        { label: "I notice it and let it pass", value: "pass" },
        { label: "I rarely notice it at all", value: "unnoticed" },
      ]}
    />
  </article>
);

const TheSpaceBetweenUs = () => {
  useEffect(() => {
    document.title = "The Space Between Us | Between Bodies";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ArticleHero />
      <ArticleBody />
      <FooterSection />
    </div>
  );
};

export default TheSpaceBetweenUs;
