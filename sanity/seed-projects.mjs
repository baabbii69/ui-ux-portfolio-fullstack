import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing credentials in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-10",
  useCdn: false,
  token,
});

async function uploadImageFromUrl(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    
    // Upload buffer to Sanity
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `unsplash-${Date.now()}.jpg`
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    };
  } catch (err) {
    console.error("Image upload failed for", url, err);
    return null;
  }
}

async function seedProjects() {
  console.log("Downloading and uploading images to Sanity (this takes a moment)...");
  
  // Placeholders that loosely match the themes
  // 1: Infrastructure/Engineering
  const imgWati = await uploadImageFromUrl("https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=1400&q=85");
  // 2: Printing/Press
  const imgRobera = await uploadImageFromUrl("https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1400&q=85");

  console.log("Seeding Project: Wati Trading Plc...");
  await client.create({
    _type: "project",
    title: "Wati Trading Plc",
    slug: { _type: "slug", current: "wati-trading" },
    status: "published",
    projectType: "showcase",
    order: 4,
    featured: true,
    featuredSize: "full",
    client: "Wati Trading Plc",
    clientYear: "2024",
    role: "Lead UI Designer",
    timeline: "2 Months",
    platform: "Web UI Design",
    accentColor: "#F59E0B", // Amber/Gold tone for infrastructure
    tags: ["Web Design", "Corporate", "E-Commerce"],
    categories: ["platform"],
    shortDescription: "A premium, minimum 8-page website design for a large-scale infrastructure and energy contractor.",
    heroImage: imgWati,
    thumbnailImage: imgWati,
    showcaseDescription: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Wati Trading Plc is a contractor primarily involved in large-scale infrastructure and energy projects, including street light construction for Addis Ababa, Adama, and the Semera Corridor, solar installation works, and electro-mechanical services.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The company also operates a store supplying water pumps, generators, and related electro-mechanical equipment.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "I designed a premium, Dribbble front-page worthy website consisting of 8 amazing pages, ranging from the landing page, an about page, complex service and product catalogs, and highly detailed product specification pages.",
            marks: ["strong"]
          }
        ]
      }
    ]
  });

  console.log("Seeding Project: Robera Printing...");
  await client.create({
    _type: "project",
    title: "Robera Printing Press",
    slug: { _type: "slug", current: "robera-printing" },
    status: "published",
    projectType: "showcase",
    order: 5,
    featured: false,
    client: "Robera Printing",
    clientYear: "2023",
    role: "UI/UX Designer",
    timeline: "1 Month",
    platform: "Website Design",
    accentColor: "#3B82F6", // Blue for printing
    tags: ["Web Design", "Corporate"],
    categories: ["redesign"],
    shortDescription: "A clean, modern website design for a professional printing press company.",
    heroImage: imgRobera,
    thumbnailImage: imgRobera,
    showcaseDescription: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "A complete website redesign and branding uplift for Robera Printing, a professional printing press.",
            marks: []
          }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "The goal was to present their massive catalog of printing capabilities (commercial printing, packaging, large format) in an easily digestible, visually stunning web footprint.",
            marks: []
          }
        ]
      }
    ]
  });

  console.log("✅ New Showcase projects seeded successfully!");
}

seedProjects().catch(console.error);
