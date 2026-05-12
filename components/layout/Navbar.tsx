'use client';

import Link from 'next/link';
import React from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import ThemeToggle from '../ui/ThemeToggle';

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50 border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">
            GAME<span className="text-primary">VAULT</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-10">
          <Link 
            href="/games" 
            className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
          >
            Discovery
          </Link>
          
          <Link href="/wishlist" className="relative group flex items-center gap-2">
            <svg className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-widest group-hover:text-primary transition-colors hidden sm:block">
              Wishlist
            </span>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-primary/40">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          <div className="w-px h-8 bg-border" />
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
