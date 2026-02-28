import type { Media } from "./types";
import { faker } from "@faker-js/faker";

function gen_summary(): Media.Summary {
  return {
    id: "",
    title: faker.music.songName(),
    poster_url: faker.image.urlPicsumPhotos(),
    is_movie: faker.datatype.boolean(),
    is_adult: faker.datatype.boolean()
  };
}

function gen_season(i: number): Media.Season {
  return {
    season_num: i,
    episodes: faker.number.int({ min: 1, max: 1024 }),
    description: faker.lorem.paragraph(),
    poster_path: faker.image.url({ width: 300, height: 300 }),
  }
}

function gen_details(): Media.Details {
  const summary = gen_summary();

  let series: Media.SeriesDetails | undefined;
  let movie: Media.MovieDetails | undefined;

  if (!summary.is_movie) {
    series = {
      mono_season: true,
      seasons: [gen_season(1)],
    }
  } else {
    movie = {
      runtime_mins: 150,
    }
  }

  return {
    ...summary,
    description: faker.lorem.paragraph(),
    backdrop_url: faker.helpers.maybe(() => faker.image.url()),
    status: "STAT",
    genres: faker.helpers.arrayElements([
      'Sci-Fi', 'Drama', 'Comedy', 'Horror', 'Action', 'Romance'
    ], { min: 1, max: 3 }),
    release_date: faker.date.anytime().toString(),
    series: series,
    movie: movie,
  };
}

export async function FetchShowcaseList(): Promise<Media.ApiResponse<Media.Details[]>> {
  return { success: true, data: Array.from({ length: 5 }, gen_details) };
}

export async function FetchCategoryList(): Promise<Media.ApiResponse<Media.Category[]>> {
  return {
    success: true,
    data: Array.from({ length: 5 }, (_, i) => ({
      label: `category-${i}`,
      media: Array.from({ length: 5 }, gen_summary),
    }))
  };
}
