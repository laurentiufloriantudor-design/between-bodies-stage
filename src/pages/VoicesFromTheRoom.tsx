import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FooterSection from "@/components/FooterSection";
import SEOHead from "@/components/SEOHead";

interface Voice {
  name: string;
  echo: string;
  echoColor: "teal" | "coral";
  text: string;
}

const voices: Voice[] = [
  {
    name: "Alessandro",
    echo: "Listening",
    echoColor: "teal",
    text: "I always said to myself that the most important thing is to listen. And it's basic, but it's also the most difficult thing. And this kind of work gave me the proof of specifically this: the importance of listening to the space, to the breathing, to the partner. It's a type of work that for me comes from dance but it transfers into theater. And for me it's important because I think that dance comes more naturally sometimes. This type of work gives you a lot of tools that you can work with in theater. All this practice is not dance but gestures, movements, actions. There is a fine line in between those two, but an important one.",
  },
  {
    name: "Nicoleta",
    echo: "Breathing",
    echoColor: "coral",
    text: "It was better, way better than I expected. I think it's important to say that everything went very organic to arrive to what we managed to create at the end, which, for me was really amazing. Also, I rediscovered the importance of breathing but differently, as a way to connect with everyone else, a way that I didn't use in the past.",
  },
  {
    name: "Roberto",
    echo: "One",
    echoColor: "teal",
    text: "For me this is fundamental work. Fundamental because, as I mentioned, I have practically never touched this kind of physical work before. One thing I'll carry with me is the importance of coordinating the breath. I always believed it was fundamental, but over the years I completely ignored it and let myself be guided by instinct. But it's too powerful a tool. There was a moment near the end where our breaths seemed completely synchronized, like a metronome. I was breathing, but we were one thing. There were two of us but we were one thing. And it was incredible.",
  },
  {
    name: "Ettore",
    echo: "Pauses",
    echoColor: "coral",
    text: "I usually spend a lot of time in my head and one tool that took me out of this was being aware of the pauses. Thinking about the pauses and what they mean because usually I need to fill them with something, so they don't really feel like pauses, but working on that through the workshop really was important to me because they gave meaning to what we were doing and they felt like good calligraphy.",
  },
  {
    name: "Alice",
    echo: "Trust",
    echoColor: "teal",
    text: "I found several things interesting. What you were saying: having no method. But I feel there is a lot of listening, and this means that somehow I knew that you knew where you were taking us. And that made me trust you, and it's a very beautiful thing. I felt it consistently across the days. And another thing I really loved is all the work on breath. Because I realized how differently I was breathing when I arrived on the first day, and again at the end of that first session, and again today. I was discovering this through our work these days. And that was very interesting.",
  },
];

const VoicesFromTheRoom = () => {
  return (
    <div className="min-h-screen bg-navy text-cream">
      <div className="px-6 md:px-12 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-cream/50 hover:text-teal transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      <header className="px-6 md:px-12 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto text-left">
          <p className="font-display text-xs tracking-[0.3em] text-teal mb-6">
            Voices
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[0.02em] uppercase text-left">
            Voices from<br />the Room
          </h1>
          <p className="font-body text-base md:text-lg leading-relaxed text-cream/60 mt-10 max-w-2xl text-left">
            Their words, after the work.
          </p>
        </div>
      </header>

      <section className="px-6 md:px-12 pb-32 md:pb-48">
        <div className="max-w-5xl mx-auto flex flex-col gap-32 md:gap-48">
          {voices.map((voice, i) => {
            const echoColorClass = voice.echoColor === "teal" ? "text-teal" : "text-coral";
            const alignRight = i % 2 === 1;
            return (
              <article key={voice.name} className="relative">
                {/* Echo word — large faded background */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute select-none font-display uppercase leading-none tracking-[0.02em] ${echoColorClass}`}
                  style={{
                    fontSize: "clamp(6rem, 18vw, 14rem)",
                    opacity: 0.08,
                    top: alignRight ? "auto" : "-3rem",
                    bottom: alignRight ? "-3rem" : "auto",
                    left: alignRight ? "auto" : "-2rem",
                    right: alignRight ? "-2rem" : "auto",
                    zIndex: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {voice.echo}
                </div>

                <div className="relative z-10">
                  <p className="font-display text-xs tracking-[0.3em] text-cream/70 mb-6 uppercase">
                    {voice.name}
                  </p>
                  <p className="font-body text-lg md:text-xl leading-[1.85] text-cream/90">
                    {voice.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default VoicesFromTheRoom;
