import logo from "@/assets/logo-betweenbodies.jpeg";
import AttentionElement from "./AttentionElement";

const FooterSection = () => {
  return (
    <footer className="relative bg-navy text-cream overflow-hidden">
      <AttentionElement seed={80} radius={500} maxShift={16} opacityFloor={0.3} className="absolute top-8 right-12 w-20 h-20 bg-coral rounded-full opacity-60 animate-drift-slow" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 py-16 md:py-20">
        <AttentionElement seed={81} radius={400} maxShift={5} opacityFloor={0.7}>
          <div>
            <img src={logo} alt="BetweenBodies" className="h-12 w-auto mb-6" />
            <p className="font-body text-xs leading-relaxed opacity-50">
              Body-based theatre workshops.<br />
              Investigating the space between.
            </p>
          </div>
        </AttentionElement>

        <AttentionElement seed={82} radius={400} maxShift={4} opacityFloor={0.65}>
          <div>
            <h4 className="text-lg mb-4 tracking-[0.15em]">Contact</h4>
            <p className="font-body text-xs leading-relaxed opacity-50">
              between.bconnections@gmail.com
            </p>
          </div>
        </AttentionElement>

        <AttentionElement seed={83} radius={400} maxShift={6} opacityFloor={0.6}>
          <div>
            <h4 className="text-lg mb-4 tracking-[0.15em]">Navigate</h4>
            <nav className="flex flex-col gap-2 font-display text-sm tracking-[0.15em] opacity-50">
              <a href="#workshop" className="hover:opacity-100 hover:text-teal transition-all duration-500">Workshop</a>
              <a href="#about" className="hover:opacity-100 hover:text-teal transition-all duration-500">About</a>
              <a href="#apply" className="hover:opacity-100 hover:text-teal transition-all duration-500">Apply</a>
              <a href="/notes-from-the-room" className="hover:opacity-100 hover:text-teal transition-all duration-500">Notes from the Room</a>
              <a href="/partner" className="hover:opacity-100 hover:text-teal transition-all duration-500">Partner</a>
            </nav>
          </div>
        </AttentionElement>
      </div>

      <div className="relative z-10 px-6 md:px-12 py-4 border-t border-cream/10">
        <p className="font-body text-[10px] opacity-30 tabular-nums">
          © 2025 BetweenBodies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
