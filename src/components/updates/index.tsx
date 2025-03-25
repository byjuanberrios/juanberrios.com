// export const prerender = false;

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

interface TimelineItem {
  date: string;
  html: string;
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

  if (error) {
    return (
      <div className="updates mb-14">
        <h2 className="mb-4">Updates</h2>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="updates mb-14">
        <h2 className="mb-4">Updates</h2>
        <div className="grid gap-3.5 animate-loading">
          <div>
            <div className="grid gap-1.5">
              <div className="w-5 h-2 bg-stone-200 dark:bg-stone-800"></div>
              <div className="w-full h-3 bg-stone-300 dark:bg-stone-700"></div>
              <div className="w-1/2 h-3 bg-stone-300 dark:bg-stone-700"></div>
            </div>
          </div>
          <div>
            <div className="timeline-item grid gap-1.5">
              <div className="dateX w-5 h-2 bg-stone-200 dark:bg-stone-800"></div>
              <div className="p w-full h-3 bg-stone-300 dark:bg-stone-700"></div>
              <div className="p w-1/2 h-3 bg-stone-300 dark:bg-stone-700"></div>
            </div>
          </div>
          <div>
            <div className="timeline-item grid gap-1.5">
              <div className="dateX w-5 h-2 bg-stone-200 dark:bg-stone-800"></div>
              <div className="p w-full h-3 bg-stone-300 dark:bg-stone-700"></div>
              <div className="p w-1/2 h-3 bg-stone-300 dark:bg-stone-700"></div>
            </div>
          </div>
          <div>
            <div className="timeline-item grid gap-1.5">
              <div className="dateX w-5 h-2 bg-stone-200 dark:bg-stone-800"></div>
              <div className="p w-full h-3 bg-stone-300 dark:bg-stone-700"></div>
              <div className="p w-1/2 h-3 bg-stone-300 dark:bg-stone-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="updates mb-14">
      <h2 className="mb-4">Updates</h2>
      <div className="grid gap-3.5">
        {data?.map((item: TimelineItem, index: number) => (
          <div key={item.date + index} className="pr-1">
            <p className="date text-pretty opacity-50 m-0 mb-0.5 text-sm first-letter:uppercase">
              {dayjs(item.date).fromNow()}
            </p>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: item.html }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
