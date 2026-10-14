import React from 'react';
import { useTheme } from '../utils/themeContext';
import { Sun, Moon } from 'lucide-react';



export default function ThemeToggle({ className = '', variant = 'header' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode (currently ${theme} mode)`}
        aria-pressed={isDark}
        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-98 ${
          isDark
            ? 'bg-slate-800 text-slate-100 hover:bg-slate-700'
            : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
        } ${className}`}
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-4 h-4 text-sky-400 transition-transform duration-200 rotate-0" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500 transition-transform duration-200 rotate-0" />
          )}
          <span>Appearance</span>
        </span>
        <span className="text-xs px-2 py-0.5 rounded font-mono uppercase tracking-wider bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
          {theme}
        </span>
      </button>
    );
  }

  // Header icon button with tooltip & aria
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode (currently ${theme} mode)`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className={`relative p-2 rounded-xl border transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sky-500 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-amber-300 hover:text-amber-200 hover:bg-slate-700 shadow-sm'
          : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 shadow-sm'
      } ${className}`}
    >
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-200 rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 rotate-0 scale-100" />
      )}
    </button>
  );
}
