"use client";

import HeroBanner from "@/components/game/HeroBanner";
import GameGrid from "@/components/game/GameGrid";
import Link from "next/link";
import { getFeaturedGames, getAllGames } from "@/lib/games";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function Home() {
  const featuredGames = getFeaturedGames();
  const bannerGames = featuredGames.filter((game) => game.banner).slice(0, 4);
  const allGames = getAllGames().slice(0, 6); // Show top 6 on homepage

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, delay: 0.2, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.3
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="w-full">
      <HeroBanner games={bannerGames} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.section 
          className="mt-8 md:mt-16"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="flex items-center justify-between mb-10">
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl font-black text-foreground">Top Picks</h2>
              <p className="text-lg text-foreground/80 mt-1">
                Handpicked favorites from our community
              </p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <Link
                href="/games"
                className="group flex items-center gap-2 text-lg text-primary font-bold transition-all hover:gap-3"
              >
                Explore Library
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          <motion.div variants={fadeIn}>
            <GameGrid games={allGames} />
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            variants={fadeIn}
          >
            <Link href="/games">
              <Button>Discover More Games</Button>
            </Link>
          </motion.div>
        </motion.section>

        <motion.section 
          className="mt-24 py-20 bg-card/50 rounded-2xl border border-border text-center px-6 relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <motion.h2 
            className="text-4xl font-black mb-4 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Ready to play?
          </motion.h2>
          <motion.p 
            className="text-lg text-foreground/80 max-w-xl mx-auto mb-10 relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            Join thousands of players exploring the best indie games developed
            by the GameVerse Studio.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <Link href="/games">
              <Button size="lg">Browse Catalog</Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="outline" size="lg">
                View Wishlist
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
