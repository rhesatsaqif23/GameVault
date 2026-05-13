import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameCard from './GameCard';
import { Game } from '@/types/game';

// Mock the hooks and next components
vi.mock('@/hooks/useWishlist', () => ({
  useWishlist: () => ({
    isInWishlist: vi.fn().mockReturnValue(false),
    addToWishlist: vi.fn(),
    removeFromWishlist: vi.fn(),
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

const mockGame: Game = {
  id: 'test-1',
  title: 'Test Game',
  slug: 'test-game',
  description: 'Test description',
  longDescription: 'Long test description',
  coverImage: 'https://test.com/image.jpg',
  screenshots: [],
  price: 50000,
  rating: 4.5,
  genres: ['Action'],
  platforms: ['PC'],
  developer: 'Test Dev',
  publisher: 'Test Pub',
  releaseDate: '2024-01-01',
  tags: ['Tag1'],
  featured: false
};

describe('GameCard', () => {
  it('renders game information correctly', () => {
    render(<GameCard game={mockGame} />);
    
    expect(screen.getByText('Test Game')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders price correctly', () => {
    render(<GameCard game={mockGame} />);
    expect(screen.getByText(/Rp50\.000/)).toBeInTheDocument();
  });
});
