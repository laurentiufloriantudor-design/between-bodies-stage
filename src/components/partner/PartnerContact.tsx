import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const PartnerContact = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

        {submitted ? (
          <div className="animate-reveal-up">
            <div className="w-8 h-[2px] bg-teal mb-6" />
            <p className="font-display text-[1.8rem] leading-[0.92] mb-3">
              Message sent
            </p>
            <p className="font-body text-sm text-cream/50">
              We'll be in touch soon. Thank you for your interest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`space-y-6 ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                required
                name="name"
                placeholder="Your name"
                className="bg-transparent border-b border-cream/20 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-teal transition-colors duration-300"
              />
              <input
                required
                name="institution"
                placeholder="Institution"
                className="bg-transparent border-b border-cream/20 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-teal transition-colors duration-300"
              />
              <input
                required
                name="city"
                placeholder="City"
                className="bg-transparent border-b border-cream/20 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-teal transition-colors duration-300"
              />
              <input
                required
                name="country"
                placeholder="Country"
                className="bg-transparent border-b border-cream/20 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-teal transition-colors duration-300"
              />
            </div>
            <textarea
              required
              name="message"
              rows={4}
              placeholder="Your message"
              className="w-full bg-transparent border-b border-cream/20 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-teal transition-colors duration-300 resize-none"
            />
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="bg-cream text-foreground hover:bg-teal hover:text-foreground border-0 transition-colors duration-500"
            >
              Send message →
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default PartnerContact;
