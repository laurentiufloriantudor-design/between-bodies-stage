import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function GlobalCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const location = useLocation();

  const isTouch = typeof window !== "undefined" && (window.matchMedia("(hover: none)").matches || "ontouchstart" in window);

  useEffect(() => {
    if (isTouch) return;
    document.body.style.cursor = "none";
    return () => { document.body.style.cursor = ""; };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;


  const lightPages = ["/", "/workshop", "/about", "/apply"];
  const isDark = !lightPages.includes(location.pathname);
  const strokeColor = isDark ? "#E7E9DA" : "#162836";

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: 40, height: 40,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="20" r="14" stroke={strokeColor} strokeWidth="1.4"/>
        <circle cx="24" cy="20" r="14" stroke={strokeColor} strokeWidth="1.4"/>
        <circle cx="21" cy="20" r="4.5" fill="#E1664D"/>
      </svg>
    </div>
  );
}
