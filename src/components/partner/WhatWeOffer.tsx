import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    id: "schools",
    label: "Schools & Training Centres",
    title: "Guest teacher,\nyour space",
    body: "Between Bodies comes as a guest teacher, for a two-day introduction, a week-long intensive, or a series of sessions across a semester. The format adapts to your programme, your students, and what you're looking to explore together. A shorter collaboration can be a starting point, a way to see whether the work resonates with your pedagogical values before committing to something longer. For week-long or semester collaborations, the work closes with an open session: colleagues, faculty, and guests of the institution are invited to witness what the group has built.",
  },
  {
    id: "cultural",
    label: "Cultural Centres",
    title: "International practice,\nlocal ground",
    body: "A two or three-day workshop open to actors, performers, and practitioners from different backgrounds. You handle local promotion and participant recruitment; we bring the practice. What your community gains is access to an international working methodology in their own city, in their own space.",
  },
  {
    id: "companies",
    label: "Independent Companies",
    title: "Built around\nyour ensemble",
    body: "A format built around your ensemble, closed, focused, and adapted to where your group is in its work. The starting point is a conversation about what your company needs right now. If this sounds relevant, let's talk about what it could look like.",
  },
  {
    id: "festivals",
    label: "Festivals",
    title: "Process alongside\nproduct",
    body: "Between Bodies can be part of a festival programme as a workshop event, before, during, or alongside the main programme. If you're building a curatorial vision that includes process alongside product, we'd be interested in hearing about it.",
  },
];

const WhatWeOffer = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const tab = tabs[active];

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-8 left-[4%] w-6 h-32 bg-teal animate-drift" />

      <div className={`relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-display text-sm tracking-[0.3em] text-teal block mb-6">
          What we offer
        </span>
        <h2 className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-12 ${visible ? 'animate-reveal-up animate-delay-1' : ''}`}>
          A workshop that<br />travels with you
        </h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 mb-12">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className="font-display text-xs tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300"
              style={{
                border: `1px solid ${active === i ? '#E7E9DA' : 'rgba(231,233,218,0.2)'}`,
                color: active === i ? '#E7E9DA' : 'rgba(231,233,218,0.4)',
                background: active === i ? 'rgba(231,233,218,0.08)' : 'transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          key={active}
          className="animate-reveal-up pl-8 border-l-2 border-coral/40 max-w-2xl"
        >
          <h3 className="text-[1.8rem] md:text-[2.5rem] leading-[0.92] mb-6 whitespace-pre-line">
            {tab.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-cream/50" style={{ textWrap: 'pretty' }}>
            {tab.body}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
