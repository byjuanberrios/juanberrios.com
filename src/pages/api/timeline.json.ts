export const prerender = false;

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

import type { APIContext } from "astro";

// Cache por 5 minutos
const CACHE_MAX_AGE = 300;

export async function GET(context: APIContext) {
  try {
    const runtime = context.locals.runtime;
    const { NOTION_TIMELINE_DATABASE_ID, NOTION_TOKEN } = runtime.env;

    if (!NOTION_TOKEN || !NOTION_TIMELINE_DATABASE_ID) {
      throw new Error("Faltan credenciales de Notion");
    }

    const notion = new Client({ auth: NOTION_TOKEN });
    const n2m = new NotionToMarkdown({ notionClient: notion });

    const pages = await notion.databases.query({
      database_id: NOTION_TIMELINE_DATABASE_ID,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      page_size: 4,
    });

    const pagesResults = pages.results.filter((result: any) => {
      return (
        result.properties.Date.date !== null && result.properties.Texto.title[0]
      );
    });

    const timeline = await Promise.all(
      pagesResults.map(async (result: any) => {
        const date = result.properties.Date.date.start;
        const pageId = result.id;
        const mdBlocks = await n2m.pageToMarkdown(pageId);
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
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
        ETag: Buffer.from(JSON.stringify(timeline)).toString("base64"),
      },
    });
  } catch (error) {
    console.error("Error en timeline.json:", error);
    return new Response(
      JSON.stringify({
        error: "Error al obtener las actualizaciones",
        details: error,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
