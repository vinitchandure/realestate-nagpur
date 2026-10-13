import React from 'react';
import { RouterProvider, usePathname } from './utils/router';
import { ThemeProvider } from './utils/themeContext';
import { AuthProvider } from './utils/authContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PageTransitionWrapper from './components/PageTransitionWrapper';

// Pages
import HomePage from './components/HomePage';
import ListingFilterCatalog from './components/ListingFilterCatalog';
import PropertyDetailPage from './components/PropertyDetailPage';
import LocalitiesPage from './components/LocalitiesPage';
import LocalityDetailPage from './components/LocalityDetailPage';
import ProjectsPage from './components/ProjectsPage';
import ProjectDetailPage from './components/ProjectDetailPage';
import PropertyTypesPage from './components/PropertyTypesPage';
import PropertyTypeDetailPage from './components/PropertyTypeDetailPage';
import WishlistPage from './components/WishlistPage';
import NotFoundPage from './components/NotFoundPage';

import { getAllProperties } from './utils/data';

function RouteView() {
  const pathname = usePathname();
  const allProperties = getAllProperties();

  // Route: /
  if (pathname === '/' || pathname === '') {
    return <HomePage />;
  }

  // Route: /properties/for-sale
  if (pathname === '/properties/for-sale') {
    const saleProps = allProperties.filter(p => p.listingType === 'sale');
    return (
      <ListingFilterCatalog
        initialProperties={saleProps}
        listingType="sale"
        title="Nagpur Properties for Sale"
        description="Explore verified residential plots, apartments, independent houses, and commercial listings across Nagpur."
      />
    );
  }

  // Route: /properties/for-rent
  if (pathname === '/properties/for-rent') {
    const rentProps = allProperties.filter(p => p.listingType === 'rent');
    return (
      <ListingFilterCatalog
        initialProperties={rentProps}
        listingType="rent"
        title="Nagpur Properties for Rent"
        description="Explore verified flats, independent houses, office spaces, and commercial properties available for lease in Nagpur."
      />
    );
  }

  // Route: /properties/:slug
  if (pathname.startsWith('/properties/')) {
    const slug = pathname.replace('/properties/', '').replace(/\/$/, '');
    if (slug) {
      return <PropertyDetailPage slug={slug} />;
    }
  }

  // Route: /localities
  if (pathname === '/localities') {
    return <LocalitiesPage />;
  }

  // Route: /localities/:slug
  if (pathname.startsWith('/localities/')) {
    const slug = pathname.replace('/localities/', '').replace(/\/$/, '');
    if (slug) {
      return <LocalityDetailPage slug={slug} />;
    }
  }

  // Route: /projects
  if (pathname === '/projects') {
    return <ProjectsPage />;
  }

  // Route: /projects/:slug
  if (pathname.startsWith('/projects/')) {
    const slug = pathname.replace('/projects/', '').replace(/\/$/, '');
    if (slug) {
      return <ProjectDetailPage slug={slug} />;
    }
  }

  // Route: /property-types
  if (pathname === '/property-types') {
    return <PropertyTypesPage />;
  }

  // Route: /property-types/:slug
  if (pathname.startsWith('/property-types/')) {
    const slug = pathname.replace('/property-types/', '').replace(/\/$/, '');
    if (slug) {
      return <PropertyTypeDetailPage slug={slug} />;
    }
  }

  // Route: /wishlist
  if (pathname === '/wishlist') {
    return <WishlistPage />;
  }

  // Fallback: 404
  return <NotFoundPage />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <Navbar />
            <main className="flex-1">
              <PageTransitionWrapper>
                <RouteView />
              </PageTransitionWrapper>
            </main>
            <Footer />
            <AuthModal />
          </div>
        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
