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

export type TimelineProperties = {
  Date: {
    date: {
      start: string;
      end?: string;
    };
  };
  Texto: {
    title: Array<{
      plain_text: string;
    }>;
  };
  images?: {
    rich_text: Array<{
      text: {
        link: {
          url: string;
        };
      };
    }>;
  };
};

export type TimelinePageResponse = {
  object: "page";
  id: string;
  properties: TimelineProperties;
};

export interface TimelineUser {
  object: "user";
  id: string;
}

export interface TimelineParent {
  type: "database_id";
  database_id: string;
}

export interface TimelinePage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: TimelineUser;
  last_edited_by: User;
  cover: null;
  icon: null;
  parent: TimelineParent;
  archived: boolean;
  in_trash: boolean;
  properties: TimelineProperties;
  url: string;
  public_url: null;
}
