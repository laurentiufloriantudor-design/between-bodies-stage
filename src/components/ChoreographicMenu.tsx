import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Workshop", href: "/workshop", entry: "slide-left-sharp" },
  { label: "About", href: "/about", entry: "descend-tremor" },
  { label: "Apply", href: "/apply", entry: "slide-left-delayed" },
  { label: "Newsletter", href: "#newsletter", entry: "descend-slow" },
  { label: "Notes from the Room", href: "/notes-from-the-room", entry: "slide-left-sharp" },
  { label: "Partner with us", href: "/partner", entry: "descend-tremor" },
];

// Unique tremor parameters for each item — desynchronized breathing
const tremors = [
  { duration: 4.2, delay: 0, xAmp: 1.2, yAmp: 0.8, rotAmp: 0.3 },
  { duration: 5.1, delay: 0.7, xAmp: 0.7, yAmp: 1.1, rotAmp: 0.5 },
  { duration: 3.8, delay: 1.3, xAmp: 1.0, yAmp: 0.6, rotAmp: 0.2 },
  { duration: 4.7, delay: 0.4, xAmp: 0.9, yAmp: 1.3, rotAmp: 0.4 },
  { duration: 5.5, delay: 1.0, xAmp: 1.1, yAmp: 0.7, rotAmp: 0.6 },
  { duration: 4.0, delay: 1.8, xAmp: 0.8, yAmp: 1.0, rotAmp: 0.3 },
];

// Entry animation delays (staggered, non-uniform)
const entryDelays = [0, 120, 280, 180, 400, 320];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChoreographicMenu = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const [itemsVisible, setItemsVisible] = useState<boolean[]>(new Array(navLinks.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);
  const breathLineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Staggered entry
  useEffect(() => {
    if (isOpen) {
      setEntered(false);
      setItemsVisible(new Array(navLinks.length).fill(false));
      
      const timers = navLinks.map((_, i) =>
        setTimeout(() => {
          setItemsVisible(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 100 + entryDelays[i])
      );

      setTimeout(() => setEntered(true), 100 + Math.max(...entryDelays) + 400);

      return () => timers.forEach(clearTimeout);
    } else {
      setEntered(false);
      setItemsVisible(new Array(navLinks.length).fill(false));
    }
  }, [isOpen]);

  const handleClick = (href: string) => {
    onClose();
    if (href.startsWith("#")) {
      setTimeout(() => {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      setTimeout(() => navigate(href), 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-navy transition-opacity duration-700"
        style={{ opacity: isOpen ? 0.97 : 0 }}
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:right-12 z-[55] text-cream/60 hover:text-cream transition-colors duration-500 font-display text-sm tracking-[0.3em]"
      >
        Close
      </button>

      {/* Menu items */}
      <nav className="relative z-[55] flex flex-col items-start gap-2 md:gap-3 px-8 md:px-16 w-full max-w-3xl">
        {navLinks.map((link, i) => {
          const tremor = tremors[i];
          const isHovered = hoveredIndex === i;
          const someoneHovered = hoveredIndex !== null;
          const isDescend = link.entry.startsWith("descend");

          return (
            <div
              key={link.label}
              className="relative group w-full"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Breath line — terracotta vertical indicator */}
              <div
                ref={el => { breathLineRefs.current[i] = el; }}
                className="absolute -left-6 top-1/2 w-[2px] bg-coral origin-center transition-all duration-700 ease-out"
                style={{
                  height: isHovered ? "100%" : "0%",
                  transform: `translateY(-50%) scaleY(${isHovered ? 1 : 0})`,
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Kinetic echo — teal afterimage */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500"
                style={{
                  opacity: isHovered ? 0.3 : 0,
                  filter: "blur(12px)",
                  transform: `translate(${isHovered ? 4 : 0}px, ${isHovered ? 2 : 0}px)`,
                  transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <span className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] tracking-[0.02em] text-teal uppercase whitespace-nowrap">
                  {link.label}
                </span>
              </div>

              {/* Main text */}
              <button
                onClick={() => handleClick(link.href)}
                className="relative block w-full text-left py-2 md:py-3 overflow-visible"
                style={{
                  opacity: itemsVisible[i] ? (someoneHovered && !isHovered ? 0.25 : 1) : 0,
                  transform: itemsVisible[i]
                    ? "none"
                    : isDescend
                      ? "translateY(-40px)"
                      : "translateX(-60px)",
                  transition: `opacity ${someoneHovered ? '0.5s' : '0.6s'} cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), letter-spacing 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                  animation: entered && itemsVisible[i]
                    ? `choreographic-tremor-${i} ${tremor.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${tremor.delay}s infinite`
                    : "none",
                  letterSpacing: isHovered ? "0.08em" : "0.02em",
                }}
              >
                <span
                  className="font-display text-[2.5rem] md:text-[4rem] lg:text-[5rem] leading-[0.95] uppercase whitespace-nowrap"
                  style={{
                    color: isHovered ? "#0ABAB5" : "#F0EDE6",
                    transition: "color 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    display: "inline-block",
                    transformOrigin: "left center",
                  }}
                >
                  {link.label}
                </span>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Injected keyframes for unique tremors */}
      <style>{`
        ${tremors.map((t, i) => `
          @keyframes choreographic-tremor-${i} {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            23% { transform: translate(${t.xAmp}px, ${-t.yAmp * 0.6}px) rotate(${t.rotAmp}deg); }
            41% { transform: translate(${-t.xAmp * 0.5}px, ${t.yAmp}px) rotate(${-t.rotAmp * 0.7}deg); }
            67% { transform: translate(${t.xAmp * 0.7}px, ${-t.yAmp * 0.4}px) rotate(${t.rotAmp * 0.5}deg); }
            84% { transform: translate(${-t.xAmp * 0.3}px, ${t.yAmp * 0.8}px) rotate(${-t.rotAmp * 0.3}deg); }
          }
        `).join("")}
      `}</style>
    </div>
  );
};

export default ChoreographicMenu;
