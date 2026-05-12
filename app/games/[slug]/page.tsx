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
    <main className="container mx-auto px-4 py-8 md:py-16">
      <Link
        href="/games"
        className="inline-flex items-center gap-2 text-xl text-foreground font-bold hover:text-primary mb-8 transition-colors group"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Visuals */}
        <div className="lg:col-span-2 space-y-8">
          <GameMedia 
            coverImage={game.coverImage} 
            screenshots={game.screenshots} 
            title={game.title} 
          />

          <section className="bg-card p-8 rounded-3xl border border-border">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <div className="prose dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
              <p className="text-lg">{game.description}</p>
              {game.longDescription && (
                <p className="mt-4">{game.longDescription}</p>
              )}
            </div>

            {game.tags.length > 0 && (
              <div className="mt-8">
                <h3 className="font-bold mb-4 uppercase tracking-wider text-base text-primary">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-background border border-border rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Info & Actions */}
        <div className="space-y-6">
          <div className="bg-card p-8 rounded-3xl border border-border sticky top-24 shadow-sm">
            <div className="flex gap-2 mb-4">
              {game.genres.map((g) => (
                <span
                  key={g}
                  className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold mb-4">{game.title}</h1>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
              <RatingBadge rating={game.rating} />
              <div className="h-4 w-px bg-border" />
              <div className="text-base font-medium text-foreground/80">
                Released: {new Date(game.releaseDate).toLocaleDateString()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-foreground/80 font-medium">
                  Developer
                </span>
                <span className="font-bold">{game.developer}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/80 font-medium">
                  Publisher
                </span>
                <span className="font-bold">{game.publisher}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground/80 font-medium">
                  Platforms
                </span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {game.platforms.map((p) => (
                    <span
                      key={p}
                      className="text-xs font-bold bg-background px-2 py-1 rounded-md border border-border"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between py-4 border-y border-border">
                <span className="text-lg font-bold">Price</span>
                <PriceBadge price={game.price} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-8">
              <Button size="lg" className="w-full py-3 gap-2">
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </Button>
              <WishlistButton
                gameId={game.id}
                showText={true}
                className="w-full py-4"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GameDetailPage;
