"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatementProps = {
  statement: string; // "Seven years turning complexity into clarity — one screen at a time. From university portals to ride-hailing apps."
  accentWords: string[]; // ["complexity"]
};

export default function Statement({ statement, accentWords }: StatementProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Split statement into sentences
  const sentences = statement.split(". ").map(s => s.trim()).filter(Boolean);
  
  // The first sentence gets the accent word treatment
  const firstSentence = sentences[0] ? sentences[0] + "." : "";
  // The rest get the stroke treatment
  const strokeSentences = sentences.slice(1).join(". ") + (sentences.length > 1 ? "." : "");

  // Helper to render accent words
  const renderFirstSentence = (text: string) => {
    if (!accentWords || accentWords.length === 0) return text;
    
    // Simple word replacement for accents
    let result: React.ReactNode[] = [text];
    
    accentWords.forEach(word => {
      const newResult: React.ReactNode[] = [];
      result.forEach(chunk => {
        if (typeof chunk === "string") {
          const parts = chunk.split(new RegExp(`(${word})`, "gi"));
          parts.forEach((part, i) => {
            if (part.toLowerCase() === word.toLowerCase()) {
              newResult.push(<em key={`${word}-${i}`} className="text-[var(--acc)] not-italic">{part}</em>);
            } else if (part) {
              newResult.push(part);
            }
          });
        } else {
          newResult.push(chunk);
        }
      });
      result = newResult;
    });
    
    return result;
  };

  return (
    <motion.div
      ref={ref}
      className="px-6 xl:px-[52px] py-[100px] border-b border-[var(--rule)] relative overflow-hidden"
      initial={{ opacity: 0, y: 36 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-display text-[clamp(36px,5.5vw,82px)] tracking-[-0.03em] leading-[1.05] text-[var(--w)] max-w-[1100px]">
        {renderFirstSentence(firstSentence)}{" "}
        {strokeSentences && (
          <span 
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(245,240,232,0.25)" }}
          >
            {strokeSentences}
          </span>
        )}
      </p>

      <div className="hidden xl:block absolute right-[52px] bottom-[48px] font-mono italic text-[11px] tracking-[0.06em] text-[var(--mid)] text-right leading-[1.7]">
        8+ products shipped<br />
        3+ satisfied clients<br />
        Est. 2017
      </div>
    </motion.div>
  );
}
