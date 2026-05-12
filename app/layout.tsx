import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GameVault | Ultimate Game Catalog",
  description: "Explore, search, and manage your wishlist of the best games in GameVault.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/creato-display" rel="stylesheet" />
      </head>
      <body className={`${outfit.variable} font-sans antialiased min-h-screen flex flex-col tracking-wide`}>
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
