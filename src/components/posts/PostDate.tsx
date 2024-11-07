export const prerender = false;

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

const PostDate = ({ date }: { date: string }) => {
  return <span>{dayjs(date).fromNow()}</span>;
};

export default PostDate;
