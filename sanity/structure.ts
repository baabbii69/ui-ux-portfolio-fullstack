import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.divider(),
      S.listItem()
        .title("About Section")
        .id("aboutSection")
        .child(
          S.document()
            .schemaType("aboutSection")
            .documentId("aboutSection")
            .title("About Section"),
        ),
      S.listItem()
        .title("Process Section")
        .id("processSection")
        .child(
          S.document()
            .schemaType("processSection")
            .documentId("processSection")
            .title("Process Section"),
        ),
      S.listItem()
        .title("Contact Section")
        .id("contactSection")
        .child(
          S.document()
            .schemaType("contactSection")
            .documentId("contactSection")
            .title("Contact Section"),
        ),
    ]);
