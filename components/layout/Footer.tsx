"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`relative pt-12 md:pt-20 pb-10 border-t border-white/10 text-white overflow-hidden transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#090610] bg-linear-to-b from-[#090610] via-[#090610] to-[#120a24]"
          : "bg-[#6d51c2] bg-linear-to-b from-[#6d51c2] via-[#6d51c2] to-[#6040b8]"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 md:gap-4 mb-6">
              <Image
                src="/gamevault-logo.png"
                alt="GameVault Logo"
                width={28}
                height={28}
                className="w-7 h-7 md:w-8 md:h-8"
              />
              <span className="text-xl md:text-2xl font-black tracking-wide text-white">
                Game<span>Vault</span>
              </span>
            </Link>
            <p className="text-sm md:text-base text-white/90 mb-8 max-w-sm leading-relaxed">
              GameVault lets you discover and track the best indie games
              instantly. Fast, secure, and built for the passionate gaming
              community.
            </p>

            <div className="flex items-center max-w-md bg-white/10 border border-white/20 rounded-md p-1 shadow-sm">
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full bg-transparent px-3 py-2 outline-none text-xs md:text-sm text-white"
              />
              <Button
                size="sm"
                className={`whitespace-nowrap ${theme === "light" ? "bg-white text-primary! hover:bg-white/90" : ""}`}
              >
                Subscribe
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-10">
              <Link
                href="#"
                aria-label="Facebook @gamerverse_id"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Instagram @gamerverse_id"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn @gamerverse"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Twitter @gamerverse_id"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Website"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">Explore</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/70">
              <li>
                <Link
                  href="/games"
                  className="hover:text-white transition-colors"
                >
                  All Games
                </Link>
              </li>
              <li>
                <Link
                  href="/games?sort=newest"
                  className="hover:text-white transition-colors"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href="/games?sort=rating"
                  className="hover:text-white transition-colors"
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-white transition-colors"
                >
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link href="/games?minRating=8" className="hover:text-white transition-colors">
                  Curated Lists
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">Community</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Discord Server
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Events & Tournaments
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Content Creators
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About Us */}
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">About Us</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6 text-white">Legal</h4>
            <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  EULA
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Licenses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-white">
          <p>
            © Copyright 2026 | Designed & Developed by Ariverse Interns -
            License | Powered By Next.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
