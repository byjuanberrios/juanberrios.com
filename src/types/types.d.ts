export type Playlist = {
  data: {
    imageUrl: string;
    name: string;
    songs?: number;
    platforms: {
      appleMusicLink: string | null;
      spotifyLink: string | null;
    };
  };
};

export type Now = {
  data: { date: any };
  slug: any;
};

export type RawNote = {
  data: {
    isPublished: boolean;
    title: string;
    date: string;
    summary?: string;
    image?: string;
  };
  slug: string;
};

export type Note = {
  isPublished: boolean;
  title: string;
  date: string;
  summary?: string;
  image?: string;
  slug: string;
};

export type OrderedNotes = {
  [year: string]: {
    [month: string]: Note[];
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
    externalLink?: string;
    images?: ImageFunction[];
  };
};

export type LinkdingBookmark = {
  website_title: string;
  website_description: string;
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
