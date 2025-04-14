export const prerender = false;

import { useEffect, useState } from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import Carousel from "../Carousel";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

interface TimelineItem {
  date: string;
  html: string;
  images?: string[];
}

export const Updates = () => {
  const [data, setData] = useState<TimelineItem[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/timeline.json`);
        if (!res.ok) {
          throw new Error("Error al cargar las actualizaciones");
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const Header = () => (
    <header className="mb-6">
      <h1>Microblog</h1>
      <p>Actualizaciones cortas sobre lo que estoy haciendo.</p>
    </header>
  );

  if (error) {
    return (
      <div className="updates">
        <h2 className="mb-4">Updates</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="updates">
        <Header />
        <div className="grid gap-4 animate-loading">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <LoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="updates">
      <Header />
      <div className="grid gap-3">
        {data?.map((item, index) => (
          <div className="pr-1" key={item.date + index}>
            <div className="inline-flex gap-1 text-stone-400 dark:text-stone-500">
              <p className="m-0 text-xs leading-[160%] text-stone-400 dark:text-stone-500">
                ❯
              </p>
              <p className="date text-pretty m-0 mb-0.5 text-sm first-letter:uppercase">
                {dayjs(item.date).fromNow()}
              </p>
            </div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
            {item.images?.length ? <Carousel images={item.images} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};
