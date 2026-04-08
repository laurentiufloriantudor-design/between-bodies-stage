import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const WorkshopSection = () => {
  const spotsLeft = 0;
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
    <section id="workshop" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/8 blob-1 animate-drift-slow" />

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Tile 1 — Label + location */}
        <div className={`${visible ? 'animate-reveal-left' : ''}`}>
          <span className="font-display text-sm tracking-[0.3em] text-teal block mb-8">Upcoming</span>
          <h2 className="text-[3.5rem] md:text-[5rem] leading-[0.88] mb-4">Torino</h2>
          <p className="font-body tabular-nums text-sm text-muted-foreground">
            25.04 — 26.04.2025
          </p>
        </div>

        {/* Tile 2 — Description with overlapping coral bar */}
        <div className={`relative ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
          <div className="absolute -left-4 top-0 w-1 h-full bg-coral" />
          <h3 className="text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-6">
            Intensive<br />Workshop
          </h3>
          <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-sm" style={{ textWrap: 'pretty' }}>
            A two-day intensive dedicated to exploring the relationship between body,
            space, and stage presence. We work with movement techniques, improvisation,
            and group composition.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em]">
            <span className="bg-navy text-cream px-3 py-1.5">Free</span>
            <span className="bg-navy text-cream px-3 py-1.5">2 Days</span>
            <span className="bg-navy text-cream px-3 py-1.5">Torino, IT</span>
          </div>
        </div>

        {/* Tile 3 — Spots counter + CTA */}
        <div className={`flex flex-col justify-between ${visible ? 'animate-reveal-right animate-delay-3' : ''}`}>
          <div>
            <span className="font-display text-sm tracking-[0.3em] text-muted-foreground block mb-3">Spots</span>
            <span className="font-display tabular-nums text-[6rem] leading-none text-coral block">
              {spotsLeft}
            </span>
            <span className="font-display text-sm tracking-[0.15em] text-muted-foreground mt-1 block">Available</span>
          </div>
          <a href="#apply">
            <Button variant="hero" size="lg" className="mt-8 bg-foreground text-background hover:bg-teal hover:text-foreground border-0 transition-colors duration-500">
              Apply now →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
