"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/hooks/useWishlist";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const { wishlist } = useWishlist();

  return (
    <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50 border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-4 group">
            <Image
              src="/gamevault-logo.png"
              alt="GameVault Logo"
              width={40}
              height={40}
              className="w-10 h-10 group-hover:rotate-6 transition-transform drop-shadow-md"
            />
            <span className="text-2xl font-black tracking-wide text-foreground">
              Game<span className="text-primary">Vault</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center justify-center gap-10">
          <Link
            href="/"
            className="text-base font-bold tracking-wide hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/games"
            className="text-base font-bold tracking-wide hover:text-primary transition-colors"
          >
            Discovery
          </Link>

          <Link
            href="/wishlist"
            className="group flex items-center gap-2"
          >
            <span className="text-base font-bold tracking-wide group-hover:text-primary transition-colors">
              Wishlist
            </span>
            {wishlist.length > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-[20px]">
                {wishlist.length}
              </span>
            )}
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="w-px h-8 bg-border hidden md:block mr-2" />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
