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
    .slice(0, 3)
);

const IndexPostsDisplay = () => {
  return (
    <div className="index-posts-grid">
      <h2>Últimos posts</h2>
      <div className="items">
        {posts.map((post: RawPost) => {
          const summary =
            post.data.summary && post.data.summary.length > 100
              ? post.data.summary.slice(0, 100) + "..."
              : post.data.summary;
          return (
            <div className="item">
              <h4>
                <a href={`/posts/${post.slug}`}>{post.data.title}</a>
              </h4>
              <p className="summary">{summary}</p>
              <p className="date">{dayjs(post.data.date).fromNow()}</p>
            </div>
          );
        })}
      </div>
      <a href="/posts">Ver todos los posts</a>
    </div>
  );
};

export default IndexPostsDisplay;
