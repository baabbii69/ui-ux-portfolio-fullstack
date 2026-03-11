"use client";

import { motion } from "framer-motion";

type ProcessData = {
  title: string;
  steps: {
    _key: string;
    number: string;
    title: string;
    description: string;
    tools: string[];
  }[];
};

export default function ProcessSection({ data }: { data: ProcessData }) {
  if (!data) return null;

  // Split title to format the last word as italic accent
  const titleWords = data.title.split(" ");
  const lastWord = titleWords.pop();
  const restOfTitle = titleWords.join(" ");

  return (
    <section id="process" className="p-[72px_24px] xl:p-[100px_52px] border-b border-[var(--rule)] bg-[var(--dim)]">
      <motion.div 
        className="flex items-end justify-between mb-[72px]"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="font-display text-[clamp(44px,5.5vw,76px)] tracking-[-0.04em] leading-[0.92] text-[var(--w)] max-w-[600px] whitespace-pre-line">
          {restOfTitle} <em className="italic text-[var(--acc)]">{lastWord}</em>
        </h2>
        <div className="font-serif italic text-[13px] text-[var(--mid)] max-w-[200px] text-right leading-[1.7] hidden md:block">
          A reliable, battle-tested design approach.
        </div>
      </motion.div>

      <div className="border-t border-[var(--rule)]">
        {data.steps?.map((step, i) => (
          <motion.div
            key={step._key}
            className="group grid grid-cols-1 md:grid-cols-[60px_1fr] xl:grid-cols-[80px_200px_1fr_160px] items-center gap-0 py-[28px] border-b border-[var(--rule)] transition-colors duration-250 rounded-[4px] px-1 hover:bg-[rgba(245,240,232,0.03)]"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hidden md:block font-display text-[clamp(40px,4vw,60px)] tracking-[-0.05em] leading-none text-[rgba(245,240,232,0.06)] transition-colors duration-300 group-hover:text-[rgba(255,85,0,0.2)]">
              {step.number}
            </div>
            
            <div className="font-display text-[20px] tracking-[-0.02em] text-[var(--w)] mb-2 md:mb-0">
              {step.title}
            </div>
            
            <div className="font-serif italic text-[13px] leading-[1.72] text-[var(--mid)] md:px-0 md:pt-[6px] xl:p-[0_48px] xl:pt-0">
              {step.description}
            </div>
            
            <div className="hidden xl:block text-right font-mono text-[9px] tracking-[0.1em] uppercase text-[rgba(245,240,232,0.2)] transition-colors duration-300 group-hover:text-[var(--acc)]">
              {step.tools?.[0] || ""}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
