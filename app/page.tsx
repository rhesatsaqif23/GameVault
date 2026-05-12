import HeroBanner from "@/components/game/HeroBanner";
import GameGrid from "@/components/game/GameGrid";
import Link from "next/link";
import { getFeaturedGames, getAllGames } from "@/lib/games";

export default function Home() {
  const featuredGames = getFeaturedGames();
  const bannerGames = featuredGames.filter(game => game.banner).slice(0, 4);
  const allGames = getAllGames().slice(0, 6); // Show top 6 on homepage

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <HeroBanner games={bannerGames} />
      
      <section className="mt-16 md:mt-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Top Picks</h2>
            <p className="text-foreground/60 mt-1">Handpicked favorites from our community</p>
          </div>
          <Link 
            href="/games" 
            className="group flex items-center gap-2 text-primary font-bold transition-all hover:gap-3"
          >
            Explore Library
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
        
        <GameGrid games={allGames} />
        
        <div className="mt-16 text-center">
          <Link 
            href="/games" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
          >
            Discover More Games
          </Link>
        </div>
      </section>
      
      <section className="mt-24 py-16 bg-primary/5 rounded-[3rem] border border-primary/10 text-center px-6">
        <h2 className="text-4xl font-black mb-4">Ready to play?</h2>
        <p className="text-lg text-foreground/60 max-w-xl mx-auto mb-10">
          Join thousands of players exploring the best indie games developed by the Raion Community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/games" className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg">Browse Catalog</Link>
          <Link href="/wishlist" className="px-10 py-4 bg-white dark:bg-card text-foreground font-bold rounded-2xl border border-border">View Wishlist</Link>
        </div>
      </section>
    </div>
  );
}
