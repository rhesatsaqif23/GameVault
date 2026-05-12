"use client";

import React from 'react';
import { Game } from '@/types/game';
import GameCard from './GameCard';
import { motion, AnimatePresence } from 'framer-motion';

interface GameGridProps {
  games: Game[];
}

const GameGrid = ({ games }: GameGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      <AnimatePresence mode="popLayout">
        {games.map((game) => (
          <motion.div
            key={game.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GameGrid;
