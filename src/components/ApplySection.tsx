import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import T from "@/components/T";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfusB6Q9_URoR4U433sFxkW0JMmijQIZR1uQpD0zA9Xk2XH2g/viewform";

const ApplySection = () => {
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
    <section id="apply" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-8 right-[5%] w-40 h-40 bg-teal/10 blob-1 animate-drift-slow" />
      <div className="absolute bottom-16 left-[8%] w-6 h-24 bg-coral animate-drift" />

      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`${visible ? 'animate-reveal-left' : ''}`}>
          <span className="font-display text-sm tracking-[0.3em] text-coral block mb-8"><T>Closed</T></span>
          <h2 className="text-[3rem] md:text-[4rem] leading-[0.88] mb-6">
            Torino<br /><T>Intensive</T>
          </h2>
          <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6" style={{ textWrap: 'pretty' }}>
            <T>The workshop is now fully booked. Thank you to everyone who applied — we truly appreciate your interest.</T>
          </p>
          <div className="space-y-2 font-display text-sm tracking-[0.15em]">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral inline-block" /> <T>Fully booked</T>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral inline-block" /> <T>Free of charge</T>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral inline-block" /> 25.04 — 26.04.2025
            </p>
          </div>
        </div>

        <div className={`md:col-span-2 flex items-center ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
          <div className="max-w-lg">
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-8" style={{ textWrap: 'pretty' }}>
              <T>Applications for the Torino Intensive are now closed. Stay tuned for future workshops — subscribe to our newsletter to be the first to know.</T>
            </p>
            <a href="#newsletter">
              <Button
                variant="hero"
                size="lg"
                className="bg-foreground text-background hover:bg-teal hover:text-foreground border-0 transition-colors duration-500 active:scale-[0.97]"
              >
                <T>Subscribe to newsletter</T> →
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
