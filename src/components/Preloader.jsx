import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += Math.random() * 22 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(id);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onDone, 600);
        }, 350);
      }
      setProgress(Math.round(current));
    }, 180);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8"
          style={{ background: "#070809" }}
        >
          {/* Logo / wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
              <span className="text-lg font-bold tracking-[0.2em] text-blue-300">AM</span>
            </div>
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-white/60">Digital AM</span>
          </motion.div>

          {/* Bar */}
          <div className="w-48 h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #38bdf8, #6366f1)",
                width: `${progress}%`,
                transition: "width 0.18s ease-out",
              }}
            />
          </div>

          {/* % */}
          <span className="text-xs font-semibold tabular-nums tracking-[0.3em] text-white/30">
            {progress}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
