import React from 'react';
import Link from '../utils/router';
import Breadcrumbs from './Breadcrumbs';
import { StaggerItem } from './RevealOnScroll';
import { getAllProjects } from '../utils/data';
import { NAGPUR_SNAPSHOT } from '../utils/snapshots';
import { Building2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';


export default function ProjectsDirectoryPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'Projects & Societies' },
        ]}
      />

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 transition-colors">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Nagpur Gated Schemes & Townships
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Nagpur Residential & Commercial Projects
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          Discover organized developments, apartment societies, and RERA/NMRDA-approved plotted townships across Nagpur. Reference snapshot recorded residential projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <StaggerItem key={proj.slug} index={idx} className="h-full">
            <div
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
                    {proj.reraStatus}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {proj.locality}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    {proj.name}
                  </h2>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    By <span className="font-semibold text-slate-700 dark:text-slate-300">{proj.builder}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Price & Configuration Pill */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Configurations:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{proj.unitConfigurations.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Price Band:</span>
                    <span className="font-black text-sky-700 dark:text-sky-400">{proj.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="w-full py-2.5 px-4 bg-sky-50 dark:bg-slate-800 hover:bg-sky-600 dark:hover:bg-sky-600 text-sky-700 dark:text-sky-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Society Details</span>
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
