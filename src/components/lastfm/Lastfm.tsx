import { useEffect, useState } from "react";
// import type { LastSong } from "../../types/lastfm";

export const Lastfm = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetch(
      // `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&limit=1&nowplaying=true&format=json`
      // `http://localhost:4321/api/last-song.json`
      `/api/last-song.json`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const track = data?.recenttracks.track;

        if (!track) {
          return {
            error: "error",
          };
        }

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
        setData(result);
      });
  }, []);

  if (!data) {
    return (
      <div className="listening-wrapper">
        <p>Cargando…</p>
      </div>
    );
  }

  // console.log(data);

  const { name, artist, image, playDate } = data;

  return (
    <div className="listening-wrapper">
      <h2>Escuchando</h2>
      <div className="listening">
        <img className="cover" src={image} alt={`${artist} album`} />
        <div className="info">
          <p className="song">{name}</p>
          <p className="artist">{artist}</p>
          <p className="date">
            {playDate ? (
              <>
                Reproducido el {playDate.day} de{" "}
                <span className="month">{playDate.month}</span>
                <span> a las {playDate.time} hrs</span>
              </>
            ) : (
              "Reproduciendo ahora"
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
