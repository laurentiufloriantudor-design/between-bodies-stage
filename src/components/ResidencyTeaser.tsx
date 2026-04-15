import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import residencyImg from "@/assets/residency-blur.jpg";
import AttentionElement from "./AttentionElement";

const ResidencyTeaser = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-navy text-cream">
      <AttentionElement seed={30} radius={600} maxShift={20} opacityFloor={0.3} className="absolute top-8 right-[10%] w-32 h-32 rounded-full bg-teal/10 animate-drift-slow" />
      <AttentionElement seed={31} radius={600} maxShift={25} opacityFloor={0.3} className="absolute bottom-12 left-[5%] w-48 h-48 blob-2 bg-coral/8 animate-drift-reverse" />

      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="min-w-0">
          <AttentionElement seed={32} radius={400} maxShift={5} opacityFloor={0.7}>
            <div className={`flex items-center gap-4 mb-8 ${visible ? 'animate-reveal-left' : ''}`}>
              <span className="font-display text-sm tracking-[0.3em] text-teal">Summer 2026</span>
              <span className="font-display text-xs tracking-[0.2em] bg-coral text-cream px-3 py-1.5">Coming Soon</span>
            </div>
          </AttentionElement>

          <AttentionElement seed={33} radius={500} maxShift={8} opacityFloor={0.65} scaleRange={[0.99, 1.006]}>
            <h2 className={`text-[3rem] md:text-[5rem] leading-[0.88] mb-3 ${visible ? 'animate-reveal-up' : ''}`}>
              7-Day International Theatre Lab
            </h2>
          </AttentionElement>

          <AttentionElement seed={34} radius={400} maxShift={4} opacityFloor={0.5}>
            <p className={`font-body tabular-nums text-sm text-cream/50 mb-10 ${visible ? 'animate-reveal-up animate-delay-1' : ''}`}>
              29 June – 6 July 2026 · Ecomuseo Nesta, Turin
            </p>
          </AttentionElement>

          <AttentionElement seed={35} radius={450} maxShift={6} opacityFloor={0.6}>
            <div className={`space-y-5 font-body text-sm leading-relaxed text-cream/70 max-w-xl ${visible ? 'animate-reveal-up animate-delay-2' : ''}`} style={{ textWrap: 'pretty' }}>
              <p>Seven days of intensive daily work at Ecomuseo Nesta in Turin, in collaboration with Libere Gabbie A.P.S. We bring together actors and performers from different countries and training backgrounds for a process oriented toward research, presence, and the development of original performative material.</p>
              <p>The work focuses on stage presence and quality of attention, relational awareness, improvisation as a compositional tool, and the integration of body, voice, and imagination. Participants are not required to perform well; they are invited to remain present, attentive, and responsive to what emerges in the room.</p>
              <p>The programme includes individual feedback sessions, development of a scene or original performative material, professional video documentation of the developed work, a professional photo session for casting purposes, and a certificate of participation.</p>
            </div>
          </AttentionElement>

          <AttentionElement seed={36} radius={350} maxShift={4} opacityFloor={0.7}>
            <div className={`mt-10 flex flex-wrap gap-4 ${visible ? 'animate-reveal-up animate-delay-3' : ''}`}>
              <Button variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-teal hover:text-foreground hover:border-teal" onClick={() => document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" })}>
                Stay Updated →
              </Button>
            </div>
          </AttentionElement>

          <AttentionElement seed={37} radius={400} maxShift={5} opacityFloor={0.55}>
            <div className={`mt-8 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em] ${visible ? 'animate-reveal-up animate-delay-4' : ''}`}>
              <span className="bg-transparent text-cream px-3 py-1.5 border border-cream/40">7 Days</span>
              <span className="bg-transparent text-cream px-3 py-1.5 border border-cream/40">Turin, IT</span>
              <span className="bg-transparent text-cream px-3 py-1.5 border border-cream/40">29.06 – 06.07.2026</span>
            </div>
          </AttentionElement>
        </div>

        <div className={`flex flex-col gap-8 ${visible ? 'animate-reveal-right animate-delay-2' : ''}`}>
          <AttentionElement seed={38} radius={550} maxShift={16} opacityFloor={0.55} scaleRange={[0.98, 1.01]}>
            <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
              <div className="blob-3 overflow-hidden">
                <img src={residencyImg} alt="Two bodies in motion, dissolved into gesture and light" loading="lazy" width={1920} height={1080} className="w-full h-full object-cover grayscale contrast-[1.2]" />
              </div>
            </div>
          </AttentionElement>

          <AttentionElement seed={39} radius={450} maxShift={12} opacityFloor={0.6}>
            <div className="flex flex-col items-start gap-4">
              <p className="font-display text-xs tracking-[0.2em] text-cream/50">In collaboration with</p>
              <div className="flex flex-col gap-4">
                <img src="/images/nesta-logo.png" alt="Museo Nesta" className="h-16 w-auto object-contain" />
                <img src="/images/partner-banner.avif" alt="Libere Gabbie A.P.S." className="h-12 w-auto object-contain" />
              </div>
            </div>
          </AttentionElement>
        </div>
      </div>
    </section>
  );
};

export default ResidencyTeaser;
