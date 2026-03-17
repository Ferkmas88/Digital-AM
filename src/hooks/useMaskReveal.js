import { useEffect, useState } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const DESKTOP_IDLE = { x: 72, y: 42, radius: 178 };
const MOBILE_IDLE = { x: 50, y: 46, radius: 152 };

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function useMaskReveal() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(DESKTOP_IDLE.x);
  const pointerY = useMotionValue(DESKTOP_IDLE.y);
  const radius = useMotionValue(DESKTOP_IDLE.radius);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 26, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 26, mass: 0.35 });
  const smoothRadius = useSpring(radius, { stiffness: 150, damping: 24, mass: 0.4 });

  const innerStop = useTransform(smoothRadius, (value) => `${Math.max(value * 0.38, 52).toFixed(0)}px`);
  const outerStop = useTransform(smoothRadius, (value) => `${Math.max(value * 0.72, 90).toFixed(0)}px`);
  const edgeStop = useTransform(smoothRadius, (value) => `${value.toFixed(0)}px`);
  const glowRadius = useTransform(smoothRadius, (value) => `${Math.max(value * 1.15, 160).toFixed(0)}px`);
  const ringSize = useTransform(smoothRadius, (value) => `${Math.max(value * 1.18, 190).toFixed(0)}px`);
  const spotlightSize = useTransform(smoothRadius, (value) => `${Math.max(value * 1.95, 280).toFixed(0)}px`);
  const rotateX = useTransform(smoothY, [0, 50, 100], [8, 0, -8]);
  const rotateY = useTransform(smoothX, [0, 50, 100], [-8, 0, 8]);
  const floatX = useTransform(smoothX, [0, 50, 100], [-16, 0, 16]);
  const floatY = useTransform(smoothY, [0, 50, 100], [-14, 0, 14]);
  const midX = useTransform(smoothX, [0, 50, 100], [-10, 0, 10]);
  const midY = useTransform(smoothY, [0, 50, 100], [-8, 0, 8]);
  const deepX = useTransform(smoothX, [0, 50, 100], [-24, 0, 24]);
  const deepY = useTransform(smoothY, [0, 50, 100], [-18, 0, 18]);

  const maskImage = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(255,255,255,1) 0px, rgba(255,255,255,1) ${innerStop}, rgba(255,255,255,0.96) ${outerStop}, transparent ${edgeStop})`;
  const glowImage = useMotionTemplate`radial-gradient(circle ${glowRadius} at ${smoothX}% ${smoothY}%, rgba(66,224,255,0.22) 0%, rgba(106,130,255,0.12) 34%, transparent 72%)`;
  const spotlightImage = useMotionTemplate`radial-gradient(circle ${spotlightSize} at ${smoothX}% ${smoothY}%, rgba(255,255,255,0.12) 0%, rgba(56,189,248,0.10) 18%, rgba(99,102,241,0.08) 32%, transparent 74%)`;
  const ringImage = useMotionTemplate`radial-gradient(circle at center, rgba(255,255,255,0.24) 0%, rgba(103,232,249,0.18) 22%, rgba(255,255,255,0.04) 45%, transparent 68%)`;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const syncDeviceMode = () => {
      const touchDevice = mediaQuery.matches;
      setIsTouchDevice(touchDevice);

      const idle = touchDevice ? MOBILE_IDLE : DESKTOP_IDLE;
      pointerX.set(idle.x);
      pointerY.set(idle.y);
      radius.set(idle.radius);
    };

    syncDeviceMode();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", syncDeviceMode);
    } else {
      mediaQuery.addListener(syncDeviceMode);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", syncDeviceMode);
      } else {
        mediaQuery.removeListener(syncDeviceMode);
      }
    };
  }, [pointerX, pointerY, radius]);

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion || !isTouchDevice) {
      return undefined;
    }

    let frameId = 0;

    const animate = (time) => {
      const scrollY = window.scrollY || 0;
      const drift = time * 0.001;

      pointerX.set(50 + Math.sin(drift * 0.72) * 14 + Math.sin(drift * 0.25) * 4);
      pointerY.set(44 + Math.cos(drift * 0.56 + scrollY * 0.003) * 10);
      radius.set(156 + Math.sin(drift * 0.8) * 10 + Math.min(scrollY * 0.02, 18));

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [isTouchDevice, pointerX, pointerY, prefersReducedMotion, radius]);

  const handlePointerMove = (event) => {
    if (isTouchDevice || prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const nextY = ((event.clientY - bounds.top) / bounds.height) * 100;

    pointerX.set(clamp(nextX, 14, 86));
    pointerY.set(clamp(nextY, 16, 84));
  };

  const handlePointerEnter = () => {
    if (isTouchDevice) return;
    radius.set(214);
  };

  const handlePointerLeave = () => {
    if (isTouchDevice) return;

    pointerX.set(DESKTOP_IDLE.x);
    pointerY.set(DESKTOP_IDLE.y);
    radius.set(DESKTOP_IDLE.radius);
  };

  return {
    isTouchDevice,
    interactiveProps: {
      onMouseEnter: handlePointerEnter,
      onMouseLeave: handlePointerLeave,
      onMouseMove: handlePointerMove,
    },
    cursorStyle: {
      left: smoothX,
      top: smoothY,
      width: ringSize,
      height: ringSize,
      backgroundImage: ringImage,
      x: "-50%",
      y: "-50%",
    },
    glowStyle: {
      backgroundImage: glowImage,
    },
    panelStyle: {
      rotateX,
      rotateY,
      transformPerspective: 1400,
    },
    spotlightStyle: {
      backgroundImage: spotlightImage,
    },
    layerStyles: {
      back: { x: midX, y: midY },
      front: { x: floatX, y: floatY },
      accent: { x: deepX, y: deepY },
    },
    maskStyle: {
      WebkitMaskImage: maskImage,
      maskImage,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
    },
  };
}
