"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkCard from "./WorkCard";
import { Project } from "../../../types/sanity";

type WorksGridProps = {
  projects: (Project & { 
    index: number;
    thumbnailUrl: string;
    categories: string[];
    roles?: string[];
    year?: string;
  })[];
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile App" },
  { id: "dashboard", label: "Dashboard" },
  { id: "platform", label: "Platform" },
  { id: "redesign", label: "Redesign" },
];

export default function WorksGrid({ projects }: WorksGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.categories?.includes(activeFilter);
  });

  return (
    <>
      {/* FILTER BAR */}
      <div className="flex items-center gap-0 border-b border-[var(--rule)] overflow-x-auto px-[24px] xl:px-[52px] custom-scrollbar">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`font-mono text-[9px] tracking-[0.16em] uppercase whitespace-nowrap px-[24px] py-[20px] bg-transparent border-none cursor-none transition-colors duration-200 border-b-2 ${
              activeFilter === filter.id 
                ? "text-[var(--acc)] border-[var(--acc)]" 
                : "text-[var(--mid)] border-transparent hover:text-[var(--w)]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* WORKS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-[var(--rule)] min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
              <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col h-full ${i === 0 && activeFilter === "all" ? "sm:col-span-2" : ""}`}
            >
              <WorkCard 
                project={project} 
                featured={i === 0 && activeFilter === "all"} 
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="col-span-1 border-r border-b sm:col-span-2 lg:col-span-3 py-[100px] text-center font-mono text-[11px] tracking-[0.1em] text-[var(--mid)] border-[var(--rule)]">
            No projects found for this category.
          </div>
        )}
      </div>
    </>
  );
}
