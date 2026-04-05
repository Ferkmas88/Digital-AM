import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const onMove = (e) => { pos.current.mx = e.clientX; pos.current.my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    const tick = () => {
      const { mx, my } = pos.current;
      pos.current.rx += (mx - pos.current.rx) * 0.13;
      pos.current.ry += (my - pos.current.ry) * 0.13;

      if (dotRef.current) {
        dotRef.current.style.left = mx + "px";
        dotRef.current.style.top  = my + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + "px";
        ringRef.current.style.top  = pos.current.ry + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const grow = () => {
      dotRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(2.5)");
      ringRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1.6)");
      ringRef.current?.style.setProperty("border-color", "rgba(56,189,248,0.6)");
    };
    const shrink = () => {
      dotRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");
      ringRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");
      ringRef.current?.style.setProperty("border-color", "rgba(56,189,248,0.35)");
    };

    const targets = document.querySelectorAll("a, button, [data-hover]");
    targets.forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      targets.forEach(el => { el.removeEventListener("mouseenter", grow); el.removeEventListener("mouseleave", shrink); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", width: 10, height: 10, borderRadius: "50%",
        background: "#38bdf8", pointerEvents: "none", zIndex: 99999,
        transform: "translate(-50%,-50%)", transition: "transform 0.12s",
        mixBlendMode: "difference",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", width: 36, height: 36, borderRadius: "50%",
        border: "1px solid rgba(56,189,248,0.35)", pointerEvents: "none", zIndex: 99998,
        transform: "translate(-50%,-50%)", transition: "transform 0.15s, border-color 0.3s",
      }} />
    </>
  );
}
