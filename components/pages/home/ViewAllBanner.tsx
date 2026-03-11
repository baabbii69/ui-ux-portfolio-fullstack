"use client";

import Link from "next/link";

export default function ViewAllBanner() {
  return (
    <Link 
      href="/work"
      scroll={false}
      className="group flex flex-col xl:flex-row xl:items-center justify-between p-[36px_24px] xl:p-[36px_52px] border-b border-[var(--rule)] bg-[var(--k)] relative overflow-hidden transition-colors duration-300 no-underline text-inherit gap-5 xl:gap-0"
    >
      {/* Background Hover Expand */}
      <div className="absolute inset-0 bg-[var(--acc)] origin-left scale-x-0 transition-transform duration-550 ease-[cubic-bezier(0.77,0,0.18,1)] z-0 group-hover:scale-x-100" />
      
      <div className="relative z-10 flex items-center gap-6">
        <div className="font-display text-[clamp(52px,6vw,80px)] tracking-[-0.05em] leading-none text-[rgba(245,240,232,0.08)] transition-colors duration-300 group-hover:text-[rgba(13,13,13,0.15)] group-hover:[-webkit-text-stroke:1px_rgba(13,13,13,0.25)]" style={{ WebkitTextStroke: "1px rgba(245,240,232,0.15)" }}>
          12
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--mid)] transition-colors duration-300 group-hover:text-[var(--k)]">Archive</span>
          <span className="font-display text-[clamp(18px,2.2vw,28px)] tracking-[-0.02em] text-[var(--w)] transition-colors duration-300 group-hover:text-[var(--k)]">View All Works</span>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center gap-5 w-full xl:w-auto">
        <div className="font-serif italic text-[12px] text-[var(--mid)] tracking-[0.02em] transition-colors duration-300 text-left xl:text-right max-w-[300px] group-hover:text-[var(--dim)]">
          Complete archive of case studies, experiments, and unused concepts.
        </div>
        <div className="w-[52px] h-[52px] rounded-full border border-[rgba(245,240,232,0.15)] flex justify-center items-center shrink-0 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[var(--k)] group-hover:border-[var(--k)] group-hover:rotate-45">
          <svg width="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[var(--w)] transition-colors duration-300 group-hover:stroke-[var(--acc)]">
            <path d="M1 13L13 1M13 1H4M13 1V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
