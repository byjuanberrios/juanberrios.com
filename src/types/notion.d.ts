export type Album = {
  artist: string;
  name: string;
  cover: any;
  year: number;
  slug: string;
  tracklist?: string;
  description?: string;
};

export type Bookmark = {
  name: string;
  url: string;
  category: {
    name: string;
    color: string;
    id: string;
  };
  date: string;
};

export interface OrderedBookmarks {
  [year: string]: Bookmark[];
}

export type BookmarksEntries = [string, Bookmark[]];
