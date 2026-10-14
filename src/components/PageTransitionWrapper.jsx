import React from 'react';
import { useRouter, usePathname, useSearchParams } from '../utils/router';

export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-enter flex-1 flex flex-col">
      {children}
    </div>
  );
}
