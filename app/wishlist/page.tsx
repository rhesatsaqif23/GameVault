"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { getGamesByIds } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import Link from "next/link";
import Button from "@/components/ui/Button";

const WishlistPage = () => {
  const { wishlist, isInitialized } = useWishlist();
  const wishlistedGames = getGamesByIds(wishlist);

  if (!isInitialized) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            My Wishlist
          </h1>
          <p className="text-lg text-medium text-foreground/80">
            Keep track of games you want to play later
          </p>
        </div>

        {wishlistedGames.length > 0 && (
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold border border-primary/20">
            {wishlistedGames.length}{" "}
            {wishlistedGames.length === 1 ? "Game" : "Games"} Saved
          </div>
        )}
      </div>

      {wishlistedGames.length > 0 ? (
        <GameGrid games={wishlistedGames} />
      ) : (
        <div className="max-w-2xl mx-auto text-center mb-12 py-20 px-6 bg-card rounded-2xl border border-border shadow-xl">
          <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-lg text-foreground/80 mb-10">
            Explore our catalog and save your favorite games to see them here
            later.
          </p>
          <Link href="/games">
            <Button size="lg" className="px-10">
              Start Exploring
            </Button>
          </Link>
        </div>
      )}
    </main>
  );
};

export default WishlistPage;
