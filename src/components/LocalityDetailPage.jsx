import React from 'react';
import Link from '../utils/router';

import Breadcrumbs from './Breadcrumbs';
import PropertyCard from './PropertyCard';
import { 
  getLocalityBySlug, 
  getAllLocalities, 
  getPropertiesByLocality 
} from '../utils/data';
import { 
  MapPin, 
  TrendingUp, 
  CheckCircle, 
  Building2, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Phone
} from 'lucide-react';


export default function LocalityDetailPage({ slug }) {
  const locality = getLocalityBySlug(slug);

  if (!locality) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl font-bold mb-2">Locality Not Found</h2><p className="text-sm text-slate-500 mb-6">The locality you are looking for does not exist in our directory.</p><Link href="/localities" className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold">Browse Localities</Link></div>;
  }

  const localityProperties = getPropertiesByLocality(slug);
  const otherLocalities = getAllLocalities().filter((l) => l.slug !== slug).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'Localities Guide', href: '/localities' },
          { label: locality.name },
        ]}
      />

      {/* Locality Hero Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
                {locality.zone}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Nagpur Micro-Market Profile</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {locality.name}, Nagpur
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {locality.overview}
            </p>
          </div>

          {/* Pricing Highlight Pill */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center sm:text-right min-w-[240px] space-y-2">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Avg. Sale Price Rate</span>
              <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{locality.avgPricePerSqFtSale}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Monthly Rental Bracket</span>
              <span className="text-base font-bold text-slate-800 dark:text-slate-200">{locality.avgRentMonthly}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connectivity & Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" /> Transit & Infrastructure Connectivity
          </h2>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {locality.connectivity.map((conn, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{conn}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Investment Merits & Demand Drivers
          </h2>
          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {locality.keyHighlights.map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Properties in this Locality */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Active Properties in {locality.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified snapshot records and demonstration listings located in {locality.name}
            </p>
          </div>
          <Link
            href={`/properties/for-sale?locality=${locality.slug}`}
            className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 inline-flex items-center gap-1"
          >
            Filter for {locality.name} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {localityProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localityProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
            <p>No featured listings are currently displayed for this specific sector.</p>
            <Link
              href="/properties/for-sale"
              className="inline-block px-4 py-2 bg-sky-600 text-white rounded-xl font-bold"
            >
              Browse All Nagpur Listings
            </Link>
          </div>
        )}
      </div>

      {/* Explore Neighboring Localities */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Explore Other Nagpur Localities
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {otherLocalities.map((loc) => (
            <Link
              key={loc.slug}
              href={`/localities/${loc.slug}`}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-all flex items-center justify-between shadow-sm"
            >
              <span>{loc.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
