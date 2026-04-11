import { useEffect, useRef, useState } from "react";
import facilitatorPhoto from "@/assets/facilitator-laurentiu.jpg";

const FacilitatorSection = () => {
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
    <section id="facilitator" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-20 left-[6%] w-24 h-24 bg-teal rounded-full animate-drift opacity-60" />
      <div className="absolute bottom-16 right-[12%] w-4 h-28 bg-coral animate-drift-slow" />

      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`relative flex justify-center md:justify-start ${visible ? 'animate-reveal-left' : ''}`}>
          <div className="relative">
            <div className="w-72 h-80 md:w-80 md:h-96 blob-3 overflow-hidden">
              <img
                src={facilitatorPhoto}
                alt="Laurențiu Tudor — theatre director and acting trainer"
                className="w-full h-full object-cover object-top photo-hover scale-110"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-coral rounded-full animate-drift-reverse" />
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-navy animate-drift" />
          </div>
        </div>

        <div className={`md:col-span-2 ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
          <span className="font-display text-sm tracking-[0.3em] text-coral block mb-6">Facilitator</span>

          <h2 className="text-[3rem] md:text-[5rem] leading-[0.88] mb-4">
            Laurențiu
          </h2>
          <h2 className="text-[3rem] md:text-[5rem] leading-[0.88] text-teal mb-10">
            Tudor
          </h2>

          <div className="max-w-xl">
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-5" style={{ textWrap: 'pretty' }}>
              Theatre director and acting trainer with over 16 years of experience, working across institutional theatres, independent companies, and international collaborations — including with artists such as Declan Donnellan and Robert Wilson.
            </p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-5" style={{ textWrap: 'pretty' }}>
              His current work focuses on the relationship between the body, impulse, and direct experience. Rather than following a fixed method, he builds processes that emerge from the encounter between people in the room — shifting the focus from analysis to presence, from performing well to responding to what is actually happening.
            </p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground" style={{ textWrap: 'pretty' }}>
              Drawing on physical expression and somatic awareness, he creates non-hierarchical environments where vulnerability is part of the work, habits are questioned, and instinct is given space to lead.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 font-display text-xs tracking-[0.2em]">
            <span className="bg-navy text-cream px-3 py-1.5">Director</span>
            <span className="bg-navy text-cream px-3 py-1.5">Acting Trainer</span>
            <span className="bg-navy text-cream px-3 py-1.5">16+ Years</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitatorSection;
