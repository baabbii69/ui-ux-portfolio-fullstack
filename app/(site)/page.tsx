import { client } from "@/sanity/lib/client";
import { 
  siteSettingsQuery, 
  projectsQuery,
  aboutSectionQuery,
  processSectionQuery,
  contactSectionQuery
} from "@/sanity/lib/queries";

import Hero from "@/components/pages/home/Hero";
import Statement from "@/components/pages/home/Statement";
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import ViewAllBanner from "@/components/pages/home/ViewAllBanner";
import AboutSection from "@/components/pages/home/AboutSection";
import ProcessSection from "@/components/pages/home/ProcessSection";
import ContactSection from "@/components/pages/home/ContactSection";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [siteSettings, projects, aboutData, processData, contactData] = await Promise.all([
    client.fetch(siteSettingsQuery),
    client.fetch(projectsQuery),
    client.fetch(aboutSectionQuery),
    client.fetch(processSectionQuery),
    client.fetch(contactSectionQuery),
  ]);

  return (
    <div className="flex flex-col w-full">
      <Hero 
        year={siteSettings?.heroYearWatermark || "2025"}
        tagline={siteSettings?.tagline || "UI · UX · DESIGN"}
        stats={siteSettings?.statsBar || []}
        email={siteSettings?.email || ""}
        phone={siteSettings?.phone || ""}
      />

      <Statement 
        statement={siteSettings?.heroStatement || "Designing for screen and beyond."}
        accentWords={siteSettings?.heroStatementAccentWords || []}
      />

      <ProjectsSection projects={projects || []} />

      <ViewAllBanner />

      <AboutSection data={aboutData} />

      <ProcessSection data={processData} />

      <ContactSection 
        data={contactData} 
        email={siteSettings?.email || ""}
        phone={siteSettings?.phone || ""}
        location={siteSettings?.location || ""}
      />
    </div>
  );
}
