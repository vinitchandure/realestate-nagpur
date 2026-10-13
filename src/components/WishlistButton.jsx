import React, { useState } from 'react';
import { useAuth } from '../utils/authContext';
import { Heart } from 'lucide-react';



export default function WishlistButton({
  propertySlug,
  variant = 'detail',
  className = '',
  showText = true,
}) {
  const { isInWishlist, toggleWishlist } = useAuth();
  const saved = isInWishlist(propertySlug);
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 260);
    toggleWishlist(propertySlug);
  };

  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        type="button"
        aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
          saved
            ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shadow-sm'
            : 'bg-black/40 hover:bg-black/60 text-white'
        } ${className}`}
      >
        <Heart
          className={`w-4 h-4 transition-transform duration-200 ${
            isPopping ? 'animate-heartPop' : ''
          } ${
            saved ? 'fill-rose-500 text-rose-500' : 'text-white'
          }`}
        />
      </button>
    );
  }

  // Default 'detail' variant
  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label={saved ? 'Remove property from wishlist' : 'Save property to wishlist'}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm border focus:outline-none focus:ring-2 focus:ring-rose-500 ${
        saved
          ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 active:scale-95'
          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-slate-400 active:scale-95'
      } ${className}`}
    >
      <Heart
        className={`w-4 h-4 transition-transform duration-200 ${
          isPopping ? 'animate-heartPop' : ''
        } ${
          saved ? 'fill-rose-500 text-rose-500' : 'text-slate-500 dark:text-slate-400'
        }`}
      />
      {showText && (
        <span>{saved ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
      )}
    </button>
  );
}
