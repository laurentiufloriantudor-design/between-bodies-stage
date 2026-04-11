import { useEffect, useRef, useState } from "react";
import aboutPerformers from "@/assets/about-performers.jpg";
import AttentionElement from "./AttentionElement";

const AboutSection = () => {
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
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <AttentionElement seed={50} radius={600} maxShift={20} opacityFloor={0.3} className="absolute bottom-12 right-[10%] w-28 h-28 bg-coral rounded-full animate-drift opacity-70" />
      <AttentionElement seed={51} radius={600} maxShift={18} opacityFloor={0.3} className="absolute top-16 left-[3%] w-3 h-32 bg-teal animate-drift-slow" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <AttentionElement seed={52} radius={500} maxShift={14} opacityFloor={0.6} scaleRange={[0.98, 1.01]}>
          <div className={`relative ${visible ? 'animate-reveal-left' : 'opacity-0'}`}>
            <div className="w-full aspect-square blob-2 overflow-hidden max-w-[320px]">
              <img
                src={aboutPerformers}
                alt="Performer silhouette — documentary detail"
                className="w-full h-full object-cover photo-hover scale-125"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-teal animate-drift-reverse" />
          </div>
        </AttentionElement>

        <div className={`md:col-span-2 ${visible ? 'animate-reveal-up animate-delay-2' : 'opacity-0'}`}>
          <AttentionElement seed={53} radius={400} maxShift={4} opacityFloor={0.7}>
            <span className="font-display text-sm tracking-[0.3em] text-coral block mb-8">About the project</span>
          </AttentionElement>

          <AttentionElement seed={54} radius={500} maxShift={8} opacityFloor={0.65} scaleRange={[0.992, 1.005]}>
            <h2 className="text-[3rem] md:text-[4.5rem] leading-[0.88] mb-10 max-w-2xl">
              The space between<br />
              <span className="text-teal">bodies</span> is where<br />
              theatre begins
            </h2>
          </AttentionElement>

          <AttentionElement seed={55} radius={450} maxShift={6} opacityFloor={0.6}>
            <div className="columns-1 md:columns-2 gap-10 max-w-2xl">
              <p className="font-body text-sm leading-relaxed mb-5 text-muted-foreground" style={{ textWrap: 'pretty' }}>
                Between Bodies starts from a simple observation: something happens in the body when two people genuinely begin to listen to each other. Not intellectually — physically. Weight shifts. Breath changes. The distance between them becomes active. This project investigates that space — not as metaphor, but as the actual site where theatre occurs.
              </p>
              <p className="font-body text-sm leading-relaxed mb-5 text-muted-foreground" style={{ textWrap: 'pretty' }}>
                Each laboratory brings together performers from different backgrounds and traditions for intensive work focused on physical attention, impulse, and shared presence. We do not teach a fixed technique. We build conditions in which habits loosen, analysis steps back, and the body's direct intelligence has room to lead. The working environment is non-hierarchical by design — vulnerability is not a side effect of the process, it is the process.
              </p>
              <p className="font-body text-sm leading-relaxed text-muted-foreground" style={{ textWrap: 'pretty' }}>
                Between Bodies is currently developing a series of international laboratories and residencies across Europe, with a focus on sustained encounter — the kind of work that requires more than a weekend to reach. Each edition is different. The city changes, the group changes, the material that surfaces changes. What stays constant is the quality of attention we ask for, and the conviction that what happens between bodies on stage is worth investigating with full seriousness.
              </p>
            </div>
          </AttentionElement>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
