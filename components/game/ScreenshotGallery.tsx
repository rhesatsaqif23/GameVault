'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ScreenshotGalleryProps {
  screenshots: string[];
}

const ScreenshotGallery = ({ screenshots }: ScreenshotGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (screenshots.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-2xl border border-dashed border-border text-foreground/40 font-medium">
        No screenshots available for this game.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {screenshots.map((src, index) => (
          <div 
            key={index} 
            className="group relative aspect-video cursor-zoom-in rounded-xl overflow-hidden border border-border shadow-sm"
            onClick={() => setSelectedImage(src)}
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

      {/* Basic Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-primary transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image 
              src={selectedImage} 
              alt="Fullscreen Screenshot"
              className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotGallery;
