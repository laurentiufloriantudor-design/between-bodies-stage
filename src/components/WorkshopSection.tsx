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
          <span className="font-display text-sm tracking-[0.3em] text-teal block mb-8">Upcoming</span>
          <h2 className="text-[3.5rem] md:text-[5rem] leading-[0.88] mb-4">Torino</h2>
          <p className="font-body tabular-nums text-sm text-muted-foreground">
            25.04 — 26.04.2026
          </p>
        </div>

        <div className={`relative ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
          <div className="absolute -left-4 top-0 w-1 h-full bg-coral" />
          <h3 className="text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-6">
            Intensive Workshop
          </h3>
          <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-sm" style={{ textWrap: 'pretty' }}>
            A two-day intensive dedicated to exploring the relationship between body, space, and stage presence. We work with movement techniques, improvisation, and group composition.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em]">
            <span className="bg-coral text-cream px-3 py-1.5">Fully Booked</span>
            <span className="bg-navy text-cream px-3 py-1.5">Free</span>
            <span className="bg-navy text-cream px-3 py-1.5">2 Days</span>
            <span className="bg-navy text-cream px-3 py-1.5">Torino, IT</span>
          </div>
        </div>

        <div className={`flex flex-col justify-between ${visible ? 'animate-reveal-right animate-delay-3' : ''}`}>
          <div>
            <span className="font-display text-sm tracking-[0.3em] text-coral block mb-3">Applications Closed</span>
            <span className="font-display text-[2.5rem] md:text-[3rem] leading-[0.95] block mb-4">
              Fully Booked
            </span>
            <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-xs" style={{ textWrap: 'pretty' }}>
              Thank you to all the participants who applied. We look forward to seeing you in Torino!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopSection;
