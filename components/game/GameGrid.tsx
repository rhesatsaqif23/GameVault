"use client";

import { Game } from '@/types/game';
import GameCard from './GameCard';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface GameGridProps {
  games: Game[];
}

const GameGrid = ({ games }: GameGridProps) => {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
    >
      <AnimatePresence mode="popLayout">
        {games.map((game) => (
          <motion.div
            key={game.id}
            layout
            variants={item}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <GameCard game={game} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameGrid;
