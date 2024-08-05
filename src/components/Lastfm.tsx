export const prerender = false;

import { useEffect, useState } from "react";
import type { LastSong } from "../types/lastfm";

import "../styles/lastfm.css";

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

  const { name, artist, image, album, playDate } = data;

  return (
    <div className="listening-wrapper">
      <h2>Escuchando</h2>
      <div className="listening">
        <img className="cover" src={image} alt={`${artist} album`} />
        <div className="info">
          <div className="song">
            <p className="name">{name}</p>
            <p className="artist">{artist}</p>
            <p className="album">{album}</p>
          </div>
          <div className="date">
            <p className="date">
              {playDate ? (
                <>
                  {playDate.date} - {playDate.time}
                </>
              ) : (
                "Reproduciendo ahora"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
