import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const ApplySection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    motivation: "",
  });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="apply" className="relative py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-xl animate-reveal-up">
          <div className="w-16 h-16 bg-teal rounded-full mb-8" />
          <h2 className="text-[3rem] md:text-[4.5rem] leading-[0.88] mb-6">Application received</h2>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            Thank you for your interest. We will contact you soon with further details about the Torino workshop.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      {/* Shapes */}
      <div className="absolute top-8 right-[5%] w-40 h-40 bg-teal/10 blob-1 animate-drift-slow" />
      <div className="absolute bottom-16 left-[8%] w-6 h-24 bg-coral animate-drift" />

      <div className={`relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left — Info */}
        <div className={`${visible ? 'animate-reveal-left' : ''}`}>
          <span className="font-display text-sm tracking-[0.3em] text-teal block mb-8">Apply</span>
          <h2 className="text-[3rem] md:text-[4rem] leading-[0.88] mb-6">
            Torino<br />Intensive
          </h2>
          <p className="font-body text-sm leading-relaxed text-muted-foreground mb-6" style={{ textWrap: 'pretty' }}>
            The workshop is open to actors, performers, arts students, and anyone
            interested in exploring the body in the scenic space.
          </p>
          <div className="space-y-2 font-display text-sm tracking-[0.15em]">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral inline-block" /> 12 spots available
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral inline-block" /> Free of charge
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-coral inline-block" /> 25.04 — 26.04.2025
            </p>
          </div>
        </div>

        {/* Right — Form */}
        <div className={`md:col-span-2 ${visible ? 'animate-reveal-up animate-delay-2' : ''}`}>
          <form onSubmit={handleSubmit} className="max-w-lg space-y-8">
            <div>
              <label className="font-display text-sm tracking-[0.2em] block mb-3">
                Full name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-3 font-body text-sm outline-none focus:border-teal transition-colors duration-500"
              />
            </div>

            <div>
              <label className="font-display text-sm tracking-[0.2em] block mb-3">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-3 font-body text-sm outline-none focus:border-teal transition-colors duration-500"
              />
            </div>

            <div>
              <label className="font-display text-sm tracking-[0.2em] block mb-3">
                Theatre experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-3 font-body text-sm outline-none focus:border-teal transition-colors duration-500"
              />
            </div>

            <div>
              <label className="font-display text-sm tracking-[0.2em] block mb-3">
                Motivation *
              </label>
              <textarea
                required
                rows={3}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                className="w-full border-b-2 border-foreground bg-transparent py-3 font-body text-sm outline-none focus:border-teal transition-colors duration-500 resize-none"
              />
            </div>

            <Button
              variant="hero"
              size="lg"
              type="submit"
              className="bg-foreground text-background hover:bg-coral hover:text-cream border-0 transition-colors duration-500 active:scale-[0.97]"
            >
              Submit application →
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplySection;
