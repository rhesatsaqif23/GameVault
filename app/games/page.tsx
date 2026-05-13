"use client";

import React, { useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchGames } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import FilterPanel from "@/components/filter/FilterPanel";
import SearchBar from "@/components/filter/SearchBar";
import FilterDrawer from "@/components/filter/FilterDrawer";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

const GameListContent = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "All";
  const platform = searchParams.get("platform") || "All";
  const sort = searchParams.get("sort") || "alphabetical";
  const sortDir = searchParams.get("sortDir") || "asc";
  const year = searchParams.get("year") || "";
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const minRating = searchParams.get("minRating")
    ? Number(searchParams.get("minRating"))
    : undefined;

  const filteredGames = useMemo(() => {
    return searchGames(
      query,
      genre,
      platform,
      minPrice,
      maxPrice,
      minRating,
      year,
      sort,
      sortDir
    );
  }, [query, genre, platform, sort, sortDir, year, minPrice, maxPrice, minRating]);

  // URL-based Pagination
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGames.slice(start, start + itemsPerPage);
  }, [filteredGames, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newPage === 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    router.push(`/games?${params.toString()}`);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
            Discovery
          </h1>
          <p className="text-sm md:text-lg text-medium text-foreground/80">
            Explore {filteredGames.length} amazing games from GameVerse
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full md:w-auto"
        >
          <SearchBar />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col lg:flex-row gap-6 md:gap-8"
      >
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 self-start">
          <div className="hidden lg:block">
            <FilterPanel />
          </div>
          <FilterDrawer />
        </aside>

        <div className="grow">
          {paginatedGames.length > 0 ? (
            <>
              <GameGrid games={paginatedGames} />
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 pb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "bg-card border border-border text-foreground hover:border-primary/50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-card/50 rounded-2xl border border-dashed border-border/50 flex flex-col items-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">No games found</h3>
              <p className="text-foreground/60 max-w-sm mx-auto mb-8">
                We couldn&apos;t find any games matching your current filters. Try adjusting your search or clearing filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => router.push('/games')}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.main>
  );
};

const GameListPage = () => {
  return (
    <Suspense
      fallback={
        <main className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-10">
            <div className="space-y-2">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-64" />
            </div>
            <Skeleton className="h-12 w-full md:w-80" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 shrink-0">
              <Skeleton className="h-[500px] w-full" />
            </aside>
            <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-16/10 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </main>
      }
    >
      <GameListContent />
    </Suspense>
  );
};

export default GameListPage;
