# 🎮 GameVault — Premium Game Catalog Platform

## 📖 Overview
**GameVault** is a modern, premium web-based game catalog platform designed for the Indonesian gamer community. It serves as an interactive hub where users can discover new games, explore comprehensive game details, and curate a personal wishlist.

Built as part of the **Ariverse Studio Front End Developer Internship 2026 Technical Test**, this application is an MVP (Minimum Viable Product) that strongly emphasizes a flawless, responsive frontend experience, fluid animations, and a highly polished user interface.

## 🚀 Key Features

### 🌟 Immersive Discovery Experience
- **Dynamic Homepage**: Features a captivating auto-playing Hero Banner showcasing highlighted games and a responsive "Top Picks" game grid.
- **Advanced Filtering & Search**: A robust Discovery page (`/games`) equipped with a real-time debounced search bar, multi-select category filters (Genre, Platform, Price, Rating), and sorting options (Newest, Rating, Price). All filters are perfectly synchronized with URL parameters for easy sharing and navigation.
- **Responsive Layout**: A true mobile-first approach. Adapts seamlessly from mobile devices (≤ 320px) up to ultra-wide desktop monitors (≥ 1600px), with intelligent responsive typography and adaptive grid layouts.

### 🎮 Comprehensive Game Details
- **Detailed Metadata**: Explore in-depth information including descriptions, genres, platforms, developer/publisher details, release dates, and pricing.
- **Interactive Media Gallery**: Custom-built, full-screen Lightbox for viewing high-quality game screenshots.
- **Custom Cursor**: A unique, unified custom cursor system that enhances the premium gaming aesthetic across the platform.

### ❤️ Persistent Wishlist
- **Curate Your Collection**: Seamlessly add or remove games from your personal wishlist.
- **Local Persistence**: State is efficiently managed using React Context and synchronized with browser `localStorage`, ensuring your wishlist remains intact across sessions and reloads without needing a real backend.

### 🎨 Premium Aesthetics
- **Dark/Light Mode**: Full theme toggle support seamlessly integrated with the UI design system.
- **Micro-interactions**: Smooth hover effects, scale transitions, and active state indicators that make the UI feel alive and responsive.

## 💻 Tech Stack & Rationale

- **Next.js 14+ (App Router)**: Selected for intuitive file-based routing, native React Server Components, and powerful built-in optimizations (`next/image`).
- **React 18**: Utilizing modern hooks (`useState`, `useEffect`, `useContext`, custom hooks like `useDebounce`).
- **Tailwind CSS**: A utility-first CSS framework enabling rapid, responsive UI development with built-in dark mode support and custom design tokens.
- **Framer Motion**: Powering fluid page transitions, layout animations, and component micro-interactions.
- **TypeScript**: Ensuring strict type safety, reducing runtime errors, and providing a superior developer experience.
- **Lucide React**: Beautiful, consistent iconography.

## 🛠️ Run Locally

Follow these steps to run the GameVault platform on your local machine:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```
2. **Navigate into the project directory:**
   ```bash
   cd gamevault
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Explore the App:**
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

## 📁 Folder Structure

```text
gamevault/
├── app/               # Next.js App Router (Pages: Home, Games, Wishlist)
├── components/        # Reusable React Components
│   ├── filter/        # SearchBar, FilterPanel, SortSelect
│   ├── game/          # GameCard, GameGrid, HeroBanner, WishlistButton
│   ├── layout/        # Navbar, Footer
│   └── ui/            # ThemeToggle, Button, SkeletonCard, Lightbox
├── context/           # React Context Providers (WishlistContext, ThemeContext)
├── data/              # Static JSON Database (games.json with 30+ entries)
├── hooks/             # Custom React Hooks (useWishlist, useDebounce, etc.)
├── lib/               # Utility functions and data access helpers
├── public/            # Static assets (Logos, Icons)
└── types/             # TypeScript type definitions (Game interface)
```

## ⚖️ Trade-offs & Architecture Decisions

- **Static Data Source (`games.json`)**: To fulfill the MVP scope without a dedicated backend, all game data is loaded statically. This ensures blazing fast performance and zero latency, though it sacrifices dynamic scalability.
- **LocalStorage Wishlist**: Using `localStorage` provides a frictionless user experience for saving games. While clearing browser data resets the wishlist, it perfectly suits a frontend-focused application without user authentication.
- **URL-Synchronized State**: Filter, sort, and search states are managed via URL Search Parameters rather than local component state. This slightly increases complexity but significantly improves UX by allowing users to bookmark and share specific filtered views.
- **Image Optimization**: Using `next/image` ensures images are properly sized and optimized (WebP). Loading placeholders (skeletons and blur states) are implemented to mitigate potential network bottlenecks when rendering 30+ game covers simultaneously.

## 🌐 Live Demo

Check out the live deployment here: *https://gamevault-gamerverse.vercel.app/*
