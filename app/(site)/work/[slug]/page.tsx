import { client } from "@/sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import CaseStudyTemplate from "@/components/pages/work/CaseStudyTemplate";
import ShowcaseTemplate from "@/components/pages/work/ShowcaseTemplate";
import { Metadata } from "next";

// Pre-render dynamic routes at build time
export async function generateStaticParams() {
  const slugs = await client.fetch(projectSlugsQuery);
  return slugs.map((slug: string) => ({ slug }));
}

// Dynamically generate SEO metadata based on project data
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await client.fetch(projectBySlugQuery, { slug });
  
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.seo?.metaTitle || project.title} — Yohanes Alemu`,
    description: project.seo?.metaDescription || project.shortDescription || "Case study by Yohanes Alemu",
    openGraph: {
      images: project.seo?.ogImage?.asset?.url ? [project.seo.ogImage.asset.url] : [],
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await Next.js 15 async params
  const { slug } = await params;

  // Fetch detailed project
  const project = await client.fetch(projectBySlugQuery, { slug });
  
  if (!project) {
    notFound();
  }

  // Render the appropriate template based on the CMS toggle
  // Default to caseStudy if projectType is missing (old documents)
  if (project.projectType === "showcase") {
    return <ShowcaseTemplate project={project} />;
  }

  return <CaseStudyTemplate project={project} />;
}
