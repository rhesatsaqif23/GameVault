import React from 'react';
import { Game } from '@/types/game';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
}

const GameGrid = ({ games }: GameGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
