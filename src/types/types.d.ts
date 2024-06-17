export type Playlist = {
  data: {
    imageUrl: string;
    name: string;
    songs: number;
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

export type Note = {
  data: {
    isPublished: boolean;
    title: string;
    date: string;
    summary?: string;
    image?: string;
  };
  slug: string;
};
