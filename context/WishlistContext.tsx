'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  isInitialized: boolean;
  addToWishlist: (gameId: string) => void;
  removeFromWishlist: (gameId: string) => void;
  isInWishlist: (gameId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('gamevault_wishlist');
    
    setTimeout(() => {
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setWishlist(parsed);
          }
        } catch (e) {
          console.error('Failed to load wishlist:', e);
        }
      }
      setIsInitialized(true);
    }, 0);
  }, []);

  // Sync to localStorage whenever wishlist changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('gamevault_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isInitialized]);

  const addToWishlist = (gameId: string) => {
    setWishlist(prev => {
      if (prev.includes(gameId)) return prev;
      return [...prev, gameId];
    });
  };

  const removeFromWishlist = (gameId: string) => {
    setWishlist(prev => prev.filter(id => id !== gameId));
  };

  const isInWishlist = (gameId: string) => wishlist.includes(gameId);

  return (
    <WishlistContext.Provider value={{ wishlist, isInitialized, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlistContext must be used within WishlistProvider');
  return context;
};

// Named alias so components can: import { useWishlist } from '@/context/WishlistContext'
export const useWishlist = useWishlistContext;
