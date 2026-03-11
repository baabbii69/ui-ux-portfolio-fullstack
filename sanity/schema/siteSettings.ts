import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      description: "Appears in browser tabs (e.g., 'Yohanes Alemu')",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "e.g., 'UI · UX · DESIGN'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroStatement",
      title: "Hero Statement",
      type: "text",
      description: "The main big text on the homepage",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroStatementAccentWords",
      title: "Accent Words in Statement",
      type: "array",
      of: [{ type: "string" }],
      description: "Words in the hero statement that should be italicized/accented",
    }),
    defineField({
      name: "statsBar",
      title: "Stats Bar (Homepage Strip)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "availabilityStatus",
      title: "Available for Work?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "availabilityText",
      title: "Availability Text",
      type: "string",
      description: "e.g., 'Available Q3 2024'",
    }),
    defineField({
      name: "heroYearWatermark",
      title: "Hero Year Watermark",
      type: "string",
      description: "The large faded year behind the hero (e.g., '24')",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "e.g., 'Adama, Ethiopia'",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone (Optional)",
      type: "string",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "behanceUrl",
      title: "Behance URL",
      type: "url",
    }),
    defineField({
      name: "dribbbleUrl",
      title: "Dribbble URL",
      type: "url",
    }),
    defineField({
      name: "cvFile",
      title: "CV File",
      type: "file",
      options: { accept: ".pdf" },
    }),
  ],
});
