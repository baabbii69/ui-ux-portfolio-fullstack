import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import Link from "next/link";
import Nav from "@/components/layout/Nav"; // Needs to be present or handled via global layout
import Footer from "@/components/layout/Footer"; // Assuming handled globally, but here we just need to return the page content
import WorksHeader from "@/components/pages/work/WorksHeader";
import WorksGrid from "@/components/pages/work/WorksGrid";

// Revalidate this page every 60 seconds
export const revalidate = 60;

export const metadata = {
  title: "Selected Work — Yohanes Alemu",
  description: "View the portfolio and case studies of Yohanes Alemu, UI/UX Designer & Engineer.",
};

export default async function WorkPage() {
  const projects = await client.fetch(projectsQuery);

  // Map incoming projects to add the 'index' required by the grid components
  const indexedProjects = projects?.map((project: any, index: number) => ({
    ...project,
    index,
  })) || [];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <WorksHeader count={indexedProjects.length} />
      
      {/* Back Row (Simple inline component mapping the back link) */}
      <div className="p-[28px_24px] xl:px-[52px] border-b border-[var(--rule)] flex items-center gap-[16px]">
        <Link 
          href="/" 
          scroll={false}
          className="group flex items-center gap-[10px] font-mono text-[9px] tracking-[0.14em] uppercase text-[var(--mid)] no-underline transition-all duration-300 hover:text-[var(--acc)] hover:gap-[14px]"
        >
          <svg viewBox="0 0 14 14" fill="none" className="w-[14px] stroke-currentColor">
            <path d="M13 7H1M6 1L1 7l5 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Portfolio
        </Link>
      </div>

      <WorksGrid projects={indexedProjects} />
    </div>
  );
}
