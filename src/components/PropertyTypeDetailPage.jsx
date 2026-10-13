import React from 'react';
import Link from '../utils/router';

import Breadcrumbs from './Breadcrumbs';
import PropertyCard from './PropertyCard';
import { 
  getPropertyTypeConfigBySlug, 
  PROPERTY_TYPE_CONFIG, 
  getPropertiesByPropertyType 
} from '../utils/data';
import { Home, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';


export default function PropertyTypeDetailPage({ slug }) {
  const config = getPropertyTypeConfigBySlug(slug);

  if (!config) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl font-bold mb-2">Category Not Found</h2><p className="text-sm text-slate-500 mb-6">The property type category does not exist.</p><Link href="/property-types" className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold">Browse Categories</Link></div>;
  }

  const matchingProperties = getPropertiesByPropertyType(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'Property Types', href: '/property-types' },
          { label: config.name },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Nagpur Category Hub
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              {config.name} in Nagpur
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
              {config.description}
            </p>
          </div>
          <div className="bg-sky-50 dark:bg-slate-800 border border-sky-200/80 dark:border-slate-700 rounded-2xl p-4 text-center sm:text-right min-w-[200px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block">
              Reference Index Snapshot
            </span>
            <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
              {config.countSnapshot}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
              Recorded in Nagpur baseline
            </span>
          </div>
        </div>

        {/* Top Localities Badges */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-1">
            Top Neighborhoods:
          </span>
          {config.popularAreas.map((loc, idx) => (
            <span 
              key={idx}
              className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {loc}
            </span>
          ))}
        </div>
      </div>

      {/* Matching Listings */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Featured {config.name} in Nagpur ({matchingProperties.length})
          </h2>
          <Link
            href="/properties/for-sale"
            className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
          >
            Explore All Listings →
          </Link>
        </div>

        {matchingProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
            <p>No featured demonstration records are linked to this specific type snapshot.</p>
            <Link
              href="/properties/for-sale"
              className="inline-block px-4 py-2 bg-sky-600 text-white rounded-xl font-bold"
            >
              Explore Full Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
