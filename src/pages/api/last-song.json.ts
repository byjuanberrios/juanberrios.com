// export const prerender = false;
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const LASTFM_USER = import.meta.env.LASTFM_USER ?? process.env.LASTFM_USER;
  const LASTFM_API_KEY =
    import.meta.env.LASTFM_API_KEY ?? process.env.LASTFM_API_KEY;

  const data = fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
  );

  if (!data) {
    return new Response(null, {
      status: 404,
      statusText: "No Encontrado",
    });
  }

  const results = await data.then((response) => response.json());

  const track = results?.recenttracks.track;
  const artistName = track[0].artist["#text"];
  const songName = track[0].name;
  const image = track[0].image[2]["#text"];

  const uts_playDate = track[0]?.date?.uts
    ? parseInt(track[0].date.uts, 10) * 1000
    : null;
  const uts_date = uts_playDate ? new Date(uts_playDate) : null;

  const playDate = uts_playDate
    ? {
        uts: uts_date,
        day: uts_date?.toLocaleDateString("es-ES", {
          day: "numeric",
        }),
        month: uts_date?.toLocaleDateString("es-ES", {
          month: "long",
        }),
        time: uts_date?.toLocaleTimeString("es-ES", {
          timeZone: "America/Punta_Arenas",
          timeStyle: "short",
          hour12: false,
        }),
      }
    : null;

  const result = {
    name: songName,
    artist: artistName,
    image,
    playDate,
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
