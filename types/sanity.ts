/* ─────────────────────────────────────
   TypeScript Types for Sanity Documents
───────────────────────────────────── */

// ─── Common ───
export interface SanityImage {
  asset: {
    url: string;
    metadata?: {
      lqip?: string;
    };
  };
  alt?: string;
}

// ─── Site Settings (singleton) ───
export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  heroStatement: string;
  heroStatementAccentWords: string[];
  statsBar: { label: string; value: string }[];
  availabilityStatus: boolean;
  availabilityText: string;
  heroYearWatermark: string;
  location: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  cvFileUrl?: string;
}

// ─── Project ───
export interface Project {
  _id: string;
  title: string;
  slug: string; // GROQ returns slug.current as a string
  order: number;
  featured: boolean;
  featuredSize?: "full" | "half";
  status: "published" | "draft";
  projectType: "caseStudy" | "showcase";
  figmaUrl?: string;
  showcaseDescription?: any[]; // PortableText blocks
  heroImage?: { asset?: { url?: string }; alt?: string };
  thumbnailImage?: { asset?: { url?: string }; alt?: string };
  client: string;
  clientYear: string;
  role: string;
  timeline: string;
  platform: string;
  accentColor: string;
  tags?: string[];
  categories?: ("mobile" | "dashboard" | "platform" | "redesign")[];
  shortDescription: string;
  overview: {
    headline: string;
    body1: string;
    body2: string;
  };
  stats: { value: string; label: string }[];
  problemSection: {
    title: string;
    insights: { title: string; description: string }[];
  };
  solutionSection: {
    title: string;
    body: string;
    items: string[];
  };
  screens: SanityImage[];
  outcomes: { value: string; title: string; description?: string; }[];
  pullQuote?: string;
  learnings?: {
    _key: string;
    title?: string;
    body?: string;
  }[];
  gallery?: SanityImage[];
  nextProject?: {
    _ref: string;
    slug: string;
    title: string;
    shortDescription: string;
    thumbnailImage?: SanityImage;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
}

// Partial project for list views (works grid, featured)
export type ProjectCard = Pick<
  Project,
  | "_id"
  | "title"
  | "slug"
  | "order"
  | "featured"
  | "featuredSize"
  | "heroImage"
  | "thumbnailImage"
  | "client"
  | "clientYear"
  | "role"
  | "timeline"
  | "platform"
  | "accentColor"
  | "tags"
  | "categories"
  | "shortDescription"
>;

// ─── About Section (singleton) ───
export interface AboutSection {
  photo: SanityImage;
  name: string;
  pullQuote: string;
  bio1: string;
  bio2: string;
  skills: { name: string; tools: string }[];
  timeline: { year: string; role: string; company: string }[];
}

// ─── Process Section (singleton) ───
export interface ProcessSection {
  title: string;
  steps: {
    number: string;
    title: string;
    description: string;
    tools: string[];
  }[];
}

// ─── Contact Section (singleton) ───
export interface ContactSection {
  headline: string;
  subtext: string;
  ctaButtonText: string;
}
