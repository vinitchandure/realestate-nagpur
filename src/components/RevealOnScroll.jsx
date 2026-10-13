import React, { useEffect, useRef, useState } from 'react';



export default function RevealOnScroll({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
  staggerChildren = false,
}) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // If reduced motion is requested, immediately mark as revealed
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasRevealed(true);
      return;
    }

    const currentElem = elementRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger reveal once; never re-hide
        if (entry.isIntersecting) {
          if (delayMs > 0) {
            setTimeout(() => setHasRevealed(true), delayMs);
          } else {
            setHasRevealed(true);
          }
          observer.unobserve(currentElem);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(currentElem);

    return () => {
      observer.disconnect();
    };
  }, [delayMs]);

  const transformClass = direction === 'up'
    ? hasRevealed ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'
    : hasRevealed ? 'opacity-100' : 'opacity-0';

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-500 ease-out will-change-transform ${transformClass} ${staggerChildren ? 'reveal-stagger-parent' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className = '',
  index = 0,
}) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasRevealed(true);
      return;
    }

    const currentElem = itemRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger card reveals by 70ms per item
          const staggerDelay = Math.min(index * 70, 450);
          setTimeout(() => setHasRevealed(true), staggerDelay);
          observer.unobserve(currentElem);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(currentElem);

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className={`transition-all duration-400 ease-out will-change-transform ${
        hasRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}
