import { groq } from "next-sanity";

// ─── SITE SETTINGS ───
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    tagline,
    heroStatement,
    heroStatementAccentWords,
    statsBar[] { label, value },
    availabilityStatus,
    availabilityText,
    heroYearWatermark,
    location,
    email,
    phone,
    linkedinUrl,
    behanceUrl,
    dribbbleUrl,
    "cvFileUrl": cvFile.asset->url
  }
`;

// ─── ALL PROJECTS (for works page) ───
export const allProjectsQuery = groq`
  *[_type == "project" && status == "published"] | order(order asc) {
    _id,
    title,
    slug,
    order,
    featured,
    featuredSize,
    heroImage { asset->{ url }, alt },
    thumbnailImage { asset->{ url }, alt },
    client,
    clientYear,
    role,
    timeline,
    platform,
    accentColor,
    tags,
    categories,
    shortDescription
  }
`;

// ─── FEATURED PROJECTS (for homepage) ───
export const featuredProjectsQuery = groq`
  *[_type == "project" && status == "published" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    order,
    featuredSize,
    heroImage { asset->{ url }, alt },
    thumbnailImage { asset->{ url }, alt },
    client,
    clientYear,
    role,
    tags,
    shortDescription,
    accentColor
  }
`;

// ─── SINGLE PROJECT (for case study) ───
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage { asset->{ url, metadata { lqip } }, alt },
    thumbnailImage { asset->{ url }, alt },
    client,
    clientYear,
    role,
    timeline,
    platform,
    accentColor,
    tags,
    categories,
    shortDescription,
    overview {
      headline,
      body1,
      body2
    },
    stats[] { value, label },
    problemSection {
      title,
      insights[] { title, description }
    },
    solutionSection {
      title,
      body,
      items
    },
    screens[] { asset->{ url }, alt },
    outcomes[] { value, title, description },
    pullQuote,
    learnings[] { title, body },
    nextProject-> { title, slug, accentColor, thumbnailImage { asset->{ url }, alt } },
    seo {
      metaTitle,
      metaDescription,
      ogImage { asset->{ url } }
    }
  }
`;

// ─── PROJECT SLUGS (for generateStaticParams) ───
export const projectSlugsQuery = groq`
  *[_type == "project" && status == "published"] { "slug": slug.current }
`;

// ─── ABOUT SECTION ───
export const aboutQuery = groq`
  *[_type == "aboutSection"][0] {
    photo { asset->{ url }, alt },
    name,
    pullQuote,
    bio1,
    bio2,
    skills[] { name, tools },
    timeline[] { year, role, company }
  }
`;

// ─── PROCESS SECTION ───
export const processQuery = groq`
  *[_type == "processSection"][0] {
    title,
    steps[] { number, title, description, tools }
  }
`;

// ─── CONTACT SECTION ───
export const contactQuery = groq`
  *[_type == "contactSection"][0] {
    headline,
    subtext,
    ctaButtonText
  }
`;
