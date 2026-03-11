"use client";

import { motion } from "framer-motion";

type AboutData = {
  name: string;
  pullQuote: string;
  bio1: string;
  bio2: string;
  photoUrl?: string;
  skills: { _key: string; name: string; tools: string }[];
  timeline: { _key: string; year: string; role: string; company: string }[];
};

export default function AboutSection({ data }: { data: AboutData }) {
  if (!data) return null;

  return (
    <section id="about" className="grid grid-cols-1 xl:grid-cols-2 min-h-screen border-b border-[var(--rule)]">
      {/* Left Photo Area */}
      <div className="relative overflow-hidden border-b xl:border-b-0 xl:border-r border-[var(--rule)] h-[50vh] xl:h-[auto] group">
        {data.photoUrl ? (
          <img 
            src={data.photoUrl} 
            alt={data.name} 
            className="w-full h-full object-cover filter transition-transform duration-[10s] ease-out group-hover:scale-[1.04]"
            style={{ filter: "sepia(0.2) contrast(1.1) brightness(0.85)" }}
          />
        ) : (
          <div className="w-full h-full bg-[var(--dim)] flex items-center justify-center text-[var(--mid)] font-mono text-[10px] tracking-[0.2em] uppercase">
            Image Placeholder
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--k)] opacity-60 xl:opacity-100" />
        
        <div className="absolute bottom-0 left-0 right-0 p-[36px_24px] xl:p-[52px]">
          <h2 className="font-display text-[clamp(48px,5.5vw,80px)] tracking-[-0.04em] leading-[0.9] text-[var(--w)]">
            {data.name.split(' ')[0]} <em className="italic text-[var(--acc)]">{data.name.split(' ').slice(1).join(' ')}</em>
          </h2>
          <div className="font-mono italic text-[11px] tracking-[0.08em] text-[rgba(245,240,232,0.45)] mt-3">
            UI/UX Designer & Engineer
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="p-[72px_24px_80px] xl:p-[100px_64px_80px_72px] flex flex-col justify-between max-h-[100vh] xl:overflow-y-auto custom-scrollbar">
        <div>
          <motion.div 
            className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--acc)] flex items-center gap-[10px] mb-[44px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-[22px] h-px bg-[var(--acc)]" />
            About
          </motion.div>

          <motion.div 
            className="font-serif italic text-[clamp(22px,2.5vw,36px)] font-normal leading-[1.4] tracking-[-0.01em] text-[var(--w)] mb-[44px] pl-6 border-l-2 border-[var(--acc)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {data.pullQuote}
          </motion.div>

          <motion.div 
            className="font-serif text-[15px] leading-[1.9] text-[rgba(245,240,232,0.6)] mb-4 max-w-[480px] whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {data.bio1}
          </motion.div>

          <motion.div 
            className="font-serif text-[15px] leading-[1.9] text-[rgba(245,240,232,0.6)] mb-4 max-w-[480px] whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {data.bio2}
          </motion.div>
        </div>

        <div className="mt-12">
          {/* Skills */}
          <motion.div 
            className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--mid)] mb-4 mt-[44px]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Core Capabilities
          </motion.div>
          <div className="flex flex-col">
            {data.skills?.map((skill, i) => (
              <motion.div 
                key={skill._key} 
                className="group flex items-baseline justify-between py-[11px] border-b border-[var(--rule)] relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="absolute inset-0 bg-[rgba(255,85,0,0.06)] origin-left scale-x-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <div className="font-serif italic text-[13px] text-[rgba(245,240,232,0.65)] relative z-10 transition-colors duration-200 group-hover:text-[var(--acc)]">
                  {skill.name}
                </div>
                <div className="flex-1 border-b border-dotted border-[rgba(245,240,232,0.12)] mx-[10px] relative z-10 h-px self-center" />
                <div className="font-mono text-[9px] tracking-[0.08em] text-[var(--mid)] relative z-10">
                  {skill.tools}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Timeline */}
          <motion.div 
            className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--mid)] mb-4 mt-[52px]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Experience
          </motion.div>
          <div className="flex flex-col">
            {data.timeline?.map((item, i) => (
              <motion.div 
                key={item._key} 
                className="grid grid-cols-[80px_1fr] gap-4 py-[14px] border-b border-[var(--rule)] transition-[padding-left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:pl-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className="font-mono italic text-[10px] tracking-[0.06em] text-[var(--acc)] pt-0.5">
                  {item.year}
                </div>
                <div>
                  <div className="font-display text-[15px] tracking-[-0.01em] text-[var(--w)] mb-0.5">
                    {item.role}
                  </div>
                  <div className="font-serif italic text-[12px] text-[var(--mid)]">
                    {item.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
