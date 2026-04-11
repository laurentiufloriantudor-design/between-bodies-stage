import { useEffect, useRef, useState } from "react";

const editions = [
  { city: "Craiova", country: "RO", year: "2025" },
  { city: "Padova", country: "IT", year: "2026" },
  { city: "Bonn", country: "DE", year: "2026" },
  { city: "Torino", country: "IT", year: "2026" },
  { city: "Your city", country: "??", year: "2026/27", upcoming: true },
];

const PastEditions = () => {
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
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-16 left-[12%] w-40 h-40 bg-teal/8 blob-2 animate-drift" />

      <div className={`relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-display text-sm tracking-[0.3em] text-teal block mb-6">
          Recent Work
        </span>
        <h2 className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-16 ${visible ? 'animate-reveal-up' : ''}`}>
          Recent Work
        </h2>

        <div className="flex flex-wrap gap-6 md:gap-10">
          {editions.map((ed, i) => (
            <div
              key={i}
              className={`relative group ${visible ? `animate-reveal-up animate-delay-${i + 1}` : ''}`}
            >
              <div
                className={`border ${ed.upcoming ? 'border-coral border-dashed' : 'border-cream/20'} px-8 py-6 md:px-10 md:py-8 transition-all duration-500 group-hover:border-teal`}
              >
                <span className="font-display tabular-nums text-[3rem] md:text-[4rem] leading-none block">
                  {ed.year}
                </span>
                <span className="font-display text-sm tracking-[0.2em] text-cream/50 block mt-2">
                  {ed.city}
                </span>
                <span className="font-body text-[10px] tracking-[0.15em] text-cream/30 uppercase">
                  {ed.country}
                </span>
              </div>
              {ed.upcoming && (
                <span className="absolute -top-3 right-4 font-display text-[10px] tracking-[0.3em] bg-coral text-cream px-2 py-0.5">
                  Next
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PastEditions;
