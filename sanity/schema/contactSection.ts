import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "e.g., 'Let's build something exceptional.'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtext",
      title: "Subtext",
      type: "text",
      description: "Text below the headline",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "yohanesalemu0069@gmail.com",
    }),
  ],
});
