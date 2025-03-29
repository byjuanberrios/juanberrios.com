export const prerender = false;

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import SoundWaves from "../../assets/icons/SoundWaves";

import type { LastSong } from "../../types/lastfm";
import { LoadingSkeleton } from "./Loading";
import { LastfmLink } from "./LastfmLink";

dayjs.extend(relativeTime);
dayjs.locale("es");

const POLLING_INTERVAL = 30000; // 30 seconds interval

interface LastfmProps {
  className?: string;
}

export const Listening = ({ className = "" }: LastfmProps) => {
  const [data, setData] = useState<LastSong>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  const fetchLastSong = async () => {
    try {
      const res = await fetch(`/api/last-song.json`);
      if (!res.ok) {
        throw new Error("Error al cargar la última canción");
      }
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setData(data);
      setError(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLastSong();

    // Polling only if a song is playing
    const interval = setInterval(() => {
      if (data?.isNowPlaying) {
        // Random delay between 0 and 5 seconds
        setTimeout(fetchLastSong, Math.random() * 5000);
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [data?.isNowPlaying]);

  if (error) {
    return (
      <div className={className}>
        <header className="flex items-center justify-between mb-3 w-full">
          <h2 className="m-0">Escuchando</h2>
          <LastfmLink />
        </header>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSkeleton className={className} />;
  }

  if (!data) {
    return null;
  }

  const { name, artist, image, album, playDate, isNowPlaying } = data;

  return (
    <div className={className}>
      <header className="flex items-center justify-between mb-3 w-full">
        <div className="title-date flex items-center gap-2">
          <h2 className="m-0">Escuchando</h2>
          <div className="flex gap-0.5 text-xs">
            {!isNowPlaying ? (
              <p className="m-0 inline-block text-wrap first-letter:uppercase bg-stone-200 dark:bg-stone-700 py-1 px-1.5 rounded-lg">
                {dayjs(playDate?.uts).fromNow()}
              </p>
            ) : (
              <p className="m-0 flex items-center gap-1 bg-lime-300 dark:text-stone-900 py-1 px-1.5 rounded-lg">
                <SoundWaves />
                <span>Ahora</span>
              </p>
            )}
          </div>
        </div>
        <LastfmLink />
      </header>
      <div className="grid items-center grid-cols-[70px_auto] gap-3 w-full">
        <img
          className="cover rounded bg-stone-200 w-[70px] h-[70px]"
          src={image}
          alt={`${artist} - ${album}`}
          loading="lazy"
        />
        <div className="info overflow-hidden">
          <div className="song">
            <p className="text-sm m-0 overflow-hidden font-medium">{name}</p>
            <p className="text-sm m-0 text-ellipsis text-nowrap overflow-hidden">
              {artist}
            </p>
            {album && (
              <p className="text-sm m-0 text-ellipsis text-nowrap overflow-hidden opacity-60">
                {album}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
