"use client";

import { motion } from "framer-motion";
import { Project } from "../../../types/sanity";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

const SectionLabel = ({ children, accent }: { children: string; accent: string }) => (
  <div
    className="font-mono text-[9px] tracking-[0.2em] uppercase flex items-center gap-3 mb-9"
    style={{ color: accent }}
  >
    <span style={{ width: 20, height: 1, background: accent, display: "inline-block", flexShrink: 0 }} />
    {children}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function CaseStudyTemplate({ project }: { project: Project }) {
  const accent = project.accentColor || "#FF5500";

  // Filter only gallery images that have valid URLs
  const gallery = (project.gallery || []).filter((img) => img?.asset?.url);

  // Filter only screens that have valid URLs
  const screens = (project.screens || []).filter((s) => s?.asset?.url);

  return (
    <article style={{ "--ca": accent, "--kk": "#0D0D0D" } as React.CSSProperties}
      className="min-h-screen bg-[var(--k)] text-[var(--w)] selection:bg-[var(--acc)] selection:text-white"
    >

      {/* ── HERO ── */}
      <section className="relative min-h-svh flex flex-col justify-end px-[5%] lg:px-[52px] pt-[140px] pb-[72px] border-b border-[var(--rule)] overflow-hidden">
        <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.97)] via-[rgba(13,13,13,0.45)] to-[rgba(13,13,13,0.5)]" />

        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[9px] tracking-[0.2em] uppercase flex items-center gap-3 mb-7"
            style={{ color: accent }}
          >
            <span style={{ width: 28, height: 1, background: accent, display: "inline-block" }} />
            {project.shortDescription || project.role || "Case Study"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(40px,7vw,116px)] tracking-[-0.04em] leading-[0.9] text-[var(--w)] mb-9"
          >
            {project.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 border border-[var(--rule)] bg-[rgba(13,13,13,0.7)] backdrop-blur-md rounded-[4px] overflow-hidden mt-12 max-w-[800px]"
          >
            {[
              { label: "Client", val: project.client },
              { label: "Role", val: project.role },
              { label: "Timeline", val: project.timeline },
              { label: "Platform", val: project.platform },
            ].map((m, i) => (
              <div key={i} className="p-5 md:p-6 border-r border-[var(--rule)] last:border-r-0 border-b md:border-b-0">
                <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-[var(--mid)] mb-[5px]">{m.label}</div>
                <div className="font-display text-[14px] tracking-[-0.01em] text-[var(--w)]">{m.val}</div>
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

      {/* ── OVERVIEW ── */}
      {project.overview && (
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--rule)]">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="px-[5%] lg:pl-[52px] lg:pr-[72px] py-[80px] lg:py-[100px] border-b lg:border-b-0 lg:border-r border-[var(--rule)]"
          >
            <SectionLabel accent={accent}>Overview</SectionLabel>
            <h2 className="font-display text-[clamp(28px,4vw,52px)] tracking-[-0.04em] leading-[1] text-[var(--w)] mb-8">
              {project.overview.headline}
            </h2>
            {project.overview.body1 && (
              <p className="text-[15px] leading-[1.9] text-[rgba(245,240,232,0.6)] mb-4 max-w-[500px]">{project.overview.body1}</p>
            )}
            {project.overview.body2 && (
              <p className="text-[15px] leading-[1.9] text-[rgba(245,240,232,0.6)] max-w-[500px]">{project.overview.body2}</p>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="px-[5%] lg:pl-[72px] lg:pr-[52px] py-[60px] lg:py-[100px]"
          >
            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-2 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-[4px] overflow-hidden">
                {project.stats.map((stat, i) => (
                  <div key={i} className="bg-[var(--k)] p-6 lg:p-8">
                    <div
                      className="font-display text-[clamp(36px,4vw,56px)] tracking-[-0.05em] leading-none mb-[6px]"
                      style={{ color: accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--mid)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* ── PROBLEM / RESEARCH ── */}
      {project.problemSection && (
        <section className="bg-[var(--dim)] px-[5%] lg:px-[52px] py-[80px] lg:py-[100px] border-b border-[var(--rule)]">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-[80px] items-start"
          >
            <h2 className="font-display text-[clamp(40px,5vw,72px)] tracking-[-0.04em] leading-[0.92] text-[var(--w)]">
              {project.problemSection.title}
              <span style={{ color: accent }}>.</span>
            </h2>
            <div>
              {project.problemSection.insights?.map((insight, i) => (
                <div
                  key={i}
                  className="py-6 border-b border-[var(--rule)] grid grid-cols-[48px_1fr] gap-5 items-start transition-all duration-300 hover:pl-2"
                >
                  <div className="font-display text-[28px] tracking-[-0.04em] leading-none text-[rgba(245,240,232,0.07)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-display text-[16px] tracking-[-0.01em] text-[var(--w)] mb-[5px]">{insight.title}</div>
                    <div className="font-serif italic text-[13px] leading-[1.75] text-[var(--mid)]">{insight.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── SCREENS (optional, only if at least 3 uploaded) ── */}
      {screens.length >= 3 && (
        <section className="border-b border-[var(--rule)]">
          {/* Full bleed first screen */}
          <div className="relative h-[55vh] lg:h-[65vh] overflow-hidden">
            <img
              src={screens[0].asset!.url!}
              alt="Project visual"
              className="w-full h-full object-cover brightness-[0.8]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,13,0.7)] to-transparent" />
            <div className="absolute bottom-8 left-[5%] right-[5%] lg:left-[52px] lg:right-[52px] flex justify-between items-end">
              <span className="font-mono text-[9px] tracking-[0.14em] uppercase text-[rgba(245,240,232,0.45)]">
                {project.client} — {project.timeline}
              </span>
              <span
                className="font-display text-[clamp(36px,7vw,110px)] tracking-[-0.05em] leading-none text-transparent select-none"
                style={{ WebkitTextStroke: "1px rgba(245,240,232,0.07)" }}
              >
                {project.platform}
              </span>
            </div>
          </div>

          {/* Solution */}
          {project.solutionSection && (
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--rule)]">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                className="p-[60px_5%] md:p-[80px_60px] border-b md:border-b-0 md:border-r border-[var(--rule)]"
              >
                <SectionLabel accent={accent}>Solution</SectionLabel>
                <h3 className="font-display text-[clamp(24px,3vw,40px)] tracking-[-0.03em] leading-[1] text-[var(--w)] mb-7">
                  {project.solutionSection.title}
                  <span style={{ color: accent }}>.</span>
                </h3>
                <p className="text-[15px] leading-[1.9] text-[rgba(245,240,232,0.6)]">{project.solutionSection.body}</p>
              </motion.div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                className="p-[60px_5%] md:p-[80px_60px]"
              >
                <SectionLabel accent={accent}>What Was Built</SectionLabel>
                {project.solutionSection.items?.map((item, i) => (
                  <div key={i} className="py-5 border-b border-[var(--rule)] grid grid-cols-[36px_1fr] items-start group transition-all duration-300 hover:pl-1">
                    <div className="font-display text-[18px] text-[rgba(245,240,232,0.08)]">→</div>
                    <div className="font-serif italic text-[14px] leading-[1.72] text-[var(--mid)]">{item}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Screen mosaic */}
          {screens.length >= 3 && (
            <div className="px-[5%] lg:px-[52px] py-[60px] lg:py-[80px] border-b border-[var(--rule)]">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
                <SectionLabel accent={accent}>Screens & Visual Design</SectionLabel>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-3 mt-10">
                {screens.slice(1, 6).map((screen, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                    className={`rounded-[5px] overflow-hidden group ${i === 0 ? "md:row-span-2" : ""}`}
                  >
                    <img
                      src={screen.asset!.url!}
                      alt={screen.alt || `Screen ${i + 1}`}
                      className="w-full h-full object-cover min-h-[200px] brightness-[0.85] transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── DESIGN GALLERY ── always shown when images are present ── */}
      {gallery.length > 0 && (
        <section className="px-[5%] lg:px-[52px] py-[80px] lg:py-[100px] border-b border-[var(--rule)] flex flex-col gap-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
            <SectionLabel accent={accent}>Design Gallery</SectionLabel>
          </motion.div>
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              className="w-full overflow-hidden bg-[var(--dim)] border border-[var(--rule)] rounded-[4px]"
            >
              <img
                src={img.asset!.url!}
                alt={img.alt || `${project.title} — design ${i + 1}`}
                className="w-full h-auto block"
                loading="lazy"
              />
            </motion.div>
          ))}
        </section>
      )}

      {/* ── OUTCOMES ── */}
      {project.outcomes && project.outcomes.length > 0 && (
        <section className="px-[5%] lg:px-[52px] py-[80px] lg:py-[100px] border-b border-[var(--rule)]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
            <SectionLabel accent={accent}>Outcomes</SectionLabel>
            <h2 className="font-display text-[clamp(32px,4vw,56px)] tracking-[-0.04em] leading-[1] text-[var(--w)] mb-12">
              The results<span style={{ color: accent }}>.</span>
            </h2>
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)] border border-[var(--rule)] rounded-[4px] overflow-hidden"
          >
            {project.outcomes.map((o, i) => (
              <div key={i} className="bg-[var(--k)] p-[40px_32px] transition-colors duration-300 hover:bg-[var(--dim)]">
                <div
                  className="font-display text-[clamp(48px,5vw,72px)] tracking-[-0.05em] leading-none mb-3"
                  style={{ color: accent }}
                >
                  {o.value}
                </div>
                <div className="font-display text-[16px] tracking-[-0.01em] text-[var(--w)] mb-2">{o.title}</div>
                {o.description && (
                  <div className="font-serif italic text-[13px] leading-[1.72] text-[var(--mid)]">{o.description}</div>
                )}
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── LEARNINGS ── */}
      {project.learnings && project.learnings.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[var(--rule)]">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="px-[5%] lg:pl-[52px] lg:pr-[72px] py-[80px] lg:py-[100px] border-b lg:border-b-0 lg:border-r border-[var(--rule)]"
          >
            <SectionLabel accent={accent}>Reflections</SectionLabel>
            {project.pullQuote && (
              <blockquote
                className="font-serif italic text-[clamp(20px,2.4vw,32px)] leading-[1.45] tracking-[-0.01em] text-[var(--w)] pl-6"
                style={{ borderLeft: `2px solid ${accent}` }}
              >
                {project.pullQuote}
              </blockquote>
            )}
          </motion.div>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="px-[5%] lg:pl-[72px] lg:pr-[52px] py-[60px] lg:py-[100px]"
          >
            <SectionLabel accent={accent}>Key Learnings</SectionLabel>
            {project.learnings.map((l, i) => (
              <div
                key={l._key || i}
                className="py-5 border-b border-[var(--rule)] grid grid-cols-[44px_1fr] gap-4 transition-all duration-300 hover:pl-[6px]"
              >
                <div className="font-display text-[22px] tracking-[-0.04em] text-[rgba(245,240,232,0.07)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-serif italic text-[14px] leading-[1.72] text-[rgba(245,240,232,0.55)]">
                  {l.title && <strong className="text-[var(--w)] not-italic block mb-1">{l.title}</strong>}
                  {l.body}
                </div>
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── NEXT PROJECT ── */}
      {project.nextProject && (
        <Link
          href={`/work/${project.nextProject.slug}`}
          className="group block relative overflow-hidden px-[5%] lg:px-[52px] py-[44px] lg:py-[60px] border-b border-[var(--rule)]"
        >
          <div
            className="absolute inset-0 scale-x-0 origin-left transition-transform duration-[600ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:scale-x-100"
            style={{ background: accent }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--mid)] mb-2 transition-colors duration-300 group-hover:text-[var(--k)]">
                Next Project
              </div>
              <div className="font-display text-[clamp(22px,3vw,44px)] tracking-[-0.03em] text-[var(--w)] transition-colors duration-300 group-hover:text-[var(--k)]">
                {project.nextProject.title}
              </div>
            </div>
            <div className="w-[60px] h-[60px] rounded-full border border-[var(--rule)] grid place-items-center transition-all duration-500 group-hover:border-[var(--k)] group-hover:bg-[var(--k)] group-hover:rotate-45">
              <ArrowUpRight className="w-5 h-5 text-white transition-colors duration-300 group-hover:text-[var(--w)]" style={{ color: "var(--w)" }} />
            </div>
          </div>
        </Link>
      )}

      <div className="h-[100px]" />
    </article>
  );
}
