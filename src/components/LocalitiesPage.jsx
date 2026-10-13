import React from 'react';
import Link from '../utils/router';
import Breadcrumbs from './Breadcrumbs';
import { StaggerItem } from './RevealOnScroll';
import { getAllLocalities } from '../utils/data';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';


export default function LocalitiesDirectoryPage() {
  const localities = getAllLocalities();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'Localities Guide' },
        ]}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Nagpur Neighborhood Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Nagpur Micro-Markets & Localities
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Comprehensive area guides for prospective buyers, investors, and tenants. Explore price trends, transit corridors, and active listings across all prominent Nagpur zones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {localities.map((loc, idx) => (
          <StaggerItem key={loc.slug} index={idx} className="h-full">
            <div
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full"
            >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
                  {loc.zone}
                </span>
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {loc.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                  {loc.overview}
                </p>
              </div>

              {/* Rate Matrix */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Average Sale Rate:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{loc.avgPricePerSqFtSale}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Average Rental:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{loc.avgRentMonthly}</span>
                </div>
              </div>

              {/* Highlights Preview */}
              <div className="space-y-1 text-xs">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Key Connectors:
                </span>
                <div className="flex flex-wrap gap-1">
                  {loc.connectivity.slice(0, 2).map((c, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                      {c.split(',')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={`/localities/${loc.slug}`}
                className="w-full py-2.5 px-4 bg-sky-50 dark:bg-slate-800 hover:bg-sky-600 dark:hover:bg-sky-600 text-sky-700 dark:text-sky-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>Read Full Locality Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </StaggerItem>
        ))}
      </div>
    </div>
  );
}
