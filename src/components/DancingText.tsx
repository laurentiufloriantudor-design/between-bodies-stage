import { useState, useMemo, useCallback, useRef } from "react";

interface DancingTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DancingText — editorial kinetic typography micro-interaction.
 * On hover, letters enter a brief choreographic "dance" then return to rest.
 * The entire performance is ~1200ms, non-looping, one-shot per hover.
 */
const DancingText = ({ children, className = "", style }: DancingTextProps) => {
  const [phase, setPhase] = useState<"rest" | "out" | "back">("rest");
  const lockRef = useRef(false);

  const letters = useMemo(() => {
    return children.split("").map((char, i) => {
      const p = i * 0.73;
      return {
        char,
        dx: Math.sin(p) * 4.5,
        dy: Math.cos(p * 1.3) * 5,
        rotate: Math.sin(p * 0.9) * 3.2,
        delay: i * 35,
      };
    });
  }, [children]);

  const totalStagger = letters.length * 35;
  const outDuration = 500;
  const holdDuration = 120;

  const trigger = useCallback(() => {
    if (lockRef.current) return;
    lockRef.current = true;
    setPhase("out");

    setTimeout(() => {
      setPhase("back");
      setTimeout(() => {
        setPhase("rest");
        lockRef.current = false;
      }, outDuration + totalStagger);
    }, outDuration + totalStagger + holdDuration);
  }, [totalStagger]);

  return (
    <span
      className={`inline ${className}`}
      style={{ ...style, cursor: "default" }}
      onMouseEnter={trigger}
    >
      {letters.map((l, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform:
              phase === "out"
                ? `translate(${l.dx}px, ${l.dy}px) rotate(${l.rotate}deg)`
                : "translate(0, 0) rotate(0deg)",
            transition:
              phase === "out"
                ? `transform ${outDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${l.delay}ms`
                : phase === "back"
                ? `transform ${outDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1) ${l.delay * 0.5}ms`
                : "none",
          }}
        >
          {l.char === " " ? "\u00A0" : l.char}
        </span>
      ))}
    </span>
  );
};

export default DancingText;
