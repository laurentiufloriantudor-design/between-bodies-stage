import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface NewsletterSectionProps {
  variant?: "light" | "dark";
}

const NewsletterSection = ({ variant = "light" }: NewsletterSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const isDark = variant === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section
      ref={ref}
      className={`relative py-20 md:py-28 px-6 md:px-12 overflow-hidden ${
        isDark ? "bg-foreground text-cream" : "bg-background text-foreground"
      }`}
    >
      {/* Accent shape */}
      <div
        className={`absolute top-10 right-[8%] w-20 h-20 rounded-full animate-drift-slow ${
          isDark ? "bg-teal/15" : "bg-coral/15"
        }`}
      />

      <div className={`relative z-10 max-w-xl transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        {subscribed ? (
          <div className="animate-reveal-up">
            <div className="w-8 h-[2px] bg-teal mb-6" />
            <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-4">
              You're in
            </h2>
            <p className={`font-body text-sm ${isDark ? 'text-cream/50' : 'text-muted-foreground'}`}>
              See you at the next edition.
            </p>
          </div>
        ) : (
          <>
            <h2
              className={`text-[2.5rem] md:text-[4rem] leading-[0.88] mb-4 ${
                visible ? "animate-reveal-up" : ""
              }`}
            >
              Don't miss the<br />
              <span className="text-coral">next edition</span>
            </h2>
            <p
              className={`font-body text-sm leading-relaxed mb-10 ${
                isDark ? "text-cream/50" : "text-muted-foreground"
              } ${visible ? "animate-reveal-up animate-delay-1" : ""}`}
              style={{ textWrap: "pretty" }}
            >
              New cities, open applications, and project updates — straight to your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className={`flex flex-col sm:flex-row gap-4 ${
                visible ? "animate-reveal-up animate-delay-2" : ""
              }`}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`flex-1 bg-transparent border-b py-3 font-body text-sm focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "border-cream/20 text-cream placeholder:text-cream/30 focus:border-teal"
                    : "border-foreground/20 text-foreground placeholder:text-muted-foreground focus:border-teal"
                }`}
              />
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className={`shrink-0 transition-colors duration-500 border-0 ${
                  isDark
                    ? "bg-cream text-foreground hover:bg-teal hover:text-foreground"
                    : "bg-foreground text-background hover:bg-teal hover:text-foreground"
                }`}
              >
                Subscribe
              </Button>
            </form>

            <p
              className={`font-body text-[11px] mt-4 ${
                isDark ? "text-cream/25" : "text-muted-foreground/50"
              }`}
            >
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
