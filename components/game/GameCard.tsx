"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Game } from "@/types/game";
import WishlistButton from "./WishlistButton";
import RatingBadge from "./RatingBadge";
import PriceBadge from "./PriceBadge";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className="group relative bg-card rounded-xl border border-border transition-all duration-500 hover:shadow-[0_20px_50px_rgba(109,81,194,0.15)] hover:-translate-y-2 hover:border-primary/30">
      <Link
        href={`/games/${game.slug}`}
        className="block relative aspect-16/10 overflow-hidden rounded-t-xl"
      >
        {isImageLoading && (
          <div className="absolute inset-0 bg-foreground/5 animate-pulse z-10" />
        )}
        <Image
          src={game.coverImage}
          alt={game.title}
          fill
          className={`object-cover transition-all duration-500 group-hover:scale-110 ${
            isImageLoading ? 'scale-110 blur-xl grayscale' : 'scale-100 blur-0 grayscale-0'
          }`}
          onLoad={() => setIsImageLoading(false)}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-4 md:p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-1.5">
            {game.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
          <RatingBadge rating={game.rating} />
        </div>

        <Link href={`/games/${game.slug}`}>
          <h3 className="text-base md:text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {game.title}
          </h3>
        </Link>

        <p className="text-xs md:text-sm text-foreground/80 line-clamp-2 mb-4 min-h-[32px] md:min-h-[40px]">
          {game.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 md:pt-4 border-t border-border">
          <PriceBadge price={game.price} />
          <WishlistButton
            gameId={game.id}
            showText={false}
            className="p-2 md:p-2.5 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
