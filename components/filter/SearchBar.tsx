'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(currentQuery);
  const [prevQuery, setPrevQuery] = useState(currentQuery);

  // Sync internal state with URL immediately if it changes from outside
  if (currentQuery !== prevQuery) {
    setPrevQuery(currentQuery);
    setQuery(currentQuery);
  }

  useEffect(() => {
    // If the local query already matches the URL, do nothing
    const currentUrlQuery = new URLSearchParams(searchParams.toString()).get('q') || '';
    if (query === currentUrlQuery) return;

    // Set a timeout to update the URL after typing stops
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      
      // Use replace to avoid polluting history with every keystroke
      router.replace(`/games?${params.toString()}`, { scroll: false });
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [query, router, searchParams]);

  return (
    <div className="relative w-full md:w-100 lg:w-120 group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-foreground group-focus-within:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for games..." 
        aria-label="Search for games"
        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm md:text-base font-medium"
      />
    </div>
  );
};

export default SearchBar;
