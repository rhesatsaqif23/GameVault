# GameVault — Game Catalog Platform

## Overview
GameVault is a web-based game catalog platform that allows users to:
- Explore a diverse collection of games.
- Read comprehensive details for each game.
- Save favorite games to a personal **wishlist**.

This project serves as an MVP focusing on a robust frontend experience, built for the Ariverse Studio Front End Developer Internship Technical Test.

## Run Locally
To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd gamevault
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Tech Stack & Rationale
- **Next.js 14+ (App Router)**: Selected for its intuitive file-based routing, native React Server Components, powerful built-in image optimization (`next/image`), and robust Static Site Generation capabilities.
- **Tailwind CSS**: A utility-first CSS framework that allows rapid, responsive UI development with minimal custom CSS and built-in dark mode support.
- **TypeScript**: Ensures type safety, fewer runtime errors, and a streamlined developer experience.
- **React Context & LocalStorage**: Utilized for persisting the user's wishlist state efficiently across sessions without the overhead of a real backend.

## Folder Structure
```
gamevault/
├── app/               # Next.js App Router pages and layouts
├── components/        # Reusable React components (filter, game, layout, ui)
├── context/           # React Context providers (Wishlist, Theme)
├── data/              # Static JSON data (games.json)
├── hooks/             # Custom React hooks (useWishlist, useDebounce, etc.)
├── lib/               # Utility functions and data access helpers
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

## Features List
### Completed Features
- **Homepage**: Features a dynamic Hero Banner highlighting featured games and a responsive game grid.
- **Game Discovery (`/games`)**: Complete with a debounced search bar, robust filtering (by genre and platform), and sorting functionality—all synchronized with the URL parameters.
- **Game Details (`/games/[slug]`)**: Displays full game descriptions, metadata, and an interactive screenshot gallery using a custom Lightbox.
- **Wishlist**: Users can seamlessly add or remove games to their wishlist, which persists across browser reloads using `localStorage`.
- **Dark/Light Mode**: Full theme toggle support integrated with the UI design system.
- **Responsiveness**: Fully fluid and responsive layout optimized for mobile, tablet, and desktop viewports.

### Pending Features (Out of Scope for MVP)
- User Authentication
- Real Backend & Database Integration
- User Reviews and Ratings System

## Trade-offs & Known Constraints
- **Static Data Source**: All game data is loaded statically from `data/games.json`. This provides excellent MVP performance but lacks dynamic scalability compared to a true backend API.
- **Wishlist Storage**: Wishlist items are saved exclusively in `localStorage`. If the user clears their browser cache or switches devices, their wishlist data is lost. This is an acceptable trade-off for a frontend-focused test.
- **Image Performance**: Loading 50+ images at once could bottleneck network performance. This is mitigated through Next.js's lazy loading via `next/image` and custom skeleton placeholders.

## Live Demo
Check out the live deployment here: *[Insert Vercel/Netlify Live URL]*
