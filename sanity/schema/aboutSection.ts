import { defineField, defineType } from "sanity";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About Section",
  type: "document",
  fields: [
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
      description: "The large text next to the photo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio1",
      title: "Bio Paragraph 1",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio2",
      title: "Bio Paragraph 2",
      type: "text",
    }),
    defineField({
      name: "skills",
      title: "Design Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Skill Name", type: "string" },
            { name: "tools", title: "Tools (comma separated)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "timeline",
      title: "Experience Timeline",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "year", title: "Year Range", type: "string" },
            { name: "role", title: "Role", type: "string" },
            { name: "company", title: "Company", type: "string" },
          ],
        },
      ],
    }),
  ],
});
