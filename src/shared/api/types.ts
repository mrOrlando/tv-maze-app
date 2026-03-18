/**
 * TV Maze API types
 * @see http://api.tvmaze.com
 */

export type ShowImage = {
  medium?: string;
  original?: string;
};

export type ShowRating = {
  average: number | null;
};

export type ApiCountry = {
  name: string;
  code: string;
  timezone: string;
};

export type ApiNetwork = {
  id: number;
  name: string;
  country: ApiCountry | null;
  officialSite: string | null;
};

export type ShowExternals = {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
};

export type ApiLink = {
  href: string;
  name?: string;
};

export type ShowLinks = {
  self: ApiLink;
  previousepisode?: ApiLink;
  nextepisode?: ApiLink;
};

export type ShowSchedule = {
  time: string;
  days: string[];
};

export type Show = {
  id: number;
  name: string;
  url?: string;
  type?: string;
  language?: string | null;
  genres?: string[];
  status?: string;
  runtime?: number | null;
  averageRuntime?: number | null;
  premiered?: string | null;
  ended?: string | null;
  officialSite?: string | null;
  schedule?: ShowSchedule;
  rating?: ShowRating | null;
  weight?: number;
  network?: ApiNetwork | null;
  webChannel?: ApiNetwork | null;
  dvdCountry?: unknown | null;
  externals?: ShowExternals;
  image?: ShowImage | null;
  summary?: string | null;
  updated?: number;
  _links?: ShowLinks;
  _embedded?: ShowEmbedded;
};

export type ShowEmbedded = {
  cast?: CastEntry[];
};

export type CastPerson = {
  id: number;
  url?: string;
  name: string;
  country?: ApiCountry | null;
  birthday?: string | null;
  deathday?: string | null;
  gender?: string;
  image?: ShowImage | null;
  updated?: number;
  _links?: { self: ApiLink };
};

export type CastCharacter = {
  id: number;
  url?: string;
  name: string;
  image?: ShowImage | null;
  _links?: { self: ApiLink };
};

export type CastEntry = {
  person: CastPerson;
  character: CastCharacter;
  self?: boolean;
  voice?: boolean;
};

/** Response item from GET /search/shows?q= */
export type SearchShowItem = {
  score: number;
  show: Show;
};

/** Episode link in _links */
export type EpisodeLink = {
  href: string;
  name?: string;
};

/** Episode rating (e.g. in schedule/full) */
export type EpisodeRating = {
  average: number | null;
};

/** Cast credit from GET /people/:id/castcredits?embed=show */
export type PersonCastCredit = {
  self?: boolean;
  voice?: boolean;
  _links?: {
    show: ApiLink & { name?: string };
    character: ApiLink & { name?: string };
  };
  _embedded?: {
    show?: Show;
  };
};

/** Item from GET /schedule/full — episode with embedded show */
export type ScheduleFullItem = {
  id?: number;
  url?: string;
  name?: string;
  season?: number;
  number?: number;
  type?: string;
  airdate: string;
  airtime?: string;
  airstamp?: string;
  runtime?: number | null;
  rating?: EpisodeRating | null;
  image?: ShowImage | null;
  summary?: string | null;
  _links?: {
    self: ApiLink;
    show: ApiLink & { name?: string };
  };
  _embedded?: {
    show?: Show;
  };
};
