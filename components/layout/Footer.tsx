import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-9 px-[52px] flex flex-col md:flex-row items-center justify-between border-t border-[var(--rule)] gap-4 md:gap-0">
      <Link
        href="/"
        className="font-display text-[14px] tracking-[0.06em] text-[var(--w)] opacity-45 hover:opacity-100 transition-opacity duration-200"
      >
        YOHANES ALEMU
      </Link>

      <span className="font-mono text-[9px] tracking-[0.08em] text-[var(--mid)]">
        © {new Date().getFullYear()} — Designed with intention
      </span>

      <div className="flex gap-7">
        <a
          href="mailto:yohanesalemu0069@gmail.com"
          className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--mid)] hover:text-[var(--acc)] transition-colors duration-200"
        >
          Email
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--mid)] hover:text-[var(--acc)] transition-colors duration-200"
        >
          LinkedIn
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[9px] tracking-[0.12em] uppercase text-[var(--mid)] hover:text-[var(--acc)] transition-colors duration-200"
        >
          Behance
        </a>
      </div>
    </footer>
  );
}
