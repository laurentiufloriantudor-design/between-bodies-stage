import logo from "@/assets/logo-betweenbodies.png";

const PartnerHero = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden flex flex-col">
      {/* Accent shapes */}
      <div className="absolute top-16 right-[10%] w-32 h-32 bg-coral rounded-full opacity-40 animate-drift-slow" />
      <div className="absolute bottom-20 left-[6%] w-48 h-48 bg-teal/15 blob-1 animate-drift" />
      <div className="absolute top-[55%] right-[20%] w-5 h-28 bg-coral/60 animate-drift-reverse" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <a href="/">
          <img src={logo} alt="BetweenBodies" className="h-20 w-auto invert" />
        </a>
        <div className="hidden md:flex gap-8 font-display text-lg tracking-wide text-cream/70">
          <a href="/" className="hover:text-teal transition-colors duration-500">Home</a>
          <a href="#contact" className="hover:text-teal transition-colors duration-500">Contact</a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pb-16">
        <div className="max-w-4xl">
          <span className="font-display text-sm tracking-[0.3em] text-teal block mb-8 animate-reveal-up">
            Partner with us
          </span>
          <h1 className="text-[2.8rem] md:text-[5rem] lg:text-[7rem] leading-[0.88] mb-8 animate-reveal-up animate-delay-1">
            Bring Between<br />
            <span className="text-coral">Bodies</span> to<br />
            your city
          </h1>
          <p
            className="font-body text-sm md:text-base leading-relaxed text-cream/60 max-w-lg animate-reveal-up animate-delay-3"
            style={{ textWrap: 'pretty' }}
          >
            Between Bodies is a travelling workshop format. We come to your space,
            adapt to your community, and build an intensive experience together.
            You provide the ground — we bring the practice.
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="relative z-10 px-6 md:px-12 pb-8">
        <div className="flex items-center gap-6 animate-reveal-up animate-delay-5">
          <div className="w-12 h-[2px] bg-cream/30" />
          <span className="font-display text-xs tracking-[0.3em] text-cream/30">
            For theatres · Schools · Festivals · Cultural centres
          </span>
          <div className="flex-1 h-[2px] bg-cream/10" />
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
