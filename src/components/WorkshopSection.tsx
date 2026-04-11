import { useEffect, useRef, useState } from "react";

const WorkshopSection = () => {
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
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/8 blob-1 animate-drift-slow" />

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`${visible ? 'animate-reveal-left' : ''}`}>
          <span className="font-display text-sm tracking-[0.3em] text-teal block mb-8">Open Call</span>
          <h2 className="text-[3.5rem] md:text-[5rem] leading-[0.88] mb-4">Turin</h2>
          <p className="font-body tabular-nums text-sm text-muted-foreground">
            29.06 — 06.07.2026
          </p>
        </div>

        <div className={`relative ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
          <div className="absolute -left-4 top-0 w-1 h-full bg-coral" />
          <h3 className="text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-6">
            7-Day International Theatre Lab
          </h3>
          <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-sm" style={{ textWrap: 'pretty' }}>
            An intensive laboratory for actors and performers from different countries and training backgrounds. Seven days of work focused on presence, impulse, relational awareness, and the development of original performative material. In collaboration with Libere Gabbie A.P.S. and Ecomuseo Nesta.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em]">
            <span className="bg-coral text-cream px-3 py-1.5">7 Days</span>
            <span className="bg-navy text-cream px-3 py-1.5">Turin, IT</span>
            <span className="bg-navy text-cream px-3 py-1.5">Open Call</span>
          </div>
        </div>

        <div className={`flex flex-col justify-between ${visible ? 'animate-reveal-right animate-delay-3' : ''}`}>
          <div>
            <span className="font-display text-sm tracking-[0.3em] text-coral block mb-3">Applications Open</span>
            <span className="font-display text-[2.5rem] md:text-[3rem] leading-[0.95] block mb-4">
              Apply by{"\n"}10 June
            </span>
            <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-xs" style={{ textWrap: 'pretty' }}>
              The laboratory has limited capacity. Applications close on 10 June 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
