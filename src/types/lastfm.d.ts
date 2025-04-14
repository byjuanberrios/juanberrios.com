export interface PlayDate {
  date: string | undefined;
  time: string | undefined;
  uts: string | undefined;
}

export interface LastSong {
  name: string;
  artist: string;
  image: string;
  album: string;
  playDate: PlayDate | null;
  isNowPlaying: boolean;
}

export interface LastFMTrack {
  artist: { "#text": string };
  name: string;
  image: Array<{ "#text": string }>;
  album: { "#text": string };
  date?: { uts: string };
}

export interface LastFMResponse {
  recenttracks: {
    track: LastFMTrack[];
  };
}
