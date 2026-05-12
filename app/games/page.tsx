'use client';

import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchGames } from '@/lib/games';
import GameGrid from '@/components/game/GameGrid';
import FilterPanel from '@/components/filter/FilterPanel';
import SearchBar from '@/components/filter/SearchBar';

const GameListContent = () => {
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const genre = searchParams.get('genre') || 'All';
  const platform = searchParams.get('platform') || 'All';
  const sort = searchParams.get('sort') || 'newest';

  const filteredGames = useMemo(() => {
    const result = searchGames(query, genre, platform);
    
    // Sorting logic
    if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    }
    
    return result;
  }, [query, genre, platform, sort]);

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Discovery</h1>
          <p className="text-foreground/60">Explore {filteredGames.length} amazing games from Raion Community</p>
        </div>
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <FilterPanel />
        </aside>
        
        <div className="grow">
          {filteredGames.length > 0 ? (
            <GameGrid games={filteredGames} />
          ) : (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
              <h3 className="text-xl font-semibold mb-2">No games found</h3>
              <p className="text-foreground/60">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const GameListPage = () => {
  return (
    <Suspense fallback={
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-card rounded-lg w-1/3"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-64 shrink-0 h-[400px] bg-card rounded-xl"></div>
            <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-[300px] bg-card rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    }>
      <GameListContent />
    </Suspense>
  );
};

export default GameListPage;
