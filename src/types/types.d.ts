export type Playlist = {
  id: string;
  collection: "playlists";
  data: {
    date: Date;
    name: string;
    songs?: number;
    imageUrl: string;
    platforms: {
      spotifyLink?: string;
      appleMusicLink?: string;
      youtubeLink?: string;
    };
  };
};

export type Now = {
  data: { date: any };
  slug: any;
};

export type RawPost = {
  data: {
    isPublished: boolean;
    title: string;
    date: string;
    summary?: string;
    image?: string;
  };
  slug: string;
};

export type Post = {
  isPublished: boolean;
  title: string;
  date: string;
  summary?: string;
  image?: string;
  slug: string;
};

export type OrderedPosts = {
  [year: string]: {
    [month: string]: Post[];
  };
};

export type Menu = {
  name: string;
  href: string;
  iconComp: JSX.Element;
  external: boolean;
  tag?: string;
}[];

export type Work = {
  data: {
    name: string;
    slug: string;
    year: number;
    cover: ImageFunction;
    roles: string[];
    services: string[];
    tech: string[];
    client: string;
    description: string[];
    priority: number;
    externalLink?: string;
    images?: ImageFunction[];
    archived?: boolean;
  };
};

export type LinkdingBookmark = {
  title: string;
  description: string;
  url: string;
  tag_names: string[] | [];
  date_added: string;
};

export type Bookmark = {
  title: string;
  description: string;
  url: string;
  tags: string[] | [];
  date: string;
  favicon?: string;
};

export type Year = string;

export type OrderedBookmark = [Year, Bookmark[]];
