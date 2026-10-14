import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from '../utils/router';
import { Search, MapPin, Home, IndianRupee } from 'lucide-react';
import { NAGPUR_LOCALITIES } from '../utils/data';
import { PROPERTY_TYPE_CONFIG } from '../utils/data';

export default function SearchBar() {
  const router = useRouter();
  const [tab, setTab] = useState('sale');
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locality) params.set('locality', locality);
    if (propertyType) params.set('type', propertyType);
    if (budget) params.set('budget', budget);

    const basePath = tab === 'sale' ? '/properties/for-sale' : '/properties/for-rent';
    const queryString = params.toString() ? `?${params.toString()}` : '';
    router.push(`${basePath}${queryString}`);
  };

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-6 max-w-4xl mx-auto backdrop-blur-md w-full overflow-hidden transition-colors">
      {/* Top Tab Toggle: Buy / Rent */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setTab('sale')}
          className={`flex-1 sm:flex-initial px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center ${
            tab === 'sale'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Buy in Nagpur
        </button>
        <button
          type="button"
          onClick={() => setTab('rent')}
          className={`flex-1 sm:flex-initial px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center ${
            tab === 'rent'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Rent in Nagpur
        </button>
        <div className="ml-auto text-[11px] sm:text-xs font-semibold text-slate-400 dark:text-slate-400 hidden sm:block">
          Nagpur Exclusive
        </div>
      </div>

      {/* Search Input Controls */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {/* Locality Selector */}
        <div className="space-y-1">
          <label className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0" /> Locality / Area
          </label>
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100 transition-colors"
          >
            <option value="">All Nagpur Localities</option>
            {NAGPUR_LOCALITIES.map((loc) => (
              <option key={loc.slug} value={loc.slug}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Selector */}
        <div className="space-y-1">
          <label className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0" /> Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100 transition-colors"
          >
            <option value="">All Property Types</option>
            {PROPERTY_TYPE_CONFIG.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Max */}
        <div className="space-y-1">
          <label className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0" /> Max Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3 py-2.5 text-xs sm:text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100 transition-colors"
          >
            <option value="">Any Budget</option>
            {tab === 'sale' ? (
              <>
                <option value="3000000">Up to ₹30 Lakh</option>
                <option value="5000000">Up to ₹50 Lakh</option>
                <option value="7500000">Up to ₹75 Lakh</option>
                <option value="10000000">Up to ₹1 Crore</option>
                <option value="15000000">Up to ₹1.5 Crore</option>
                <option value="25000000">Up to ₹2.5 Crore</option>
              </>
            ) : (
              <>
                <option value="15000">Up to ₹15,000 / mo</option>
                <option value="25000">Up to ₹25,000 / mo</option>
                <option value="40000">Up to ₹40,000 / mo</option>
                <option value="60000">Up to ₹60,000 / mo</option>
              </>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex items-end pt-1 sm:pt-0">
          <button
            type="submit"
            className="w-full h-[42px] px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all hover:shadow-lg"
          >
            <Search className="w-4 h-4" />
            <span>Search Nagpur</span>
          </button>
        </div>
      </form>
    </div>
  );
}
