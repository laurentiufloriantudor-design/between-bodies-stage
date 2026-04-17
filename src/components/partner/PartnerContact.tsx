import { useEffect, useRef, useState } from "react";

const PartnerContact = () => {
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
    <section id="contact" ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute bottom-8 left-[5%] w-28 h-28 bg-coral/15 rounded-full animate-drift-slow" />

      <div className={`relative z-10 max-w-2xl transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-display text-sm tracking-[0.3em] text-teal block mb-6">
          Contact
        </span>
        <h2 className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-6 ${visible ? 'animate-reveal-up' : ''}`}>
          Let's talk
        </h2>
        <p className="font-body text-sm leading-relaxed text-cream/50 mb-12" style={{ textWrap: 'pretty' }}>
          Tell us about your space and your community. We'll get back to you within a week.
        </p>

        <div className={visible ? 'animate-reveal-up animate-delay-2' : ''}>
          <a
            href="mailto:between.bconnections@gmail.com"
            className="font-display text-2xl md:text-4xl text-cream hover:text-teal transition-colors duration-500 break-all"
          >
            between.bconnections@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerContact;
