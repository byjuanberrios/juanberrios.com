export const prerender = false;

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

import type { APIContext } from "astro";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import type { TimelinePageResponse } from "../../types/notion";
import { generateETag } from "../../utils/generateETag";

// 5 minutes cache
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

    const pages: QueryDatabaseResponse = await notion.databases.query({
      database_id: NOTION_TIMELINE_DATABASE_ID,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      page_size: 4,
    });

    const pagesResults = pages.results.filter((result) => {
      const page = result as TimelinePageResponse;
      return (
        page.properties.Date.date !== null && page.properties.Texto.title[0]
      );
    });

    const timeline = await Promise.all(
      pagesResults.map(async (pageResult) => {
        const page = pageResult as TimelinePageResponse;
        const date = page.properties.Date.date.start;
        const mdBlocks = await n2m.pageToMarkdown(page.id);
        const markdownObject = n2m.toMarkdownString(mdBlocks);

        const htmlContent =
          Object.keys(markdownObject).length !== 0 // Check if there is content
            ? marked(markdownObject.parent)
            : undefined;

        const imageUrls =
          page.properties.images?.rich_text
            .filter((item) => item.text.link)
            .map((item: any) => item.text.link.url) ?? undefined;

        return {
          date,
          html: htmlContent,
          images: imageUrls,
        };
      })
    );

    return new Response(JSON.stringify(timeline), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
        ETag: await generateETag(timeline),
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
