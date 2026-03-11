"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type ProjectType = {
  _id: string;
  title: string;
  slug: string;
  client: string;
  year: string;
  roles: string[];
  thumbnailUrl: string;
  accentColor: string;
};

type ProjectCardProps = {
  project: ProjectType;
  index: number;
  halfWidth?: boolean;
};

export default function ProjectCard({ project, index, halfWidth = false }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <Link 
      href={`/work/${project.slug}`} 
      scroll={false}
      className={`relative overflow-hidden block text-inherit group no-underline border-b border-[var(--rule)] ${
        halfWidth ? "h-[55vh] md:h-[65vh] md:first:border-r md:first:border-[var(--rule)]" : "h-[92vh]"
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Photograph */}
      <div className="absolute inset-0 transition-all duration-700 ease-out group-hover:scale-[1.04]">
        <img 
          src={project.thumbnailUrl} 
          alt={project.title} 
          className="w-full h-full object-cover filter grayscale-[30%] brightness-[0.8]"
        />
      </div>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 transition-colors duration-500 bg-[linear-gradient(135deg,rgba(13,13,13,0.88)_0%,rgba(13,13,13,0.55)_50%,rgba(13,13,13,0.82)_100%)] group-hover:bg-[rgba(13,13,13,0.92)]" 
      />

      {/* Burn Reveal */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-multiply transition-[background] duration-300"
        style={{
          background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(13,13,13,1) 100%)`
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-[36px] md:p-[52px_64px]">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="font-mono text-[11px] tracking-[0.12em] text-[rgba(245,240,232,0.35)]">
            0{index + 1}
          </div>
          
          <div className="flex gap-2 flex-wrap justify-end">
            {project.roles?.map((role, i) => (
              <div 
                key={i} 
                className="px-3 py-[5px] border border-[rgba(245,240,232,0.15)] rounded-[2px] font-mono text-[8px] tracking-[0.12em] uppercase text-[rgba(245,240,232,0.45)] transition-all duration-300 group-hover:border-[rgba(255,85,0,0.4)] group-hover:text-[var(--acc)] group-hover:bg-[rgba(255,85,0,0.06)]"
              >
                {role}
              </div>
            ))}
          </div>
        </div>

        {/* Client Tag */}
        <div className="absolute top-[52px] left-[64px] font-mono text-[9px] tracking-[0.12em] uppercase bg-[rgba(13,13,13,0.75)] backdrop-blur-md border border-[rgba(245,240,232,0.1)] px-[14px] py-[6px] rounded-[2px] text-[rgba(245,240,232,0.45)] -translate-y-1 opacity-0 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0 hidden md:block">
          {project.client}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-[40px]">
          <div>
            <div className="font-display text-[clamp(80px,10vw,140px)] tracking-[-0.05em] leading-none text-transparent select-none transition-all duration-400 mb-0 group-hover:text-[rgba(255,85,0,0.12)] group-hover:[-webkit-text-stroke:1px_rgba(255,85,0,0.2)]" style={{ WebkitTextStroke: "1px rgba(245,240,232,0.08)" }}>
              0{index + 1}
            </div>
            <h3 className="font-display text-[clamp(32px,4.5vw,68px)] tracking-[-0.03em] leading-none text-[var(--w)] transition-colors duration-300 group-hover:text-white">
              {project.title}
            </h3>
          </div>

          <div className="flex flex-col md:items-end gap-6 shrink-0 max-w-full md:max-w-[360px]">
            <div className="font-serif italic text-[clamp(13px,1.2vw,15px)] px-2 border-l-2 md:border-l-0 md:px-0 border-[var(--acc)] leading-[1.8] text-[rgba(245,240,232,0.5)] text-left md:text-right translate-y-2 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
              {project.title} — A {project.year} case study for {project.client}.
            </div>
            
            <div className="flex items-center gap-[10px] font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--acc)] translate-y-2 opacity-0 transition-all duration-400 delay-200 group-hover:opacity-100 group-hover:translate-y-0 hover:!gap-4">
              View Case Study
              <div className="w-8 h-8 rounded-full border border-[rgba(255,85,0,0.4)] grid place-items-center transition-all duration-300 group-hover:bg-[var(--acc)] group-hover:border-[var(--acc)] group-hover:rotate-45">
                <svg width="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-[var(--acc)] group-hover:stroke-[var(--k)] transition-colors duration-300">
                  <path d="M1 13L13 1M13 1H4M13 1V10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
