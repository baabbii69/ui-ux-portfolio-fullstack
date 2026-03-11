import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Full Case Study", value: "caseStudy" },
          { title: "Simple Showcase", value: "showcase" },
        ],
        layout: "radio"
      },
      initialValue: "caseStudy",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "Draft", value: "draft" },
        ],
      },
      initialValue: "published",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Order in which this appears in grids (lower = first)",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "featuredSize",
      title: "Homepage Size",
      type: "string",
      options: {
        list: [
          { title: "Full Width", value: "full" },
          { title: "Half Width", value: "half" },
        ],
      },
      hidden: ({ document }) => !document?.featured,
    }),
    defineField({
      name: "figmaUrl",
      title: "Figma Link",
      type: "url",
      description: "Optional Figma link for this project",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "thumbnailImage",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt Text" }],
      description: "Used in works grid",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "clientYear",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color (Hex)",
      type: "string",
      description: "e.g., #FF5500",
      validation: (rule) =>
        rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: "hex color",
          invert: false,
        }),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g., UI/UX, Web App",
    }),
    defineField({
      name: "categories",
      title: "Grid Categories",
      type: "array",
      of: [{ type: "string", options: { list: ["mobile", "dashboard", "platform", "redesign"] } }],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      description: "Used in cards and SEO",
    }),
    defineField({
      name: "showcaseDescription",
      title: "Showcase Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Rich text description for Simple Showcase projects.",
      hidden: ({ document }) => document?.projectType !== "showcase",
    }),
    defineField({
      name: "overview",
      title: "Overview Section (Case Study Only)",
      type: "object",
      hidden: ({ document }) => document?.projectType === "showcase",
      fields: [
        { name: "headline", type: "string", title: "Headline" },
        { name: "body1", type: "text", title: "Paragraph 1" },
        { name: "body2", type: "text", title: "Paragraph 2" },
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats (Case Study Only)",
      type: "array",
      hidden: ({ document }) => document?.projectType === "showcase",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value" },
            { name: "label", type: "string", title: "Label" },
          ],
        },
      ],
    }),
    defineField({
      name: "problemSection",
      title: "Problem Section (Case Study Only)",
      type: "object",
      hidden: ({ document }) => document?.projectType === "showcase",
      fields: [
        { name: "title", type: "string", title: "Title", initialValue: "The Challenge" },
        {
          name: "insights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "title", type: "string", title: "Insight Title" },
                { name: "description", type: "text", title: "Description" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "solutionSection",
      title: "Solution Section (Case Study Only)",
      type: "object",
      hidden: ({ document }) => document?.projectType === "showcase",
      fields: [
        { name: "title", type: "string", title: "Title", initialValue: "The Solution" },
        { name: "body", type: "text", title: "Body Text" },
        { name: "items", type: "array", of: [{ type: "string" }], title: "What we built list" },
      ],
    }),
    defineField({
      name: "screens",
      title: "Screens/Mosaics (Case Study Only)",
      type: "array",
      hidden: ({ document }) => document?.projectType === "showcase",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        },
      ],
    }),
    defineField({
      name: "outcomes",
      title: "Business Outcomes (Case Study Only)",
      type: "array",
      hidden: ({ document }) => document?.projectType === "showcase",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Stat Value (e.g., +45%)" },
            { name: "title", type: "string", title: "Title" },
            { name: "description", type: "text", title: "Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote (Case Study Only)",
      type: "text",
      hidden: ({ document }) => document?.projectType === "showcase",
    }),
    defineField({
      name: "learnings",
      title: "Learnings (Case Study Only)",
      type: "array",
      hidden: ({ document }) => document?.projectType === "showcase",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Learning Title" },
            { name: "body", type: "text", title: "Learning Description" },
          ],
        },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Design Gallery (All Project Types)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alt Text" }],
        },
      ],
      description: "Upload as many design images as you want. These will be displayed at the bottom of the project page.",
    }),
    defineField({
      name: "nextProject",
      title: "Next Project Link",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "seo",
      title: "SEO Metadata",
      type: "object",
      fields: [
        { name: "metaTitle", type: "string", title: "Meta Title" },
        { name: "metaDescription", type: "text", title: "Meta Description" },
        { name: "ogImage", type: "image", title: "Social Image (OG)" },
      ],
    }),
  ],
});
