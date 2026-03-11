import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    tagline,
    heroStatement,
    heroStatementAccentWords,
    statsBar,
    heroYearWatermark,
    location,
    email,
    phone
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    "year": clientYear,
    "roles": tags,
    "thumbnailUrl": thumbnailImage.asset->url,
    accentColor,
    categories
  }
`;

export const aboutSectionQuery = groq`
  *[_type == "aboutSection"][0] {
    name,
    pullQuote,
    bio1,
    bio2,
    "photoUrl": photo.asset->url,
    skills,
    timeline
  }
`;

export const processSectionQuery = groq`
  *[_type == "processSection"][0] {
    title,
    steps
  }
`;

export const contactSectionQuery = groq`
  *[_type == "contactSection"][0] {
    headline,
    subtext,
    ctaButtonText
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    projectType,
    client,
    "clientYear": clientYear,
    role,
    timeline,
    platform,
    accentColor,
    shortDescription,
    "tags": tags,
    
    // Resolved hero image
    "heroImage": {
      "asset": { "url": heroImage.asset->url },
      "alt": heroImage.alt
    },

    // Showcase specific
    figmaUrl,
    showcaseDescription,
    
    // Case Study specific
    overview,
    stats,
    problemSection,
    solutionSection,
    
    // Screens as nested objects
    "screens": screens[]{
      "asset": { "url": asset->url },
      "alt": alt
    },
    
    outcomes,
    pullQuote,
    learnings,

    // Gallery fully resolved
    "gallery": gallery[]{
      "asset": { "url": asset->url },
      "alt": alt
    },

    // Next Project Reference
    "nextProject": nextProject->{
      title,
      "slug": slug.current,
      "thumbnailUrl": thumbnailImage.asset->url,
      client,
      "year": clientYear,
      "roles": tags,
      accentColor
    },
    
    seo
  }
`;

