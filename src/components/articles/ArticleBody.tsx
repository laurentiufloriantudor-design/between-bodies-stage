import ArticlePoll from "@/components/ArticlePoll";

const practices = [
  "Contact improvisation", "Laban movement analysis", "Grotowski, total organism",
  "Michael Chekhov, psychological gesture", "Viewpoints", "Physical score",
  "Ensemble listening", "Collaborative dramaturgy",
];

const tags = [
  "Physical theatre", "Applied theatre", "Contact improvisation", "Laban",
  "Grotowski", "Somatic work", "Presence training", "Devised theatre",
];

const LocationMarker = ({ country, date }: { country: string; date: string }) => (
  <div className="flex items-center gap-3 mt-10 mb-4">
    <div className="w-2.5 h-2.5 rounded-full bg-teal shrink-0" />
    <span className="font-display text-[0.7rem] tracking-[0.15em] uppercase text-teal">
      {country} · {date}
    </span>
  </div>
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

const ArticleBody = () => {
  return (
    <article className="max-w-[680px] mx-auto px-6 md:px-8 py-16 md:py-20">
      {/* --- Intro paragraphs --- */}
      <p className="font-body text-base leading-[1.85] text-foreground mb-6 first-letter:font-display first-letter:text-[3.8rem] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-[0.1em] first-letter:mt-[0.12em] first-letter:text-coral">
        There is a moment before every workshop that I have never quite managed to write about. I stand in the empty space a few minutes before the participants arrive. I feel the floor. I listen to the silence. I try, deliberately, to unknow everything I think I know about what is about to happen.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        It is not a ritual. It is closer to an act of undressing, setting aside intention that has become too fixed, methodology that has grown too confident in itself. This is, I have come to believe, the first condition of any honest facilitation: you have to be genuinely available to what is actually in the room, not to what you have rehearsed finding there.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        Between September 2025 and March 2026, the STORM project gave me three occasions to practice this kind of availability, in Craiova, Padova, and Bonn. What follows is not a report. It is a practitioner's attempt to think backwards through what happened: to find, in retrospect, what the work was actually teaching.
      </p>

      {/* --- Why Shakespeare --- */}
      <SectionHeading>Why Shakespeare, and why not</SectionHeading>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        When you say "Shakespeare and mental health" in a workshop room, a particular risk presents itself immediately: the risk of solemnity. Of culture deployed as prescription. Of the canon arriving as self-improvement.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The first methodological decision in STORM was to avoid teaching Shakespeare entirely. We did not explain him, perform him, or analyse him. We used him the way you use a good mirror: oblique, indirect, slightly uncomfortable. A Shakespearean text has a rare property, it is distant enough not to accuse you directly, and human enough that you recognise yourself in it anyway. Lear does not speak about your father. But through Lear, you might allow yourself to speak about your father, or about what it feels like to be unseen, abandoned, misread.
      </p>

      <PullQuote>
        "The fiction is the corridor. Shakespeare is the door. What walks through it belongs entirely to the person in the room."
      </PullQuote>

      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        This is not drama therapy. Applied theatre, the broader field in which this practice sits, does not diagnose, treat, or replace clinical support. It creates conditions in which themes of vulnerability, identity, relationship, and presence can be touched without the pressure of direct confession. The work operates in the space between art and life, which is not a lesser space, it is often the only space where certain things can move.
      </p>

      {/* --- The body as primary instrument --- */}
      <SectionHeading>The body as primary instrument</SectionHeading>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The physical theatre tradition offers something that text-based work often cannot: it locates knowing in the body before the mind has had time to build its defences. This is not mysticism. It is a practical observation that anyone who has worked with contact improvisation, Laban movement analysis, or the somatic principles inherited from Grotowski and Chekhov will recognise immediately.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        In the work I facilitate, these traditions, contact improvisation, Laban, Grotowski, Chekhov, the relational logic of Viewpoints, do not appear as methods to be taught or analysed. They circulate through exercises as tools. A participant will have no idea they are discovering something from Laban's Effort theory when they begin distinguishing between sustained and sudden movement in response to a partner. They will simply notice that they are listening differently. That is sufficient, and in many ways preferable.
      </p>

      {/* Practices aside */}
      <div className="my-10 p-6 border border-cream rounded bg-background">
        <h4 className="font-display text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground mb-4">
          Practices in circulation across the work
        </h4>
        <div className="flex flex-wrap gap-2">
          {practices.map((p) => (
            <span key={p} className="font-body text-[0.78rem] px-3 py-1.5 bg-navy text-cream tracking-wide rounded-sm">
              {p}
            </span>
          ))}
        </div>
      </div>

      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The guiding principle across all three workshops was this: the impulse comes from outside, the response comes from inside. Every action in the space begins from an external stimulus, the quality of a partner's movement, a shift in the room's sound, the weight of a particular word, and generates an authentic response before the mind has assembled its commentary. What this produces is not expressiveness. It produces presence.
      </p>

      {/* --- Craiova --- */}
      <SectionHeading>Craiova: on belonging</SectionHeading>
      <LocationMarker country="Romania" date="September 2025" />
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The first workshop confronted me with something I already knew theoretically: mixed groups are unpredictable in the best possible way. The Craiova group brought together acting students alongside young people from entirely different fields, different ages, different relationships to the stage, different tolerances for ambiguity. We read excerpts from several Shakespeare plays, not to perform them, not to analyse them, and then invited each participant to voice what they imagined a character must have been experiencing in a specific moment. What is it like for Ophelia to be told by her father and her brother that she should not love Hamlet? Each person answered from their own understanding, in their own words, simultaneously. The result was a chorus, but not the kind unified by synchronisation, shared text, or collective intention. What held it together was something else entirely: the fact that everyone was speaking from a genuinely different place.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        Belonging emerged precisely from that multiplicity. Not despite the differences in perspective, but because of them. Unity made not from uniformity but from the coexistence of distinct voices, each one real, this is, I think, what a chorus can be at its most alive. And for a group of young people who had spent most of their lives being asked to converge on the correct answer, it was quietly disorienting in the best possible way.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        What I observed beneath all of this was a difficulty I recognise in almost every group of young people: the habit of being evaluated. Bodies that are waiting to be judged contract. And a contracted body cannot listen. The work of decontraction is not aesthetic, it is ethical. It must happen before anything else.
      </p>

      {/* --- Padova --- */}
      <SectionHeading>Padova: on contact</SectionHeading>
      <LocationMarker country="Italy" date="January 2026" />
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        Padova was a group with conservatoire training. I expected ease. I found a different challenge: technically-formed practitioners tend to conceptualise experience before living it. They know the vocabulary. They use it, often unconsciously, as a shield.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The work had to begin somewhere more basic, at the level of genuine reception. Not listening as a technique, but listening as an act of surrender: allowing what the partner offers to actually arrive, to change you in real time, before you decide what to do with it. This is, at its root, what contact improvisation teaches. It is also, without anyone naming it this way, a practice of psychological availability that is extraordinarily difficult to sustain.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        King Lear entered the second part of the process as a theme rather than a text, family: its loyalties, its failures, its unspoken contracts. One group explored these dynamics through contact improvisation: pairs and small clusters moving through the physical territory of family relation, support, resistance, dependence, release. At the same time, four performers read passages from Lear aloud. Not as narration, not as performance, as score. The readers were the musical layer. The movers were asked to listen to their partners reading and to let the rhythm, the texture, the weight of the language keep them in motion and in relation. The text became another body in the room: not something to illustrate or respond to consciously, but a force that held the composition in time, like a pulse underneath everything else.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        What was visible was not Shakespeare. It was something older and more particular: each person's physical knowledge of what it means to be inside a family, the negotiation, the gravity, the moments of unexpected tenderness, passing through a 400-year-old structure that remains, inexplicably, alive.
      </p>

      <PullQuote>
        "The body spoke before the mind decided whether it wanted to speak. That gap, between the impulse and the decision, is where the most interesting work lives."
      </PullQuote>

      {/* --- Bonn --- */}
      <SectionHeading>Bonn: on safety as a prerequisite for anything</SectionHeading>
      <LocationMarker country="Germany" date="March 2026" />
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        Bonn was the most demanding workshop, not technically but humanly. Of eighteen participants, almost none had meaningful prior experience with theatre. Students of psychology, social sciences, engineering, communication. A group with a predominantly analytical relational culture, measured in physical contact with strangers, cautious about any form of emotional exposure in a group setting.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The first session was close to impermeable. Not out of ill will, out of entirely legitimate anxiety: What is being asked of me? Can I fail? Will I be judged? Resistance in a room is not an obstacle to overcome. It is information about what the group actually needs.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The methodological response came in two directions. First: progressive layering of complexity. Each exercise began from a simple, repetitive, predictable physical structure. The body needed to know what was coming before I could add anything new. This is a principle I understood theoretically before Bonn. The group showed me how essential it is in practice, not as a pedagogical nicety, but as the basic condition for anyone to be genuinely present rather than vigilantly self-monitoring.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The second discovery arrived through music. I had used the same pieces for the same types of exercise, from session to session. At a certain point I noticed that participants entered the exercise differently when they recognised the music, not with anticipation in the anxious sense, but with something closer to security. The body already knew what was coming. It could relax into the structure rather than brace for the unknown. Music had become a signal of safety.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        This mechanism, which polyvagal theory would describe in neurological terms, but which I simply watched happening in the bodies in the room, made me think about how many simple tools we have available and how often we skip past them in a rush toward depth. Depth cannot be forced. It can only be prepared for.
      </p>

      {/* --- What I am still learning --- */}
      <SectionHeading>What I am still learning</SectionHeading>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The most persistent tension across all three workshops was the boundary between facilitator and therapist. There are moments in group process when someone opens further than the artistic frame can safely hold. Managing those moments, with genuine presence, but without sliding into a clinical role I am not trained for, demands a specific kind of attention that does not get easier with experience. It simply becomes more conscious.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        What I carry from these three workshops is less a conclusion than an orientation: the body is not an illustration of what the mind already knows. It is a primary site of knowledge in its own right, often more accurate, often more available to what is real in a given moment than any conscious intention. This is what the physical theatre tradition, across all its various lineages, keeps returning to. And it is what I find, again and again, to be true in practice: when the conditions are right, the body knows first.
      </p>
      <p className="font-body text-base leading-[1.85] text-foreground mb-6">
        The work of facilitation is, in the end, largely the work of creating those conditions, and then getting out of the way.
      </p>

      {/* --- Divider --- */}
      <hr className="border-t border-cream my-12" />

      {/* --- Author bio --- */}
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
        {tags.map((t) => (
          <span
            key={t}
            className="font-body text-[0.75rem] px-3 py-1 border border-muted text-muted-foreground rounded-sm hover:border-teal hover:text-navy transition-colors duration-300"
          >
            {t}
          </span>
        ))}
      </div>

      <ArticlePoll
        articleSlug="when-the-body-knows-first"
        question="What do you do with the body's knowledge before the mind catches up?"
        options={[
          { label: "I ignore it, I wait for clarity", value: "ignore" },
          { label: "I follow it, even when I can't explain it", value: "follow" },
          { label: "I'm still learning to hear it", value: "learning" },
          { label: "I didn't know that was an option", value: "new" },
        ]}
      />
    </article>
  );
};

export default ArticleBody;
