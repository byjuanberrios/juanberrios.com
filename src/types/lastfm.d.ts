export interface ResponseImage {
  size: string;
  "#text": string;
}

export interface ResponseArtist {
  mbid: string;
  "#text": string;
}

export interface ResponseAlbum {
  mbid: string;
  "#text": string;
}

export interface ResponseDate {
  uts: string;
  "#text": string;
}

export interface Track {
  artist: ResponseArtist;
  streamable: string;
  image: ResponseImage[];
  mbid: string;
  album: ResponseAlbum;
  name: string;
  url: string;
  date: ResponseDate;
}

export interface Attr {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface RecentTracks {
  track: Track[];
  "@attr": Attr;
}

export interface LastFmResponse {
  recenttracks: RecentTracks;
}

export interface PlayDate {
  uts: Date | null;
  day: string | undefined;
  month: string | undefined;
  time: string | undefined;
}

export interface LastSong {
  name: string;
  artist: string;
  image: string;
  playDate: PlayDate | null;
}
