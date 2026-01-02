// Movie data from OMDB API
export interface OMDBMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

export interface OMDBSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface OMDBSearchResponse {
  Search?: OMDBSearchResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

// Our beer rating data stored in Supabase
export interface BeerRating {
  id: string;
  imdb_id: string;
  confusion_beers: number;
  enhancement_beers: number;
  rating_blurb: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Combined movie + rating for display
export interface RatedMovie {
  // From our DB
  id: string;
  imdb_id: string;
  confusion_beers: number;
  enhancement_beers: number;
  rating_blurb: string;
  tags: string[];
  // From OMDB
  title?: string;
  year?: string;
  poster?: string;
  plot?: string;
  director?: string;
  actors?: string;
  genre?: string;
  runtime?: string;
  imdbRating?: string;
  rated?: string;
}

// Tag definitions
export type MovieTag = 
  | 'cult_classic'
  | 'blockbuster'
  | 'horror'
  | 'comedy'
  | 'sci_fi'
  | 'action'
  | 'drama'
  | 'documentary'
  | 'animated'
  | 'foreign';

export const TAG_LABELS: Record<MovieTag, string> = {
  cult_classic: 'Cult Classic',
  blockbuster: 'Blockbuster',
  horror: 'Horror',
  comedy: 'Comedy',
  sci_fi: 'Sci-Fi',
  action: 'Action',
  drama: 'Drama',
  documentary: 'Documentary',
  animated: 'Animated',
  foreign: 'Foreign',
};

// Beer rating category labels
export const CONFUSION_LABELS: Record<number, string> = {
  1: 'Crystal Clear',
  2: 'Easy Follow',
  3: 'Pay Attention',
  4: 'Some Head-Scratching',
  5: 'Getting Weird',
  6: 'Take Notes',
  7: 'Rewatch Required',
  8: 'Brain Hurts',
  9: 'WTF Is Happening',
  10: 'Pure Chaos',
};

export const ENHANCEMENT_LABELS: Record<number, string> = {
  1: 'Stone Sober',
  2: 'Optional Sip',
  3: 'Light Buzz OK',
  4: 'Casual Drink',
  5: 'Better With Beer',
  6: 'Highly Recommended',
  7: 'Essential Viewing',
  8: 'Peak Experience',
  9: 'Mandatory Drinking',
  10: 'Drunk Only',
};
