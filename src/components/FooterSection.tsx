import logo from "@/assets/logo-betweenbodies.jpeg";

const FooterSection = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-background/20 px-6 md:px-12 py-16">
          <img src={logo} alt="BetweenBodies" className="h-16 w-auto mb-6" />
          <p className="font-body text-sm leading-relaxed opacity-60">
            Body-based theatre workshops.<br />
            Investigating the space between.
          </p>
        </div>

        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-background/20 px-6 md:px-12 py-16">
          <h4 className="text-lg mb-4 text-background">Contact</h4>
          <p className="font-body text-sm leading-relaxed opacity-60">
            betweenbodies@contact.com
          </p>
        </div>

        <div className="md:col-span-4 px-6 md:px-12 py-16">
          <h4 className="text-lg mb-4 text-background">Navigare</h4>
          <nav className="flex flex-col gap-2 font-display uppercase text-sm tracking-tighter opacity-60">
            <a href="#workshop" className="hover:opacity-100 transition-opacity">Workshop ↗</a>
            <a href="#about" className="hover:opacity-100 transition-opacity">Despre ↗</a>
            <a href="#apply" className="hover:opacity-100 transition-opacity">Aplică ↗</a>
          </nav>
        </div>
      </div>

      <div className="border-t border-background/20 px-6 md:px-12 py-4">
        <p className="font-body text-xs opacity-40 tabular-nums">
          © 2025 BetweenBodies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
