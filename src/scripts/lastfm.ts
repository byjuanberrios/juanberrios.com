import type { LastFmResponse, LastSong } from "../types/lastfm";

const LASTFM_USER = import.meta.env.LASTFM_USER;
const LASTFM_API_KEY = import.meta.env.LASTFM_API_KEY;

export async function getLastListenedSong(): Promise<LastSong> {
  const data: Promise<LastFmResponse> = fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("error");
    })
    .then((data) => data);

  const x = await data;
  const track = x.recenttracks.track;
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

  return {
    name: songName,
    artist: artistName,
    image,
    playDate,
  };
}
