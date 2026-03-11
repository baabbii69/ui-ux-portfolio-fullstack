"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const AL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleLink({ href, text }: { href: string; text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    let frame = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < frame / 4) return text[i];
            return AL[Math.floor(Math.random() * AL.length)].toLowerCase();
          })
          .join("")
      );
      
      if (++frame > text.length * 4) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
    }, 28);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <Link
      href={href}
      className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--w)] opacity-45 hover:opacity-100 transition-opacity duration-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(13,13,13,0.93)] backdrop-blur-[20px] border-b border-[rgba(245,240,232,0.08)] py-[18px] px-[52px]"
          : "mix-blend-difference py-[32px] px-[52px]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/"
        className="font-display text-[15px] tracking-[0.06em] text-[var(--w)] opacity-45 hover:opacity-100 transition-opacity"
      >
        YOHANES ALEMU
      </Link>

      <ul className="hidden md:flex gap-10 list-none m-0 p-0">
        <li><ScrambleLink href="/#work" text="Work" /></li>
        <li><ScrambleLink href="/#about" text="About" /></li>
        <li><ScrambleLink href="/#process" text="Process" /></li>
        <li><ScrambleLink href="/#contact" text="Contact" /></li>
      </ul>

      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--w)] opacity-45 flex items-center gap-2">
        <div className="w-[7px] h-[7px] rounded-full bg-[var(--acc)] shadow-none animate-ping-dot" />
        Available for work
      </div>
    </motion.nav>
  );
}
