import { Client } from "@notionhq/client";

import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const runtime = context.locals.runtime;
  const { NOTION_TIMELINE_DATABASE_ID, NOTION_TOKEN } = runtime.env;

  const notion = new Client({ auth: NOTION_TOKEN });

  const pages: any = await notion.databases.query({
    database_id: NOTION_TIMELINE_DATABASE_ID,
  });

  const pagesResults = pages.results.filter((result: any) => {
    return (
      result.properties.Date.date !== null || result.properties.Texto.title[0]
    );
  });

  const timeline = pagesResults.map((result: any) => {
    const date = result.properties.Date.date.start;
    const text = result.properties.Texto.title[0].plain_text;

    return {
      date,
      text,
    };
  });

  return new Response(JSON.stringify(timeline), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
