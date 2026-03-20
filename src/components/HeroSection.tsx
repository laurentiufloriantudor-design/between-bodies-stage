import logo from "@/assets/logo-betweenbodies.jpeg";
import heroImage from "@/assets/hero-theater.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Floating organic shapes */}
      <div className="absolute top-12 right-[8%] w-36 h-36 bg-coral rounded-full animate-drift-slow opacity-90" />
      <div className="absolute bottom-24 left-[5%] w-48 h-48 bg-teal animate-drift" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 95% 65%, 80% 100%, 40% 95%, 10% 80%, 0% 50%, 5% 20%)' }} />
      <div className="absolute top-[40%] right-[15%] w-20 h-20 bg-navy rounded-full animate-drift-reverse" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <img src={logo} alt="BetweenBodies logo" className="h-10 w-auto" />
        <div className="hidden md:flex gap-8 font-display text-lg tracking-wide">
          <a href="#workshop" className="text-foreground hover:text-teal transition-colors duration-500">Workshop</a>
          <a href="#about" className="text-foreground hover:text-teal transition-colors duration-500">About</a>
          <a href="#apply" className="text-foreground hover:text-teal transition-colors duration-500">Apply</a>
          <a href="/partner" className="text-foreground hover:text-teal transition-colors duration-500">Partner</a>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 px-6 md:px-12 pt-8 md:pt-16">
        {/* Col 1 — Title mass */}
        <div className="md:col-span-2 relative">
          <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] animate-reveal-up">
            The space
          </h1>
          <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] text-teal animate-reveal-up animate-delay-1">
            between is
          </h1>
          <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] animate-reveal-up animate-delay-2">
            where it
          </h1>
          <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] text-coral animate-reveal-up animate-delay-3">
            happens
          </h1>

          {/* Subtitle overlapping the grid */}
          <div className="mt-8 md:mt-12 max-w-md animate-reveal-up animate-delay-4">
            <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground" style={{ textWrap: 'pretty' }}>
              International body-based theatre workshops. Investigating the space
              between performers in contemporary theatrical space.
            </p>
          </div>
        </div>

        {/* Col 3 — Masked photo */}
        <div className="relative mt-8 md:mt-0 flex items-start justify-center md:justify-end">
          <div className="relative w-64 h-80 md:w-72 md:h-96 animate-reveal-right animate-delay-3">
            <div className="w-full h-full blob-3 overflow-hidden">
              <img
                src={heroImage}
                alt="Dancer in motion — high contrast black and white"
                className="w-full h-full object-cover photo-hover scale-110"
              />
            </div>
            {/* Overlapping geometric accent */}
            <div className="absolute -bottom-6 -left-8 w-16 h-16 bg-coral animate-drift" />
          </div>
        </div>
      </div>

      {/* Bottom ticker line */}
      <div className="relative z-10 mt-16 md:mt-24 px-6 md:px-12 pb-8">
        <div className="flex items-center gap-6 animate-reveal-up animate-delay-5">
          <div className="w-12 h-[2px] bg-foreground" />
          <span className="font-display text-sm tracking-[0.3em] text-muted-foreground">
            Space is the text
          </span>
          <div className="flex-1 h-[2px] bg-foreground/10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
