import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function usePointerAura() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const smoothX = useSpring(x, { stiffness: 110, damping: 22, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 110, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion) {
      return undefined;
    }

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMove);
  }, [prefersReducedMotion, x, y]);

  return { x: smoothX, y: smoothY };
}
