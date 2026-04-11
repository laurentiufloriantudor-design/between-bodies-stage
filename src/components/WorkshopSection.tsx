import { useEffect, useRef, useState } from "react";
import AttentionElement from "./AttentionElement";

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
      <AttentionElement seed={20} radius={600} maxShift={20} opacityFloor={0.3} className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal/8 blob-1 animate-drift-slow" />

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <AttentionElement seed={21} radius={450} maxShift={8} opacityFloor={0.65}>
          <div className={`${visible ? 'animate-reveal-left' : ''}`}>
            <span className="font-display text-sm tracking-[0.3em] text-teal block mb-8">Coming Soon</span>
            <h2 className="text-[3.5rem] md:text-[5rem] leading-[0.88] mb-4">Turin</h2>
            <p className="font-body tabular-nums text-sm text-muted-foreground">
              29.06 — 06.07.2026
            </p>
          </div>
        </AttentionElement>

        <AttentionElement seed={22} radius={450} maxShift={10} opacityFloor={0.6} scaleRange={[0.988, 1.005]}>
          <div className={`relative ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
            <div className="absolute -left-4 top-0 w-1 h-full bg-coral" />
            <h3 className="text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-6">
              7-Day International Theatre Lab
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-sm" style={{ textWrap: 'pretty' }}>
              An intensive laboratory for actors and performers from different countries and training backgrounds. Seven days of work focused on presence, impulse, relational awareness, and the development of original performative material. In collaboration with Libere Gabbie A.P.S. and Ecomuseo Nesta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em]">
              <span className="bg-navy text-cream px-3 py-1.5">7 Days</span>
              <span className="bg-navy text-cream px-3 py-1.5">Turin, IT</span>
              <span className="bg-coral text-cream px-3 py-1.5">Coming Soon</span>
            </div>
          </div>
        </AttentionElement>

        <AttentionElement seed={23} radius={450} maxShift={7} opacityFloor={0.6}>
          <div className={`flex flex-col justify-between ${visible ? 'animate-reveal-right animate-delay-3' : ''}`}>
            <div>
              <span className="font-display text-sm tracking-[0.3em] text-coral block mb-3">Applications Opening Soon</span>
              <span className="font-display text-[2.5rem] md:text-[3rem] leading-[0.95] block mb-4">
                Stay{"\n"}Updated
              </span>
              <p className="font-body text-sm leading-relaxed text-muted-foreground max-w-xs" style={{ textWrap: 'pretty' }}>
                Subscribe to our newsletter to be the first to know when applications open for the Turin laboratory.
              </p>
              <a href="#newsletter" className="inline-block mt-6 font-display text-sm tracking-[0.2em] text-coral hover:text-teal transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" }); }}>
                Subscribe →
              </a>
            </div>
          </div>
        </AttentionElement>
      </div>
    </section>
  );
};

export default WorkshopSection;
