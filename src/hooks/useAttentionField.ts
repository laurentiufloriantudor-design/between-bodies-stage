import { useEffect, useRef, useCallback } from "react";

export interface AttentionState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  smoothSpeed: number;
  agitation: number; // 0 = calm, 1 = erratic
  dwellTime: number; // ms since cursor stopped moving significantly
  dwellX: number;
  dwellY: number;
  active: boolean; // cursor is on page
}

const INITIAL: AttentionState = {
  x: -9999, y: -9999,
  velocityX: 0, velocityY: 0,
  speed: 0, smoothSpeed: 0, agitation: 0,
  dwellTime: 0, dwellX: -9999, dwellY: -9999,
  active: false,
};

// Singleton — shared across all consumers
let state: AttentionState = { ...INITIAL };
let listeners: Set<() => void> = new Set();
let initialized = false;
let prevX = -9999, prevY = -9999, prevTime = 0;
let lastMoveTime = 0;
let dwellStartX = -9999, dwellStartY = -9999;
let rafId = 0;

function notify() { listeners.forEach(fn => fn()); }

function onMouseMove(e: MouseEvent) {
  const now = Date.now();
  state.x = e.clientX;
  state.y = e.clientY;
  state.active = true;

  if (prevTime > 0) {
    const dt = now - prevTime;
    if (dt > 0 && dt < 100) {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      state.velocityX = dx / dt;
      state.velocityY = dy / dt;
      state.speed = Math.sqrt(dx * dx + dy * dy) / dt;
      state.smoothSpeed += (state.speed - state.smoothSpeed) * 0.12;
    }
  }

  // Dwell detection: reset if moved > 8px from dwell origin
  const dwellDx = e.clientX - dwellStartX;
  const dwellDy = e.clientY - dwellStartY;
  if (Math.sqrt(dwellDx * dwellDx + dwellDy * dwellDy) > 8) {
    dwellStartX = e.clientX;
    dwellStartY = e.clientY;
    lastMoveTime = now;
    state.dwellX = e.clientX;
    state.dwellY = e.clientY;
  }

  prevX = e.clientX;
  prevY = e.clientY;
  prevTime = now;
}

function onMouseLeave() {
  state.active = false;
  state.smoothSpeed *= 0.5;
}

function tick() {
  const now = Date.now();
  // Decay velocity
  if (!state.active) {
    state.smoothSpeed *= 0.94;
    state.speed *= 0.94;
  }
  state.agitation = Math.min(1, state.smoothSpeed / 1.5);

  // Dwell time
  state.dwellTime = lastMoveTime > 0 ? now - lastMoveTime : 0;

  notify();
  rafId = requestAnimationFrame(tick);
}

function init() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("mouseleave", onMouseLeave);
  rafId = requestAnimationFrame(tick);
}

function cleanup() {
  if (listeners.size > 0) return; // still has consumers
  initialized = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseleave", onMouseLeave);
  cancelAnimationFrame(rafId);
  state = { ...INITIAL };
}

/**
 * Subscribe to the global attention field.
 * Returns a ref that always points to the latest state (no re-renders).
 */
export function useAttentionField() {
  const stateRef = useRef(state);

  useEffect(() => {
    init();
    const listener = () => { stateRef.current = state; };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      cleanup();
    };
  }, []);

  return stateRef;
}

/**
 * Get raw state (for non-hook usage)
 */
export function getAttentionState() { return state; }
