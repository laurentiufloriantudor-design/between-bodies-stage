import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import AttentionElement from "./AttentionElement";

const ApplySection = () => {
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
    <section id="apply" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <AttentionElement seed={60} radius={600} maxShift={20} opacityFloor={0.3} className="absolute top-8 right-[5%] w-40 h-40 bg-teal/10 blob-1 animate-drift-slow" />
      <AttentionElement seed={61} radius={600} maxShift={18} opacityFloor={0.3} className="absolute bottom-16 left-[8%] w-6 h-24 bg-coral animate-drift" />

      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <AttentionElement seed={62} radius={450} maxShift={8} opacityFloor={0.65}>
          <div className={`${visible ? 'animate-reveal-left' : ''}`}>
            <span className="font-display text-sm tracking-[0.3em] text-coral block mb-8">Completed</span>
            <h2 className="text-[3rem] md:text-[4rem] leading-[0.88] mb-6">
              What's<br />Next
            </h2>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6" style={{ textWrap: 'pretty' }}>
              The Torino Intensive — April 2026 — is now complete. Thirty participants, two days, one room.
            </p>
          </div>
        </AttentionElement>

        <AttentionElement seed={63} radius={450} maxShift={7} opacityFloor={0.6}>
          <div className={`md:col-span-2 flex items-center ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
            <div className="max-w-lg">
              <p className="font-body text-sm leading-relaxed text-muted-foreground mb-8" style={{ textWrap: 'pretty' }}>
                The next laboratory is in preparation. Location and dates to be announced. Subscribe to be the first to receive the open call.
              </p>
              <a href="#newsletter">
                <Button
                  variant="hero"
                  size="lg"
                  className="bg-foreground text-background hover:bg-teal hover:text-foreground border-0 transition-colors duration-500 active:scale-[0.97]"
                >
                  Subscribe for Updates →
                </Button>
              </a>
            </div>
          </div>
        </AttentionElement>
      </div>
    </section>
  );
};

export default ApplySection;
