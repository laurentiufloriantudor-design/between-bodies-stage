import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const PdfDownload = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-navy/20">
      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Text side */}
        <div className={visible ? 'animate-reveal-left' : ''}>
          <span className="font-display text-sm tracking-[0.3em] text-teal block mb-6">
            Dossier
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-6">
            Read the full<br />proposal
          </h2>
          <p className="font-body text-sm leading-relaxed text-cream/50 max-w-md mb-8" style={{ textWrap: 'pretty' }}>
            Workshop format, partnership structure, past editions, artistic vision,
            and contact details — everything you need to present Between Bodies
            to your team or board.
          </p>
          <a href="/between-bodies-proposal.pdf" download>
            <Button
              variant="hero"
              size="lg"
              className="bg-coral text-cream hover:bg-coral-dark border-0 transition-colors duration-500"
            >
              Download PDF →
            </Button>
          </a>
        </div>

        {/* PDF preview card */}
        <div className={`flex justify-center md:justify-end ${visible ? 'animate-reveal-right animate-delay-2' : ''}`}>
          <div className="relative">
            {/* Shadow card behind */}
            <div className="absolute top-3 left-3 w-52 h-72 md:w-60 md:h-80 bg-cream/5 border border-cream/10" />
            {/* Main card */}
            <div
              className="relative w-52 h-72 md:w-60 md:h-80 bg-foreground border border-cream/15 flex flex-col items-center justify-center p-8 transition-transform duration-500 hover:-translate-y-1"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}
            >
              <div className="w-8 h-[2px] bg-coral mb-6" />
              <span className="font-display text-[1.4rem] md:text-[1.6rem] leading-[0.92] text-center text-cream block mb-2">
                Between<br />Bodies
              </span>
              <div className="w-4 h-[1px] bg-cream/20 my-4" />
              <span className="font-body text-[9px] tracking-[0.15em] text-cream/40 uppercase text-center">
                Collaboration<br />Proposal
              </span>
              <span className="font-display tabular-nums text-[10px] tracking-[0.2em] text-teal mt-4">
                2025 / 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PdfDownload;
