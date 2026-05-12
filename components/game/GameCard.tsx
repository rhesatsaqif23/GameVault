'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import WishlistButton from './WishlistButton';
import RatingBadge from './RatingBadge';
import PriceBadge from './PriceBadge';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
      <Link href={`/games/${game.slug}`} className="block relative aspect-16/10 overflow-hidden">
        <Image 
          src={game.coverImage} 
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-1.5">
            {game.genres.slice(0, 2).map((g) => (
              <span key={g} className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {g}
              </span>
            ))}
          </div>
          <RatingBadge rating={game.rating} />
        </div>
        
        <Link href={`/games/${game.slug}`}>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {game.title}
          </h3>
        </Link>
        
        <p className="text-sm text-foreground/60 line-clamp-2 mb-4 min-h-[40px]">
          {game.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <PriceBadge price={game.price} />
          <WishlistButton gameId={game.id} showText={false} className="p-2.5 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
