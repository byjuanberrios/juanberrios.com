export const prerender = false;

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import SoundWaves from "../assets/icons/SoundWaves";

import type { LastSong } from "../types/lastfm";

import "../styles/lastfm.css";

dayjs.extend(relativeTime);
dayjs.locale("es");

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
      <header>
        <h2>Escuchando</h2>
        <div className="date">
          {playDate ? (
            <p className="date">{dayjs(playDate.uts).fromNow()}</p>
          ) : (
            <p className="now">
              <SoundWaves />
              <span>Ahora</span>
            </p>
          )}
        </div>
      </header>
      <div className="listening">
        <img className="cover" src={image} alt={`${artist} album`} />
        <div className="info">
          <div className="song">
            <p className="name">{name}</p>
            <p className="artist">{artist}</p>
            <p className="album">{album}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
