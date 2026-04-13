import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Reach out",
    desc: "Send us a message with your space, your community, and what you're looking for. We'll respond within a week.",
  },
  {
    number: "02",
    title: "First conversation",
    desc: "A call to understand your context — who the participants are, what format makes sense, what the collaboration could look like.",
  },
  {
    number: "03",
    title: "Confirm & prepare",
    desc: "We agree on dates, format, and logistics. You handle local promotion and recruitment. We handle the programme.",
  },
  {
    number: "04",
    title: "We arrive",
    desc: "Between Bodies comes to you. The work begins.",
  },
];

const HowItWorks = () => {
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
      <div className="absolute bottom-12 right-[6%] w-5 h-28 bg-coral/30 animate-drift" />

      <div className={`relative z-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-display text-sm tracking-[0.3em] text-teal block mb-6">
          How it works
        </span>
        <h2 className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-16 ${visible ? 'animate-reveal-up animate-delay-1' : ''}`}>
          From first contact<br />to first session
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Animated connecting line — desktop only */}
          <div className="hidden md:block absolute top-[1.1rem] left-0 right-0 h-[1px] bg-cream/10" />

          {visible && (
            <div
              className="hidden md:block absolute top-[1.1rem] left-0 h-[1px] bg-teal/40"
              style={{ animation: "drawLine 2s ease-out forwards" }}
            />
          )}

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative"
              style={visible ? {
                animation: `revealStep 0.6s ease-out ${0.4 + i * 0.35}s both`,
              } : { opacity: 0 }}
            >
              {/* Number with dot */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-display text-xs tracking-[0.3em] text-coral">
                  {step.number}
                </span>
                <div
                  className="w-2 h-2 rounded-full bg-teal"
                  style={visible ? {
                    animation: `popDot 0.3s ease-out ${0.6 + i * 0.35}s both`,
                  } : { transform: "scale(0)" }}
                />
              </div>

              <h3 className="text-[1.4rem] md:text-[1.6rem] leading-[0.95] mb-3">
                {step.title}
              </h3>

              <p className="font-body text-sm leading-relaxed text-cream/50" style={{ textWrap: 'pretty' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
  @keyframes drawLine {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes revealStep {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes popDot {
    from { transform: scale(0); }
    to { transform: scale(1); }
  }
`}</style>
    </section>
  );
};

export default HowItWorks;
