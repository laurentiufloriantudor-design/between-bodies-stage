import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import residencyImg from "@/assets/residency-blur.jpg";

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
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-navy text-cream">
      <div className="absolute top-8 right-[10%] w-32 h-32 rounded-full bg-teal/10 animate-drift-slow" />
      <div className="absolute bottom-12 left-[5%] w-48 h-48 blob-2 bg-coral/8 animate-drift-reverse" />

      <div className={`relative z-10 flex flex-col md:flex-row items-start gap-10 md:gap-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex-1 min-w-0">
          <div className={`flex items-center gap-4 mb-8 ${visible ? 'animate-reveal-left' : ''}`}>
            <span className="font-display text-sm tracking-[0.3em] text-teal">Summer 2026</span>
            <span className="font-display text-xs tracking-[0.2em] bg-coral text-cream px-3 py-1.5">Coming Soon</span>
          </div>

          <h2 className={`text-[3rem] md:text-[5rem] leading-[0.88] mb-3 ${visible ? 'animate-reveal-up' : ''}`}>
            7-Day International Theatre Lab
          </h2>
          <p className={`font-body tabular-nums text-sm text-cream/50 mb-10 ${visible ? 'animate-reveal-up animate-delay-1' : ''}`}>
            29 June – 6 July 2026 · Ecomuseo Nesta, Turin
          </p>

          <div className={`space-y-5 font-body text-sm leading-relaxed text-cream/70 max-w-xl ${visible ? 'animate-reveal-up animate-delay-2' : ''}`} style={{ textWrap: 'pretty' }}>
            <p>Seven days of intensive daily work at Ecomuseo Nesta in Turin, in collaboration with Libere Gabbie A.P.S. We bring together actors and performers from different countries and training backgrounds for a process oriented toward research, presence, and the development of original performative material.</p>
            <p>The work focuses on stage presence and quality of attention, relational awareness, improvisation as a compositional tool, and the integration of body, voice, and imagination. Participants are not required to perform well — they are invited to remain present, attentive, and responsive to what emerges in the room.</p>
            <p>The programme includes individual feedback sessions, development of a scene or original performative material, professional video documentation of the developed work, a professional photo session for casting purposes, and a certificate of participation.</p>
          </div>

          <div className={`mt-10 flex flex-wrap gap-4 ${visible ? 'animate-reveal-up animate-delay-3' : ''}`}>
            <Button variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-teal hover:text-foreground hover:border-teal" onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}>
              Apply by 10 June →
            </Button>
          </div>

          <div className={`mt-8 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em] ${visible ? 'animate-reveal-up animate-delay-4' : ''}`}>
            <span className="bg-navy-light text-cream/60 px-3 py-1.5 border border-cream/10">7 Days</span>
            <span className="bg-navy-light text-cream/60 px-3 py-1.5 border border-cream/10">Turin, IT</span>
            <span className="bg-navy-light text-cream/60 px-3 py-1.5 border border-cream/10">29.06 – 06.07.2026</span>
          </div>
        </div>

        <div className={`w-full md:w-[45%] flex-shrink-0 ${visible ? 'animate-reveal-right animate-delay-2' : ''}`}>
          <div className="blob-3 overflow-hidden">
            <img src={residencyImg} alt="Two bodies in motion, dissolved into gesture and light" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover grayscale contrast-[1.2]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidencyTeaser;
