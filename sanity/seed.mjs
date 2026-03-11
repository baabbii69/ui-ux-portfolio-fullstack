import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env.local
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required environment variables.");
  console.error("Make sure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN are set in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-10",
  useCdn: false,
  token,
});

async function seed() {
  console.log("Seeding Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Yohanes Alemu",
    tagline: "UI · UX · DESIGN",
    heroStatement: "Seven years turning complexity into clarity — one screen at a time. From university portals to ride-hailing apps.",
    heroStatementAccentWords: ["complexity"],
    statsBar: [
      { _key: "s1", label: "Craft", value: "UI/UX Design · Design Systems\nMobile Apps · Enterprise Dashboards" },
      { _key: "s2", label: "Based in", value: "Adama, Ethiopia\nWorking with clients globally" },
      { _key: "s3", label: "Get in touch", value: "yohanesalemu21@gmail.com\n+251 922 802 813" }
    ],
    availabilityStatus: true,
    availabilityText: "Available for work",
    heroYearWatermark: "2025",
    location: "Adama, Ethiopia",
    email: "yohanesalemu21@gmail.com",
    phone: "+251 922 802 813",
  });

  console.log("Seeding Process Section...");
  await client.createOrReplace({
    _id: "processSection",
    _type: "processSection",
    title: "From brief\nto beautiful.",
    steps: [
      {
        _key: "p1",
        number: "01",
        title: "Discover",
        description: "User interviews, stakeholder workshops, competitive audits. Understand people deeply before touching Figma.",
        tools: ["Research Phase"]
      },
      {
        _key: "p2",
        number: "02",
        title: "Define",
        description: "User flows, information architecture, personas. A real design brief before a single screen exists.",
        tools: ["Strategy Phase"]
      },
      {
        _key: "p3",
        number: "03",
        title: "Design",
        description: "Wireframes to high-fidelity. Building the design system alongside the product — not as an afterthought.",
        tools: ["Creative Phase"]
      },
      {
        _key: "p4",
        number: "04",
        title: "Test",
        description: "Real prototypes, real users. Usability sessions and iteration until it is genuinely right — not merely approved.",
        tools: ["Validation Phase"]
      },
      {
        _key: "p5",
        number: "05",
        title: "Deliver",
        description: "Dev-ready Figma specs, documentation, and ongoing collaboration through build to protect the design vision.",
        tools: ["Handoff Phase"]
      }
    ]
  });

  console.log("Seeding Contact Section...");
  await client.createOrReplace({
    _id: "contactSection",
    _type: "contactSection",
    headline: "GOT A\nPROJECT?\nLet's talk.",
    subtext: "Open to full-time roles, freelance projects, and long-term partnerships. Based in Adama, Ethiopia — working with clients globally.\n\nThe best projects start with a simple conversation. Tell me what you're building and I'll tell you how I can help make it something people genuinely love.",
    ctaButtonText: "Send a Message →"
  });

  // Since About needs an image upload first, we'll create the document without the image, 
  // and the user can upload their own photo via the Studio UI later.
  console.log("Seeding About Section...");
  await client.createOrReplace({
    _id: "aboutSection",
    _type: "aboutSection",
    name: "Yohanes Alemu",
    pullQuote: "Great design is the kind nobody notices — they just feel completely at home.",
    bio1: "I'm Yohanes Alemu — a UI/UX designer and backend engineer from Adama, Ethiopia. Seven years into this craft and I'm still fascinated by the same thing: the moment a messy, complicated problem becomes something a person can use without thinking.",
    bio2: "I've designed platforms for universities, ride-hailing apps, enterprise transport dashboards, construction workforce tools, and school management systems. Every single project started the same way — understanding real people before ever opening Figma.\n\nBSc Computer Science & Engineering, Adama Science and Technology University.",
    skills: [
      { _key: "k1", name: "UI Design — High Fidelity", tools: "Figma · Adobe XD" },
      { _key: "k2", name: "UX Research & Audits", tools: "Journey Maps · Testing" },
      { _key: "k3", name: "Design Systems & Tokens", tools: "Auto Layout · Docs" },
      { _key: "k4", name: "Mobile App Design", tools: "iOS HIG · Material 3" },
      { _key: "k5", name: "Dashboard & Data UI", tools: "Charts · Admin Panels" },
      { _key: "k6", name: "Graphic Design & Branding", tools: "Photoshop · Illustrator" }
    ],
    timeline: [
      { _key: "t1", year: "2024 →", role: "UI/UX Designer", company: "Hawi Software Solutions" },
      { _key: "t2", year: "2022 →", role: "Designer + Backend Dev", company: "Milto Tech · Addis Ababa" },
      { _key: "t3", year: "2018–23", role: "Head of Design Team", company: "Backos Technologies" },
      { _key: "t4", year: "2022", role: "Intern — UI/UX + Dev", company: "ASTU STEM Center" },
      { _key: "t5", year: "2017 →", role: "Freelance Designer", company: "Independent" }
    ]
  });

  console.log("✅ Seed complete! You can now view the data in Sanity Studio.");
}

seed().catch(console.error);
