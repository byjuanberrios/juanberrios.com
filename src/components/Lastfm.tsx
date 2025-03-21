export const prerender = false;

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import SoundWaves from "../assets/icons/SoundWaves";
import { IconBrandLastfm } from "@tabler/icons-react";

import type { LastSong } from "../types/lastfm";

// import "../styles/lastfm.css";

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
    // if (true) {
    return (
      <div className="">
        <header className="flex items-center justify-between mb-3 w-full">
          <div className="flex items-center gap-2">
            <h2 className="m-0">Escuchando</h2>
          </div>
          <div className="lastfm">
            <a
              href="https://www.last.fm/user/byjuanberrios"
              target="_blank"
              rel="noreferrer noopener"
              className="no-underline no-decoration"
            >
              <IconBrandLastfm color="#d92323" />
            </a>
          </div>
        </header>
        <div className="grid items-center grid-cols-[70px_auto] gap-3 w-full">
          <div className="rounded aspect-square bg-stone-200"></div>
          <div className="grid gap-1.5">
            <div className="w-24 h-2 bg-stone-300"></div>
            <div className="w-5 h-2 bg-stone-300"></div>
            <div className="w-32 h-2 bg-stone-200"></div>
          </div>
        </div>
      </div>
    );
  }

  const { name, artist, image, album, playDate } = data;

  return (
    <div className="">
      <header className="flex items-center justify-between mb-3 w-full">
        <div className="title-date flex items-center gap-2">
          <h2 className="m-0">Escuchando</h2>
          <div className="flex gap-0.5 text-xs">
            {playDate ? (
              <p className="m-0 inline-block text-wrap first-letter:uppercase bg-stone-200 py-1 px-1.5 rounded-lg">
                {dayjs(playDate.uts).fromNow()}
              </p>
            ) : (
              <p className="m-0 flex items-center gap-1 bg-lime-300 py-1 px-1.5 rounded-lg">
                <SoundWaves />
                <span>Ahora</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <a
            href="https://www.last.fm/user/byjuanberrios"
            target="_blank"
            rel="noreferrer noopener"
            className="no-underline no-decoration"
          >
            <IconBrandLastfm color="#d92323" />
          </a>
        </div>
      </header>
      <div className="grid items-center grid-cols-[70px_auto] gap-3 w-full">
        <img
          className="cover rounded bg-stone-200"
          src={image}
          alt={`${artist} album`}
        />
        <div className="info overflow-hidden">
          <div className="song">
            <p className="text-sm m-0 overflow-hidden">{name}</p>
            <p className="text-sm m-0 text-ellipsis text-nowrap overflow-hidden">
              {artist}
            </p>
            <p className="text-sm m-0 text-ellipsis text-nowrap overflow-hidden opacity-60">
              {album}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
