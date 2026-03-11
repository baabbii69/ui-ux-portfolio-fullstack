"use client";

import { motion } from "framer-motion";

type Stat = {
  _key: string;
  label: string;
  value: string;
};

type HeroProps = {
  year: string;
  tagline: string;
  stats: Stat[];
  email: string;
  phone: string;
};

export default function Hero({ year, tagline, stats, email, phone }: HeroProps) {
  // Add animation variants to match the original keyframes from CSS
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.35,
      },
    },
  };

  const wordUp = {
    hidden: { y: "105%" },
    show: {
      y: "0%",
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeUpFadeIn = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="h-screen flex flex-col justify-end px-6 xl:px-[52px] pb-[52px] xl:pb-[60px] relative overflow-hidden border-b border-[var(--rule)]">
      {/* Film sprocket holes */}
      <div className="absolute top-0 bottom-0 left-0 w-8 hidden sm:flex flex-col justify-around py-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`spl-${i}`}
            className="w-4 h-[22px] rounded-[3px] border border-[rgba(245,240,232,0.1)] mx-auto opacity-0"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          />
        ))}
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-8 hidden sm:flex flex-col justify-around py-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`spr-${i}`}
            className="w-4 h-[22px] rounded-[3px] border border-[rgba(245,240,232,0.1)] mx-auto opacity-0"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          />
        ))}
      </div>

      <div
        className="absolute right-[52px] top-1/2 -translate-y-1/2 font-display text-[clamp(120px,18vw,260px)] tracking-[-0.05em] leading-none text-transparent pointer-events-none select-none hidden sm:block"
        style={{ WebkitTextStroke: "1px rgba(245,240,232,0.05)" }}
        aria-hidden="true"
      >
        {year}
      </div>

      <motion.div
        className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--acc)] flex items-center gap-3 mb-7"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="w-8 h-px bg-[var(--acc)]" />
        {tagline}
      </motion.div>

      <motion.h1
        className="font-display text-[clamp(72px,12.5vw,192px)] tracking-[-0.03em] leading-[0.88] overflow-hidden"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <span className="block overflow-hidden">
          <motion.span className="inline-block" variants={wordUp}>
            YOHANES
          </motion.span>
        </span>
        <span className="block overflow-hidden text-[var(--acc)]">
          <motion.span className="inline-block" variants={wordUp}>
            ALEMU
          </motion.span>
        </span>
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 mt-[48px] pt-[32px] border-t border-[var(--rule)]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat._key}
            className={`md:pl-10 ${
              i !== 0 ? "md:border-l md:border-[var(--rule)] pt-5 md:pt-0 border-t border-[var(--rule)] md:border-t-0" : ""
            }`}
          >
            <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-[var(--mid)] mb-2">
              {stat.label}
            </div>
            <div className="font-serif italic text-[clamp(14px,1.4vw,17px)] text-[var(--w)] leading-[1.55] whitespace-pre-line">
              {/* Parse newline characters into <br> if needed, but whitespace-pre-line handles \n */}
              {stat.value}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
