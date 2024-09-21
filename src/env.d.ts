/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        LASTFM_USER: string;
        LASTFM_API_KEY: string;
        NOTION_TIMELINE_DATABASE_ID: string;
        NOTION_TOKEN: string;
      };
    };
  }
}
