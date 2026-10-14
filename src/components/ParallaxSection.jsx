import React, { useEffect, useRef, useState } from 'react';



export default function ParallaxSection({
  children,
  bgImageUrl,
  className = '',
  alt = 'Background',
  speed = 0.14,
}) {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Calculate how far section is from center of screen
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
              const relativeY = rect.top - (windowHeight / 2);
              setOffsetY(relativeY * speed);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {/* Background Image Layer with restrained translate transform */}
      <img
        src={bgImageUrl}
        alt={alt}
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center pointer-events-none will-change-transform"
        style={{
          transform: reducedMotion ? 'none' : `translate3d(0, ${offsetY}px, 0)`,
          transition: reducedMotion ? 'none' : 'transform 100ms ease-out',
        }}
      />
      {children}
    </section>
  );
}
