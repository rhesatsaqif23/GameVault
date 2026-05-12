/**
 * Represents a Game object in the GameVault catalog based on the required structure.
 */
export interface Game {
  id: string;
  title: string;
  slug: string;
  coverImage: string;          // Main cover image URL
  screenshots: string[];       // Array of screenshot URLs (minimum 3 items)
  description: string;         // Short description (1-2 sentences)
  longDescription: string;     // Long description (3-5 paragraphs)
  genres: string[];            // Game genres, e.g., ["RPG", "Open World"]
  platforms: string[];         // Supported platforms, e.g., ["PC", "PS5", "Xbox"]
  developer: string;           // Developer studio name
  publisher: string;           // Publisher name
  releaseDate: string;         // Release date in YYYY-MM-DD format
  rating: number;              // Scale 0-10
  price: number;               // Price in IDR, 0 means free
  tags: string[];              // Additional tags, e.g., ["Multiplayer", "Story Rich"]
  featured: boolean;           // If true, the game is displayed in the homepage banner
  banner?: string;             // Optional banner image/gif
}
