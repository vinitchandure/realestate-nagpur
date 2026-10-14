import React, { useState } from 'react';
import Link from '../utils/router';
import { Search, Phone, Menu, X, ChevronDown, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../utils/authContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [typesDropdown, setTypesDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const { user, isAuthenticated, wishlist, openAuthModal, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 dark:bg-black text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Nagpur City Property Index & Architecture Portal</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-400">Reference Snapshot: October 12, 2026</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span>Direct Demo Desk:</span>
            <a 
              href="tel:+919898989898" 
              className="font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              +919898989898
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - crisp & natural in both light and dark backgrounds */}
          <Link href="/" className="flex items-center group py-1" aria-label="Real Estate Nagpur">
            <div className="dark:bg-white/10 dark:p-1.5 dark:rounded-xl dark:backdrop-blur-sm transition-all duration-200">
              <img
                src="/assets/logo.webp"
                alt="Real Estate Nagpur"
                className="h-9 sm:h-11 w-auto max-w-[170px] sm:max-w-[210px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link 
              href="/properties/for-sale" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
            >
              Buy in Nagpur
            </Link>
            <Link 
              href="/properties/for-rent" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
            >
              Rent in Nagpur
            </Link>
            
            {/* Property Types Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setTypesDropdown(!typesDropdown)}
                onBlur={() => setTimeout(() => setTypesDropdown(false), 200)}
                aria-expanded={typesDropdown}
                className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg inline-flex items-center gap-1 transition-colors duration-150"
              >
                <span>Property Types</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${typesDropdown ? 'rotate-180 text-sky-600' : ''}`} />
              </button>
              {typesDropdown && (
                <div className="absolute left-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-slideDown">
                  <Link 
                    href="/property-types/flats-apartments" 
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors duration-150"
                  >
                    Flats & Apartments
                  </Link>
                  <Link 
                    href="/property-types/residential-plots" 
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors duration-150"
                  >
                    Residential Plots / Land
                  </Link>
                  <Link 
                    href="/property-types/independent-houses" 
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors duration-150"
                  >
                    Independent Houses / Villas
                  </Link>
                  <Link 
                    href="/property-types/commercial-properties" 
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors duration-150"
                  >
                    Commercial Shops & Offices
                  </Link>
                  <Link 
                    href="/property-types/farm-houses-land" 
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors duration-150"
                  >
                    Farm Houses & Agri Land
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                  <Link 
                    href="/property-types" 
                    className="block px-4 py-2 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-slate-800 transition-colors duration-150"
                  >
                    View All Property Types →
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/localities" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
            >
              Localities
            </Link>
            <Link 
              href="/projects" 
              className="px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
            >
              Projects & Societies
            </Link>
          </nav>

          {/* Right Action Items: ThemeToggle, Wishlist, Account, and Search Button */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Wishlist Link with dynamic count */}
            <Link
              href="/wishlist"
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
              title="Saved Properties Wishlist"
            >
              <Heart className={`w-4 h-4 transition-transform duration-200 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500 scale-105' : 'text-slate-500 dark:text-slate-400'}`} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold text-white bg-rose-600 rounded-full shadow-sm animate-scaleUp">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account / User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdown(!userDropdown)}
                  onBlur={() => setTimeout(() => setUserDropdown(false), 200)}
                  aria-expanded={userDropdown}
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors duration-150"
                >
                  <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`} />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 animate-slideDown">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-150"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      Saved Wishlist ({wishlist.length})
                    </Link>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-left hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4 text-slate-400" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signin')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
              >
                <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Account</span>
              </button>
            )}

            {/* Explore Button */}
            <Link 
              href="/properties/for-sale" 
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:scale-95 rounded-lg shadow-sm shadow-sky-600/30 transition-all duration-150 hover:shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>Explore</span>
            </Link>
          </div>

          {/* Mobile Right Bar: Theme Toggle + Wishlist + Hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle className="p-1.5" />

            <Link
              href="/wishlist"
              className="relative p-2 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 transition-transform duration-200 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500 scale-105' : 'text-slate-600 dark:text-slate-300'}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-rose-600 rounded-full flex items-center justify-center animate-scaleUp">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with smooth animate-slideDrawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-2.5 shadow-lg animate-slideDrawer">
          {/* Account status row for mobile */}
          <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 px-2 py-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-500 dark:text-slate-400">Welcome to Real Estate Nagpur</span>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); openAuthModal('signin'); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  Sign In / Register
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle row for mobile navigation */}
          <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
            <ThemeToggle variant="mobile" />
          </div>

          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
          >
            <span className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-500 dark:text-slate-400'}`} />
              My Wishlist
            </span>
            <span className="text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full">
              {wishlist.length} saved
            </span>
          </Link>

          <Link
            href="/properties/for-sale"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
          >
            Buy Properties (Sale)
          </Link>
          <Link
            href="/properties/for-rent"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
          >
            Rent Properties
          </Link>
          <Link
            href="/property-types"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
          >
            Property Types Directory
          </Link>
          <Link
            href="/localities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
          >
            Nagpur Localities
          </Link>
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors duration-150"
          >
            Projects & Societies
          </Link>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href="tel:+919898989898"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-slate-900 dark:bg-slate-800 text-white font-medium text-sm hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Demo Helpline: +919898989898
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
