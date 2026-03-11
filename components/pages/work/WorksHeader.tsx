"use client";

import { motion } from "framer-motion";

export default function WorksHeader({ count }: { count: number }) {
  const formattedCount = count.toString().padStart(2, '0');

  return (
    <div className="relative overflow-hidden p-[130px_24px_60px] xl:p-[160px_52px_80px] border-b border-[var(--rule)]">
      <motion.div 
        className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--acc)] flex items-center gap-[12px] mb-[28px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }} // Delay to sync after page transition
      >
        <div className="w-[28px] h-px bg-[var(--acc)]" />
        All Case Studies
      </motion.div>

      <motion.h1 
        className="font-display text-[clamp(60px,10vw,140px)] tracking-[-0.04em] leading-[0.88] text-[var(--w)] relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        Selected<br /><em className="italic text-[var(--acc)]">Work.</em>
      </motion.h1>

      <div 
        className="absolute right-[24px] xl:right-[52px] bottom-[20px] font-display text-[clamp(80px,14vw,200px)] tracking-[-0.05em] leading-[1] text-transparent select-none pointer-events-none z-0"
        style={{ WebkitTextStroke: "1px rgba(245,240,232,0.04)" }}
        aria-hidden="true"
      >
        {formattedCount}
      </div>

      <motion.div 
        className="flex items-center justify-between mt-[52px] relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <span className="font-mono text-[11px] tracking-[0.12em] text-[var(--mid)]">
          {formattedCount} Projects · UI/UX · Design Systems · Mobile · Enterprise
        </span>
      </motion.div>
    </div>
  );
}
