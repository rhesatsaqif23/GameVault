"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Game } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeroBannerProps {
  games: Game[];
}

const HeroBanner = ({ games }: HeroBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  }, [games.length]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  }, [games.length]);

  useEffect(() => {
    if (games.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [games.length, handleNext]);

  if (games.length === 0) return null;

  const currentGame = games[currentIndex];

  return (
    <div className="relative h-[450px] md:h-[calc(100vh-64px)] w-full overflow-hidden bg-[#090610] shadow-2xl group/banner">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={currentGame.banner || currentGame.coverImage}
            alt={currentGame.title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#090610]/40 via-[#090610]/80 to-[#090610] md:bg-linear-to-r md:from-[#090610] md:via-[#1d103a]/80 md:to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center max-w-3xl z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex flex-col items-start"
          >
            <h1 className="text-3xl md:text-7xl font-black tracking-wide text-white mb-3 md:mb-6 drop-shadow-lg">
              {currentGame.title}
            </h1>

            <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-8 line-clamp-3 drop-shadow-md max-w-2xl">
              {currentGame.description}
            </p>

            <div className="flex items-center gap-6">
              <Link href={`/games/${currentGame.slug}`}>
                <Button size="lg">Explore Now</Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Manual Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-10 z-30 opacity-0 group-hover/banner:opacity-100 transition-opacity duration-300 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className="p-3 text-white/50 hover:text-white transition-all pointer-events-auto rounded-full"
        >
          <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={2} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="p-3 text-white/50 hover:text-white transition-all pointer-events-auto rounded-full"
        >
          <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={2} />
        </motion.button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {games.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-primary w-10 shadow-[0_0_10px_rgba(109,81,194,0.8)]"
                : "bg-white/30 hover:bg-white/50 w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
