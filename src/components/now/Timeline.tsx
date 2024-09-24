export const prerender = false;

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

import "../../styles/timeline.css";

dayjs.extend(relativeTime);
dayjs.locale("es");

export const Timeline = () => {
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
      <div className="timeline">
        <h2>Timeline</h2>
        <div className="timeline-loading">
          <div className="timeline-item">
            <div className="dateX"></div>
            <div className="p"></div>
          </div>
        </div>
        <div className="timeline-loading">
          <div className="timeline-item">
            <div className="dateX"></div>
            <div className="p"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline">
      <h2>Timeline</h2>
      <div className="items">
        {data.map((item: any) => (
          <div className="timeline-item">
            <p className="date">{dayjs(item.date).fromNow()}</p>
            <div dangerouslySetInnerHTML={{ __html: item.html }} />
          </div>
        ))}
      </div>
    </div>
  );
};
