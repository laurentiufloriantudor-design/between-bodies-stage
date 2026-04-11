import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FooterSection from "@/components/FooterSection";

// Each article has a unique "light signature"
const articles = [
  {
    slug: "when-the-body-knows-first",
    title: "When the Body Knows First",
    subtitle: "Notes from a physical theatre practice in three countries, on presence, impulse, and what happens when you stop performing Shakespeare and start inhabiting him.",
    location: "Craiova · Padova · Bonn",
    date: "April 2026",
    tag: "STORM",
    // Warm magenta-leaning light
    light: { cyan: 0.15, magenta: 0.45, intensity: 1.15, bgHue: 260, bgSat: 8 },
  },
  {
    slug: "three-stories-at-once",
    title: "Three Stories at Once",
    subtitle: "On the first Between Bodies laboratory in Turin, and what happens when bodies begin to listen.",
    location: "Turin",
    date: "March 2026",
    tag: "Laboratory",
    // Cool cyan-leaning light
    light: { cyan: 0.45, magenta: 0.12, intensity: 1.1, bgHue: 200, bgSat: 10 },
  },
];

type LightState = {
  cyan: number;
  magenta: number;
  intensity: number;
  bgHue: number;
  bgSat: number;
};

const NEUTRAL_LIGHT: LightState = { cyan: 0.25, magenta: 0.18, intensity: 1, bgHue: 220, bgSat: 5 };

const GLITCH_TEXT = "N0TΞS FROM THΞ R00M";

// Lerp helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const lerpLight = (a: LightState, b: LightState, t: number): LightState => ({
  cyan: lerp(a.cyan, b.cyan, t),
  magenta: lerp(a.magenta, b.magenta, t),
  intensity: lerp(a.intensity, b.intensity, t),
  bgHue: lerp(a.bgHue, b.bgHue, t),
  bgSat: lerp(a.bgSat, b.bgSat, t),
});

/* ─── Neon header that reacts to room light state ─── */
const GlitchTitle = ({ light }: { light: LightState }) => {
  const [resolved, setResolved] = useState(false);
  const [flicker, setFlicker] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setResolved(true), 100);
    return () => clearTimeout(t);
  }, []);

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

  const cyanOpBase = light.cyan * light.intensity;
  const magentaOpBase = light.magenta * light.intensity;

  const neonShadow = [
    `0 0 2px rgba(255,255,255,${0.6 * light.intensity})`,
    `0 0 4px rgba(255,255,255,${0.4 * light.intensity})`,
    `0 0 8px rgba(0,245,255,${0.35 * cyanOpBase})`,
    `0 0 16px rgba(0,245,255,${0.2 * cyanOpBase})`,
    `0 0 32px rgba(0,245,255,${0.1 * cyanOpBase})`,
    `0 0 12px rgba(255,43,214,${0.2 * magentaOpBase})`,
    `0 0 28px rgba(255,43,214,${0.1 * magentaOpBase})`,
    `0 0 60px rgba(255,43,214,${0.05 * magentaOpBase})`,
  ].join(", ");

  // Chromatic separation increases with light intensity
  const sep = 1.5 * light.intensity;

  return (
    <h1
      className="relative font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] max-w-[760px] mx-auto mb-5 select-none group"
      style={{
        opacity: resolved ? flicker : 0,
        filter: resolved ? "blur(0px)" : "blur(6px)",
        transition: "opacity 0.15s ease-out, filter 1.4s ease-out",
      }}
    >
      {/* Diffuse cyan */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ color: "#00F5FF", opacity: cyanOpBase, transform: `translate(${-sep}px, ${-sep * 0.67}px)`, filter: "blur(6px)", textShadow: `0 0 12px #00F5FF, 0 0 24px #00F5FF`, transition: "opacity 1.8s ease, transform 1.8s ease" }}>
        {GLITCH_TEXT}
      </span>
      {/* Diffuse magenta */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ color: "#FF2BD6", opacity: magentaOpBase, transform: `translate(${sep}px, ${sep * 0.67}px)`, filter: "blur(6px)", textShadow: `0 0 12px #FF2BD6, 0 0 24px #FF2BD6`, transition: "opacity 1.8s ease, transform 1.8s ease" }}>
        {GLITCH_TEXT}
      </span>
      {/* Mid cyan */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ color: "#00F5FF", opacity: cyanOpBase * 1.2, transform: "translate(-0.5px, -0.5px)", filter: "blur(2px)", transition: "opacity 1.8s ease" }}>
        {GLITCH_TEXT}
      </span>
      {/* Mid magenta */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ color: "#FF2BD6", opacity: magentaOpBase * 0.8, transform: "translate(0.5px, 0.5px)", filter: "blur(2px)", transition: "opacity 1.8s ease" }}>
        {GLITCH_TEXT}
      </span>
      {/* Base text */}
      <span className="relative group-hover:translate-x-[0.3px] group-hover:-translate-y-[0.2px] transition-transform duration-700"
        style={{ color: "#F0EDE6", textShadow: neonShadow, transition: "text-shadow 1.8s ease" }}>
        {GLITCH_TEXT}
      </span>
    </h1>
  );
};

/* ─── Main page ─── */
const NotesFromTheRoom = () => {
  const [targetLight, setTargetLight] = useState<LightState>(NEUTRAL_LIGHT);
  const [currentLight, setCurrentLight] = useState<LightState>(NEUTRAL_LIGHT);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.title = "Notes from the Room | Between Bodies";
  }, []);

  // Smooth interpolation loop
  useEffect(() => {
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      const speed = 0.8; // slower = more atmospheric
      const t = 1 - Math.exp(-speed * dt);
      setCurrentLight(cur => lerpLight(cur, targetLight, t));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetLight]);

  const onArticleEnter = useCallback((light: LightState) => {
    setTargetLight(light);
  }, []);

  const onArticleLeave = useCallback(() => {
    setTargetLight(NEUTRAL_LIGHT);
  }, []);

  // Ambient background computed from light state
  const ambientBg = `hsl(${currentLight.bgHue}, ${currentLight.bgSat}%, ${5 + currentLight.intensity * 2}%)`;
  const grainOpacity = Math.max(0, (currentLight.intensity - 1) * 0.3);

  return (
    <div className="min-h-screen text-foreground relative" style={{ backgroundColor: ambientBg, transition: "background-color 0.05s linear" }}>
      {/* Atmospheric grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          opacity: grainOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
          transition: "opacity 2s ease",
        }}
      />

      {/* Ambient light wash from header neon */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,255,${currentLight.cyan * 0.06}) 0%, rgba(255,43,214,${currentLight.magenta * 0.04}) 40%, transparent 100%)`,
          transition: "background 0.05s linear",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: ambientBg }}>
        <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(0,245,255,${currentLight.cyan * 0.08}) 0%, rgba(255,43,214,${currentLight.magenta * 0.05}) 50%, transparent 100%)`,
            filter: "blur(60px)",
            transition: "background 0.05s linear",
          }}
        />

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
          <GlitchTitle light={currentLight} />
          <p className="font-body text-base md:text-lg text-cream/65 max-w-[600px] mx-auto font-light leading-relaxed">
            Reflections on practice, presence, and the space between bodies.
          </p>
        </div>
      </section>

      {/* Article listing */}
      <section className="relative z-10 max-w-[820px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="space-y-10">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/notes-from-the-room/${article.slug}`}
              className="block group p-8 border border-cream/20 rounded-sm transition-all duration-700"
              style={{
                backgroundColor: `hsla(${article.light.bgHue}, ${article.light.bgSat}%, 8%, 0.5)`,
                borderColor: `hsla(${article.light.bgHue}, 20%, 40%, 0.2)`,
              }}
              onMouseEnter={() => onArticleEnter(article.light)}
              onMouseLeave={onArticleLeave}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-[0.65rem] tracking-[0.18em] uppercase text-teal border border-teal/30 px-3 py-1">
                  {article.tag}
                </span>
                <span className="font-display text-[0.7rem] tracking-[0.1em] uppercase text-cream/45">
                  {article.date}
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl text-cream/90 mb-3 group-hover:text-teal transition-colors duration-700 normal-case">
                {article.title}
              </h2>

              <p className="font-body text-base text-cream/55 leading-relaxed mb-4">
                {article.subtitle}
              </p>

              <span className="font-display text-[0.75rem] tracking-[0.06em] uppercase text-cream/35">
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
