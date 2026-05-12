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
export const searchGames = (query?: string, genre?: string, platform?: string): Game[] => {
  const filtered = [...games];

  const matched = query
    ? filtered.filter(game => {
        const q = query.toLowerCase();
        return (
          game.title.toLowerCase().includes(q) ||
          game.description.toLowerCase().includes(q) ||
          game.tags.some(t => t.toLowerCase().includes(q))
        );
      })
    : filtered;

  const byGenre = genre && genre !== 'All'
    ? matched.filter(game => game.genres.includes(genre))
    : matched;

  const result = platform && platform !== 'All'
    ? byGenre.filter(game => game.platforms.includes(platform))
    : byGenre;

  return result;
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
  const genresSet = new Set<string>();
  games.forEach(game => game.genres.forEach(g => genresSet.add(g)));
  return Array.from(genresSet).sort();
};

/**
 * Returns a list of all unique platforms.
 */
export const getAllPlatforms = (): string[] => {
  const platformsSet = new Set<string>();
  games.forEach(game => game.platforms.forEach(p => platformsSet.add(p)));
  return Array.from(platformsSet).sort();
};
