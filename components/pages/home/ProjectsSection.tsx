"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

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

type ProjectsSectionProps = {
  projects: ProjectType[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const duo = projects.slice(0, 2);
  const fullWidth = projects.slice(2, 3); // Only show up to 3 on the home page

  return (
    <section id="work">
      <motion.div 
        className="flex items-center justify-between p-[48px_24px_36px] xl:p-[64px_52px_48px] border-b border-[var(--rule)]"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex-1">
          <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[-0.03em] leading-[0.92] text-[var(--w)]">
            Selected <em className="italic text-[var(--acc)]">Work</em>
          </h2>
        </div>
        <div className="font-mono italic text-[11px] tracking-[0.06em] text-[var(--mid)] text-right leading-[1.8] hidden md:block">
          Three featured projects.<br />
          Many more await.
        </div>
      </motion.div>

      {/* DUO GRID */}
      {duo.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 border-b border-[var(--rule)]">
          {duo.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.85, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} index={i} halfWidth />
            </motion.div>
          ))}
        </div>
      )}

      {/* FULL WIDTH */}
      {fullWidth.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {fullWidth.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i + duo.length} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
