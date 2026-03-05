import type { Media } from './types';

const format = {
  realease_year: (d: Media.Details) => {
    if (!d.release_date) return 'BAD_DATE';
    return new Date(d.release_date).getFullYear();
  },

  num_season_episodes: (s: Media.SeriesDetails) => {
    if (!s.mono_season) return `${s.seasons.length} seasons`;
    return `${s.seasons.length ? s.seasons[0].episodes : 0} episodes`;
  },

  runtime: (mv: Media.MovieDetails) => {
    const h = Math.floor(mv.runtime_mins / 60);
    const m = mv.runtime_mins % 60;

    if (h && m) return `${h}h ${m}m`;
    else if (h) return `${h}h`;
    else return `${m}m`;
  },
};

export default format;
