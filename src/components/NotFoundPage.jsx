import React from 'react';
import Link from '../utils/router';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <span className="text-5xl font-black text-sky-600 dark:text-sky-400">404</span>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Page Not Found</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            The Nagpur property page, micro-market, or directory URL you requested could not be found.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
          <Link
            href="/properties/for-sale"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Search className="w-4 h-4" /> Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
