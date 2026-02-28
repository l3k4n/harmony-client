export namespace Media {
  export interface Summary {
    id: string;
    title: string;
    poster_url?: string;
    is_movie: boolean;
    is_adult: boolean;
  }

  export interface Season {
    season_num: number;
    episodes: number;
    description: string;
    poster_path: string;
  }

  export interface SeriesDetails {
    mono_season: boolean;
    seasons: Season[];
  }

  export interface MovieDetails {
    runtime_mins: number;
  }

  export interface Details extends Summary {
    description: string;
    backdrop_url?: string;
    status: string;
    genres: string[];
    release_date: string;
    series?: SeriesDetails;
    movie?: MovieDetails;
  };

  export interface Category {
    label: string;
    media: Summary[]
  };

  export type ApiResponse<T> = { success: true; data: T } | { success: false; err: string };
}

