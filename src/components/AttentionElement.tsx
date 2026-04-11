import { useRef, useEffect, memo } from "react";
import { getAttentionState } from "@/hooks/useAttentionField";

interface AttentionElementProps {
  children: React.ReactNode;
  className?: string;
  /** How far the cursor's influence reaches (px). Default 500 */
  radius?: number;
  /** Max translational shift (px). Default 12 */
  maxShift?: number;
  /** Whether to push away (true) or pull toward (false). Default true */
  repel?: boolean;
  /** Opacity floor when deeply faded. Default 0.65 */
  opacityFloor?: number;
  /** Scale range: [min, max]. Default [0.985, 1.0] */
  scaleRange?: [number, number];
  /** Smoothing factor 0-1 (lower = smoother). Default 0.06 */
  smoothing?: number;
  /** Enable breathing when dwelt near. Default true */
  breathe?: boolean;
  /** Unique seed for organic variation */
  seed?: number;
  /** Disable for interactive elements that shouldn't shift */
  passive?: boolean;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

interface ElementState {
  tx: number;
  ty: number;
  opacity: number;
  scale: number;
  residualTx: number;
  residualTy: number;
  residualOpacity: number;
}

function AttentionElement({
  children,
  className = "",
  radius = 500,
  maxShift = 12,
  repel = true,
  opacityFloor = 0.65,
  scaleRange = [0.985, 1.0],
  smoothing = 0.06,
  breathe = true,
  seed = 0,
  passive = false,
  style,
  as: Tag = "div",
}: AttentionElementProps) {
  const elRef = useRef<HTMLElement>(null);
  const stateRef = useRef<ElementState>({
    tx: 0, ty: 0, opacity: 1, scale: 1,
    residualTx: 0, residualTy: 0, residualOpacity: 0,
  });
  const rafRef = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el || passive) return;

    const s = stateRef.current;
    const phase = seed * 1.7;

    const loop = () => {
      const att = getAttentionState();
      const now = Date.now();
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = att.x - cx;
      const dy = att.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Proximity factor: 1 when cursor is on element, 0 when outside radius
      const proximity = att.active ? Math.max(0, 1 - dist / radius) : 0;

      // Is this the closest/focused element? (heuristic: very close)
      const isFocused = proximity > 0.7;

      // Dwell factor: intensifies effects over time
      const dwellFactor = att.dwellTime > 300
        ? Math.min(1, (att.dwellTime - 300) / 2000)
        : 0;

      // ─── Translation (spatial reconfiguration) ───
      let targetTx = 0, targetTy = 0;
      if (proximity > 0 && !isFocused) {
        const dirX = dist > 0 ? dx / dist : 0;
        const dirY = dist > 0 ? dy / dist : 0;
        const strength = proximity * proximity * maxShift;
        // Agitation adds instability to displacement
        const instability = 1 + att.agitation * 0.4;
        const jitter = Math.sin(now * 0.002 + phase) * att.agitation * 2;
        if (repel) {
          targetTx = -dirX * strength * instability + jitter;
          targetTy = -dirY * strength * instability;
        } else {
          targetTx = dirX * strength * 0.3;
          targetTy = dirY * strength * 0.3;
        }
        // Dwell intensifies displacement
        targetTx *= (1 + dwellFactor * 0.5);
        targetTy *= (1 + dwellFactor * 0.5);
      }

      // ─── Opacity (perceptual fading) ───
      let targetOpacity = 1;
      if (proximity > 0 && !isFocused) {
        // Non-focused elements fade based on proximity to cursor
        const fadeFactor = proximity * (0.5 + dwellFactor * 0.3);
        // Organic variation per element
        const variation = Math.sin(now * 0.0013 + phase * 3.1) * 0.04;
        targetOpacity = 1 - fadeFactor * (1 - opacityFloor) + variation;
        targetOpacity = Math.max(opacityFloor, Math.min(1, targetOpacity));
      } else if (isFocused) {
        targetOpacity = 1;
      }

      // ─── Scale (breathing under dwell) ───
      let targetScale = 1;
      if (breathe && isFocused && dwellFactor > 0) {
        const breatheAmp = dwellFactor * (scaleRange[1] - scaleRange[0]);
        targetScale = 1 + Math.sin(now * 0.002 + phase) * breatheAmp;
      } else if (proximity > 0 && !isFocused) {
        // Slight shrink for non-focused
        targetScale = 1 - proximity * (1 - scaleRange[0]) * 0.5;
      }

      // ─── After-effects (residual memory) ───
      if (proximity === 0) {
        // Stamp residuals from current deviation
        if (Math.abs(s.tx) > 0.5 || Math.abs(s.ty) > 0.5) {
          s.residualTx = s.tx * 0.3;
          s.residualTy = s.ty * 0.3;
        }
        if (s.opacity < 0.95) {
          s.residualOpacity = (1 - s.opacity) * 0.2;
        }
      }

      // Decay residuals slowly
      s.residualTx *= 0.993;
      s.residualTy *= 0.993;
      s.residualOpacity *= 0.988;
      if (Math.abs(s.residualTx) < 0.05) s.residualTx = 0;
      if (Math.abs(s.residualTy) < 0.05) s.residualTy = 0;
      if (s.residualOpacity < 0.003) s.residualOpacity = 0;

      // Effective targets include residuals
      const effectiveTx = targetTx + s.residualTx;
      const effectiveTy = targetTy + s.residualTy;
      const effectiveOpacity = targetOpacity - s.residualOpacity;

      // ─── Smooth interpolation ───
      // Agitation makes smoothing less precise
      const effectiveSmoothing = smoothing * (1 + att.agitation * 0.5);
      s.tx += (effectiveTx - s.tx) * effectiveSmoothing;
      s.ty += (effectiveTy - s.ty) * effectiveSmoothing;
      s.opacity += (effectiveOpacity - s.opacity) * (effectiveSmoothing * 0.8);
      s.scale += (targetScale - s.scale) * (effectiveSmoothing * 0.6);

      // ─── Apply ───
      el.style.transform = `translate(${s.tx.toFixed(2)}px, ${s.ty.toFixed(2)}px) scale(${s.scale.toFixed(4)})`;
      el.style.opacity = `${Math.max(opacityFloor, Math.min(1, s.opacity)).toFixed(3)}`;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, maxShift, repel, opacityFloor, scaleRange, smoothing, breathe, seed, passive]);

  return (
    // @ts-ignore – dynamic tag
    <Tag ref={elRef} className={className} style={{ willChange: "transform, opacity", ...style }}>
      {children}
    </Tag>
  );
}

export default memo(AttentionElement);
