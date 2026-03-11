"use client";

import Link from "next/link";
import { Project } from "../../../types/sanity";

type WorkCardProps = {
  project: Project & { 
    index: number;
    thumbnailUrl: string;
    categories: string[];
    roles?: string[];
    year?: string;
  };
  featured?: boolean;
};

export default function WorkCard({ project, featured = false }: WorkCardProps) {
  const num = (project.index + 1).toString().padStart(2, '0');

  // Find primary category tag for the badge, or fallback
  const primaryCategory = project.roles?.[0] || 'Project';
  
  // Format categories as a space-separated string for data-cats (used by filter)
  const categoryString = project.categories?.join(" ").toLowerCase() || "";

  return (
    <Link 
      href={`/work/${project.slug}`}
      scroll={false}
      className={`group relative border-r border-b border-[var(--rule)] overflow-hidden text-inherit flex flex-col bg-[var(--k)] transition-colors duration-300 hover:bg-[var(--dim)] h-full w-full flex-1`}
      data-cats={categoryString}
    >
      {/* Top Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 group-hover:scale-x-100"
        style={{ background: project.accentColor || "linear-gradient(90deg, #FF5500, #FF8C00)" }}
      />

      {/* Image Area */}
      <div className={`relative overflow-hidden w-full ${featured ? "aspect-[4/3] sm:aspect-[16/7]" : "aspect-[4/3]"}`}>
        <img 
          src={project.thumbnailUrl} 
          alt={project.title} 
          className="w-full h-full object-cover block filter grayscale-[25%] brightness-[0.8] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0 group-hover:brightness-[0.95]"
        />
        
        {/* Number Badge */}
        <div className="absolute top-4 left-4 font-display text-[11px] tracking-[0.08em] bg-[rgba(13,13,13,0.7)] backdrop-blur-[8px] border border-[rgba(245,240,232,0.1)] px-[10px] py-[4px] rounded-[1px] text-[rgba(245,240,232,0.5)]">
          {num} {featured && "· Featured"}
        </div>

        {/* Type Badge */}
        <div className="absolute bottom-3 right-3 font-mono text-[8px] tracking-[0.1em] uppercase bg-[rgba(13,13,13,0.8)] backdrop-blur-[8px] border border-[rgba(245,240,232,0.1)] px-[10px] py-[4px] rounded-[1px] text-[rgba(245,240,232,0.55)] opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          {primaryCategory}
        </div>
      </div>

      {/* Body Area */}
      <div className={`p-[28px_28px_24px] flex-1 flex flex-col justify-between ${featured ? "sm:p-[36px_36px_28px]" : ""}`}>
        <div>
          {/* Tags */}
          <div className="flex gap-[6px] flex-wrap mb-[14px]">
          {project.roles?.map((role, i) => (
            <span 
              key={i} 
              className="font-mono text-[8px] tracking-[0.1em] uppercase border border-[var(--rule)] px-[8px] py-[3px] rounded-[1px] text-[var(--mid)] transition-colors duration-250 group-hover:border-[rgba(255,85,0,0.3)] group-hover:text-[var(--acc)]"
            >
              {role}
            </span>
          ))}
          </div>

          <h3 className={`font-display tracking-[-0.02em] leading-[1.1] text-[var(--w)] mb-[10px] transition-colors duration-200 group-hover:text-white ${
            featured ? "text-[clamp(22px,2.4vw,32px)]" : "text-[clamp(17px,1.8vw,22px)]"
          }`}>
            {project.title}
          </h3>

          <p className="font-serif italic text-[13px] leading-[1.72] text-[var(--mid)] mb-[20px] line-clamp-3">
            {project.client} case study focusing on the complete design lifecycle. 
          </p>
        </div>

        <div className="flex items-center justify-between pt-[16px] border-t border-[var(--rule)]">
          <span className="font-mono text-[9px] tracking-[0.08em] uppercase text-[var(--mid)]">
            {project.client} · {project.year}
          </span>
          
          <div className="w-[30px] h-[30px] rounded-full border border-[var(--rule)] grid place-items-center transition-all duration-[350ms] group-hover:bg-[var(--acc)] group-hover:border-[var(--acc)] group-hover:rotate-45">
            <svg viewBox="0 0 12 12" fill="none" className="stroke-[var(--mid)] w-[11px] transition-colors duration-200 group-hover:stroke-white">
              <path d="M1 6h10M6 1l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
