export type Album = {
  artist: string;
  name: string;
  cover: any;
  year: number;
  slug: string;
  tracklist: string;
  description: string;
  streamingLinks: {
    spotify?: string;
    apple_music?: string;
    youtube?: string;
    soundcloud?: string;
  };
};
