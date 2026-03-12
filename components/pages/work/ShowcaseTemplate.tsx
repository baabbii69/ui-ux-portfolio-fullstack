"use client";

import { motion } from "framer-motion";
import { Project } from "../../../types/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function ShowcaseTemplate({ project }: { project: Project }) {
  const accent = project.accentColor || "#FF5500";

  return (
    <article
      className="min-h-screen bg-[var(--k)] text-[var(--w)] selection:bg-[var(--acc)] selection:text-white pb-[100px]"
      style={{ "--ca": accent } as React.CSSProperties}
    >
      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col justify-end px-[5%] lg:px-[52px] pt-[140px] pb-[72px] border-b border-[var(--rule)] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          {project.heroImage?.asset?.url ? (
            <img
              src={project.heroImage.asset.url}
              alt={project.heroImage.alt || project.title}
              className="w-full h-full object-cover brightness-[0.4]"
            />
          ) : (
            <div className="w-full h-full bg-[var(--dim)]" />
          )}
        </div>
        {/* Gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(13,13,13,0.97)] via-[rgba(13,13,13,0.4)] to-[rgba(13,13,13,0.55)]" />

        <div className="relative z-10 max-w-5xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--ca)] flex items-center gap-3 mb-7 before:content-[''] before:w-[28px] before:h-px before:bg-[var(--ca)]"
          >
            {project.shortDescription || project.role || "Showcase"}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(40px,7vw,120px)] tracking-[-0.04em] leading-[0.9] text-[var(--w)] mb-9"
          >
            {project.title}
          </motion.h1>

          {/* Metadata strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 border border-[var(--rule)] bg-[rgba(13,13,13,0.6)] backdrop-blur-md rounded-[4px] overflow-hidden mt-12 max-w-[800px]"
          >
            {[
              { label: "Client", val: project.client },
              { label: "Role", val: project.role },
              { label: "Timeline", val: project.timeline },
              { label: "Platform", val: project.platform },
            ].map((meta, i) => (
              <div key={i} className="p-5 md:p-6 border-r border-[var(--rule)] last:border-r-0 border-b md:border-b-0">
                <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-[var(--mid)] mb-[6px]">{meta.label}</div>
                <div className="font-display text-[14px] tracking-[-0.01em] text-[var(--w)]">{meta.val}</div>
              </div>
            ))}
          </motion.div>

          {project.figmaUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 bg-[var(--dim)] border border-[var(--rule)] text-[var(--w)] px-6 py-4 font-mono text-[10px] tracking-[0.14em] uppercase transition-all duration-300 hover:border-[var(--ca)] hover:text-[var(--ca)]"
              >
                View Figma Design
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── DESCRIPTION SECTION ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--rule)]">
        {/* Left: label + description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="px-[5%] lg:pl-[52px] lg:pr-[72px] py-[80px] lg:py-[100px] border-b lg:border-b-0 lg:border-r border-[var(--rule)]"
        >
          <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--ca)] flex items-center gap-3 mb-9 before:content-[''] before:w-[20px] before:h-px before:bg-[var(--ca)]">
            About this project
          </div>
          <div className="font-display text-[clamp(26px,3.5vw,48px)] tracking-[-0.03em] leading-[1] text-[var(--w)] mb-8">
            {project.shortDescription || project.title}
          </div>

          {project.showcaseDescription ? (
            <div className="font-serif text-[15px] leading-[1.85] text-[rgba(245,240,232,0.6)] max-w-[500px]">
              <PortableText value={project.showcaseDescription} />
            </div>
          ) : (
            <p className="font-serif italic text-[15px] leading-[1.85] text-[rgba(245,240,232,0.6)] max-w-[500px]">
              A UI/UX design project crafted by Yohanes Alemu.
            </p>
          )}
        </motion.div>

        {/* Right: tags + figma cta */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="px-[5%] lg:pl-[72px] lg:pr-[52px] py-[60px] lg:py-[100px] flex flex-col justify-between gap-12"
        >
          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--mid)] mb-6">Disciplines</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-mono text-[9px] tracking-[0.1em] uppercase border border-[var(--rule)] px-3 py-[6px] text-[var(--mid)] hover:border-[var(--ca)] hover:text-[var(--ca)] transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Figma Link */}
          {project.figmaUrl && (
            <div>
              <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--mid)] mb-6">View Design</div>
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 border border-[var(--ca)] text-[var(--ca)] px-8 py-4 font-mono text-[10px] tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[var(--ca)] hover:text-[var(--k)]"
              >
                Open in Figma
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          )}
        </motion.div>
      </section>

      {/* ── DESIGN GALLERY ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="px-[5%] lg:px-[52px] py-[80px] lg:py-[100px] border-b border-[var(--rule)] flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--ca)] flex items-center gap-3 before:content-[''] before:w-[20px] before:h-px before:bg-[var(--ca)]"
          >
            Design Gallery
          </motion.div>

          {project.gallery.map((img, index) =>
            img.asset?.url ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="w-full overflow-hidden bg-[var(--dim)] border border-[var(--rule)] rounded-[4px]"
              >
                <img
                  src={img.asset.url}
                  alt={img.alt || `${project.title} design ${index + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </motion.div>
            ) : null
          )}
        </section>
      )}

      {/* ── NEXT PROJECT ── */}
      {project.nextProject && (
        <Link
          href={`/work/${project.nextProject.slug}`}
          className="group block relative overflow-hidden px-[5%] lg:px-[52px] py-[44px] lg:py-[60px] border-b border-[var(--rule)] transition-colors duration-300"
        >
          <div className="absolute inset-0 bg-[var(--ca)] scale-x-0 origin-left transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100 z-0" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--mid)] mb-2 transition-colors duration-300 group-hover:text-[var(--k)]">
                Next Project
              </div>
              <div className="font-display text-[clamp(24px,3vw,44px)] tracking-[-0.03em] text-[var(--w)] transition-colors duration-300 group-hover:text-[var(--k)]">
                {project.nextProject.title}
              </div>
            </div>
            <div className="w-[64px] h-[64px] rounded-full border border-[var(--rule)] grid place-items-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[var(--k)] group-hover:border-[var(--k)] group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-[var(--ca)]" />
            </div>
          </div>
        </Link>
      )}
    </article>
  );
}
