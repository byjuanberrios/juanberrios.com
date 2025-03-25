export const prerender = false;

import type { APIContext } from "astro";
import type { LastFMResponse } from "../../types/lastfm";

// Cache por 30 segundos ya que es información en tiempo real
const CACHE_MAX_AGE = 30;

// Función helper para codificar en base64 de manera segura con caracteres Unicode
function safeBase64Encode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

export async function GET(context: APIContext) {
  try {
    const runtime = context.locals.runtime;
    const { LASTFM_USER, LASTFM_API_KEY } = runtime.env;

    if (!LASTFM_USER || !LASTFM_API_KEY) {
      throw new Error("Faltan credenciales de Last.fm");
    }

    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
    );

    if (!response.ok) {
      throw new Error(`Error en la API de Last.fm: ${response.statusText}`);
    }

    const data: LastFMResponse = await response.json();

    if (!data?.recenttracks?.track?.[0]) {
      throw new Error("No se encontraron canciones recientes");
    }

    const track = data.recenttracks.track[0];
    const artistName = track.artist["#text"];
    const songName = track.name;
    const image = track.image[2]["#text"];
    const album = track.album["#text"];

    const uts_playDate = track?.date?.uts
      ? parseInt(track.date.uts, 10) * 1000
      : null;
    const uts_date = uts_playDate ? new Date(uts_playDate) : null;

    const playDate = uts_playDate
      ? {
          date: uts_date?.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }),
          time: uts_date?.toLocaleTimeString("es-ES", {
            timeZone: "America/Santiago",
            timeStyle: "short",
            hour12: false,
          }),
          uts: uts_date,
        }
      : null;

    const result = {
      name: songName,
      artist: artistName,
      album,
      image,
      playDate,
      uts_date,
      isNowPlaying: !track.date,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
        ETag: safeBase64Encode(JSON.stringify(result)),
      },
    });
  } catch (error) {
    console.error("Error en last-song.json:", error);
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
