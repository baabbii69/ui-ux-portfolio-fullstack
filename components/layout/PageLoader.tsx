"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "wipingIn" | "wipingOut" | "done">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // 1. Loading phase
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 9 + 2, 92));
    }, 55);

    const finishTimeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // 2. Start Wiping In (panels cover screen behind loader)
      setTimeout(() => setPhase("wipingIn"), 600);
      
      // 3. Start Wiping Out (loader disappears, panels retract)
      setTimeout(() => setPhase("wipingOut"), 1150);
      
      // 4. Done (unmount loader)
      setTimeout(() => {
        setPhase("done");
        document.body.style.overflow = "auto";
      }, 1700);

    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimeout);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/* The Film Reel (z-[9950]) */}
      <AnimatePresence>
        {(phase === "loading" || phase === "wipingIn") && (
          <motion.div
            key="film-reel"
            className="fixed inset-0 z-[9950] flex flex-col items-center justify-center bg-(--k) pointer-events-auto"
            exit={{ opacity: 0, transition: { duration: 0 } }} 
            // the opacity 0 duration 0 means it instantly vanishes, exactly like `loader.style.display = 'none'` in original.
          >
            <div className="flex items-stretch mb-12">
              <div className="w-7 bg-[rgba(245,240,232,0.04)] flex flex-col justify-around py-2.5 border border-[rgba(245,240,232,0.06)]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-[18px] rounded-sm bg-(--k) border border-[rgba(245,240,232,0.1)] mx-auto" />
                ))}
              </div>
              <div className="w-[220px] h-[140px] border-y border-[rgba(245,240,232,0.08)] flex flex-col items-center justify-center gap-4 p-5 relative overflow-hidden">
                <motion.div 
                  className="font-display text-[28px] tracking-[-0.02em] text-(--w) leading-none text-center"
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  YOHANES <em className="text-(--acc) not-italic">ALEMU</em>
                </motion.div>
                <motion.div 
                  className="font-mono text-[9px] tracking-[0.2em] uppercase text-(--mid)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  UI · UX · Design
                </motion.div>
              </div>
              <div className="w-7 bg-[rgba(245,240,232,0.04)] flex flex-col justify-around py-2.5 border border-[rgba(245,240,232,0.06)]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-[18px] rounded-sm bg-(--k) border border-[rgba(245,240,232,0.1)] mx-auto" />
                ))}
              </div>
            </div>

            <div className="w-[220px] h-px bg-[rgba(245,240,232,0.08)] overflow-hidden">
              <motion.div 
                className="h-full bg-linear-to-r from-(--acc) to-(--w)"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            
            <motion.div 
              className="font-mono text-[10px] tracking-widest text-(--mid) min-h-[14px] mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The 3-panel Wipe directly handled in PageLoader for initial load (z-[9940]) */}
      <div className="fixed inset-0 z-[9940] grid grid-rows-3 pointer-events-none">
        {[0, 1, 2].map((i) => {
          let scaleX = 0;
          let originX = "left";
          
          if (phase === "wipingIn") {
            scaleX = 1;
            originX = "left";
          } else if (phase === "wipingOut") {
            scaleX = 0;
            originX = "right";
          }

          return (
            <motion.div
              key={`loader-wipe-${i}`}
              className="bg-(--acc)"
              initial={false}
              animate={{ scaleX }}
              style={{ originX }}
              transition={{ 
                duration: 0.45, 
                ease: [0.77, 0, 0.18, 1],
                delay: phase === "wipingOut" ? ((2 - i) * 0.07) : (i * 0.055) 
              }}
            />
          );
        })}
      </div>
    </>
  );
}
