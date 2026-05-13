"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/hooks/useWishlist";
import ThemeToggle from "../ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discovery", href: "/games" },
    { name: "Wishlist", href: "/wishlist", hasBadge: true },
  ];

  return (
    <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-50 border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2 md:gap-4 group">
            <Image
              src="/gamevault-logo.png"
              alt="GameVault Logo"
              width={32}
              height={32}
              className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-6 transition-transform drop-shadow-md"
            />
            <span className="text-xl md:text-2xl font-black tracking-wide text-foreground">
              Game<span className="text-primary">Vault</span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation (Desktop) */}
        <div className="hidden md:flex items-center justify-center gap-10 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                aria-label={`Navigate to ${link.name}`}
                aria-current={isActive ? "page" : undefined}
                className={`relative h-full flex items-center gap-2 text-sm md:text-base font-bold tracking-wide transition-colors group/nav ${
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
                {link.hasBadge && wishlist.length > 0 && (
                  <span className="bg-primary text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[18px]">
                    {wishlist.length}
                  </span>
                )}
                
                {/* Underline Indicator */}
                <span 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-primary transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
          <ThemeToggle />
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-foreground hover:bg-foreground/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 top-16"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 border-t border-border bg-background shadow-xl z-50 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4" role="menu">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-label={`Navigate to ${link.name}`}
                    role="menuitem"
                    className="text-xs md:text-sm font-bold tracking-wide hover:text-primary transition-colors flex items-center justify-between"
                  >
                    {link.name}
                    {link.hasBadge && wishlist.length > 0 && (
                      <span className="bg-primary text-white text-[11px] md:text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center min-w-[24px]">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
