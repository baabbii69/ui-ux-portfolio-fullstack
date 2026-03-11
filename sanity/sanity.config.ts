import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";
import { structure } from "./structure";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Define singleton types so we can hide them from the "Create New" menu
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["siteSettings", "aboutSection", "processSection", "contactSection"]);

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Yohanes Portfolio CMS",

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: "2024-03-10" }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // For singleton types, filter out actions that are not explicitly allowed
    // Also remove singletons from the global "Create New" menu
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !singletonTypes.has(templateItem.templateId))
      }
      return prev
    },
    // Make sure singleton types only have publish/discard/restore actions (no "delete" or "duplicate")
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        // @ts-ignore
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
