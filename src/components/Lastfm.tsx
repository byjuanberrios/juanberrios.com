import { useEffect, useState } from "react";
import type { LastSong } from "../types/lastfm";

export const Lastfm = () => {
  const [data, setData] = useState<LastSong>();

  useEffect(() => {
    fetch(`/api/last-song.json`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) {
    return (
      <div className="listening-wrapper">
        <p>Cargando…</p>
      </div>
    );
  }

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
