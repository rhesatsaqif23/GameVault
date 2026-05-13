import { describe, it, expect } from 'vitest';
import { 
  getAllGames, 
  searchGames, 
  getFeaturedGames, 
  getBannerGames, 
  getAllGenres, 
  getAllPlatforms 
} from './games';

describe('games lib', () => {
  it('should return all games when no filters are applied', () => {
    const allGames = getAllGames();
    const result = searchGames();
    expect(result.length).toBe(allGames.length);
  });

  it('should return featured games correctly', () => {
    const featured = getFeaturedGames();
    featured.forEach(game => expect(game.featured).toBe(true));
  });

  it('should return banner games correctly', () => {
    const banners = getBannerGames();
    banners.forEach(game => expect(game.banner).toBeTruthy());
  });

  it('should filter games by search query', () => {
    const query = 'Cyber';
    const result = searchGames(query);
    result.forEach(game => {
      const match = 
        game.title.toLowerCase().includes(query.toLowerCase()) || 
        game.description.toLowerCase().includes(query.toLowerCase()) ||
        game.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      expect(match).toBe(true);
    });
  });

  it('should filter games by genre', () => {
    const genre = 'RPG';
    const result = searchGames('', genre);
    result.forEach(game => {
      expect(game.genres).toContain(genre);
    });
  });

  it('should filter games by multiple years', () => {
    const years = '2024,2023';
    const result = searchGames('', 'All', 'All', undefined, undefined, undefined, years);
    result.forEach(game => {
      const gameYear = new Date(game.releaseDate).getFullYear().toString();
      expect(['2024', '2023']).toContain(gameYear);
    });
  });

  it('should sort games alphabetically (asc)', () => {
    const result = searchGames('', 'All', 'All', undefined, undefined, undefined, '', 'alphabetical', 'asc');
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].title.localeCompare(result[i+1].title)).toBeLessThanOrEqual(0);
    }
  });

  it('should sort games by rating (desc)', () => {
    const result = searchGames('', 'All', 'All', undefined, undefined, undefined, '', 'rating', 'desc');
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].rating).toBeGreaterThanOrEqual(result[i+1].rating);
    }
  });

  it('should return unique genres', () => {
    const genres = getAllGenres();
    expect(genres).toContain('Action');
    expect(new Set(genres).size).toBe(genres.length);
  });

  it('should return unique platforms', () => {
    const platforms = getAllPlatforms();
    expect(platforms).toContain('PC');
    expect(new Set(platforms).size).toBe(platforms.length);
  });
});
