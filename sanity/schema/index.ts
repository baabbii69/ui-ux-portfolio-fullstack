import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { project } from "./project";
import { aboutSection } from "./aboutSection";
import { processSection } from "./processSection";
import { contactSection } from "./contactSection";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  project,
  aboutSection,
  processSection,
  contactSection,
];
