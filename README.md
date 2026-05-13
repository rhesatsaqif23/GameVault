# 🎮 GameVault: Game Catalog Platform

## 📖 Overview
**GameVault** is a modern, premium web-based game catalog platform designed for the Indonesian gamer community. It serves as an interactive hub where users can discover new games, explore comprehensive game details, and curate a personal wishlist.

Built as part of the **Ariverse Studio Front End Developer Internship 2026 Technical Test**, this application is an MVP (Minimum Viable Product) that strongly emphasizes a flawless, responsive frontend experience, fluid animations, and a highly polished user interface.

## 🚀 Key Features

### 🌟 Immersive Discovery Experience
- **Dynamic Homepage**: Features a captivating auto-playing Hero Banner showcasing highlighted games and a responsive featured game grid.
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

- **Next.js 15 (App Router)**: I chose Next.js because it is the industry standard for production-ready React applications. It provides seamless **Server-Side Rendering (SSR)** for SEO, a robust **App Router** for intuitive file-based navigation, and built-in **Image Optimization** which was a key non-functional requirement for this test.
- **Tailwind CSS**: Used for rapid UI development and maintaining a consistent design system. It allows for highly optimized, responsive styling with minimal CSS bundle size.
- **Framer Motion**: The "gold standard" for React animations. It was essential for delivering the premium and smooth experience requested in the brief (page transitions, hover effects, carousel).
- **TypeScript**: Used for strict type safety across the catalog and wishlist logic, significantly reducing runtime bugs and improving developer experience.
- **Vitest & React Testing Library**: Chosen for the unit testing requirement due to their speed and excellent integration with Vite-based tooling.
- **Lucide React**: For a consistent and modern iconography set.

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

### 🕹️ Functional Requirements
- [x] **Homepage (/)**: 
    - [x] Hero Banner featuring `featured: true` games with auto-play.
    - [x] Responsive Featured Games grid.
- [x] **Discovery Page (/games)**:
    - [x] Real-time Search by title/description.
    - [x] Advanced Filters (Multi-select Genre, Platform, Year Range, Price, Rating).
    - [x] Comprehensive Sorting (Alphabetical, Highest Rated, Newest, Lowest Price).
    - [x] Clean Pagination system.
- [x] **Detail Page (/games/[slug])**:
    - [x] Full game metadata display.
    - [x] Interactive Lightbox Screenshot Gallery.
    - [x] Integrated Wishlist toggle.
- [x] **Wishlist Page (/wishlist)**:
    - [x] Responsive grid of saved games.
    - [x] Persistent state via `localStorage`.
    - [x] Ability to remove items directly from the list.

### ⚙️ Non-Functional Requirements
- [x] **Skeleton Loaders**: Detailed skeleton states for both grid and detail views.
- [x] **Empty States**: High-quality UI for 0 search results and empty wishlists.
- [x] **Custom 404 Page**: Themed and animated `not-found` page.
- [x] **Image Optimization**: Fully optimized `next/image` implementation with correct `priority` and `sizes` attributes for LCP optimization.

### 🏆 Bonus Features (Fully Implemented)
- [x] **Dark/Light Mode**: Full theme toggle support.
- [x] **Page Transitions**: Smooth Framer Motion transitions between all routes.
- [x] **Hover Effects**: Premium scale and glow effects on all interactive elements.
- [x] **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation.
- [x] **Unit Testing**: 12+ tests covering both core library logic and UI components.

## 📁 Folder Structure

```text
gamevault/
├── app/               # Next.js App Router (Pages: Home, Games, Wishlist)
├── components/        # Reusable React Components
│   ├── filter/        # SearchBar, FilterPanel, SortSelect, FilterDrawer
│   ├── game/          # GameCard, GameGrid, HeroBanner, WishlistButton
│   ├── layout/        # Navbar, Footer
│   └── ui/            # ThemeToggle, Button, Skeleton, Lightbox, BackButton
├── context/           # React Context Providers (WishlistContext, ThemeContext)
├── data/              # Static JSON Database (games.json with 30+ entries)
├── hooks/             # Custom React Hooks (useWishlist, useLocalStorage, etc.)
├── lib/               # Utility functions, filtering logic, and data access helpers
├── public/            # Static assets and banners
├── test/              # Vitest setup and global mocks
└── types/             # TypeScript type definitions
```

## ⚖️ Trade-offs & Architecture Decisions

- **Static Data Source (`games.json`)**: To fulfill the MVP scope without a dedicated backend, all game data is loaded statically. This ensures blazing fast performance and zero latency.
- **URL-Synchronized State**: Filter and search states are managed via URL Search Parameters. This allows users to share specific filtered views (Deep Linking) and preserves state through browser history (Back/Forward buttons).
- **Client-Side Search**: Since the dataset is 30+ items, the search and filtering are performed on the client for instantaneous feedback, matching the "smooth" experience request.

## 🌐 Live Demo

Check out the live deployment here: [https://gamevault-gamerverse.vercel.app/](https://gamevault-gamerverse.vercel.app/)
