import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FooterSection from "@/components/FooterSection";

const articles = [
  {
    slug: "when-the-body-knows-first",
    title: "When the Body Knows First",
    subtitle: "Notes from a physical theatre practice in three countries, on presence, impulse, and what happens when you stop performing Shakespeare and start inhabiting him.",
    location: "Craiova · Padova · Bonn",
    date: "April 2026",
    tag: "STORM",
  },
  {
    slug: "three-stories-at-once",
    title: "Three Stories at Once",
    subtitle: "On the first Between Bodies laboratory in Turin, and what happens when bodies begin to listen.",
    location: "Turin",
    date: "March 2026",
    tag: "Laboratory",
  },
];

const GLITCH_TEXT = "N0TΞS FROM THΞ R00M";

const GlitchTitle = () => {
  const [resolved, setResolved] = useState(false);
  const [flicker, setFlicker] = useState(1);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setResolved(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Subtle random flicker
  useEffect(() => {
    let raf: number;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 3000 + Math.random() * 5000) {
        last = now;
        setFlicker(0.7 + Math.random() * 0.15);
        setTimeout(() => setFlicker(1), 80 + Math.random() * 120);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

    const neonShadow = [
    "0 0 2px rgba(255,255,255,0.6)",
    "0 0 4px rgba(255,255,255,0.4)",
    "0 0 8px rgba(0,245,255,0.35)",
    "0 0 16px rgba(0,245,255,0.2)",
    "0 0 32px rgba(0,245,255,0.1)",
    "0 0 12px rgba(255,43,214,0.2)",
    "0 0 28px rgba(255,43,214,0.1)",
    "0 0 60px rgba(255,43,214,0.05)",
  ].join(", ");

  return (
    <h1
      ref={titleRef}
      className={`relative font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] max-w-[760px] mx-auto mb-5 select-none group`}
      style={{
        opacity: resolved ? flicker : 0,
        filter: resolved ? "blur(0px)" : "blur(6px)",
        transition: "opacity 0.15s ease-out, filter 1.4s ease-out",
      }}
    >
      {/* Diffuse outer glow layer - cyan */}
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          color: "#00F5FF",
          opacity: 0.25,
          transform: "translate(-1.5px, -1px)",
          filter: "blur(6px)",
          textShadow: "0 0 12px #00F5FF, 0 0 24px #00F5FF",
        }}
      >
        {GLITCH_TEXT}
      </span>

      {/* Diffuse outer glow layer - magenta */}
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          color: "#FF2BD6",
          opacity: 0.18,
          transform: "translate(1.5px, 1px)",
          filter: "blur(6px)",
          textShadow: "0 0 12px #FF2BD6, 0 0 24px #FF2BD6",
        }}
      >
        {GLITCH_TEXT}
      </span>

      {/* Mid cyan glow */}
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          color: "#00F5FF",
          opacity: 0.3,
          transform: "translate(-0.5px, -0.5px)",
          filter: "blur(2px)",
        }}
      >
        {GLITCH_TEXT}
      </span>

      {/* Mid magenta glow */}
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          color: "#FF2BD6",
          opacity: 0.15,
          transform: "translate(0.5px, 0.5px)",
          filter: "blur(2px)",
        }}
      >
        {GLITCH_TEXT}
      </span>

      {/* Base text - white-hot core with full neon shadow stack */}
      <span
        className="relative group-hover:translate-x-[0.3px] group-hover:-translate-y-[0.2px] transition-transform duration-700"
        style={{
          color: "#F0EDE6",
          textShadow: neonShadow,
        }}
      >
        {GLITCH_TEXT}
      </span>
    </h1>
  );
};

const NotesFromTheRoom = () => {
  useEffect(() => {
    document.title = "Notes from the Room | Between Bodies";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-teal/[0.08] blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 md:px-12 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-sm tracking-[0.15em] text-cream/50 hover:text-teal transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Between Bodies
          </Link>
        </div>

        <div className="relative z-10 text-center px-6 md:px-12 pt-12 pb-16">
          <GlitchTitle />
          <p className="font-body text-base md:text-lg text-cream/65 max-w-[600px] mx-auto font-light leading-relaxed">
            Reflections on practice, presence, and the space between bodies.
          </p>
        </div>
      </section>

      {/* Article listing */}
      <section className="max-w-[820px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="space-y-10">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/notes-from-the-room/${article.slug}`}
              className="block group p-8 border border-cream rounded-sm hover:border-teal transition-colors duration-300 bg-background"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-teal border border-teal/30 px-3 py-1">
                  {article.tag}
                </span>
                <span className="font-display text-[0.7rem] tracking-[0.1em] uppercase text-muted-foreground">
                  {article.date}
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-navy mb-3 group-hover:text-teal transition-colors duration-300 normal-case">
                {article.title}
              </h2>

              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                {article.subtitle}
              </p>

              <span className="font-display text-[0.75rem] tracking-[0.06em] uppercase text-muted-foreground">
                {article.location}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default NotesFromTheRoom;
