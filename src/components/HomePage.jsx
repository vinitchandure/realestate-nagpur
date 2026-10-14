import React from 'react';
import Link from '../utils/router';
import HeroSection from './HeroSection';
import PropertyCard from './PropertyCard';
import RevealOnScroll, { StaggerItem } from './RevealOnScroll';
import ParallaxSection from './ParallaxSection';
import { getAllProperties, getAllLocalities, getAllProjects, PROPERTY_TYPE_CONFIG } from '../utils/data';
import { NAGPUR_SNAPSHOT } from '../utils/snapshots';
import { 
  MapPin, 
  Home, 
  Phone, 
  ArrowRight
} from 'lucide-react';

const PROPERTY_TYPE_IMAGES = {
  'flats-apartments': '/assets/hero-apartment.webp',
  'residential-plots': '/assets/prop-besa.webp',
  'independent-houses': '/assets/hero-villa.webp',
  'commercial-properties': '/assets/project-gandhi-square.webp',
  'farm-houses-land': '/assets/prop-farmhouse-ambika.webp',
};

const LOCALITY_IMAGES = {
  'wardha-road': '/assets/hero-golden-hour.webp',
  'manish-nagar': '/assets/project-shree-shyam.webp',
  'besa': '/assets/prop-besa.webp',
  'dharampeth': '/assets/prop-luxury-laxmi.webp',
  'jamtha': '/assets/prop-jamtha.webp',
  'hingna': '/assets/prop-it-park.webp',
  'amravati-road': '/assets/hero-apartment.webp',
  'koradi-road': '/assets/hero-villa.webp',
};

const PROJECT_IMAGES = {
  'amar-sankul-apartment': '/assets/project-amar-sankul.webp',
  'shree-shyam-arcade': '/assets/project-shree-shyam.webp',
  'gandhi-square': '/assets/project-gandhi-square.webp',
  'shivam-heights': '/assets/project-shivam-heights.webp',
};

export default function HomePage() {
  const allProperties = getAllProperties();
  const featuredProperties = allProperties.slice(0, 6);
  const localities = getAllLocalities().slice(0, 8);
  const projects = getAllProjects().slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Photographic Slideshow (Full-Width Photographic) */}
      <HeroSection />

      {/* 2. Snapshot Inventory Stats Bar & Asset Classes (Clean Section) */}
      <div className="w-full bg-white dark:bg-slate-900 pb-16 transition-colors">
        {/* Floating Snapshot Stats Bar */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-14">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center transition-colors">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-sky-700 dark:text-sky-400">
                {NAGPUR_SNAPSHOT.saleProperties}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                Properties for Sale
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Plots, flats, houses & commercial
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                {NAGPUR_SNAPSHOT.rentProperties}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                Properties for Rent
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Flats, offices, shops & godowns
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400">
                {NAGPUR_SNAPSHOT.residentialProjects}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                Projects & Societies
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Gated communities & townships
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                {NAGPUR_SNAPSHOT.verifiedAgents}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                Verified Agents & Builders
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Active market directory
              </div>
            </div>
          </div>
        </section>

        {/* Explore Property Types by Category */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                Nagpur Real Estate Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                Explore by Property Type
              </h2>
            </div>
            <Link
              href="/property-types"
              className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 inline-flex items-center gap-1"
            >
              All Asset Categories <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROPERTY_TYPE_CONFIG.map((config, idx) => {
              const bgImage = PROPERTY_TYPE_IMAGES[config.slug] || '/assets/hero-apartment.webp';
              return (
                <StaggerItem key={config.slug} index={idx} className="h-full">
                  <Link
                    href={`/property-types/${config.slug}`}
                    className="relative rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between min-h-[170px] h-full overflow-hidden bg-slate-900"
                  >
                    {/* Card Background Photo - Natural presentation */}
                    <img
                      src={bgImage}
                      alt={`${config.name} in Nagpur`}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    {/* Subtle contrast gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-900/40 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold text-sky-300 uppercase tracking-wider block drop-shadow-sm">
                        {config.countSnapshot}
                      </span>
                    </div>

                    {/* Bottom Text Content */}
                    <div className="relative z-10 space-y-1">
                      <h3 className="font-extrabold text-white text-base leading-tight drop-shadow-md group-hover:text-sky-300 transition-colors">
                        {config.name}
                      </h3>
                      <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm font-medium">
                        {config.description}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </section>
      </div>

      {/* 3. Featured Nagpur Listings */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 border-y border-slate-200/70 dark:border-slate-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                  Verified Snapshot & Demo Samples
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                  Featured Properties Across Nagpur
                </h2>
              </div>
              <div className="flex gap-2">
                <Link
                  href="/properties/for-sale"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 active:scale-95 transition-all duration-150"
                >
                  View Sale Catalog
                </Link>
                <Link
                  href="/properties/for-rent"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all duration-150"
                >
                  View Rent Catalog
                </Link>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, idx) => (
              <StaggerItem key={property.id} index={idx}>
                <PropertyCard property={property} />
              </StaggerItem>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Prime Nagpur Localities Showcase (Full-Width Photographic Section with Parallax) */}
      <ParallaxSection
        bgImageUrl="/assets/hero-golden-hour.webp"
        alt="Nagpur Prime Neighborhoods Landscape"
        className="w-full py-20 bg-slate-950"
      >
        {/* Dark readability gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/85 to-slate-950/95 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-sky-400">
                  Key Micro-Markets
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  Explore Prime Neighborhoods in Nagpur
                </h2>
              </div>
              <Link
                href="/localities"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition-all duration-150 flex items-center gap-1.5 w-fit"
              >
                View All 12 Localities <ArrowRight className="w-4 h-4 text-sky-400" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {localities.map((loc, idx) => {
              const bgImage = LOCALITY_IMAGES[loc.slug] || '/assets/hero-golden-hour.webp';
              return (
                <StaggerItem key={loc.slug} index={idx} className="h-full">
                  <Link
                    href={`/localities/${loc.slug}`}
                    className="relative rounded-2xl p-5 border border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between min-h-[220px] h-full overflow-hidden bg-slate-900/80 backdrop-blur-md"
                  >
                    {/* Card Background Photo */}
                    <img
                      src={bgImage}
                      alt={`${loc.name}, Nagpur`}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    {/* Text readability gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-slate-900/40 pointer-events-none" />

                    {/* Top Zone Tag */}
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-900/80 text-sky-300 border border-sky-700/60 shadow-sm inline-block">
                        {loc.zone}
                      </span>
                    </div>

                    {/* Bottom Text Content */}
                    <div className="relative z-10 space-y-1.5">
                      <h3 className="font-extrabold text-white text-lg group-hover:text-sky-300 transition-colors duration-150 drop-shadow-md">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm font-medium">
                        {loc.overview}
                      </p>
                      <div className="pt-2 border-t border-slate-600/60 flex items-center justify-between text-[11px] text-slate-300">
                        <span>Avg Rate: <strong className="text-emerald-400">{loc.avgPricePerSqFtSale}</strong></span>
                        <span className="text-sky-300 group-hover:translate-x-1 transition-transform duration-150">→</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </div>
      </ParallaxSection>

      {/* 5. Nagpur Builder Projects & Societies */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <RevealOnScroll>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400">
                  Organized Schemes & Townships
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
                  Nagpur Builder Projects & Societies
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 inline-flex items-center gap-1 transition-colors duration-150"
              >
                View All Schemes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((proj, idx) => {
              const bgImage = PROJECT_IMAGES[proj.slug] || '/assets/project-amar-sankul.webp';
              return (
                <StaggerItem key={proj.slug} index={idx} className="h-full">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="relative rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between min-h-[220px] h-full overflow-hidden bg-slate-900"
                  >
                    {/* Card Background Photo */}
                    <img
                      src={bgImage}
                      alt={`${proj.name} by ${proj.builder} in ${proj.locality}, Nagpur`}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    {/* Contrast gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-900/40 pointer-events-none" />

                    {/* Top Status Tag */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 shadow-sm inline-block">
                        {proj.reraStatus}
                      </span>
                      <span className="text-[11px] text-slate-200 drop-shadow-sm font-semibold">
                        {proj.locality}
                      </span>
                    </div>

                    {/* Bottom Text Content */}
                    <div className="relative z-10 space-y-1">
                      <h3 className="font-extrabold text-white text-base group-hover:text-sky-300 transition-colors duration-150 drop-shadow-md">
                        {proj.name}
                      </h3>
                      <div className="text-[11px] text-slate-300 drop-shadow-sm">
                        By <strong className="text-white">{proj.builder}</strong>
                      </div>
                      <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm font-medium">
                        {proj.description}
                      </p>
                      <div className="pt-2 border-t border-slate-600/60 text-[11px] text-sky-300 font-bold flex items-center justify-between">
                        <span>View Society Layout</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Why Invest in Nagpur Real Estate? (Full-Width Photographic Section with Parallax) */}
      <ParallaxSection
        bgImageUrl="/assets/hero-apartment.webp"
        alt="Nagpur Real Estate Market Infrastructure"
        className="w-full py-20 bg-slate-950"
      >
        {/* Deep navy/slate gradient overlay for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/90 to-slate-900/85 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: Advisory Information */}
            <RevealOnScroll className="lg:col-span-1 space-y-4">
              <span className="text-xs font-bold tracking-wider uppercase text-sky-400">
                City Infrastructure Insights
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Why Invest in Nagpur Real Estate?
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nagpur stands as central India’s leading commercial capital. With the operational Nagpur Metro Phase 1 & 2, Samruddhi Mahamarg expressway link to Mumbai, and large-scale tech hiring in MIHAN, the city delivers strong capital appreciation and rental yield.
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919898989898"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Nagpur Advisory: +919898989898
                </a>
              </div>
            </RevealOnScroll>

            {/* Right 2x2 Grid: Key Growth Pillars */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StaggerItem index={0} className="h-full">
                <div className="relative rounded-2xl p-5 border border-slate-700/80 shadow-md hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[160px] h-full bg-slate-900/80 backdrop-blur-md">
                  <img
                    src="/assets/hero-golden-hour.webp"
                    alt="Nagpur Metro Infrastructure"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-slate-900/70 pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <div className="font-extrabold text-sm text-sky-300">
                      1. Nagpur Metro Orange & Aqua Lines
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Connects North-South (Automotive Square to Khapri/MIHAN) and East-West (Pardi to Lokmanya Nagar Hingna), boosting apartment values along the stations.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem index={1} className="h-full">
                <div className="relative rounded-2xl p-5 border border-slate-700/80 shadow-md hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[160px] h-full bg-slate-900/80 backdrop-blur-md">
                  <img
                    src="/assets/prop-it-park.webp"
                    alt="MIHAN SEZ and Tech Corridor"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-slate-900/70 pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <div className="font-extrabold text-sm text-sky-300">
                      2. MIHAN SEZ & Tech Corridor
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Hosting TCS, Infosys, Tech Mahindra, and AIIMS Nagpur, creating robust year-round housing and rental demand in Wardha Road, Manish Nagar, and Besa.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem index={2} className="h-full">
                <div className="relative rounded-2xl p-5 border border-slate-700/80 shadow-md hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[160px] h-full bg-slate-900/80 backdrop-blur-md">
                  <img
                    src="/assets/hero-township.webp"
                    alt="Plotted Layout Sanctions NMRDA"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-slate-900/70 pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <div className="font-extrabold text-sm text-sky-300">
                      3. Plotted Layout Sanctions (NMRDA)
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      NMRDA & RL sanctioned residential plots along Jamtha, Borkhedi, and Hingna offer clear title security and straightforward bank loan approvals.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem index={3} className="h-full">
                <div className="relative rounded-2xl p-5 border border-slate-700/80 shadow-md hover:shadow-2xl hover:border-sky-400 hover:-translate-y-2 transition-all duration-300 overflow-hidden group flex flex-col justify-between min-h-[160px] h-full bg-slate-900/80 backdrop-blur-md">
                  <img
                    src="/assets/prop-house-hingna.webp"
                    alt="High Quality of Life and Affordability in Nagpur"
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-slate-900/70 pointer-events-none" />
                  <div className="relative z-10 space-y-2">
                    <div className="font-extrabold text-sm text-sky-300">
                      4. High Quality of Life & Affordability
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Compared to Mumbai and Pune, Nagpur provides superior air quality, lower congestion, premier educational hubs (VNIT, IIM), and accessible price points.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}
