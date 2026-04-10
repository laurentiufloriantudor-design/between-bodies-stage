import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-theater.jpg";
import T from "@/components/T";

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
      <div className="absolute bottom-12 right-[10%] w-28 h-28 bg-coral rounded-full animate-drift opacity-70" />
      <div className="absolute top-16 left-[3%] w-3 h-32 bg-teal animate-drift-slow" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className={`relative ${visible ? 'animate-reveal-left' : 'opacity-0'}`}>
          <div className="w-full aspect-square blob-2 overflow-hidden max-w-[320px]">
            <img
              src={heroImage}
              alt="Performer silhouette — documentary detail"
              className="w-full h-full object-cover photo-hover scale-125"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-teal animate-drift-reverse" />
        </div>

        <div className={`md:col-span-2 ${visible ? 'animate-reveal-up animate-delay-2' : 'opacity-0'}`}>
          <span className="font-display text-sm tracking-[0.3em] text-coral block mb-8"><T>About the project</T></span>

          <h2 className="text-[3rem] md:text-[4.5rem] leading-[0.88] mb-10 max-w-2xl">
            <T>The space between</T><br />
            <span className="text-teal"><T>bodies</T></span> <T>is where</T><br />
            <T>theatre begins</T>
          </h2>

          <div className="columns-1 md:columns-2 gap-10 max-w-2xl">
            <p className="font-body text-sm leading-relaxed mb-5 text-muted-foreground" style={{ textWrap: 'pretty' }}>
              <T>BetweenBodies explores the physical boundaries and the intersection between performers in contemporary theatrical space. The project brings together artists from diverse cultural backgrounds to investigate how the body becomes a tool for communication beyond language.</T>
            </p>
            <p className="font-body text-sm leading-relaxed mb-5 text-muted-foreground" style={{ textWrap: 'pretty' }}>
              <T>Through intensive workshops, BetweenBodies creates a space for experimentation where participants discover new modes of physical expression, building bridges between European theatrical traditions and contemporary movement practices.</T>
            </p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground" style={{ textWrap: 'pretty' }}>
              <T>Each workshop is a unique opportunity to work in community, to challenge your own limits, and to rediscover the relationship between body and space in an international context.</T>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
