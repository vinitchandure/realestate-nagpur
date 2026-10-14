import React, { useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import { StaggerItem } from './RevealOnScroll';
import { NAGPUR_LOCALITIES } from '../utils/data';
import { PROPERTY_TYPE_CONFIG } from '../utils/data';
import { 
  Filter, 
  ArrowUpDown, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';



export default function ListingFilterCatalog({
  initialProperties,
  listingType,
  title,
  description,
  initialLocality = '',
  initialType = '',
}) {
  // Filter States
  const [selectedLocality, setSelectedLocality] = useState(initialLocality);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedBhk, setSelectedBhk] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      if (selectedLocality && p.localitySlug !== selectedLocality) {
        return false;
      }
      if (selectedType && p.propertyTypeSlug !== selectedType) {
        return false;
      }
      if (selectedBhk) {
        if (!p.bhk || !p.bhk.includes(selectedBhk)) return false;
      }
      if (verifiedOnly && p.isDemo) {
        return false;
      }
      return true;
    });
  }, [initialProperties, selectedLocality, selectedType, selectedBhk, verifiedOnly]);

  // Sorting Logic
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === 'area-desc') {
      list.sort((a, b) => b.areaNumeric - a.areaNumeric);
    }
    return list;
  }, [filteredProperties, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage) || 1;
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProperties.slice(start, start + itemsPerPage);
  }, [sortedProperties, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setSelectedLocality('');
    setSelectedType('');
    setSelectedBhk('');
    setVerifiedOnly(false);
    setSortBy('relevance');
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Title & Description Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
        <span className={`text-xs font-bold uppercase tracking-wider ${
          listingType === 'sale' ? 'text-sky-600 dark:text-sky-400' : 'text-emerald-600 dark:text-emerald-400'
        }`}>
          Nagpur {listingType === 'sale' ? 'Sale Market' : 'Rental Market'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 pr-2 border-r border-slate-200 dark:border-slate-700">
              <Filter className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Filters</span>
            </div>

            {/* Locality Dropdown */}
            <select
              value={selectedLocality}
              onChange={(e) => { setSelectedLocality(e.target.value); setCurrentPage(1); }}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
              <option value="">All Nagpur Localities</option>
              {NAGPUR_LOCALITIES.map((loc) => (
                <option key={loc.slug} value={loc.slug}>
                  {loc.name}
                </option>
              ))}
            </select>

            {/* Property Type Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
              <option value="">All Property Types</option>
              {PROPERTY_TYPE_CONFIG.map((t) => (
                <option key={t.slug} value={t.slug}>
                  {t.name}
                </option>
              ))}
            </select>

            {/* BHK Filter */}
            <select
              value={selectedBhk}
              onChange={(e) => { setSelectedBhk(e.target.value); setCurrentPage(1); }}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
              <option value="">Any BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4+ BHK</option>
            </select>

            {/* Source Verified Snapshot Only Toggle */}
            <button
              type="button"
              onClick={() => { setVerifiedOnly(!verifiedOnly); setCurrentPage(1); }}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-all ${
                verifiedOnly
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${verifiedOnly ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span>Verified Only</span>
            </button>

            {/* Reset Filters */}
            {(selectedLocality || selectedType || selectedBhk || verifiedOnly) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-bold flex items-center gap-1 px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-end lg:self-center">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value )}
              className="text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
            >
              <option value="relevance">Featured & Relevant</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="area-desc">Area: Largest First</option>
            </select>
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing <strong className="text-slate-800 dark:text-slate-200">{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'property' : 'properties'} in Nagpur
          </span>
          {verifiedOnly && (
            <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
              <Check className="w-3 h-3" /> Filtered to source-verified entries
            </span>
          )}
        </div>
      </div>

      {/* Property Cards Grid */}
      {paginatedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProperties.map((property, idx) => (
            <StaggerItem key={property.id} index={idx}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 shadow-sm transition-colors">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No properties matched your criteria
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try resetting your filters or selecting a different locality or property type in Nagpur.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                currentPage === page
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
