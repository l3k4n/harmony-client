export interface Show {
  id: number;
  title: string;
  genre: string;
  rating: number;
  year: number;
  image: string;
  featured?: boolean;
  backdrop?: string;
  description?: string;
  episodes?: number;
  duration?: string;
  cast?: string[];
  director?: string;
}

export interface Category {
  name: string;
  shows: Show[];
}

export const shows: Show[] = [
  { id: 1, title: "Echoes of Tomorrow", genre: "Sci-Fi", rating: 9.2, year: 2025, image: "https://picsum.photos/seed/movie1/400/600", featured: true },
  { id: 2, title: "The Last Kingdom", genre: "Drama", rating: 8.8, year: 2024, image: "https://picsum.photos/seed/movie2/400/600" },
  { id: 3, title: "Midnight Runner", genre: "Action", rating: 8.5, year: 2024, image: "https://picsum.photos/seed/movie3/400/600" },
  { id: 4, title: "Neon Dreams", genre: "Thriller", rating: 8.9, year: 2025, image: "https://picsum.photos/seed/movie4/400/600" },
  { id: 5, title: "Forgotten Realms", genre: "Fantasy", rating: 7.9, year: 2024, image: "https://picsum.photos/seed/movie5/400/600" },
  { id: 6, title: "The Deep End", genre: "Crime", rating: 8.7, year: 2025, image: "https://picsum.photos/seed/movie6/400/600" },
  { id: 7, title: "Starfall", genre: "Adventure", rating: 8.3, year: 2024, image: "https://picsum.photos/seed/movie7/400/600" },
  { id: 8, title: "Silent Voices", genre: "Mystery", rating: 8.6, year: 2025, image: "https://picsum.photos/seed/movie8/400/600" },
  { id: 9, title: "Pulse", genre: "Horror", rating: 7.8, year: 2024, image: "https://picsum.photos/seed/movie9/400/600" },
  { id: 10, title: "Golden Hour", genre: "Romance", rating: 8.1, year: 2025, image: "https://picsum.photos/seed/movie10/400/600" },
  { id: 11, title: "Binary Stars", genre: "Sci-Fi", rating: 8.4, year: 2024, image: "https://picsum.photos/seed/movie11/400/600" },
  { id: 12, title: "The Covenant", genre: "Drama", rating: 9.0, year: 2025, image: "https://picsum.photos/seed/movie12/400/600" },
]

export const categories: Category[] = [
  { name: "Trending Now", shows: shows.slice(0, 6) },
  { name: "Popular on Harmony", shows: shows.slice(2, 8) },
  { name: "New Releases", shows: shows.slice(4, 10) },
  { name: "Critics' Choice", shows: [...shows.slice(0, 8)].sort((a, b) => b.rating - a.rating) },
]

export const featuredShows: Show[] = [
  { id: 1, title: "Echoes of Tomorrow", genre: "Sci-Fi", rating: 9.2, year: 2025, image: "https://picsum.photos/seed/movie1/400/600", backdrop: "https://picsum.photos/seed/movie1bg/1920/1080", description: "In a world where technology has evolved beyond imagination, one person must uncover the truth before it's too late.", episodes: 12 },
  { id: 4, title: "Neon Dreams", genre: "Thriller", rating: 8.9, year: 2025, image: "https://picsum.photos/seed/movie4/400/600", backdrop: "https://picsum.photos/seed/movie4bg/1920/1080", description: "In a cyberpunk future, a hacker uncovers a conspiracy that could change humanity forever.", episodes: 10 },
  { id: 7, title: "Starfall", genre: "Adventure", rating: 8.3, year: 2024, image: "https://picsum.photos/seed/movie7/400/600", backdrop: "https://picsum.photos/seed/movie7bg/1920/1080", description: "An interstellar journey to save humanity from extinction.", episodes: 12 },
  { id: 12, title: "The Covenant", genre: "Drama", rating: 9.0, year: 2025, image: "https://picsum.photos/seed/movie12/400/600", backdrop: "https://picsum.photos/seed/movie12bg/1920/1080", description: "A powerful story of faith, sacrifice, and redemption.", episodes: 8 },
]
