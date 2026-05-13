import gamesData from '@/data/games.json';
import { Game } from '@/types/game';

const games = gamesData as Game[];

/**
 * Returns all games.
 */
export const getAllGames = (): Game[] => {
  return games;
};

/**
 * Returns a single game by its slug.
 */
export const getGameBySlug = (slug: string): Game | undefined => {
  return games.find((game) => game.slug === slug);
};

/**
 * Returns games filtered by a list of IDs.
 */
export const getGamesByIds = (ids: string[]): Game[] => {
  return games.filter((game) => ids.includes(game.id.toString()));
};

/**
 * Returns games based on search query and filters.
 */
export const searchGames = (
  query?: string, 
  genre?: string, 
  platform?: string,
  minPrice?: number,
  maxPrice?: number,
  minRating?: number,
  year?: string,
  sort: string = 'alphabetical',
  sortDir: string = 'asc'
): Game[] => {
  let filtered = [...games];

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(game => 
      game.title.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q) ||
      game.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (genre && genre !== 'All') {
    const selectedGenres = genre.split(',');
    filtered = filtered.filter(game => 
      selectedGenres.some(g => game.genres.includes(g))
    );
  }

  if (platform && platform !== 'All') {
    const selectedPlatforms = platform.split(',');
    filtered = filtered.filter(game => 
      selectedPlatforms.some(p => game.platforms.includes(p))
    );
  }

  if (minPrice !== undefined) {
    filtered = filtered.filter(game => game.price >= minPrice);
  }

  if (maxPrice !== undefined) {
    filtered = filtered.filter(game => game.price <= maxPrice);
  }

  if (minRating !== undefined) {
    filtered = filtered.filter(game => game.rating >= minRating);
  }

  if (year) {
    const selectedYears = year.split(',');
    filtered = filtered.filter((g) => 
      selectedYears.includes(new Date(g.releaseDate).getFullYear().toString())
    );
  }

  // Sorting
  const asc = sortDir === "asc";
  if (sort === "alphabetical") {
    filtered.sort((a, b) => 
      asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  } else if (sort === "rating") {
    filtered.sort((a, b) => asc ? a.rating - b.rating : b.rating - a.rating);
  } else if (sort === "price_low") {
    filtered.sort((a, b) => asc ? a.price - b.price : b.price - a.price);
  } else if (sort === "newest") {
    filtered.sort((a, b) =>
      asc
        ? new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        : new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    );
  }

  return filtered;
};

/**
 * Returns featured games.
 */
export const getFeaturedGames = (): Game[] => {
  return games.filter((game) => game.featured);
};

/**
 * Returns games with banners.
 */
export const getBannerGames = (): Game[] => {
  return games.filter((game) => game.banner);
};

/**
 * Returns a list of all unique genres that actually have games.
 */
export const getAllGenres = (): string[] => {
  const genresSet = new Set<string>();
  games.forEach(game => {
    game.genres.forEach(genre => genresSet.add(genre));
  });
  return Array.from(genresSet).sort();
};

/**
 * Returns a list of all unique platforms that actually have games.
 */
export const getAllPlatforms = (): string[] => {
  const platformsSet = new Set<string>();
  games.forEach(game => {
    game.platforms.forEach(platform => platformsSet.add(platform));
  });
  return Array.from(platformsSet).sort();
};

/**
 * Returns a list of unique release years (descending), derived from game data.
 */
export const getAllYears = (): number[] => {
  const yearsSet = new Set<number>();
  games.forEach(game => {
    if (game.releaseDate) {
      yearsSet.add(new Date(game.releaseDate).getFullYear());
    }
  });
  return Array.from(yearsSet).sort((a, b) => b - a);
};
