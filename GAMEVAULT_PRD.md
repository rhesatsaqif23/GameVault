# 📋 GAMEVAULT — Product Requirements Document (PRD)

> **Project**: GameVault — Game Catalog Platform  
> **Client (Mock)**: Pak Bambang, PT. Gamerverse Nusantara Indonesia  
> **Context**: Ariverse Studio — Front End Developer Internship 2026 Technical Test  
> **Author**: *[Nama Kandidat]*  
> **Deadline**: Sabtu, 16 Mei 2026 — 23:59 WIB  
> **Last Updated**: 11 Mei 2026

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals & Success Metrics](#2-goals--success-metrics)
3. [Tech Stack & Rationale](#3-tech-stack--rationale)
4. [Data Schema](#4-data-schema)
5. [Application Architecture](#5-application-architecture)
6. [Page Specifications](#6-page-specifications)
7. [Component Breakdown](#7-component-breakdown)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [Bonus Features](#9-bonus-features)
10. [Folder Structure](#10-folder-structure)
11. [Submission Checklist](#11-submission-checklist)
12. [Trade-offs & Known Constraints](#12-trade-offs--known-constraints)

---

## 1. Project Overview

### 1.1 Background

PT. Gamerverse Nusantara Indonesia ingin membangun platform **GameVault** — sebuah katalog game berbasis web yang memungkinkan gamer Indonesia untuk:

- Menjelajahi koleksi game
- Membaca detail lengkap setiap game
- Menyimpan game favorit ke dalam **wishlist** pribadi

Platform ini dirancang menyerupai Steam atau IGDB, namun dalam skala MVP yang berfokus pada **frontend experience** tanpa memerlukan backend/database nyata pada tahap ini.

### 1.2 Scope (MVP)

| In Scope | Out of Scope |
|---|---|
| Halaman utama dengan hero banner & game grid | Autentikasi / sistem login |
| Halaman daftar game dengan search, filter, sort | Backend API / database nyata |
| Halaman detail game dengan galeri screenshot | Transaksi / pembelian game |
| Halaman wishlist berbasis localStorage | Review & rating oleh user |
| Desain responsif (mobile-first) | Push notification / real-time update |
| Data dummy minimal 30 game | Fitur social (share, comment) |

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals

- **Functional**: Semua halaman dan fitur utama dapat digunakan tanpa error
- **Visual**: Tampilan modern, premium, dan menarik — layak sebagai portofolio
- **Performance**: Halaman ter-render cepat dengan loading state yang tepat
- **Responsiveness**: Pengalaman nyaman di mobile (≥ 320px) hingga desktop (≥ 1440px)

### 2.2 Success Metrics

| Metrik | Target |
|---|---|
| Jumlah game dummy | ≥ 30 entri |
| Halaman yang berfungsi | 4/4 (Home, List, Detail, Wishlist) |
| Lighthouse Performance Score | ≥ 75 |
| Mobile usability | Tidak ada horizontal scroll, elemen tidak terpotong |
| Wishlist persistence | Data tetap ada setelah refresh browser |

---

## 3. Tech Stack & Rationale

### 3.1 Framework: **Next.js 14+ (App Router)**

**Alasan pemilihan:**

| Faktor | Pertimbangan |
|---|---|
| **File-based routing** | Struktur URL `(/games/[slug])` langsung terpetakan ke struktur folder, mengurangi boilerplate |
| **App Router** | Mendukung React Server Components, layout nesting, dan streaming — modern & production-ready |
| **`next/image`** | Optimasi gambar otomatis (lazy load, WebP conversion, responsive sizing) — relevan untuk game cover images |
| **SSG / SSR support** | Data game dapat di-generate saat build time (Static Site Generation), menghasilkan performa optimal |
| **Ekosistem matang** | Vercel (hosting gratis) terintegrasi langsung dengan Next.js untuk zero-config deployment |
| **TypeScript native** | Dukungan TypeScript out-of-the-box memudahkan type safety pada data schema game |

### 3.2 Styling: **Tailwind CSS**

- Utility-first memudahkan rapid development
- JIT compiler menghasilkan bundle CSS minimal
- Dark mode support via `class` strategy (`dark:` prefix)
- Sudah terinstall bersama template `create-next-app`

### 3.3 State Management

- **React `useState` + `useContext`**: Untuk wishlist state yang dibagikan antar halaman
- **`localStorage`**: Persistensi wishlist tanpa backend
- **URL Search Params**: Untuk state filter & search agar shareable dan SEO-friendly

### 3.4 Data Layer

- **`/data/games.json`**: File JSON statis berisi minimal 30 entri game dummy
- Data di-import langsung di Server Components (tidak ada fetch network overhead)

### 3.5 Hosting

- **Vercel**: Zero-config deployment untuk Next.js, free tier, automatic HTTPS & CDN

---

## 4. Data Schema

### 4.1 Game Object

```typescript
// types/game.ts
export interface Game {
  id: string | number;         // Unique identifier
  title: string;               // Nama game
  slug: string;                // URL-friendly identifier (e.g., "the-witcher-3")
  coverImage: string;          // URL gambar cover utama
  screenshots: string[];       // Array URL screenshot (minimal 3 item)
  description: string;         // Deskripsi singkat (1–2 kalimat)
  longDescription: string;     // Deskripsi panjang (3–5 paragraf)
  genres: string[];            // Genre, e.g., ["RPG", "Open World"]
  platforms: string[];         // Platform, e.g., ["PC", "PS5", "Xbox"]
  developer: string;           // Nama studio developer
  publisher: string;           // Nama publisher
  releaseDate: string;         // Format ISO: "YYYY-MM-DD"
  rating: number;              // Skala 0–10 (boleh desimal, e.g., 9.2)
  price: number;               // Harga IDR; 0 = gratis
  tags: string[];              // Tag tambahan, e.g., ["Multiplayer", "Story Rich"]
  featured: boolean;           // Jika true, tampil di banner homepage
}
```

### 4.2 Wishlist Storage Schema

Data wishlist disimpan di `localStorage` dengan key `gamevault_wishlist`:

```typescript
// Nilai tersimpan: array of game IDs
// Key: "gamevault_wishlist"
// Value: JSON.stringify(string[])

// Contoh:
localStorage.setItem("gamevault_wishlist", JSON.stringify(["1", "5", "12"]));
```

### 4.3 Genre & Platform Master List

**Genres (contoh):**
`Action`, `RPG`, `Strategy`, `Sports`, `Racing`, `Horror`, `Simulation`, `Adventure`, `Puzzle`, `Fighting`, `Open World`, `FPS`, `Survival`, `Platformer`, `Indie`

**Platforms (contoh):**
`PC`, `PS5`, `PS4`, `Xbox Series X`, `Xbox One`, `Nintendo Switch`, `Mobile`, `Mac`

---

## 5. Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
├─────────────────────────────────────────────────────────┤
│  Layout (app/layout.tsx)                                 │
│  ├── Navbar (WishlistCount badge)                        │
│  └── Footer                                             │
├─────────────────────────────────────────────────────────┤
│  Pages                                                   │
│  ├── / (Homepage) ──────── Server Component             │
│  │   ├── HeroBanner (featured games)                    │
│  │   └── GameGrid (all games)                           │
│  ├── /games ────────────── Client Component             │
│  │   ├── SearchBar                                       │
│  │   ├── FilterPanel (genre, platform, year)            │
│  │   ├── SortSelect                                      │
│  │   └── GameGrid + Pagination                          │
│  ├── /games/[slug] ─────── Server Component             │
│  │   ├── GameHero (cover, info)                         │
│  │   ├── ScreenshotGallery + Lightbox                   │
│  │   ├── GameDetails (description, metadata)            │
│  │   └── WishlistButton (Client Component)              │
│  ├── /wishlist ──────────── Client Component            │
│  │   ├── WishlistGrid                                    │
│  │   └── EmptyState                                     │
│  └── /not-found ────────── Static                       │
├─────────────────────────────────────────────────────────┤
│  Context                                                 │
│  └── WishlistContext (useState + localStorage sync)     │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                             │
│  └── /data/games.json (30+ game entries)               │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Page Specifications

### 6.1 Homepage — `/`

**Tujuan**: First impression yang kuat; menampilkan game populer dan koleksi lengkap.

#### Hero/Banner Section
- Menampilkan game dengan `featured: true`
- Desain: Full-width hero card atau carousel otomatis (auto-play, interval 5 detik)
- Setiap slide menampilkan: cover image, title, genre tags, rating, tombol "Lihat Detail" & "Add to Wishlist"
- Indicator dots atau arrow navigation

#### Game Grid Section
- Judul section: "Semua Game" atau "Jelajahi Koleksi"
- Grid responsif: 1 kolom (mobile) → 2 kolom (tablet) → 3–4 kolom (desktop)
- Setiap card menampilkan: cover image, title, genre badges, rating, platform icons, harga
- Hover effect: scale + overlay dengan tombol quick-action
- Tombol "Lihat Semua" yang mengarah ke `/games`

**Data**: Semua game dari `games.json`, tanpa filter/sort di homepage.

---

### 6.2 Game List Page — `/games`

**Tujuan**: Discovery hub — search, filter, dan browse semua game.

#### Search Bar
- Input real-time yang memfilter game berdasarkan `title` (case-insensitive)
- Debounce 300ms untuk menghindari render berlebihan
- Clear button (X) untuk reset query
- Placeholder: "Cari game..."

#### Filter Panel
- **Genre**: Multi-select checkboxes atau dropdown
- **Platform**: Multi-select checkboxes atau dropdown
- **Tahun Rilis**: Range slider atau dua input (dari tahun — sampai tahun)
- Tombol "Reset Filter" untuk clear semua filter aktif
- Di mobile: filter panel ditampilkan sebagai drawer/modal yang bisa di-toggle

#### Sort Options

Dropdown "Urutkan" dengan opsi:

| Value | Label |
|---|---|
| `rating-desc` | Rating Tertinggi |
| `release-desc` | Terbaru |
| `release-asc` | Terlama |
| `price-asc` | Harga Terendah |
| `price-desc` | Harga Tertinggi |
| `title-asc` | A–Z |
| `title-desc` | Z–A |

#### Game Grid + Pagination
- Grid yang sama dengan homepage
- Pagination: tampilkan 12 game per halaman (atau infinite scroll sebagai alternatif)
- Hasil hitungan: "Menampilkan X dari Y game"
- Empty state jika hasil pencarian kosong

#### State Management
- Semua state filter/search/sort disimpan di URL sebagai query params (`?search=zelda&genre=RPG&sort=rating-desc`)
- Memungkinkan URL dapat di-share dan browser back/forward berfungsi normal

---

### 6.3 Game Detail Page — `/games/[slug]`

**Tujuan**: Informasi lengkap satu game dengan pengalaman imersif.

#### Hero Section
- Cover image sebagai background (dengan overlay gradient)
- Judul game (h1)
- Genre badges, platform chips
- Developer, Publisher, Release Date
- Rating (bintang visual + angka)
- Harga (atau badge "Gratis")
- Tombol **"Add to Wishlist"** / **"Remove from Wishlist"** (toggle)

#### Screenshot Gallery
- Grid thumbnail screenshot (minimal 3)
- Klik thumbnail → buka **Lightbox** full-screen
- Navigasi prev/next di dalam lightbox
- Tutup dengan klik backdrop atau tombol X atau tombol Escape

#### Description Section
- `longDescription` ditampilkan lengkap
- Pembagian paragraf yang rapi

#### Metadata Card
- Developer, Publisher, Release Date, Genres, Platforms, Tags
- Ditampilkan dalam format key-value yang jelas

#### Related Games (Bonus)
- Rekomendasi game dengan genre serupa (opsional)

**404 Handling**: Jika `slug` tidak ditemukan di `games.json`, render halaman `not-found.tsx` dengan tombol "Kembali ke Beranda".

---

### 6.4 Wishlist Page — `/wishlist`

**Tujuan**: Koleksi pribadi game yang disimpan user.

#### Wishlist Grid
- Layout grid yang sama dengan halaman `/games`
- Setiap card memiliki tombol **"Hapus dari Wishlist"** (ikon trash atau tombol X)
- Klik card tetap mengarah ke halaman detail game

#### Empty State
- Ilustrasi atau ikon yang relevan (game controller, wishlist kosong)
- Teks: "Wishlist kamu masih kosong"
- Sub-teks: "Temukan game seru dan tambahkan ke wishlist!"
- Tombol CTA: "Jelajahi Game" → `/games`

#### Persistence
- Data dibaca dari `localStorage` saat komponen mount
- Update wishlist (tambah/hapus) langsung sync ke `localStorage`
- Data tetap ada setelah page refresh atau browser ditutup

---

### 6.5 404 Not Found Page — `/not-found`

- Pesan yang jelas: "Halaman tidak ditemukan"
- Tombol kembali ke beranda
- Desain yang konsisten dengan tema GameVault

---

## 7. Component Breakdown

### 7.1 Layout Components

| Komponen | File | Deskripsi |
|---|---|---|
| `RootLayout` | `app/layout.tsx` | Root layout, provider wrapper, font |
| `Navbar` | `components/Navbar.tsx` | Logo, navigasi, wishlist badge, dark mode toggle |
| `Footer` | `components/Footer.tsx` | Link, copyright |

### 7.2 Game Components

| Komponen | File | Deskripsi |
|---|---|---|
| `GameCard` | `components/game/GameCard.tsx` | Card individual dengan hover effects |
| `GameGrid` | `components/game/GameGrid.tsx` | Grid wrapper dengan responsive layout |
| `HeroBanner` | `components/game/HeroBanner.tsx` | Carousel untuk featured games |
| `ScreenshotGallery` | `components/game/ScreenshotGallery.tsx` | Galeri + Lightbox |
| `WishlistButton` | `components/game/WishlistButton.tsx` | Toggle button untuk wishlist |
| `RatingBadge` | `components/game/RatingBadge.tsx` | Visual rating display |
| `PriceBadge` | `components/game/PriceBadge.tsx` | Harga atau badge "Gratis" |

### 7.3 Filter & Search Components

| Komponen | File | Deskripsi |
|---|---|---|
| `SearchBar` | `components/filter/SearchBar.tsx` | Input dengan debounce + clear button |
| `FilterPanel` | `components/filter/FilterPanel.tsx` | Genre, platform, year filter |
| `SortSelect` | `components/filter/SortSelect.tsx` | Dropdown sorting |
| `FilterDrawer` | `components/filter/FilterDrawer.tsx` | Mobile filter modal/drawer |
| `ActiveFilters` | `components/filter/ActiveFilters.tsx` | Tag chips filter aktif + reset |

### 7.4 UI Components

| Komponen | File | Deskripsi |
|---|---|---|
| `SkeletonCard` | `components/ui/SkeletonCard.tsx` | Loading skeleton untuk game card |
| `EmptyState` | `components/ui/EmptyState.tsx` | Empty state reusable |
| `Pagination` | `components/ui/Pagination.tsx` | Kontrol halaman |
| `Lightbox` | `components/ui/Lightbox.tsx` | Full-screen image viewer |
| `Badge` | `components/ui/Badge.tsx` | Tag/chip generic |
| `ThemeToggle` | `components/ui/ThemeToggle.tsx` | Dark/light mode switch |

### 7.5 Context & Hooks

| File | Deskripsi |
|---|---|
| `context/WishlistContext.tsx` | Global wishlist state + localStorage sync |
| `hooks/useWishlist.ts` | Hook untuk akses & mutasi wishlist |
| `hooks/useDebounce.ts` | Generic debounce hook untuk search |
| `hooks/useLocalStorage.ts` | Generic hook untuk localStorage |

---

## 8. Non-Functional Requirements

### 8.1 Loading States

| Kondisi | Implementasi |
|---|---|
| Game list loading | Skeleton cards (3×4 grid) |
| Game detail loading | Skeleton hero + content |
| Image loading | `next/image` built-in blur placeholder |
| Filter applying | Subtle spinner atau opacity transition |

### 8.2 Empty States

| Kondisi | Tampilan |
|---|---|
| Search tidak menemukan hasil | Ikon, teks "Tidak ada game yang cocok", saran reset filter |
| Wishlist kosong | Ilustrasi, teks motivasi, tombol ke halaman games |
| Error loading data | Pesan error dengan tombol retry |

### 8.3 Responsiveness

| Breakpoint | Layout |
|---|---|
| Mobile (< 640px) | 1 kolom, filter sebagai drawer, navbar collapse |
| Tablet (640px – 1024px) | 2 kolom grid, filter inline |
| Desktop (> 1024px) | 3–4 kolom grid, filter sidebar |

### 8.4 Image Optimization

- Gunakan **`next/image`** untuk semua gambar game
- Set `sizes` prop sesuai breakpoint grid
- Gunakan `placeholder="blur"` atau `blurDataURL` untuk UX yang lebih baik
- Semua URL gambar dari picsum.photos / Unsplash dengan dimensi eksplisit (menghindari gambar broken)

### 8.5 SEO

- Setiap halaman memiliki `<title>` dan `<meta name="description">` yang unik
- Gunakan `generateMetadata()` di Next.js App Router untuk halaman dinamis
- Heading hierarchy yang benar (satu `<h1>` per halaman)
- Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`)

### 8.6 Accessibility (A11y)

- Semua gambar memiliki `alt` text yang deskriptif
- Tombol interaktif memiliki `aria-label`
- Keyboard navigasi berfungsi (Tab, Enter, Escape untuk modal/lightbox)
- Focus visible indicator tidak dihilangkan
- Kontras warna memenuhi WCAG AA (4.5:1 untuk teks normal)

---

## 9. Bonus Features

Fitur berikut bukan wajib namun memberikan nilai tambah:

| Fitur | Prioritas | Estimasi |
|---|---|---|
| Dark/Light mode toggle | Tinggi | 1–2 jam |
| Animasi transisi halaman | Sedang | 2–3 jam |
| Hover effects (card tilt, glow) | Tinggi | 1 jam |
| Multi-select genre filter | Sedang | 1–2 jam |
| Accessibility lengkap | Sedang | 2–3 jam |
| Unit test 1 komponen | Rendah | 2–4 jam |
| Related games section | Rendah | 1–2 jam |

---

## 10. Folder Structure

```
gamevault/
├── app/
│   ├── layout.tsx              # Root layout (Navbar, Footer, Providers)
│   ├── page.tsx                # Homepage (/)
│   ├── not-found.tsx           # Global 404 page
│   ├── games/
│   │   ├── page.tsx            # Game list (/games)
│   │   └── [slug]/
│   │       └── page.tsx        # Game detail (/games/[slug])
│   └── wishlist/
│       └── page.tsx            # Wishlist (/wishlist)
├── components/
│   ├── game/
│   │   ├── GameCard.tsx
│   │   ├── GameGrid.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── ScreenshotGallery.tsx
│   │   ├── WishlistButton.tsx
│   │   ├── RatingBadge.tsx
│   │   └── PriceBadge.tsx
│   ├── filter/
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SortSelect.tsx
│   │   ├── FilterDrawer.tsx
│   │   └── ActiveFilters.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── SkeletonCard.tsx
│       ├── EmptyState.tsx
│       ├── Pagination.tsx
│       ├── Lightbox.tsx
│       ├── Badge.tsx
│       └── ThemeToggle.tsx
├── context/
│   └── WishlistContext.tsx
├── hooks/
│   ├── useWishlist.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
├── data/
│   └── games.json              # 30+ game entries
├── types/
│   └── game.ts                 # TypeScript interfaces
├── lib/
│   ├── utils.ts                # Helper functions (format price, date, etc.)
│   └── games.ts                # Data access functions (getGameBySlug, etc.)
├── public/
│   └── favicon.ico
├── README.md
├── GAMEVAULT_PRD.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 11. Submission Checklist

### Functional Requirements

- [ ] Homepage dengan hero banner (featured games)
- [ ] Homepage menampilkan semua game dalam card grid
- [ ] Search bar di `/games` (filter by title)
- [ ] Filter genre di `/games`
- [ ] Filter platform di `/games`
- [ ] Filter range tahun rilis di `/games`
- [ ] Sorting (rating, terbaru, harga, alphabetical)
- [ ] Pagination atau infinite scroll di `/games`
- [ ] Halaman detail `/games/[slug]` lengkap
- [ ] Screenshot gallery dengan lightbox
- [ ] Tombol Add/Remove Wishlist di detail
- [ ] Wishlist tersimpan via localStorage
- [ ] Halaman `/wishlist` dengan semua item tersimpan
- [ ] Hapus item dari wishlist
- [ ] 404 page untuk slug tidak valid
- [ ] Responsif di mobile

### Non-Functional Requirements

- [ ] Skeleton loader saat loading
- [ ] Empty state untuk wishlist kosong
- [ ] Empty state untuk hasil search nol
- [ ] `next/image` untuk optimasi gambar
- [ ] SEO metadata per halaman

### Bonus

- [ ] Dark/light mode toggle
- [ ] Animasi transisi halaman
- [ ] Hover effects
- [ ] Multi-select genre filter
- [ ] Accessibility (keyboard nav, ARIA)
- [ ] Unit test minimal 1 komponen

### Submission

- [ ] GitHub Repository dibuat
- [ ] Commit history rapi (bukan 1 commit besar)
- [ ] README.md lengkap
- [ ] Deploy ke Vercel/Netlify
- [ ] Live demo URL berfungsi
- [ ] Form submission di https://forms.gle/tMncGNiqmkSbkrUp7
- [ ] Email konfirmasi dikirim dengan subject yang benar

---

## 12. Trade-offs & Known Constraints

### Data

- **Semua data statis**: Tidak ada API call, data langsung di-import dari JSON → performa optimal tapi tidak scalable.
- **URL gambar dari third-party**: picsum.photos / Unsplash bisa down atau rate-limited di production. Mitigasi: gunakan dimensi konsisten dan fallback.

### State Management

- **Wishlist hanya di localStorage**: Data hilang jika user ganti browser/device atau clear storage. Acceptable untuk MVP.
- **URL-based filter state**: Memerlukan sinkronisasi antara URL params dan UI state — lebih kompleks dari `useState` biasa, tapi memberikan shareable links.

### Performance

- **30+ game images**: Banyak gambar bisa membebani initial load. Mitigasi: `next/image` lazy loading + skeleton placeholders.
- **No backend**: Semua filtering/sorting dilakukan di client-side JavaScript. Untuk dataset kecil (30–100 item) ini tidak menjadi masalah performa.

### Waktu Pengerjaan

- Dengan deadline 5 hari kerja, fitur bonus diprioritaskan berdasarkan impact vs. effort:
  1. Dark mode (impact tinggi, effort rendah)
  2. Hover effects (impact tinggi, effort rendah)
  3. Animasi transisi (impact sedang, effort sedang)
  4. Unit test (impact rendah untuk showcase, effort tinggi)

---

> **Referensi**: Brief dari Pak Bambang (PT. Gamerverse Nusantara Indonesia) | Spesifikasi Teknis Internal Ariverse Studio  
> **Submission Form**: https://forms.gle/tMncGNiqmkSbkrUp7
