export const prerender = false;

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

// import "../../styles/timeline.css";

dayjs.extend(relativeTime);
dayjs.locale("es");

export const Updates = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    fetch(`/api/timeline.json`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  if (!data) {
    return (
      <div className="updates mb-14">
        <h2 className="mb-4">Updates</h2>
        <div className="grid gap-4 animate-loading">
          <div>
            <div className="grid gap-1.5">
              <div className="w-5 h-2 bg-stone-200"></div>
              <div className="w-full h-3 bg-stone-300"></div>
              <div className="w-1/2 h-3 bg-stone-300"></div>
            </div>
          </div>
          <div>
            <div className="timeline-item grid gap-1.5">
              <div className="dateX w-5 h-2 bg-stone-200"></div>
              <div className="p w-full h-3 bg-stone-300"></div>
              <div className="p w-1/2 h-3 bg-stone-300"></div>
            </div>
          </div>
          <div>
            <div className="timeline-item grid gap-1.5">
              <div className="dateX w-5 h-2 bg-stone-200"></div>
              <div className="p w-full h-3 bg-stone-300"></div>
              <div className="p w-1/2 h-3 bg-stone-300"></div>
            </div>
          </div>
          <div>
            <div className="timeline-item grid gap-1.5">
              <div className="dateX w-5 h-2 bg-stone-200"></div>
              <div className="p w-full h-3 bg-stone-300"></div>
              <div className="p w-1/2 h-3 bg-stone-300"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="updates mb-14">
      <h2 className="mb-4">Updates</h2>
      <div className="grid gap-4">
        {data.map((item: any) => (
          <div className="pr-1">
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
