import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getGameBySlug } from "@/lib/games";
import WishlistButton from "@/components/game/WishlistButton";
import Button from "@/components/ui/Button";
import { ShoppingCart } from "lucide-react";
import RatingBadge from "@/components/game/RatingBadge";
import PriceBadge from "@/components/game/PriceBadge";
import GameMedia from "@/components/game/GameMedia";
import GameDetailLayout from "@/components/game/GameDetailLayout";

interface GameDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const GameDetailPage = async ({ params }: GameDetailPageProps) => {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  return (
    <main className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 pt-6 md:pt-8 pb-12 md:pb-16">
      <Link
        href="/games"
        className="inline-flex items-center gap-2 text-base md:text-xl text-foreground font-bold hover:text-primary-light mb-6 md:mb-8 transition-colors group"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Catalog
      </Link>

      <GameDetailLayout
        left={
          <div className="space-y-6 md:space-y-8">
            <GameMedia
              coverImage={game.coverImage}
              screenshots={game.screenshots}
              title={game.title}
            />

            <section className="bg-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border">
              <h2 className="text-xl md:text-2xl font-bold mb-4">About</h2>
              <div className="prose dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
                <p className="text-base md:text-lg font-medium">
                  {game.description}
                </p>
                {game.longDescription && (
                  <p className="mt-4 text-base md:text-lg text-justify">
                    {game.longDescription}
                  </p>
                )}
              </div>

              {game.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-bold mb-4 uppercase tracking-wider text-base md:text-lg text-primary-light">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-background border border-border rounded-lg text-xs md:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        }
        right={
          <div className="space-y-6">
            <div className="bg-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border sticky top-24 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.map((g) => (
                  <span
                    key={g}
                    className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary-light bg-primary/10 px-3 py-1 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                {game.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-border">
                <RatingBadge rating={game.rating} />
                <div className="hidden sm:block h-4 w-px bg-border" />
                <div className="text-sm md:text-base font-medium text-foreground/80">
                  Released: {new Date(game.releaseDate).toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-foreground/80 font-medium">
                    Developer
                  </span>
                  <span className="font-bold">{game.developer}</span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-foreground/80 font-medium">
                    Publisher
                  </span>
                  <span className="font-bold">{game.publisher}</span>
                </div>
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-foreground/80 font-medium shrink-0">
                    Platforms
                  </span>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {game.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] md:text-xs font-bold bg-background px-2 py-1 rounded-md border border-border"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 border-y border-border">
                  <span className="text-base md:text-lg font-bold">Price</span>
                  <PriceBadge price={game.price} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mt-8">
                <Button size="lg" className="w-full py-2.5 md:py-3 gap-2">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                  Buy Now
                </Button>
                <WishlistButton
                  gameId={game.id}
                  showText={true}
                  className="w-full py-3 md:py-4"
                />
              </div>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default GameDetailPage;
