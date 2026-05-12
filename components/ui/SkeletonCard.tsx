import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-16/10 bg-foreground/5" />
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-1.5">
            <div className="w-16 h-5 bg-foreground/5 rounded-full" />
            <div className="w-16 h-5 bg-foreground/5 rounded-full" />
          </div>
          <div className="w-10 h-6 bg-foreground/5 rounded-lg" />
        </div>

        <div className="w-3/4 h-6 bg-foreground/5 rounded-md mb-2" />
        <div className="space-y-2 mb-4">
          <div className="w-full h-4 bg-foreground/5 rounded-md" />
          <div className="w-5/6 h-4 bg-foreground/5 rounded-md" />
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <div className="w-20 h-6 bg-foreground/5 rounded-md" />
          <div className="w-10 h-10 bg-foreground/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
