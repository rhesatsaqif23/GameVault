'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ScreenshotGalleryProps {
  screenshots: string[];
}

const ScreenshotGallery = ({ screenshots }: ScreenshotGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  if (screenshots.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-border text-foreground/40 font-medium">
        No screenshots available for this game.
      </div>
    );
  }

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex + 1) % screenshots.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((currentIndex - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {screenshots.map((src, index) => (
          <div 
            key={index} 
            className="group relative aspect-video cursor-zoom-in rounded-xl overflow-hidden border border-border shadow-sm"
            onClick={() => setCurrentIndex(index)}
          >
            <Image 
              src={src} 
              alt={`Screenshot ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Lightbox */}
      {currentIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setCurrentIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-all z-60"
            onClick={() => setCurrentIndex(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 md:left-10 p-4 text-white/30 hover:text-white transition-all z-60 bg-white/5 rounded-full hover:bg-white/10"
            onClick={handlePrev}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            className="absolute right-4 md:right-10 p-4 text-white/30 hover:text-white transition-all z-60 bg-white/5 rounded-full hover:bg-white/10"
            onClick={handleNext}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-full max-h-full"
            >
              <Image 
                src={screenshots[currentIndex]} 
                alt="Fullscreen Screenshot"
                className="object-contain max-w-full max-h-full rounded-lg shadow-2xl pointer-events-auto"
                width={1920}
                height={1080}
              />
            </motion.div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-bold tracking-widest bg-white/5 px-6 py-2 rounded-full">
            {currentIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotGallery;
