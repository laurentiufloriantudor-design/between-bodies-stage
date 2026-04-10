import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import residencyImg from "@/assets/residency-blur.jpg";
import T from "@/components/T";

const ResidencyTeaser = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-navy text-cream"
    >
      <div className="absolute top-8 right-[10%] w-32 h-32 rounded-full bg-teal/10 animate-drift-slow" />
      <div className="absolute bottom-12 left-[5%] w-48 h-48 blob-2 bg-coral/8 animate-drift-reverse" />

      <div className={`relative z-10 flex flex-col md:flex-row items-start gap-10 md:gap-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-4 mb-8 ${visible ? 'animate-reveal-left' : ''}`}>
            <span className="font-display text-sm tracking-[0.3em] text-teal"><T>Summer 2025</T></span>
            <span className="font-display text-xs tracking-[0.2em] bg-coral text-cream px-3 py-1.5">
              <T>Coming Soon</T>
            </span>
          </div>

          <h2 className={`text-[3rem] md:text-[5rem] leading-[0.88] mb-3 ${visible ? 'animate-reveal-up' : ''}`}>
            <T>One-Week Residency</T>
          </h2>
          <p className={`font-body tabular-nums text-sm text-cream/50 mb-10 ${visible ? 'animate-reveal-up animate-delay-1' : ''}`}>
            Torino, IT — <T>Dates TBA</T>
          </p>

          <div className={`space-y-5 font-body text-sm leading-relaxed text-cream/70 max-w-xl ${visible ? 'animate-reveal-up animate-delay-2' : ''}`} style={{ textWrap: 'pretty' }}>
            <p>
              <T>A week-long immersion into the Between Bodies practice. We begin by dissolving the social mask — releasing habit, softening armour — and awakening a finer attention to the body's weight, breath, and impulse. From there, the work opens into contact improvisation: listening through skin, finding and losing balance together, letting movement arise from genuine physical dialogue.</T>
            </p>
            <p>
              <T>As trust deepens across the week, we move toward shared presence and choral work — the group as a single breathing organism — weaving in text as material that lives in the body rather than the mind.</T>
            </p>
            <p>
              <T>The residency format allows us to explore territory the shorter workshops cannot reach: sustained two-person scenes. Here we work with the relational and physical dynamics that emerge when two bodies stay in a dramatic situation long enough for something real to surface — beyond the first impulse, beyond the comfortable, into the alive.</T>
            </p>
            <p>
              <T>Dates and registration details will be announced soon.</T>
            </p>
          </div>

          <div className={`mt-10 flex flex-wrap gap-4 ${visible ? 'animate-reveal-up animate-delay-3' : ''}`}>
            <Button
              variant="outline"
              size="lg"
              className="border-cream/30 text-cream hover:bg-teal hover:text-foreground hover:border-teal"
              onClick={() => document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })}
            >
              <T>Subscribe for Updates</T>
            </Button>
          </div>

          <div className={`mt-8 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em] ${visible ? 'animate-reveal-up animate-delay-4' : ''}`}>
            <span className="bg-navy-light text-cream/60 px-3 py-1.5 border border-cream/10"><T>7 Days</T></span>
            <span className="bg-navy-light text-cream/60 px-3 py-1.5 border border-cream/10"><T>Residency</T></span>
            <span className="bg-navy-light text-cream/60 px-3 py-1.5 border border-cream/10">Torino, IT</span>
          </div>
        </div>

        <div className={`w-full md:w-[45%] flex-shrink-0 ${visible ? 'animate-reveal-right animate-delay-2' : ''}`}>
          <div className="blob-3 overflow-hidden">
            <img
              src={residencyImg}
              alt="Two bodies in motion, dissolved into gesture and light"
              loading="lazy"
              width={1920}
              height={1080}
              className="w-full h-full object-cover grayscale contrast-[1.2]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidencyTeaser;
