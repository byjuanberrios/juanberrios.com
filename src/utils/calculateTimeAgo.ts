import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

export const calculateTimeAgo = (date: string) => {
  const timeAgo = dayjs(date).fromNow();

  return timeAgo;
};
