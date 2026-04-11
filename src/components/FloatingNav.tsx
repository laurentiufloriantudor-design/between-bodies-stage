import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  size: number;
  homeX: number;
  homeY: number;
}

interface BodyState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Workshop",            href: "#workshop",              size: 20, homeX: 0.45, homeY: 0.05 },
  { label: "About",               href: "#about",                 size: 18, homeX: 0.72, homeY: 0.08 },
  { label: "Apply",               href: "#apply",                 size: 22, homeX: 0.54, homeY: 0.38 },
  { label: "Notes from the Room", href: "/notes-from-the-room",   size: 14, homeX: 0.49, homeY: 0.55 },
  { label: "Partner with Us",     href: "/partner",               size: 16, homeX: 0.56, homeY: 0.70 },
];

// Idle drift parameters per item — desynchronized organic floating
const IDLE_DRIFT = [
  { xAmp: 6,  yAmp: 4,  period: 5200, phase: 0 },
  { xAmp: 4,  yAmp: 7,  period: 6100, phase: 1200 },
  { xAmp: 5,  yAmp: 3,  period: 4800, phase: 2800 },
  { xAmp: 7,  yAmp: 5,  period: 5700, phase: 800 },
  { xAmp: 3,  yAmp: 6,  period: 6500, phase: 2000 },
];

const PHYSICS = {
  attractRadius: 180,
  attractForce: 25,
  repelRadius: 180,
  repelForce: 15,
  interMinDist: 140,
  interRepelForce: 8000,
  spring: 0.05,
  damping: 0.78,
  maxSpeed: 8,
  wallPad: 40,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FloatingNav() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<BodyState[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
  const rafRef = useRef<number>(0);
  const linkRefs = useRef<(HTMLElement | null)[]>([]);
  const breatheRafs = useRef<number[]>([]);

  const initState = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const { offsetWidth: w, offsetHeight: h } = hero;
    stateRef.current = NAV_ITEMS.map((item) => ({
      x: item.homeX * w,
      y: item.homeY * h,
      vx: 0,
      vy: 0,
    }));
  }, []);

  const tick = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const { offsetWidth: w, offsetHeight: h } = hero;
    const { x: mx, y: my, inside } = mouseRef.current;
    const st = stateRef.current;
    const { attractRadius, attractForce, repelRadius, repelForce,
            interMinDist, interRepelForce,
            spring, damping, maxSpeed, wallPad } = PHYSICS;

    // Find which item is closest to cursor
    let closestIdx = -1;
    let closestDist = Infinity;
    if (inside) {
      st.forEach((s, i) => {
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
    }

    const now = Date.now();

    st.forEach((s, i) => {
      let fx = 0, fy = 0;
      const item = NAV_ITEMS[i];
      const drift = IDLE_DRIFT[i];

      // Idle drift — subtle organic floating when cursor is away
      const driftX = Math.sin((now + drift.phase) / drift.period) * drift.xAmp * 0.008;
      const driftY = Math.cos((now + drift.phase * 1.3) / (drift.period * 0.8)) * drift.yAmp * 0.008;
      fx += driftX;
      fy += driftY;
      fy += (item.homeY * h - s.y) * spring;

      if (inside) {
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (i === closestIdx && dist < attractRadius) {
          // Closest item: attract toward cursor
          const strength = (1 - dist / attractRadius) * attractForce / dist;
          fx += dx * strength;
          fy += dy * strength;
        } else if (i !== closestIdx && dist < repelRadius) {
          // Other items: gently repel away from cursor
          const strength = (1 - dist / repelRadius) * repelForce / dist;
          fx -= dx * strength;
          fy -= dy * strength;
        }
      }

      st.forEach((other, j) => {
        if (i === j) return;
        const dx = s.x - other.x;
        const dy = s.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < interMinDist) {
          const force = interRepelForce / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      });

      s.vx = (s.vx + fx) * damping;
      s.vy = (s.vy + fy) * damping;
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      if (speed > maxSpeed) {
        s.vx = (s.vx / speed) * maxSpeed;
        s.vy = (s.vy / speed) * maxSpeed;
      }
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < wallPad) s.vx += (wallPad - s.x) * 0.4;
      if (s.x > w - wallPad) s.vx -= (s.x - w + wallPad) * 0.4;
      if (s.y < wallPad) s.vy += (wallPad - s.y) * 0.4;
      if (s.y > h - wallPad) s.vy -= (s.y - h + wallPad) * 0.4;

      const el = linkRefs.current[i];
      if (el) {
        el.style.left = `${s.x}px`;
        el.style.top = `${s.y}px`;
      }
    });

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startBreathing = useCallback(() => {
    breatheRafs.current.forEach(cancelAnimationFrame);
    breatheRafs.current = NAV_ITEMS.map((_, i) => {
      const period = 2600 + i * 380;
      const offset = i * 950;
      let raf: number;
      const breathe = () => {
        const scale = 1 + Math.sin((Date.now() + offset) / period) * 0.032;
        const el = linkRefs.current[i];
        const label = el?.querySelector<HTMLSpanElement>(".bb-label");
        if (label) label.style.transform = `scale(${scale})`;
        raf = requestAnimationFrame(breathe);
      };
      raf = requestAnimationFrame(breathe);
      breatheRafs.current[i] = raf;
      return raf;
    });
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    initState();
    rafRef.current = requestAnimationFrame(tick);
    startBreathing();

    const onResize = () => initState();
    window.addEventListener("resize", onResize);

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        inside: true,
      };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, inside: false };
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      breatheRafs.current.forEach(cancelAnimationFrame);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [initState, tick, startBreathing]);

  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(href);
    }
  };

  return (
    <div
      ref={heroRef}
      className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
    >
      {NAV_ITEMS.map((item, i) => (
        <button
          key={item.label}
          ref={(el) => { linkRefs.current[i] = el; }}
          onClick={() => handleClick(item.href)}
          className="pointer-events-auto"
          style={{
            position: "absolute",
            zIndex: 200,
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            userSelect: "none",
            background: "none",
            border: "none",
            padding: "10px 4px",
          }}
          onMouseEnter={(e) => {
            const label = e.currentTarget.querySelector<HTMLSpanElement>(".bb-label");
            const dot = e.currentTarget.querySelector<HTMLSpanElement>(".bb-dot");
            if (label) { label.style.color = "#E8725A"; label.style.letterSpacing = "0.20em"; }
            if (dot) { dot.style.opacity = "1"; dot.style.transform = "scale(1)"; }
          }}
          onMouseLeave={(e) => {
            const label = e.currentTarget.querySelector<HTMLSpanElement>(".bb-label");
            const dot = e.currentTarget.querySelector<HTMLSpanElement>(".bb-dot");
            if (label) { label.style.color = "#1A2744"; label.style.letterSpacing = "0.16em"; }
            if (dot) { dot.style.opacity = "0"; dot.style.transform = "scale(0)"; }
          }}
        >
          <span
            className="bb-dot"
            style={{
              position: "absolute", top: 4, right: -4,
              width: 4, height: 4, borderRadius: "50%",
              background: "#E8725A",
              opacity: 0, transform: "scale(0)",
              transition: "opacity 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              pointerEvents: "none",
            }}
          />
          <span
            className="bb-label"
            style={{
              display: "block",
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: item.size,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#1A2744",
              whiteSpace: "nowrap",
              transition: "color 0.2s ease, letter-spacing 0.3s ease",
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
