import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchParams, setSearchParams] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to, options = {}) => {
    if (!to) return;
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('tel:') || to.startsWith('mailto:')) {
      window.location.href = to;
      return;
    }

    const [pathname, search] = to.split('?');
    if (options.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setCurrentPath(pathname || '/');
    setSearchParams(new URLSearchParams(search ? `?${search}` : ''));
    if (!options.preserveScroll) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, searchParams, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return {
    push: (to) => ctx.navigate(to),
    replace: (to) => ctx.navigate(to, { replace: true }),
    pathname: ctx.currentPath,
    query: Object.fromEntries(ctx.searchParams.entries()),
  };
}

export function usePathname() {
  const ctx = useContext(RouterContext);
  return ctx ? ctx.currentPath : '/';
}

export function useSearchParams() {
  const ctx = useContext(RouterContext);
  return ctx ? ctx.searchParams : new URLSearchParams();
}

export function Link({ href, to, children, className = '', onClick, target, rel, ...rest }) {
  const ctx = useContext(RouterContext);
  const targetUrl = href || to || '/';

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      target === '_blank' ||
      targetUrl.startsWith('http://') ||
      targetUrl.startsWith('https://') ||
      targetUrl.startsWith('tel:') ||
      targetUrl.startsWith('mailto:')
    ) {
      return;
    }

    e.preventDefault();
    if (ctx) {
      ctx.navigate(targetUrl);
    } else {
      window.history.pushState({}, '', targetUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <a href={targetUrl} onClick={handleClick} className={className} target={target} rel={rel} {...rest}>
      {children}
    </a>
  );
}
export default Link;
