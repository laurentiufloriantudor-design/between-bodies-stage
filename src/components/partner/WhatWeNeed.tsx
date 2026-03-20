import { useEffect, useRef, useState } from "react";

const needs = [
  "A rehearsal space (minimum 60m², wooden or dance floor preferred)",
  "Two consecutive workshop days with 6–8 working hours each",
  "Local promotion and participant recruitment (12 spots)",
  "Basic technical setup: sound system, natural or adjustable light",
  "Artist fee and travel/accommodation costs",
];

const WhatWeNeed = () => {
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
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-navy/30">
      {/* Shape */}
      <div className="absolute bottom-12 right-[8%] w-24 h-24 bg-teal/10 rounded-full animate-drift-slow" />

      <div className={`relative z-10 max-w-3xl transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-display text-sm tracking-[0.3em] text-coral block mb-6">
          What we need from you
        </span>
        <h2 className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-12 ${visible ? 'animate-reveal-up' : ''}`}>
          Honest<br />essentials
        </h2>

        <ul className="space-y-6">
          {needs.map((need, i) => (
            <li
              key={i}
              className={`flex items-start gap-4 ${visible ? `animate-reveal-left animate-delay-${i + 1}` : ''}`}
            >
              <span className="mt-1.5 w-2 h-2 bg-coral shrink-0" />
              <p className="font-body text-sm md:text-base leading-relaxed text-cream/60">
                {need}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhatWeNeed;
