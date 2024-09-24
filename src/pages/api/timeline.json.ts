export const prerender = false;

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const runtime = context.locals.runtime;
  const { NOTION_TIMELINE_DATABASE_ID, NOTION_TOKEN } = runtime.env;

  const notion = new Client({ auth: NOTION_TOKEN });

  // Iniciar el convertidor de Notion a Markdown
  const n2m = new NotionToMarkdown({ notionClient: notion });

  // Consultar la base de datos
  const pages: any = await notion.databases.query({
    database_id: NOTION_TIMELINE_DATABASE_ID,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    page_size: 4,
  });

  // Filtrar los resultados que tengan fecha y texto
  const pagesResults = pages.results.filter((result: any) => {
    return (
      result.properties.Date.date !== null && result.properties.Texto.title[0]
    );
  });

  const timeline = await Promise.all(
    pagesResults.map(async (result: any) => {
      const date = result.properties.Date.date.start;

      // Convertir los bloques de la página a markdown
      const pageId = result.id;
      const mdBlocks = await n2m.pageToMarkdown(pageId);

      // Convertir Markdown a HTML
      const markdownObject = n2m.toMarkdownString(mdBlocks);
      const htmlContent = marked(markdownObject.parent);

      return {
        date,
        html: htmlContent,
      };
    })
  );

  return new Response(JSON.stringify(timeline), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
