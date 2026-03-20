import logo from "@/assets/logo-betweenbodies.jpeg";

const PartnerFooter = () => {
  return (
    <footer className="relative bg-foreground text-cream border-t border-cream/10 overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-8 gap-4">
        <a href="/">
          <img src={logo} alt="BetweenBodies" className="h-8 w-auto invert" />
        </a>
        <p className="font-body text-[10px] text-cream/30 tabular-nums">
          © 2025 BetweenBodies. All rights reserved.
        </p>
        <a
          href="mailto:between.bconnections@gmail.com"
          className="font-body text-xs text-cream/40 hover:text-teal transition-colors duration-500"
        >
          between.bconnections@gmail.com
        </a>
      </div>
    </footer>
  );
};

export default PartnerFooter;
