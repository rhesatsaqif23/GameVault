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
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {showText && (
        <span>{active ? "Added to Wishlist" : "Add to Wishlist"}</span>
      )}
    </Button>
  );
};

export default WishlistButton;
