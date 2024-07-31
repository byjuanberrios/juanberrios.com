export async function GET(context: any) {
  const runtime = context.locals.runtime;
  const { LASTFM_USER, LASTFM_API_KEY } = runtime.env;

  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
  )
    .then((res) => res.json())
    .then((data) => data);

  if (!response) {
    return new Response(null, {
      status: 404,
      statusText: "No Encontrado",
    });
  }

  const track = await response.recenttracks.track;
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
}
