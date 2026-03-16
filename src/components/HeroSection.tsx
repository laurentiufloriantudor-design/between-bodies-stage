import logo from "@/assets/logo-betweenbodies.jpeg";
import heroImage from "@/assets/hero-theater.jpg";

const HeroSection = () => {
  return (
    <section className="border-b border-foreground">
      {/* Top bar */}
      <div className="border-b border-foreground px-6 py-4 flex items-center justify-between">
        <img src={logo} alt="BetweenBodies logo" className="h-12 w-auto" />
        <nav className="hidden md:flex gap-8 font-display uppercase text-sm tracking-tighter">
          <a href="#workshop" className="text-foreground hover:text-accent transition-colors">Workshop</a>
          <a href="#about" className="text-foreground hover:text-accent transition-colors">Despre</a>
          <a href="#apply" className="text-foreground hover:text-accent transition-colors">Aplică</a>
        </nav>
      </div>

      {/* Hero content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[70vh]">
        {/* Left: Text */}
        <div className="md:col-span-5 flex flex-col justify-center px-6 md:px-12 py-16 md:py-24">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 animate-slide-up">
            Corpul tău este arhitectura.
          </h1>
          <p className="text-5xl md:text-6xl lg:text-7xl text-accent animate-slide-up animate-delay-1">
            Spațiul este textul.
          </p>
          <div className="mt-12 animate-slide-up animate-delay-3">
            <p className="font-body text-base leading-relaxed text-muted-foreground max-w-md" style={{ textWrap: 'pretty' }}>
              International body-based theatre workshops. Investigating the space between performers in contemporary theatrical space.
            </p>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:col-span-7 border-l border-foreground relative overflow-hidden">
          <img
            src={heroImage}
            alt="Dancer in motion - high contrast black and white"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Geometric overlay - red circle */}
          <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-primary opacity-90" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
