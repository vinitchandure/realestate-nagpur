import React from 'react';
import Link from '../utils/router';
import WishlistButton from './WishlistButton';
import { MapPin, Bed, Bath, Maximize2, Building, ShieldCheck, HelpCircle, Phone, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ property }) {
  const isSale = property.listingType === 'sale';
  const propertyUrl = `/properties/${property.slug}`;

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-2xl hover:-translate-y-1.5 hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 ease-out flex flex-col overflow-hidden will-change-transform">
      {/* Top Property Image with Badges & Pricing Overlay - NO dark filter on image */}
      <div className="relative h-52 sm:h-56 bg-slate-900 overflow-hidden">
        {/* Clickable Image Link wrapping the property photo */}
        <Link
          href={propertyUrl}
          aria-label={`View full details for ${property.title} in ${property.locality}, Nagpur`}
          title={`View full details for ${property.title}`}
          className="block w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 z-0 overflow-hidden"
        >
          {/* Real Property Photo - Natural presentation with expressive 1.08 scale on hover */}
          <img
            src={property.imageUrl}
            alt={`${property.title} in ${property.locality}, Nagpur`}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Subtle Top & Bottom Gradient Overlays for readable badges & price */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Subtle hover brightness feedback */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-250 pointer-events-none" />
        </Link>

        {/* Status Badges - pointer-events-none so image click through works */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-transform duration-250 group-hover:scale-102 ${
            isSale ? 'bg-sky-600 text-white' : 'bg-emerald-600 text-white'
          }`}>
            For {property.listingType}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 shadow-sm">
            {property.propertyType.split('/')[0].trim()}
          </span>
        </div>

        {/* Verification Status Pill & Independent Wishlist Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          {property.isDemo ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950 shadow-sm pointer-events-none" title="Demonstration mockup record">
              <HelpCircle className="w-3 h-3" />
              Demo Record
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-600/95 text-white shadow-sm pointer-events-none" title="Verified in live research snapshot">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}

          {/* Independent Wishlist Button: clickable without opening the property detail page */}
          <WishlistButton 
            propertySlug={property.slug} 
            variant="card"
          />
        </div>

        {/* Price Tag & Area Overlay at Bottom of Image (Clicking on price/area also navigates to property) */}
        <Link
          href={propertyUrl}
          aria-hidden="true"
          tabIndex={-1}
          className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 cursor-pointer"
        >
          <div>
            <div className="text-xl font-extrabold text-white tracking-tight drop-shadow-md group-hover:text-sky-200 transition-colors duration-200">
              {property.priceDisplay}
            </div>
            {property.pricePerSqFt && (
              <div className="text-[11px] text-slate-200 font-medium drop-shadow-sm">
                {property.pricePerSqFt}
              </div>
            )}
          </div>
          <span className="text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-sm shadow-sm transition-all duration-250 group-hover:bg-sky-900/80 group-hover:scale-105">
            {property.area}
          </span>
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Locality Link */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <Link 
              href={`/localities/${property.localitySlug}`}
              className="inline-flex items-center gap-1 text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 font-semibold transition-colors duration-150"
            >
              <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              {property.locality}, Nagpur
            </Link>
            {property.projectName && (
              <Link
                href={`/projects/${property.projectSlug || 'shivam-heights'}`}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 truncate max-w-[140px] text-right font-medium transition-colors duration-150"
              >
                {property.projectName}
              </Link>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-snug line-clamp-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-200">
            <Link href={propertyUrl}>
              {property.title}
            </Link>
          </h3>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            {property.bhk && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">{property.bhk}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 col-span-1">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span className="truncate">{property.area}</span>
            </div>
          </div>

          {/* Brief Description */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {property.description}
          </p>

          {/* Amenities Pills Preview */}
          <div className="flex flex-wrap gap-1 pt-1">
            {property.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium transition-colors duration-150">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 self-center">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <Link
            href={propertyUrl}
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors duration-150"
          >
            Full Details <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          
          <a
            href="tel:+919898989898"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-slate-900 bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-100 active:scale-95 rounded-lg transition-all duration-150 shadow-sm"
            title="Demo Phone Helpline"
          >
            <Phone className="w-3 h-3 text-emerald-500" />
            +919898989898
          </a>
        </div>
      </div>
    </article>
  );
}
