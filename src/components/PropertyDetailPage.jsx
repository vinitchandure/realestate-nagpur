import React from 'react';
import Link from '../utils/router';

import Breadcrumbs from './Breadcrumbs';
import PropertyCard from './PropertyCard';
import PropertyGallery from './PropertyGallery';
import ContactModal from './ContactModal';
import { Mail } from 'lucide-react';

export default function PropertyDetailPage({ slug }) {
  const [isInquiryOpen, setIsInquiryOpen] = React.useState(false);
  const property = getPropertyBySlug(slug);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Property Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">The property listing you requested does not exist or has been removed.</p>
        <Link href="/properties/for-sale" className="inline-block px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700">
          Explore Available Properties
        </Link>
      </div>
    );
  }

  const relatedProperties = getRelatedProperties(property, 3);
  const locality = getLocalityBySlug(property.localitySlug);
  const isSale = property.listingType === 'sale';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { 
            label: isSale ? 'Properties for Sale' : 'Properties for Rent', 
            href: isSale ? '/properties/for-sale' : '/properties/for-rent' 
          },
          { 
            label: property.locality, 
            href: `/localities/${property.localitySlug}` 
          },
          { label: property.title },
        ]}
      />

      {/* Prominent Property Image Gallery - Natural presentation */}
      <PropertyGallery
        images={property.images && property.images.length > 0 ? property.images : [property.imageUrl]}
        title={property.title}
        propertyType={property.propertyType}
        locality={property.locality}
      />

      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            {/* Status & Verification Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isSale ? 'bg-sky-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                For {property.listingType}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                {property.propertyType}
              </span>

              {property.isDemo ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/40 text-amber-900 dark:text-amber-300">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Demonstration Record (Unverified)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-900 dark:text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  Source-Verified Snapshot
                </span>
              )}

              {property.sourceListingId && (
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  Listing Ref ID
                </span>
              )}
            </div>

            {/* Title & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                {property.title}
              </h1>
              <div className="flex-shrink-0">
                <WishlistButton 
                  propertySlug={property.slug}
                  className="sm:inline-flex"
                />
              </div>
            </div>

            {/* Locality & Project Link */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
              <Link 
                href={`/localities/${property.localitySlug}`} 
                className="inline-flex items-center gap-1.5 font-semibold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
              >
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                {property.locality}, Nagpur, Maharashtra
              </Link>
              {property.projectName && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>Project / Society: </span>
                  <Link 
                    href={`/projects/${property.projectSlug || 'shivam-heights'}`} 
                    className="font-bold text-slate-900 dark:text-slate-100 hover:text-sky-700 dark:hover:text-sky-400 underline underline-offset-2"
                  >
                    {property.projectName}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl p-6 min-w-[280px] text-right lg:text-right space-y-3 transition-colors">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {isSale ? 'Expected Price' : 'Monthly Rental'}
              </div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
                {property.priceDisplay}
              </div>
              {property.pricePerSqFt && (
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  Rate
                </div>
              )}
            </div>

            {/* Demo Inquire / Hotline Buttons & Wishlist */}
            <div className="pt-2 space-y-2">
              <WishlistButton 
                propertySlug={property.slug} 
                className="w-full justify-center"
              />
              <button
      onClick={() => setIsInquiryOpen(true)}
      className="w-full py-3 px-4 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:scale-95 rounded-xl shadow-md shadow-sky-600/30 flex items-center justify-center gap-2 transition-all hover:shadow-lg"
    >
      <Mail className="w-4 h-4" />
      Inquire for Property
    </button>
    <ContactModal
      propertyTitle={property.title}
      propertyId={property.id}
      isOpen={isInquiryOpen}
      onClose={() => setIsInquiryOpen(false)}
    />
              <a
                href="tel:+919898989898"
                className="w-full py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Call Desk: +919898989898
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details Overview + Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Full Specifications & Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Key Facts Matrix */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-sky-600 dark:text-sky-400" /> Property Overview & Specifications
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Area</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.area}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Bedrooms (BHK)</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.bhk || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Bathrooms</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.bathrooms || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Balconies</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.balconies || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Floor Number</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.floor || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Property Age</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.ageOfProperty || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Title / Ownership</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.ownership || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Transaction Category</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.saleType || 'Not provided'}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Furnishing State</span>
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{property.furnishing || 'Not provided'}</span>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Detailed Property Description
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
              <p>{property.description}</p>
            </div>

            {/* Key Highlights */}
            {property.highlights && property.highlights.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                  Key Features & Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {property.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Amenities & Facilities */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Society Amenities & Infrastructure
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-805 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-750 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200">
                  <Check className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Landmarks / Location */}
          {property.nearbyLandmarks && property.nearbyLandmarks.length > 0 && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Locality Landmarks & Connectivity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {property.nearbyLandmarks.map((lm, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block truncate">{lm.name}</span>
                    <span className="text-sky-600 dark:text-sky-400 font-medium">{lm.distance} away</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Locality Card + Compliance Card */}
        <aside className="space-y-6">
          {/* Locality Insights Card */}
          {locality && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
                  {locality.zone}
                </span>
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{locality.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                  {locality.overview}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Average Sale Rate:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{locality.avgPricePerSqFtSale}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Average Rental:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{locality.avgRentMonthly}</span>
                </div>
              </div>

              <Link
                href={`/localities/${locality.slug}`}
                className="block text-center w-full py-2 px-3 text-xs font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-slate-800 hover:bg-sky-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
              >
                View Complete {locality.name} Guide →
              </Link>
            </div>
          )}

          {/* Compliance & Source Attribution Notice */}
          <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 space-y-3 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" /> Data Integrity & Privacy
            </div>
            <p className="text-slate-300">
              {property.isDemo ? (
                <span>This entry is a designated demonstration mockup record for UI layout testing. It is not presented as a live or verified listing.</span>
              ) : (
                <span>Recorded during our live research snapshot on October 12, 2026. Data parameters reflect source fields without alteration.</span>
              )}
            </p>
            {property.sourceUrl && (
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={property.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                >
                  Inspect Reference Record <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Related Properties in Nagpur */}
      {relatedProperties.length > 0 && (
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              More Properties in {property.locality} & Similar Zones
            </h2>
            <Link 
              href={isSale ? '/properties/for-sale' : '/properties/for-rent'}
              className="text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300"
            >
              Browse All Listings →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
