"use client";

import { motion } from "framer-motion";

type ContactData = {
  headline: string;
  subtext: string;
  ctaButtonText: string;
};

type ContactSectionProps = {
  data: ContactData;
  email: string;
  phone: string;
  location: string;
};

export default function ContactSection({ data, email, phone, location }: ContactSectionProps) {
  if (!data) return null;

  // Extract the last word for accent
  const headlineWords = data.headline.split("\n");
  const lastLine = headlineWords.pop();
  const restOfHeadline = headlineWords.join("\n");

  return (
    <section id="contact" className="grid grid-cols-1 xl:grid-cols-2 min-h-[70vh]">
      {/* Left Red Side */}
      <div className="bg-[var(--acc)] p-[80px_24px_60px] xl:p-[100px_72px_80px_52px] flex flex-col justify-between border-b xl:border-b-0 xl:border-r border-[rgba(0,0,0,0.15)]">
        <div>
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[rgba(13,13,13,0.5)] mb-12 xl:mb-0">
            Collaboration
          </div>
          
          <motion.h2 
            className="font-display text-[clamp(52px,7vw,100px)] tracking-[-0.04em] leading-[0.88] text-[var(--k)] mt-12 mb-8 xl:mt-24 xl:mb-12 whitespace-pre-line"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {restOfHeadline}
            <br />
            <em className="italic opacity-55">{lastLine}</em>
          </motion.h2>
        </div>

        <motion.div 
          className="font-serif italic text-[15px] leading-[1.7] text-[rgba(13,13,13,0.6)] max-w-[380px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {data.subtext.split('\n')[0]} {/* Render first paragraph on the left */}
        </motion.div>
      </div>

      {/* Right Dark Side */}
      <div className="bg-[var(--k)] p-[60px_24px_80px] xl:p-[100px_80px_80px_80px] flex flex-col justify-between">
        <motion.div 
          className="font-serif italic text-[15px] leading-[1.8] text-[rgba(245,240,232,0.45)] max-w-[380px] mb-16 xl:mb-0 whitespace-pre-line"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {data.subtext.split('\n').slice(1).join('\n').trim()} {/* Render rest of subtext on the right */}
        </motion.div>

        <div>
          <div className="flex flex-col gap-0 border-t border-[var(--rule)]">
            <div className="py-[18px] border-b border-[var(--rule)] flex flex-col gap-1">
              <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-[var(--mid)]">Email</div>
              <a href={`mailto:${email}`} className="font-serif text-[16px] text-[var(--w)] no-underline transition-colors duration-200 hover:text-[var(--acc)]">
                {email}
              </a>
            </div>
            
            <div className="py-[18px] border-b border-[var(--rule)] flex flex-col gap-1">
              <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-[var(--mid)]">Phone</div>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-serif text-[16px] text-[var(--w)] no-underline transition-colors duration-200 hover:text-[var(--acc)]">
                {phone}
              </a>
            </div>

            <div className="py-[18px] border-b border-[var(--rule)] flex flex-col gap-1">
              <div className="font-mono text-[8px] tracking-[0.18em] uppercase text-[var(--mid)]">Location</div>
              <div className="font-serif text-[16px] text-[var(--w)]">
                {location}
              </div>
            </div>
          </div>

          <a 
            href={`mailto:${email}`} 
            className="group inline-flex items-center gap-[12px] bg-[var(--acc)] text-[var(--k)] p-[18px_40px] font-display text-[14px] tracking-[0.04em] no-underline rounded-[2px] self-start mt-[40px] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] relative overflow-hidden hover:gap-[20px] hover:shadow-[0_16px_48px_rgba(255,85,0,0.3)]"
          >
            <div className="absolute inset-0 bg-[#CC4400] origin-left scale-x-0 transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] z-0 group-hover:scale-x-100" />
            <span className="relative z-10">{data.ctaButtonText}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
