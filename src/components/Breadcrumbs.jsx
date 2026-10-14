import React from 'react';
import Link from '../utils/router';
import { ChevronRight, Home } from 'lucide-react';



export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center text-xs text-slate-500 dark:text-slate-400 py-3 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors truncate max-w-xs">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
