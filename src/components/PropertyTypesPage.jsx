import React from 'react';
import Link from '../utils/router';
import Breadcrumbs from './Breadcrumbs';
import { PROPERTY_TYPE_CONFIG } from '../utils/data';
import { Home, ArrowRight, Building2, MapPin } from 'lucide-react';


export default function PropertyTypesDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'Property Types' },
        ]}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Nagpur Asset Classes
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Property Types Directory in Nagpur
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Select a category to view specialized market insights, average price trends across micro-markets, and active listings in Nagpur.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROPERTY_TYPE_CONFIG.map((type) => (
          <div
            key={type.slug}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 block uppercase tracking-wider">
                  {type.countSnapshot}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {type.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {type.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                  Top Localities in Nagpur:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {type.popularAreas.map((loc, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                    >
                      {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={`/property-types/${type.slug}`}
                className="w-full py-2.5 px-4 bg-sky-50 dark:bg-slate-800 hover:bg-sky-600 dark:hover:bg-sky-600 text-sky-700 dark:text-sky-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <span>View {type.name} Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
