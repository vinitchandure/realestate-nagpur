# Real Estate Nagpur

A modern, high-performance real estate portal for Nagpur, Maharashtra. Built with React and Vite, featuring comprehensive property listings, locality micro-market guides, builder projects and societies, live search filtering, account authentication, property wishlisting, light/dark mode, and rich scroll interactions.

---

## Key Features

- **Hero Photographic Slideshow**: Smooth full-width background slideshow presenting premium Nagpur properties with autoplay, dot navigation, and manual slide controls.
- **Micro-Market Guides & Localities**: Comprehensive locality profiles for Wardha Road, Manish Nagar, Besa, Jamtha, Dharampeth, MIHAN, Hingna, and more, complete with average capital rates and connectivity highlights.
- **Gated Schemes & Societies**: Dedicated project profiles covering RERA status, developer details, unit configurations, and amenities.
- **Property Catalog & Filters**: Fast client-side filtering by Listing Type (Sale / Rent), Locality, Property Type, BHK configuration, Price Sorting, and Source-Verified filters.
- **Individual Property Detail Pages**: Comprehensive property landing pages featuring interactive multi-image galleries, specifications, highlights, society overviews, and direct visit scheduling modal.
- **Clickable Property Cards**: Direct navigation from card images and titles to detail pages, with independent heart/wishlist actions.
- **Account & Wishlist System**: Sign In and Sign Up modal with form validation, persistent wishlist storage per user, and automatic pending-wishlist save on login.
- **Theme Toggle**: Accessible Light / Dark mode toggle with persistent preference and automatic system theme detection.
- **Scroll & Motion Interactions**: Expressive card lifts, gentle image zoom, single-fire scroll-triggered section reveals with staggered card cascading, and photographic parallax depth.
- **Optimized Assets**: Deduplicated, high-efficiency WebP photographic imagery with 80%+ asset size reduction.
- **Developer Credit**: Styled bottom footer credit line linking directly to phone dialer: `The Website is Designed & Developed by Vinit Chandure` (`tel:+918624990684`).

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: Lightweight client-side router with browser history integration and Vercel deep-link rewrite support.

---

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start at `http://localhost:5173`.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

### Vercel Deployment

This project includes a pre-configured `vercel.json` for seamless deployment:

1. Push this repository to GitHub or upload via browser.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**
4. Root Directory: `./`
5. Output Directory: `dist`
6. Click **Deploy**.

---

## Directory Structure

```
Real Estate Nagpur/
├── public/
│   └── assets/           # Deduplicated, optimized WebP imagery, logo, and favicon
├── src/
│   ├── components/       # UI and page view components
│   ├── utils/            # Data models, contexts, and router utilities
│   ├── App.jsx           # Main application routing and shell
│   ├── main.jsx          # React DOM entry point
│   └── index.css         # Tailwind directives and design system tokens
├── .gitignore            # Git exclusion rules
├── index.html            # HTML entry point with metadata and fonts
├── package.json          # Project manifest and scripts
├── package-lock.json     # Dependency lockfile
├── vite.config.js        # Vite & Tailwind configuration
├── vercel.json           # Vercel SPA route rewrite rules
└── README.md             # Project documentation
```
