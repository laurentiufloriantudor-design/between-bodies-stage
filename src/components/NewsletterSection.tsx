import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

const PUBLIC_KEY = "akJ6lEAJfj6FeaIBj";
const SERVICE_ID = "service_zg4g6af";
const TEMPLATE_NOTIFICATION = "template_87tez54";
const TEMPLATE_CONFIRMATION = "template_nlffuj5";

interface NewsletterSectionProps {
  variant?: "light" | "dark";
}

const NewsletterSection = ({ variant = "dark" }: NewsletterSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [gdprChecked, setGdprChecked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!gdprChecked) {
      setError("Please agree to receive updates before subscribing.");
      return;
    }

    setLoading(true);
    try {
      emailjs.init(PUBLIC_KEY);

      await emailjs.send(SERVICE_ID, TEMPLATE_NOTIFICATION, {
        subscriber_email: email,
        reply_to: email,
      });

      await emailjs.send(SERVICE_ID, TEMPLATE_CONFIRMATION, {
        to_email: email,
        reply_to: "between.bconnections@gmail.com",
      });

      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = variant === "dark";

  return (
    <section
      id="newsletter"
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "#162836" }}
    >
      {/* Organic blob shapes */}
      <div
        className="absolute top-[-60px] right-[-40px] w-[280px] h-[280px] rounded-full opacity-10 animate-drift-slow"
        style={{ backgroundColor: "#68AEB3" }}
      />
      <div
        className="absolute bottom-[-40px] left-[5%] w-[200px] h-[200px] opacity-8 animate-drift-slow"
        style={{
          backgroundColor: "#E1664D",
          opacity: 0.08,
          borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
        }}
      />
      <div
        className="absolute top-[40%] left-[60%] w-[120px] h-[120px] opacity-6 animate-drift-slow"
        style={{
          backgroundColor: "#68AEB3",
          opacity: 0.06,
          borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%",
        }}
      />

      <div
        className={`relative z-10 max-w-xl transition-all duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {submitted ? (
          <div className="animate-reveal-up">
            <div className="w-10 h-[2px] mb-6" style={{ backgroundColor: "#68AEB3" }} />
            <p className="font-display text-[2.5rem] md:text-[3.5rem] leading-[0.88] mb-4 uppercase tracking-wide"
              style={{ color: "#E7E9DA" }}>
              Thank you, we'll be in touch.
            </p>
            <p className="font-body text-sm" style={{ color: "rgba(231,233,218,0.5)" }}>
              Check your inbox to confirm your subscription.
            </p>
          </div>
        ) : (
          <>
            <h2
              className={`font-display text-[2.8rem] md:text-[4.5rem] leading-[0.85] mb-3 uppercase tracking-wide ${
                visible ? "animate-reveal-up" : ""
              }`}
              style={{ color: "#E7E9DA" }}
            >
              Enter the<br />
              <span style={{ color: "#68AEB3" }}>Circle</span>
            </h2>
            <p
              className={`font-body text-sm leading-relaxed mb-10 ${
                visible ? "animate-reveal-up animate-delay-1" : ""
              }`}
              style={{ color: "rgba(231,233,218,0.5)", textWrap: "pretty" as any }}
            >
              Receive updates on upcoming laboratories, residencies, and open calls.
            </p>

            <form
              onSubmit={handleSubmit}
              className={`space-y-5 ${visible ? "animate-reveal-up animate-delay-2" : ""}`}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Your email"
                  className="flex-1 bg-transparent border-b py-3 font-body text-sm focus:outline-none transition-colors duration-300"
                  style={{
                    borderColor: "rgba(231,233,218,0.2)",
                    color: "#E7E9DA",
                  }}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 h-12 px-8 font-display tracking-[0.15em] uppercase text-base rounded-none border-0 transition-all duration-500 active:scale-[0.97]"
                  style={{
                    backgroundColor: "#68AEB3",
                    color: "#162836",
                  }}
                >
                  {loading ? "…" : "Stay up to date"}
                </Button>
              </div>

              {error && (
                <p className="font-body text-xs" style={{ color: "#E1664D" }}>
                  {error}
                </p>
              )}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={gdprChecked}
                  onChange={(e) => {
                    setGdprChecked(e.target.checked);
                    setError("");
                  }}
                  className="mt-0.5 h-4 w-4 rounded-sm border appearance-none cursor-pointer shrink-0"
                  style={{
                    borderColor: "rgba(231,233,218,0.3)",
                    backgroundColor: gdprChecked ? "#68AEB3" : "transparent",
                  }}
                />
                <span
                  className="font-body text-[11px] leading-relaxed"
                  style={{ color: "rgba(231,233,218,0.35)" }}
                >
                  I agree to receive updates from Between Bodies. I can unsubscribe at any time.
                </span>
              </label>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
