import React from 'react';
import Link from '../utils/router';
import { useAuth } from '../utils/authContext';
import { getAllProperties } from '../utils/data';
import PropertyCard from './PropertyCard';
import Breadcrumbs from './Breadcrumbs';
import { Heart, Search, ArrowRight, UserCheck, Shield, Sparkles, Building2 } from 'lucide-react';

export default function WishlistPage() {
  const { user, isAuthenticated, wishlist, openAuthModal } = useAuth();
  const allProperties = getAllProperties();

  // Filter properties matching user's wishlist slugs
  const savedProperties = allProperties.filter((p) => wishlist.includes(p.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'My Saved Wishlist' },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 dark:from-black dark:via-slate-900 dark:to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800/80 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Heart className="w-80 h-80 fill-white text-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Personal Real Estate Collection</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isAuthenticated && user ? `${user.name}'s Wishlist` : 'Your Saved Nagpur Properties'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Keep track of favorite Nagpur flats, plots, luxury villas, and commercial spaces. Revisit pricing, floor plans, and arrange direct site visits whenever you are ready.
          </p>

          {isAuthenticated && user && (
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 font-medium bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Signed in as: <strong className="text-white">{user.email}</strong>
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-rose-300 font-semibold">
                {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Unauthenticated View: Prompt visitor to sign in or create account */}
      {!isAuthenticated && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Sign in to see your saved properties
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your wishlist is securely synced with your account so you can view saved properties on any device.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-sm rounded-xl transition-all"
            >
              Create Free Account
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" /> Verified Listings
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-500" /> Free Price Alerts
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-500" /> Direct Builder Contacts
            </span>
          </div>
        </div>
      )}

      {/* Authenticated View: Empty wishlist state */}
      {isAuthenticated && savedProperties.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Your wishlist is currently empty
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Browse our verified Nagpur listings and click the heart icon on any property to save it here for quick access.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/properties/for-sale"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              <Search className="w-4 h-4" />
              Explore Nagpur For Sale
            </Link>
            <Link
              href="/properties/for-rent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-xl transition-all"
            >
              Explore Nagpur Rentals
            </Link>
          </div>
        </div>
      )}

      {/* Authenticated View: List of saved properties */}
      {isAuthenticated && savedProperties.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Saved Listings ({savedProperties.length})
            </h2>
            <Link
              href="/properties/for-sale"
              className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 inline-flex items-center gap-1"
            >
              Discover More Properties <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
