import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-betweenbodies.png";
import heroImage from "@/assets/hero-theater.jpg";
import ChoreographicMenu from "./ChoreographicMenu";
import FloatingNav from "./FloatingNav";
import AttentionElement from "./AttentionElement";
import DancingText from "./DancingText";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <AttentionElement seed={0} radius={600} maxShift={18} opacityFloor={0.5} className="absolute top-12 right-[8%] w-36 h-36 bg-coral rounded-full animate-drift-slow opacity-90" />
      <AttentionElement seed={1} radius={600} maxShift={22} opacityFloor={0.4} className="absolute bottom-24 left-[5%] w-48 h-48 bg-teal animate-drift" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 95% 65%, 80% 100%, 40% 95%, 10% 80%, 0% 50%, 5% 20%)' }} />
      <AttentionElement seed={2} radius={500} maxShift={15} opacityFloor={0.45} className="absolute top-[40%] right-[15%] w-20 h-20 bg-navy rounded-full animate-drift-reverse" />

      {/* Floating physics-based nav — desktop/laptop (md+) */}
      <div className="hidden md:block">
        <FloatingNav />
      </div>

      <nav className="relative z-30 flex items-center justify-between px-6 md:px-12 py-6">
        <AttentionElement seed={3} radius={300} maxShift={4} opacityFloor={0.85} passive={false}>
          <img src={logo} alt="BetweenBodies logo" className="h-40 w-auto" />
        </AttentionElement>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 w-10 h-10 flex items-center justify-center text-foreground hover:text-teal transition-colors duration-300 active:scale-95 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Choreographic menu — mobile only */}
      <div className="md:hidden">
        <ChoreographicMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 px-6 md:px-12 pt-8 md:pt-16">
        <div className="md:col-span-2 relative">
          <AttentionElement seed={10} radius={450} maxShift={6} opacityFloor={0.7} scaleRange={[0.992, 1.005]}>
            <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] animate-reveal-up">
              <DancingText>The space</DancingText>
            </h1>
          </AttentionElement>
          <AttentionElement seed={11} radius={450} maxShift={8} opacityFloor={0.7} scaleRange={[0.992, 1.005]}>
            <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] text-teal animate-reveal-up animate-delay-1">
              <DancingText>between is</DancingText>
            </h1>
          </AttentionElement>
          <AttentionElement seed={12} radius={450} maxShift={6} opacityFloor={0.7} scaleRange={[0.992, 1.005]}>
            <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] animate-reveal-up animate-delay-2">
              <DancingText>where it</DancingText>
            </h1>
          </AttentionElement>
          <AttentionElement seed={13} radius={450} maxShift={10} opacityFloor={0.65} scaleRange={[0.99, 1.008]}>
            <h1 className="text-[3.5rem] md:text-[6rem] lg:text-[8rem] leading-[0.88] text-coral animate-reveal-up animate-delay-3">
              <DancingText>happens</DancingText>
            </h1>
          </AttentionElement>

          <AttentionElement seed={14} radius={400} maxShift={5} opacityFloor={0.6}>
            <div className="mt-8 md:mt-12 max-w-md animate-reveal-up animate-delay-4">
              <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground" style={{ textWrap: 'pretty' }}>
                International body-based theatre workshops. Investigating the space between performers in contemporary theatrical space.
              </p>
            </div>
          </AttentionElement>
        </div>

        <div className="relative mt-8 md:mt-0 flex items-start justify-center md:justify-end">
          <AttentionElement seed={15} radius={500} maxShift={14} opacityFloor={0.6} scaleRange={[0.98, 1.01]}>
            <div className="relative w-64 h-80 md:w-72 md:h-96 animate-reveal-right animate-delay-3">
              <div className="w-full h-full blob-3 overflow-hidden">
                <img
                  src={heroImage}
                  alt="Dancer in motion — high contrast black and white"
                  className="w-full h-full object-cover photo-hover scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -left-8 w-16 h-16 bg-coral animate-drift" />
            </div>
          </AttentionElement>
        </div>
      </div>

      <AttentionElement seed={16} radius={400} maxShift={4} opacityFloor={0.5}>
        <div className="relative z-10 mt-16 md:mt-24 px-6 md:px-12 pb-8">
          <div className="flex items-center gap-6 animate-reveal-up animate-delay-5">
            <div className="w-12 h-[2px] bg-foreground" />
            <span className="font-display text-sm tracking-[0.3em] text-muted-foreground">
              Space is the text
            </span>
            <div className="flex-1 h-[2px] bg-foreground/10" />
          </div>
        </div>
      </AttentionElement>
    </section>
  );
};

export default HeroSection;
