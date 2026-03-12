"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isInitialRender = useRef(true);

  useEffect(() => {
    isInitialRender.current = false;
  }, []);

  // Force scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const wipeVariants = {
    initial: { scaleX: 1, originX: 0 },
    animate: { 
      scaleX: 0, 
      originX: 1,
      transition: { duration: 0.6, ease: [0.77, 0, 0.18, 1] as const } 
    },
    exit: { 
      scaleX: 1, 
      originX: 0,
      transition: { duration: 0.5, ease: [0.77, 0, 0.18, 1] as const }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen">
        {children}

        {/* The 3-panel wipe that triggers when path changes */}
        <motion.div 
          className="fixed inset-0 z-[9940] grid grid-rows-3 pointer-events-none"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`wipe-${i}`}
              className="bg-(--acc) origin-left"
              variants={wipeVariants}
              initial={isInitialRender.current ? false : "initial"}
              animate="animate"
              exit="exit"
              transition={{ delay: i * 0.08 }} // stagger
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
