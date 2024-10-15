import { getCollection } from "astro:content";
import type { Post, RawPost } from "../../types/types";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

import "../../styles/postsDisplay.css";

const posts = await getCollection(
  "posts",
  ({ data }: { data: Post }) => data.isPublished
).then((posts: RawPost[]) =>
  posts
    .sort((postA: RawPost, postB: RawPost) =>
      postA.data.date < postB.data.date ? 1 : -1
    )
    .slice(0, 6)
);

const IndexPostsDisplay = () => {
  return (
    <div className="posts-grid">
      <h2>Últimos posts</h2>
      <div className="grid">
        {posts
          .sort((postA: RawPost, postB: RawPost) =>
            postA.data.date < postB.data.date ? 1 : -1
          )
          .slice(0, 6)
          .map((post: RawPost, i: number) => {
            return (
              <a className="item" href={`/posts/${post.slug}`}>
                <p>{post.data.title}</p>
                <hr />
                <span>{dayjs(post.data.date).fromNow()}</span>
              </a>
            );
          })}
      </div>
      <a href="/posts" className="more">
        Ver todos los posts
      </a>
    </div>
  );
};

export default IndexPostsDisplay;
