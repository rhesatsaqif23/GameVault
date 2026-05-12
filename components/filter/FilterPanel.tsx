'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllGenres, getAllPlatforms } from '@/lib/games';

const FilterPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const genres = ['All', ...getAllGenres()];
  const platforms = ['All', ...getAllPlatforms()];
  
  const currentGenre = searchParams.get('genre') || 'All';
  const currentPlatform = searchParams.get('platform') || 'All';
  const currentSort = searchParams.get('sort') || 'newest';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'All') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/games?${params.toString()}`);
  };

  return (
    <div className="space-y-8 bg-card p-6 rounded-2xl border border-border shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Sorting
        </h3>
        <select 
          value={currentSort}
          onChange={(e) => updateFilter('sort', e.target.value)}
          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          <option value="newest">Release Date</option>
          <option value="rating">Highest Rating</option>
          <option value="price_low">Lowest Price</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Genres
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => updateFilter('genre', genre)}
              className={`px-4 py-2 text-left text-sm rounded-xl transition-all duration-200 ${
                currentGenre === genre 
                  ? "bg-primary text-white font-bold shadow-lg shadow-primary/20" 
                  : "bg-background text-foreground/70 hover:bg-primary/5 hover:text-primary font-medium"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Platforms
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => updateFilter('platform', platform)}
              className={`px-4 py-2 text-left text-sm rounded-xl transition-all duration-200 ${
                currentPlatform === platform 
                  ? "bg-primary text-white font-bold shadow-lg shadow-primary/20" 
                  : "bg-background text-foreground/70 hover:bg-primary/5 hover:text-primary font-medium"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
