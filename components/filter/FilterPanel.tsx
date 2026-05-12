'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllGenres, getAllPlatforms } from '@/lib/games';
import { ChevronDown, Check, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

const AccordionItem = ({ 
  title, 
  children, 
  count, 
  onClear, 
  isExpanded, 
  onToggle 
}: { 
  title: string, 
  children: React.ReactNode, 
  count?: number, 
  onClear?: () => void,
  isExpanded: boolean,
  onToggle: () => void
}) => {
  const hasCount = typeof count === 'number' && count > 0;

  return (
    <div className="border-b border-border/50 last:border-0">
      <div className="flex items-center justify-between">
        <button
          onClick={onToggle}
          className="grow flex items-center justify-between py-4 group transition-colors"
        >
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
            {title}
            {hasCount && (
              <span className="ml-2 text-[11px] md:text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                {count}
              </span>
            )}
          </span>
        </button>
        <div className="flex items-center gap-3">
          {onClear && hasCount && (
            <button 
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="text-[11px] md:text-xs font-bold text-primary hover:underline uppercase tracking-tighter"
            >
              Clear
            </button>
          )}
          <button onClick={onToggle}>
            <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isExpanded ? 'rotate-180 text-foreground' : 'text-foreground/80 group-hover:text-primary'}`} />
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();
  
  const [expandedIds, setExpandedIds] = useState<string[]>(['genre']);
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const toggleAccordion = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const allGenres = getAllGenres();
  const allPlatforms = getAllPlatforms();
  
  const currentGenres = searchParams.get('genre')?.split(',') || [];
  const currentPlatforms = searchParams.get('platform')?.split(',') || [];
  const currentSort = searchParams.get('sort') || 'newest';
  const currentMinRating = searchParams.get('minRating') || '';

  const updateURL = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'All') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.replace(`/games?${params.toString()}`);
  }, [searchParams, router]);

  const toggleFilter = useCallback((key: string, value: string) => {
    let currentValues = searchParams.get(key)?.split(',') || [];
    if (currentValues.includes(value)) {
      currentValues = currentValues.filter(v => v !== value);
    } else {
      currentValues.push(value);
    }
    updateURL({ [key]: currentValues.length === 0 ? null : currentValues.join(',') });
  }, [searchParams, updateURL]);

  // Sync internal state with URL - use a ref to track the last synced value
  const lastUrlMin = React.useRef(searchParams.get('minPrice') || '');
  const lastUrlMax = React.useRef(searchParams.get('maxPrice') || '');

  useEffect(() => {
    const urlMin = searchParams.get('minPrice') || '';
    const urlMax = searchParams.get('maxPrice') || '';
    
    if (urlMin !== lastUrlMin.current) {
      setMinPrice(urlMin);
      lastUrlMin.current = urlMin;
    }
    if (urlMax !== lastUrlMax.current) {
      setMaxPrice(urlMax);
      lastUrlMax.current = urlMax;
    }
  }, [paramsString, searchParams]);

  const sortOptions = [
    { value: 'newest', label: 'Recently Added' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Lowest Price' },
  ];

  const formatPrice = (val: string) => {
    if (!val) return '';
    return val.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handlePriceChange = (setter: (val: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    setter(rawValue);
  };

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col max-h-[calc(100vh-120px)]">
      <div className="p-4 overflow-y-auto custom-scrollbar grow divide-y divide-border/50">
        <AccordionItem 
          title="Genres" 
          isExpanded={expandedIds.includes('genre')} 
          onToggle={() => toggleAccordion('genre')}
          count={currentGenres.length}
          onClear={() => updateURL({ genre: null })}
        >
          <div className="flex flex-wrap gap-2 pt-1">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleFilter('genre', genre)}
                className={`px-4 py-1.5 text-xs md:text-sm font-bold rounded-lg border transition-all duration-200 flex items-center gap-1.5 ${
                  currentGenres.includes(genre)
                    ? "bg-primary border-primary text-white/90 shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-background border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {currentGenres.includes(genre) && <Check className="w-3.5 h-3.5 stroke-3" />}
                {genre}
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Sort By" 
          isExpanded={expandedIds.includes('sort')} 
          onToggle={() => toggleAccordion('sort')}
        >
          <div className="space-y-1.5">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateURL({ sort: opt.value })}
                className={`w-full text-left px-4 py-2.5 text-xs md:text-sm font-bold rounded-lg transition-all duration-200 border ${
                  currentSort === opt.value
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                    : "bg-background border-border/50 text-foreground hover:border-primary/30"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Price" 
          isExpanded={expandedIds.includes('price')} 
          onToggle={() => toggleAccordion('price')}
          count={(minPrice || maxPrice) ? 1 : 0}
          onClear={() => {
            setMinPrice('');
            setMaxPrice('');
            updateURL({ minPrice: null, maxPrice: null });
          }}
        >
          <div className="space-y-3">
              <div className="flex flex-col gap-2.5">
                {/* Min Price */}
                <div 
                  className="flex items-center bg-background border border-border/50 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-primary/30 group cursor-text"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input');
                    input?.focus();
                  }}
                >
                  <div className="px-3 py-2.5 bg-background border-r border-border/50 flex items-center justify-center pointer-events-none">
                    <span className="text-xs md:text-sm font-bold text-foreground">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Min Price"
                    value={formatPrice(minPrice)}
                    onChange={handlePriceChange(setMinPrice)}
                    className="flex-1 px-4 py-2.5 bg-transparent text-xs md:text-sm font-bold outline-none placeholder:text-foreground/30"
                  />
                </div>

                {/* Max Price */}
                <div 
                  className="flex items-center bg-background border border-border/50 rounded-lg overflow-hidden transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-primary/30 group cursor-text"
                  onClick={(e) => {
                    const input = e.currentTarget.querySelector('input');
                    input?.focus();
                  }}
                >
                  <div className="px-3 py-2.5 bg-background border-r border-border/50 flex items-center justify-center pointer-events-none">
                    <span className="text-xs md:text-sm font-bold text-foreground">Rp</span>
                  </div>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Max Price"
                    value={formatPrice(maxPrice)}
                    onChange={handlePriceChange(setMaxPrice)}
                    className="flex-1 px-4 py-2.5 bg-transparent text-xs md:text-sm font-bold outline-none placeholder:text-foreground/30"
                  />
                </div>
              </div>
            <Button 
              size="sm" 
              className="w-full text-[11px] md:text-xs"
              onClick={() => updateURL({ minPrice, maxPrice })}
            >
              Apply Filter
            </Button>
          </div>
        </AccordionItem>


        <AccordionItem 
          title="Platforms" 
          isExpanded={expandedIds.includes('platform')} 
          onToggle={() => toggleAccordion('platform')}
          count={currentPlatforms.length}
          onClear={() => updateURL({ platform: null })}
        >
          <div className="flex flex-wrap gap-2 pt-1">
            {allPlatforms.map((platform) => (
              <button
                key={platform}
                onClick={() => toggleFilter('platform', platform)}
                className={`px-4 py-1.5 text-xs md:text-sm font-bold rounded-lg border transition-all duration-200 flex items-center gap-1.5 ${
                  currentPlatforms.includes(platform)
                    ? "bg-primary border-primary text-white/90 shadow-lg shadow-primary/20 scale-[1.02]"
                    : "bg-background border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {currentPlatforms.includes(platform) && <Check className="w-3.5 h-3.5 stroke-3" />}
                {platform}
              </button>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Rating" 
          isExpanded={expandedIds.includes('rating')} 
          onToggle={() => toggleAccordion('rating')}
          count={currentMinRating ? 1 : 0}
          onClear={() => updateURL({ minRating: null })}
        >
          <div className="space-y-1.5">
            {[9, 8, 7].map((rating) => (
              <button
                key={rating}
                onClick={() => updateURL({ minRating: currentMinRating === rating.toString() ? null : rating.toString() })}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all border ${
                  currentMinRating === rating.toString()
                    ? "bg-primary border-primary text-white shadow-md"
                    : "bg-background border-border/50 text-foreground hover:border-primary/20"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Star className={`w-4 h-4 ${currentMinRating === rating.toString() ? "fill-white text-white" : "fill-yellow-400 text-yellow-400"}`} />
                  <span className="text-xs md:text-sm font-bold">{rating} & Up</span>
                </div>
              </button>
            ))}
          </div>
        </AccordionItem>
      </div>

      {(currentGenres.length > 0 || currentPlatforms.length > 0 || currentSort !== 'newest' || minPrice || maxPrice || currentMinRating) && (
        <div className="p-4 pt-2 border-t border-border/50">
          <Button
            onClick={() => {
              setMinPrice('');
              setMaxPrice('');
              router.replace('/games');
            }}
            className="w-full py-2 text-xs md:text-sm tracking-wide"
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
