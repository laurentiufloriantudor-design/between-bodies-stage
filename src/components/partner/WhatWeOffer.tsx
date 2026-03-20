import { useEffect, useRef, useState } from "react";

const offers = [
  {
    label: "01",
    title: "Ready-made format",
    desc: "A tested, structured two-day intensive that has already been delivered in multiple cities. We handle artistic direction and methodology.",
  },
  {
    label: "02",
    title: "International profile",
    desc: "Directed by Laurențiu Tudor, with a network spanning Romania, Italy, Germany, and beyond. Your programme gains an international dimension.",
  },
  {
    label: "03",
    title: "Adaptable to context",
    desc: "The workshop adapts to your participants — actors, students, dancers, or mixed groups. We shape the work to meet the room.",
  },
  {
    label: "04",
    title: "Documentation support",
    desc: "We provide photo, video documentation and communication materials for your archive and channels.",
  },
];

const WhatWeOffer = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Shape */}
      <div className="absolute top-8 left-[4%] w-6 h-32 bg-teal animate-drift" />

      <div className={`relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-display text-sm tracking-[0.3em] text-teal block mb-6 animate-reveal-up">
          What we offer
        </span>
        <h2 className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-16 ${visible ? 'animate-reveal-up animate-delay-1' : ''}`}>
          A workshop that<br />travels with you
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
          {offers.map((item, i) => (
            <div
              key={item.label}
              className={`relative pl-8 border-l-2 border-coral/40 ${visible ? `animate-reveal-up animate-delay-${i + 2}` : ''}`}
            >
              <span className="font-display text-xs tracking-[0.3em] text-coral block mb-3">
                {item.label}
              </span>
              <h3 className="text-[1.8rem] md:text-[2.2rem] leading-[0.92] mb-3">
                {item.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-cream/50" style={{ textWrap: 'pretty' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
