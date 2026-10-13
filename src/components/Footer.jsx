import React from 'react';
import Link from '../utils/router';
import { Building2, Phone, MapPin, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { NAGPUR_SNAPSHOT } from '../utils/snapshots';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center group" aria-label="Real Estate Nagpur">
              <div className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-white/20 shadow-md group-hover:bg-white transition-all">
                <img
                  src="/assets/logo.webp"
                  alt="Real Estate Nagpur"
                  className="h-10 sm:h-12 w-auto max-w-[200px] sm:max-w-[240px] object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Dedicated architectural portal for real estate properties across Nagpur City, Maharashtra. Covering high-growth corridors from Wardha Road and MIHAN to central neighborhoods like Dharampeth and Wardhaman Nagar.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Demo Inquiries: </span>
                <span className="font-mono font-semibold text-emerald-400">+919898989898</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Explore Nagpur
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties/for-sale" className="hover:text-sky-400 transition-colors">
                  Properties for Sale ({NAGPUR_SNAPSHOT.saleProperties})
                </Link>
              </li>
              <li>
                <Link href="/properties/for-rent" className="hover:text-sky-400 transition-colors">
                  Properties for Rent ({NAGPUR_SNAPSHOT.rentProperties})
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-sky-400 transition-colors">
                  Nagpur Projects ({NAGPUR_SNAPSHOT.residentialProjects})
                </Link>
              </li>
              <li>
                <Link href="/localities" className="hover:text-sky-400 transition-colors">
                  Nagpur Micro-Markets
                </Link>
              </li>
              <li>
                <Link href="/property-types" className="hover:text-sky-400 transition-colors">
                  Property Types Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Localities */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Key Localities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/localities/wardha-road" className="hover:text-sky-400 transition-colors">
                  Wardha Road Corridor
                </Link>
              </li>
              <li>
                <Link href="/localities/manish-nagar" className="hover:text-sky-400 transition-colors">
                  Manish Nagar
                </Link>
              </li>
              <li>
                <Link href="/localities/besa" className="hover:text-sky-400 transition-colors">
                  Besa & Pipla Road
                </Link>
              </li>
              <li>
                <Link href="/localities/jamtha" className="hover:text-sky-400 transition-colors">
                  Jamtha Plotted Hub
                </Link>
              </li>
              <li>
                <Link href="/localities/dharampeth" className="hover:text-sky-400 transition-colors">
                  Dharampeth & West Nagpur
                </Link>
              </li>
              <li>
                <Link href="/localities/mihan" className="hover:text-sky-400 transition-colors">
                  MIHAN SEZ Zone
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Asset Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/property-types/flats-apartments" className="hover:text-sky-400 transition-colors">
                  Flats & Apartments
                </Link>
              </li>
              <li>
                <Link href="/property-types/residential-plots" className="hover:text-sky-400 transition-colors">
                  Residential Plots / Land
                </Link>
              </li>
              <li>
                <Link href="/property-types/independent-houses" className="hover:text-sky-400 transition-colors">
                  Independent Houses & Villas
                </Link>
              </li>
              <li>
                <Link href="/property-types/commercial-properties" className="hover:text-sky-400 transition-colors">
                  Commercial Shops & Offices
                </Link>
              </li>
              <li>
                <Link href="/property-types/farm-houses-land" className="hover:text-sky-400 transition-colors">
                  Farm Houses & Agri Land
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Snapshot & Compliance Notice */}
        <div className="pt-8 space-y-4 text-xs text-slate-400 leading-relaxed">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Source Reference & Snapshot Disclosure ({NAGPUR_SNAPSHOT.snapshotDate}):
              </p>
              <p className="mt-1">
                {NAGPUR_SNAPSHOT.disclaimer} All demo inquiries, contact prompts, and support numbers route strictly through the demo hotline{' '}
                <span className="font-mono text-emerald-400">+919898989898</span>. Personal broker details and live phone numbers from the reference platform are strictly excluded.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 pt-4 border-b border-slate-800/80 pb-4">
            <p>© {new Date().getFullYear()} Real Estate Nagpur. Built specifically for Nagpur, Maharashtra.</p>
            <p className="text-[11px]">
              Snapshot Baseline properties recorded on {NAGPUR_SNAPSHOT.snapshotDate}.
            </p>
          </div>

          <div className="text-center pt-2 text-xs text-slate-400">
            <p className="tracking-wide">
              The Website is Designed &amp; Developed by{' '}
              <a
                href="tel:+918624990684"
                className="font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-4 decoration-sky-500/50 hover:decoration-sky-300 transition-colors inline-block"
              >
                Vinit Chandure
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
