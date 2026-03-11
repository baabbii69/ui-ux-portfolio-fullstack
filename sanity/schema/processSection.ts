import { defineField, defineType } from "sanity";

export const processSection = defineType({
  name: "processSection",
  title: "Process Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Process",
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Step Number (e.g., 01)", type: "string" },
            { name: "title", title: "Step Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
            {
              name: "tools",
              title: "Tools Used",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
      ],
    }),
  ],
});
