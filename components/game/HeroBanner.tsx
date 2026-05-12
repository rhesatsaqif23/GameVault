'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';

interface HeroBannerProps {
  games: Game[];
}

const HeroBanner = ({ games }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (games.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [games.length]);

  if (games.length === 0) return null;

  const currentGame = games[currentIndex];

  return (
    <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-3xl bg-card border border-border shadow-2xl">
      <div className="absolute inset-0 transition-opacity duration-1000">
        <Image 
          src={currentGame.banner || currentGame.coverImage} 
          alt={currentGame.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center max-w-2xl">
        <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {currentGame.genres.map(g => (
            <span key={g} className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest">
              {g}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          {currentGame.title}
        </h1>
        
        <p className="text-lg text-white/70 mb-8 line-clamp-3 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {currentGame.description}
        </p>

        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link 
            href={`/games/${currentGame.slug}`}
            className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-xl"
          >
            Explore Now
          </Link>
          <div className="flex gap-2">
            {games.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
