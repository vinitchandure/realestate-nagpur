import React, { useState, useEffect, useCallback, useRef } from 'react';

import SearchBar from './SearchBar';
import { NAGPUR_SNAPSHOT } from '../utils/snapshots';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  MapPin 
} from 'lucide-react';



const HERO_SLIDES = [
  {
    src: '/assets/hero-apartment.webp',
    title: 'Modern High-Rise Living',
    location: 'Wardha Road Corridor & Besa',
    alt: 'Photorealistic architectural view of a luxury high-rise apartment building in Nagpur with landscaped gardens'
  },
  {
    src: '/assets/hero-villa.webp',
    title: 'Bespoke Luxury Villas',
    location: 'Dharampeth & West Nagpur Estates',
    alt: 'Photorealistic architectural view of a contemporary luxury independent villa in Nagpur with ambient lighting'
  },
  {
    src: '/assets/hero-township.webp',
    title: 'Sanctioned Plotted Townships',
    location: 'Jamtha, Borkhedi & NH 44 Belts',
    alt: 'Photorealistic aerial view of a master-planned residential plotted township layout with concrete avenues'
  },
  {
    src: '/assets/hero-golden-hour.webp',
    title: 'Gated Residential Townships',
    location: 'MIHAN SEZ & Tech Corridor',
    alt: 'Photorealistic golden hour architectural view of luxury residential towers and community clubhouse in Nagpur'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef(null);

  // Check for prefers-reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Automatic slideshow interval: exactly 2.5 seconds (within the 2-3s requirement)
  useEffect(() => {
    if (isPaused || reducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 2600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, reducedMotion, nextSlide]);

  return (
    <section 
      className="relative text-white pt-12 pb-24 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 px-3 sm:px-6 lg:px-8 overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Nagpur Real Estate Architectural Highlights"
    >
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{
                transitionDuration: reducedMotion ? '0ms' : '700ms'
              }}
              aria-hidden={!isActive}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="object-cover object-center w-full h-full transform scale-100 motion-safe:scale-105 motion-safe:transition-transform motion-safe:duration-[4000ms] ease-out"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })}

        {/* Polished Multi-Stop Dark & Warm Gradient Overlay */}
        {/* Ensures white typography and the white search card are always crisp and readable */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />
        {/* Warm ambient vignette */}
        <div className="absolute inset-0 z-20 bg-amber-950/15 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Hero Interactive Foreground Content with entrance motion */}
      <div className="relative z-30 max-w-5xl mx-auto text-center space-y-5 sm:space-y-7 w-full px-1">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 animate-fadeIn" style={{ animationDuration: '300ms' }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/85 border border-sky-400/30 text-sky-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-black/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
            <span>Nagpur City Exclusive</span>
          </div>

          {/* Current Slide Theme Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/75 border border-white/10 text-slate-200 text-[11px] sm:text-xs font-medium backdrop-blur-md">
            <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
            <span className="text-amber-300 font-semibold">{HERO_SLIDES[currentSlide].title}:</span>
            <span className="text-slate-300 truncate max-w-[180px] sm:max-w-none">{HERO_SLIDES[currentSlide].location}</span>
          </div>
        </div>

        {/* Main Headline with gentle upward entrance */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] drop-shadow-lg max-w-4xl mx-auto px-2 animate-slideDown" style={{ animationDuration: '350ms' }}>
          Discover Homes, Plots & Commercial Spaces in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-200">
            Nagpur
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base lg:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-normal px-2 animate-fadeIn" style={{ animationDuration: '400ms' }}>
          The premier city portal for Nagpur real estate. Explore verified residential flats, clear-title plots, and commercial properties across Wardha Road, Besa, Dharampeth, and MIHAN.
        </p>

        {/* Interactive Search Bar Panel with smooth entrance */}
        <div className="pt-1 text-left w-full max-w-full animate-scaleUp" style={{ animationDuration: '420ms' }}>
          <SearchBar />
        </div>

        {/* Snapshot Notice & Direct Helpline Strip */}
        <div className="pt-1 flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-300 font-medium drop-shadow">
          <span className="bg-slate-950/70 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
            Snapshot Source
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="bg-slate-950/70 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
            Date Recorded
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="bg-slate-950/70 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10 text-emerald-400 font-semibold">
            Demo Hotline: +919898989898
          </span>
        </div>
      </div>

      {/* Accessible Previous / Next Slide Controls */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all hover:scale-105 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-label="Previous image slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all hover:scale-105 hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        aria-label="Next image slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators & Auto-Play Toggle Controls at Bottom */}
      {/* Positioned safely above the bottom margin overlap */}
      <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2 sm:gap-3 px-3">
        <div className="bg-slate-950/80 border border-white/15 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 shadow-xl">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  isActive
                    ? 'w-6 sm:w-7 h-2 bg-gradient-to-r from-sky-400 to-amber-300 shadow-sm'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Jump to slide ${index + 1}: ${slide.title}`}
                aria-current={isActive ? 'true' : 'false'}
              />
            );
          })}

          <div className="w-[1px] h-3 bg-white/20 mx-1" />

          {/* Pause / Play Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="text-slate-300 hover:text-white p-1 rounded-full focus:outline-none transition-colors"
            aria-label={isPaused ? 'Resume slideshow auto-play' : 'Pause slideshow auto-play'}
            title={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3 text-slate-300" />}
          </button>
        </div>
      </div>
    </section>
  );
}
