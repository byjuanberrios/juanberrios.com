export const prerender = false;

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

import type { APIContext } from "astro";

// Cache por 5 minutos
const CACHE_MAX_AGE = 300;

// Función helper para codificar en base64 de manera segura con caracteres Unicode
function safeBase64Encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

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
        console.log("date", date);
        const pageId = result.id;
        console.log("pageId", pageId);
        const mdBlocks = await n2m.pageToMarkdown(pageId);
        console.log("mdBlocks", mdBlocks);
        const markdownObject = n2m.toMarkdownString(mdBlocks);
        console.log("markdownObject", markdownObject);
        const htmlContent = marked(markdownObject.parent);
        console.log("htmlContent", htmlContent);

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
        ETag: safeBase64Encode(JSON.stringify(timeline)),
      },
    });
  } catch (error) {
    console.error("Error en timeline.json:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Error desconocido",
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
