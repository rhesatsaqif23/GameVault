"use client";

import { useWishlist } from '@/hooks/useWishlist';
import Button from "@/components/ui/Button";

interface WishlistButtonProps {
  gameId: string;
  className?: string;
  showText?: boolean;
}

const WishlistButton = ({ gameId, className = "", showText = true }: WishlistButtonProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const active = isInWishlist(gameId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (active) {
      removeFromWishlist(gameId);
    } else {
      addToWishlist(gameId);
    }
  };

  return (
    <div className="relative group/wishlist flex flex-col items-center">
      <Button 
        onClick={handleToggle}
        variant={active ? "primary" : "outline"}
        className={`gap-2 ${className}`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill={active ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-colors duration-200 ${!active ? 'group-hover:text-foreground' : ''}`}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        {showText && (
          <span>{active ? "Added to Wishlist" : "Add to Wishlist"}</span>
        )}
      </Button>

      {!showText && (
        <div className="absolute top-full pt-2 pointer-events-none opacity-0 group-hover/wishlist:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
          <div className="bg-foreground text-background text-[11px] md:text-xs font-bold px-2 py-1 rounded shadow-xl">
            {active ? "Remove from Wishlist" : "Add to Wishlist"}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistButton;
