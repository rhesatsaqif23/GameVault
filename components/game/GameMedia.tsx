'use client';

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GameMediaProps {
  coverImage: string;
  screenshots: string[];
  title: string;
}

const GameMedia = ({ coverImage, screenshots, title }: GameMediaProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const allMedia = [coverImage, ...screenshots];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % allMedia.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + allMedia.length) % allMedia.length);
    }
  };

  return (
    <div className="space-y-12">
      {/* Main Cover Image */}
      <section>
        <div 
          className="group relative aspect-video rounded-3xl overflow-hidden border border-border shadow-2xl cursor-none"
          onClick={() => setCurrentIndex(0)}
        >
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          {allMedia.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white transform scale-90 group-hover:scale-100 transition-transform duration-500 drop-shadow-lg">
                <Maximize2 size={48} strokeWidth={1} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          Gallery
          <span className="text-sm font-medium text-foreground/80 bg-foreground/5 px-3 py-1 rounded-full">{screenshots.length} Images</span>
        </h2>
        
        {screenshots.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {screenshots.map((src, index) => (
              <div 
                key={index} 
                className="group relative aspect-video cursor-none rounded-2xl overflow-hidden border border-border shadow-sm"
                onClick={() => setCurrentIndex(index + 1)}
              >
                <Image 
                  src={src} 
                  alt={`${title} Screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  unoptimized
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={32} strokeWidth={1.5} className="text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-border text-foreground/60 font-medium">
            No additional screenshots available.
          </div>
        )}
      </section>

      {/* Shared Lightbox */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-8 md:p-20 cursor-zoom-out"
            onClick={() => setCurrentIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-all z-110"
              onClick={() => setCurrentIndex(null)}
            >
              <X size={40} />
            </button>

            {/* Navigation Buttons - Only show if more than 1 image */}
            {allMedia.length > 1 && (
              <>
                <button 
                  className="absolute left-6 md:left-12 p-4 text-white/20 hover:text-white transition-all z-110 pointer-events-auto"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={64} strokeWidth={1.5} />
                </button>

                <button 
                  className="absolute right-6 md:right-12 p-4 text-white/20 hover:text-white transition-all z-110 pointer-events-auto"
                  onClick={handleNext}
                >
                  <ChevronRight size={64} strokeWidth={1.5} />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-4 md:p-8">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full max-w-[95vw] max-h-[85vh] flex items-center justify-center"
              >
                <Image 
                  src={allMedia[currentIndex]} 
                  alt="Fullscreen Preview"
                  fill
                  className="object-contain rounded-lg shadow-2xl pointer-events-auto select-none"
                  priority
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Counter - Only show if more than 1 image */}
            {allMedia.length > 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 font-bold tracking-widest px-8 py-3">
                {currentIndex + 1} <span className="mx-2 opacity-30">/</span> {allMedia.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameMedia;
