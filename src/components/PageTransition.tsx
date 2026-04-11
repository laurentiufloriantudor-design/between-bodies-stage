import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition() {
  const location = useLocation();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    prevPath.current = location.pathname;

    // Blur in
    setPhase("in");

    // Blur out after brief hold
    const t = setTimeout(() => {
      setPhase("out");
      const t2 = setTimeout(() => setPhase("idle"), 500);
      return () => clearTimeout(t2);
    }, 80);

    return () => clearTimeout(t);
  }, [location.pathname]);

  if (phase === "idle") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        backdropFilter: phase === "in" ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: phase === "in" ? "blur(12px)" : "blur(0px)",
        opacity: phase === "in" ? 1 : 0,
        transition: phase === "in"
          ? "backdropFilter 400ms ease, opacity 400ms ease"
          : "backdropFilter 500ms ease, opacity 500ms ease",
        backgroundColor: "rgba(22, 40, 54, 0.15)",
      }}
    />
  );
}
