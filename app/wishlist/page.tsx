"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { getGamesByIds } from "@/lib/games";
import GameGrid from "@/components/game/GameGrid";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

const WishlistPage = () => {
  const { wishlist, isInitialized } = useWishlist();
  const wishlistedGames = getGamesByIds(wishlist);

  if (!isInitialized) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 py-8 md:py-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
            My Wishlist
          </h1>
          <p className="text-sm md:text-lg text-medium text-foreground/80">
            Keep track of games you want to play later
          </p>
        </motion.div>

        {wishlistedGames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-primary/10 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base font-bold border border-primary/20"
          >
            {wishlistedGames.length}{" "}
            {wishlistedGames.length === 1 ? "Game" : "Games"} Saved
          </motion.div>
        )}
      </div>

      {wishlistedGames.length > 0 ? (
        <GameGrid games={wishlistedGames} />
      ) : (
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12 py-12 md:py-20 px-4 md:px-6 bg-card rounded-2xl border border-border shadow-xl">
          <div className="bg-primary/10 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <svg
              className="w-8 h-8 md:w-12 md:h-12 text-primary"
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
          <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-sm md:text-lg text-foreground/80 mb-8 md:mb-10">
            Explore our catalog and save your favorite games to see them here
            later.
          </p>
          <Link href="/games">
            <Button size="lg" className="px-10 w-full sm:w-auto">
              Start Exploring
            </Button>
          </Link>
        </div>
      )}
    </motion.main>
  );
};

export default WishlistPage;
