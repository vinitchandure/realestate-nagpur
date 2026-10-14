import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';



export default function PropertyGallery({
  images,
  title,
  propertyType,
  locality,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images && images.length > 0 ? images : ['/assets/project-amar-sankul.webp'];
  const currentImage = displayImages[activeIndex] || displayImages[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full space-y-3">
      {/* Prominent Main Hero Gallery Image */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm group">
        <img
          src={currentImage}
          alt={`${title} - ${propertyType} in ${locality}, Nagpur (Photo ${activeIndex + 1})`}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Ambient Top and Bottom Gradient */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Photo Counter Pill */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/65 backdrop-blur-md text-white border border-white/20">
          <Camera className="w-3.5 h-3.5 text-sky-400" />
          <span>Photo {activeIndex + 1} of {displayImages.length}</span>
        </div>

        {/* Property Type & Locality Tag */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:block">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/65 backdrop-blur-md text-slate-100 border border-white/15">
            {propertyType} • {locality}, Nagpur
          </span>
        </div>

        {/* Prev / Next Arrows (if > 1 image) */}
        {displayImages.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 sm:inset-x-4 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous property photo"
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next property photo"
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 pt-0.5 px-0.5 scrollbar-thin">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative flex-shrink-0 w-20 h-14 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-sky-500 ring-2 ring-sky-400/40 scale-100 opacity-100 shadow-md'
                  : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100 scale-95'
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <span className="sr-only">Thumbnail {idx + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
