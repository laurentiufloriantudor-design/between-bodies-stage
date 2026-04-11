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
  responseDelay: number;
  influence: number;
  // Temporal color depth: delayed color transition (lags behind influence)
  colorInfluence: number;
  // Timestamp when this item first sensed proximity (for delayed onset)
  proximityStarted: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Workshop",            href: "#workshop",              size: 40, homeX: 0.62, homeY: 0.22 },
  { label: "About",               href: "#about",                 size: 36, homeX: 0.72, homeY: 0.30 },
  { label: "Apply",               href: "#apply",                 size: 44, homeX: 0.54, homeY: 0.38 },
  { label: "Notes from the Room", href: "/notes-from-the-room",   size: 28, homeX: 0.49, homeY: 0.55 },
  { label: "Partner with Us",     href: "/partner",               size: 32, homeX: 0.56, homeY: 0.70 },
];

const IDLE_DRIFT = [
  { xAmp: 6,  yAmp: 4,  period: 5200, phase: 0 },
  { xAmp: 4,  yAmp: 7,  period: 6100, phase: 1200 },
  { xAmp: 5,  yAmp: 3,  period: 4800, phase: 2800 },
  { xAmp: 7,  yAmp: 5,  period: 5700, phase: 800 },
  { xAmp: 3,  yAmp: 6,  period: 6500, phase: 2000 },
];

const ITEM_PERSONALITY = [
  { responseLag: 0.06, jitterAmp: 0.3, colorDelay: 140 },   // Workshop
  { responseLag: 0.07, jitterAmp: 0.5, colorDelay: 180 },   // About
  { responseLag: 0.05, jitterAmp: 0.2, colorDelay: 120 },   // Apply
  { responseLag: 0.08, jitterAmp: 0.6, colorDelay: 200 },   // Notes — slowest
  { responseLag: 0.065, jitterAmp: 0.4, colorDelay: 160 },  // Partner
];

// Color easing rate — how fast colorInfluence catches up (lower = slower, more organic)
const COLOR_EASE_IN = 0.035;
const COLOR_EASE_OUT = 0.025;

// Base colors
const NAVY = { r: 26, g: 39, b: 68 };
const TEAL = { r: 10, g: 186, b: 181 };
const CORAL = { r: 232, g: 114, b: 90 };

const PHYSICS = {
  activationRadius: 220,
  anchorSpring: 0.12,
  clusterForce: 1.4,
  avoidFocusForce: 5.0,
  avoidFocusRadius: 300,
  interMinDist: 90,
  interRepelForce: 4000,
  homeSpring: 0.035,
  damping: 0.88,
  maxSpeed: 5,
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
  const focusedRef = useRef<number>(-1);

  const initState = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const { offsetWidth: w, offsetHeight: h } = hero;
    stateRef.current = NAV_ITEMS.map((item, i) => ({
      x: item.homeX * w,
      y: item.homeY * h,
      vx: 0,
      vy: 0,
      responseDelay: ITEM_PERSONALITY[i].responseLag,
      influence: 0,
      colorInfluence: 0,
      proximityStarted: 0,
    }));
  }, []);

  const tick = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const { offsetWidth: w, offsetHeight: h } = hero;
    const { x: mx, y: my, inside } = mouseRef.current;
    const st = stateRef.current;
    const {
      activationRadius, anchorSpring,
      clusterForce, avoidFocusForce, avoidFocusRadius,
      interMinDist, interRepelForce,
      homeSpring, damping, maxSpeed, wallPad,
    } = PHYSICS;

    const now = Date.now();

    // Find closest item
    let closestIdx = -1;
    let closestDist = Infinity;
    if (inside) {
      st.forEach((s, i) => {
        const dx = mx - s.x;
        const dy = my - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
      if (closestDist > activationRadius * 1.5) closestIdx = -1;
    }

    focusedRef.current = closestIdx;

    // Cluster centroid
    let cx = 0, cy = 0, count = 0;
    st.forEach((s, i) => {
      if (i === closestIdx) return;
      cx += s.x; cy += s.y; count++;
    });
    if (count > 0) { cx /= count; cy /= count; }

    st.forEach((s, i) => {
      let fx = 0, fy = 0;
      const item = NAV_ITEMS[i];
      const drift = IDLE_DRIFT[i];
      const personality = ITEM_PERSONALITY[i];

      // ─── Physics influence (movement) ───
      const targetInfluence = closestIdx >= 0 ? 1 : 0;
      s.influence += (targetInfluence - s.influence) * personality.responseLag;
      if (s.influence < 0.001) s.influence = 0;

      // ─── Color influence with temporal delay ───
      // Track when proximity first begins
      const isActive = closestIdx >= 0;
      if (isActive && s.proximityStarted === 0) {
        s.proximityStarted = now;
      } else if (!isActive) {
        s.proximityStarted = 0;
      }

      // Color only begins transitioning after the per-item delay has elapsed
      const elapsed = s.proximityStarted > 0 ? now - s.proximityStarted : 0;
      const colorAllowed = elapsed > personality.colorDelay;

      if (isActive && colorAllowed) {
        // Ease in with a slow, non-linear ramp
        s.colorInfluence += (1 - s.colorInfluence) * COLOR_EASE_IN;
      } else if (!isActive) {
        // Ease out even more slowly
        s.colorInfluence += (0 - s.colorInfluence) * COLOR_EASE_OUT;
      }
      // else: delay hasn't elapsed yet, color stays where it is

      if (s.colorInfluence < 0.001) s.colorInfluence = 0;
      if (s.colorInfluence > 0.999) s.colorInfluence = 1;

      // ─── Idle drift ───
      const driftX = Math.sin((now + drift.phase) / drift.period) * drift.xAmp * 0.008;
      const driftY = Math.cos((now + drift.phase * 1.3) / (drift.period * 0.8)) * drift.yAmp * 0.008;
      fx += driftX;
      fy += driftY;

      // Micro-jitter
      const jx = Math.sin(now * 0.0013 + i * 2.1) * personality.jitterAmp * s.influence * 0.15;
      const jy = Math.cos(now * 0.0017 + i * 3.7) * personality.jitterAmp * s.influence * 0.15;
      fx += jx;
      fy += jy;

      if (i === closestIdx) {
        const homeX = item.homeX * w;
        const homeY = item.homeY * h;
        fx += (homeX - s.x) * anchorSpring * (1 + s.influence * 2);
        fy += (homeY - s.y) * anchorSpring * (1 + s.influence * 2);
      } else {
        const homeFactor = homeSpring * (1 - s.influence * 0.7);
        fx += (item.homeX * w - s.x) * homeFactor;
        fy += (item.homeY * h - s.y) * homeFactor;

        if (closestIdx >= 0 && s.influence > 0.01) {
          const focused = st[closestIdx];
          const toCx = cx - s.x;
          const toCy = cy - s.y;
          const toCDist = Math.sqrt(toCx * toCx + toCy * toCy) || 1;
          fx += (toCx / toCDist) * clusterForce * s.influence;
          fy += (toCy / toCDist) * clusterForce * s.influence;

          const awayX = s.x - focused.x;
          const awayY = s.y - focused.y;
          const awayDist = Math.sqrt(awayX * awayX + awayY * awayY) || 1;
          if (awayDist < avoidFocusRadius) {
            const strength = (1 - awayDist / avoidFocusRadius) * avoidFocusForce * s.influence;
            fx += (awayX / awayDist) * strength;
            fy += (awayY / awayDist) * strength;
          }
        }
      }

      // Inter-item repulsion
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

      // Integrate
      s.vx = (s.vx + fx) * damping;
      s.vy = (s.vy + fy) * damping;
      const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      if (speed > maxSpeed) {
        s.vx = (s.vx / speed) * maxSpeed;
        s.vy = (s.vy / speed) * maxSpeed;
      }
      s.x += s.vx;
      s.y += s.vy;

      // Wall constraints
      if (s.x < wallPad) s.vx += (wallPad - s.x) * 0.4;
      if (s.x > w - wallPad) s.vx -= (s.x - w + wallPad) * 0.4;
      if (s.y < wallPad) s.vy += (wallPad - s.y) * 0.4;
      if (s.y > h - wallPad) s.vy -= (s.y - h + wallPad) * 0.4;

      // ─── Apply position & living color ───
      const el = linkRefs.current[i];
      if (el) {
        el.style.left = `${s.x}px`;
        el.style.top = `${s.y}px`;

        const label = el.querySelector<HTMLSpanElement>(".bb-label");
        if (label) {
          const ci = s.colorInfluence;

          if (i === closestIdx) {
            // Focused: transition toward coral with living fluctuation
            const shimmer = Math.sin(now * 0.002 + i * 1.7) * 0.04 + Math.sin(now * 0.0037) * 0.02;
            const intensity = Math.min(1, ci + shimmer);
            const r = Math.round(NAVY.r + (CORAL.r - NAVY.r) * intensity);
            const g = Math.round(NAVY.g + (CORAL.g - NAVY.g) * intensity);
            const b = Math.round(NAVY.b + (CORAL.b - NAVY.b) * intensity);
            label.style.color = `rgb(${r},${g},${b})`;
            label.style.opacity = "1";
          } else if (closestIdx >= 0) {
            // Non-focused: transition toward teal with micro-variation
            // Each item gets a unique shimmer phase so they never match exactly
            const shimmer = Math.sin(now * 0.0019 + i * 2.3) * 0.05
                          + Math.cos(now * 0.0031 + i * 4.1) * 0.03;
            const intensity = Math.max(0, Math.min(1, ci + shimmer));
            const r = Math.round(NAVY.r + (TEAL.r - NAVY.r) * intensity);
            const g = Math.round(NAVY.g + (TEAL.g - NAVY.g) * intensity);
            const b = Math.round(NAVY.b + (TEAL.b - NAVY.b) * intensity);
            label.style.color = `rgb(${r},${g},${b})`;
            const o = 1 - ci * 0.15;
            label.style.opacity = `${o}`;
          } else {
            // Idle: fade back to navy (colorInfluence handles the easing)
            if (ci > 0.001) {
              const r = Math.round(NAVY.r + (TEAL.r - NAVY.r) * ci);
              const g = Math.round(NAVY.g + (TEAL.g - NAVY.g) * ci);
              const b = Math.round(NAVY.b + (TEAL.b - NAVY.b) * ci);
              label.style.color = `rgb(${r},${g},${b})`;
            } else {
              label.style.color = `rgb(${NAVY.r},${NAVY.g},${NAVY.b})`;
            }
            label.style.opacity = "1";
          }
        }
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

  const handleClick = (e: React.MouseEvent, href: string, idx: number) => {
    e.preventDefault();
    e.stopPropagation();

    // Micro-pause: hold the moment before committing to navigation
    const el = linkRefs.current[idx];
    const label = el?.querySelector<HTMLSpanElement>(".bb-label");

    // Slight intensification during the pause
    if (label) {
      label.style.textShadow = `0 0 12px rgba(${CORAL.r},${CORAL.g},${CORAL.b},0.3)`;
    }

    const pauseDuration = 180 + Math.random() * 80; // 180–260ms, slightly unpredictable

    setTimeout(() => {
      if (label) label.style.textShadow = "none";
      if (href.startsWith("#")) {
        const target = document.getElementById(href.slice(1));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
    }, pauseDuration);
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
          onClick={(e) => handleClick(e, item.href, i)}
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
            const dot = e.currentTarget.querySelector<HTMLSpanElement>(".bb-dot");
            const label = e.currentTarget.querySelector<HTMLSpanElement>(".bb-label");
            if (label) label.style.letterSpacing = "0.20em";
            if (dot) { dot.style.opacity = "1"; dot.style.transform = "scale(1)"; }
          }}
          onMouseLeave={(e) => {
            const dot = e.currentTarget.querySelector<HTMLSpanElement>(".bb-dot");
            const label = e.currentTarget.querySelector<HTMLSpanElement>(".bb-label");
            if (label) label.style.letterSpacing = "0.16em";
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
              color: `rgb(${NAVY.r},${NAVY.g},${NAVY.b})`,
              whiteSpace: "nowrap",
              transition: "letter-spacing 0.3s ease, opacity 0.6s ease, text-shadow 0.3s ease",
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
