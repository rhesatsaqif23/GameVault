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
  minRating?: number
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

  return filtered;
};

/**
 * Returns featured games.
 */
export const getFeaturedGames = (): Game[] => {
  return games.filter((game) => game.featured);
};

/**
 * Returns a list of all unique genres.
 */
export const getAllGenres = (): string[] => {
  const commonGenres = [
    'Action', 'Adventure', 'RPG', 'Strategy', 'Puzzle', 
    'Simulation', 'Horror', 'Indie', 'Platformer', 'Racing', 
    'Sports', 'Casual', 'Fighting', 'Stealth'
  ];
  return commonGenres.sort();
};

/**
 * Returns a list of all unique platforms.
 */
export const getAllPlatforms = (): string[] => {
  const commonPlatforms = [
    'PC', 'PS5', 'Xbox Series X', 'Xbox Series S', 'Nintendo Switch', 'Web'
  ];
  return commonPlatforms.sort();
};
