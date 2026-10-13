import React from 'react';
import Link from '../utils/router';

import Breadcrumbs from './Breadcrumbs';
import PropertyCard from './PropertyCard';
import { 
  getProjectBySlug, 
  getAllProjects, 
  getPropertiesByProject,
  getLocalityBySlug
} from '../utils/data';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  Check, 
  Phone, 
  ArrowRight,
  Sparkles
} from 'lucide-react';


export default function ProjectDetailPage({ slug }) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center"><h2 className="text-2xl font-bold mb-2">Project Not Found</h2><p className="text-sm text-slate-500 mb-6">The project you are looking for does not exist in our directory.</p><Link href="/projects" className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-bold">Browse Projects</Link></div>;
  }

  const projectProperties = getPropertiesByProject(slug);
  const locality = getLocalityBySlug(project.localitySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Nagpur Real Estate', href: '/' },
          { label: 'Projects & Societies', href: '/projects' },
          { label: project.name },
        ]}
      />

      {/* Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
                {project.reraStatus}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                RERA Reg
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-semibold">
                <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                Developed by {project.builder}
              </span>
              <span>•</span>
              <Link 
                href={`/localities/${project.localitySlug}`}
                className="flex items-center gap-1 text-sky-700 dark:text-sky-400 hover:underline font-semibold"
              >
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                {project.locality}, Nagpur
              </Link>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Pricing Highlight Pill */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center sm:text-right min-w-[240px] space-y-2">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Unit Configurations</span>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{project.unitConfigurations.join(', ')}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">Typical Price Range</span>
              <span className="text-lg font-black text-sky-700 dark:text-sky-400">{project.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities & Project Features */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" /> Society Amenities & Campus Highlights
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.amenities.map((am, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200">
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <span>{am}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Properties in this Project */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
              Available Units in {project.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified inventory listings recorded inside this scheme
            </p>
          </div>
        </div>

        {projectProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
            <p>No individual unit listings are currently active for this specific project.</p>
            <Link
              href="/properties/for-sale"
              className="inline-block px-4 py-2 bg-sky-600 text-white rounded-xl font-bold"
            >
              Explore Nagpur For Sale Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
