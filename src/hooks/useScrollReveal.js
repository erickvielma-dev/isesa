import { useEffect } from 'react';

/**
 * Hook que observa elementos con clases .reveal, .reveal-left, .reveal-right
 * y les añade la clase .visible cuando entran en el viewport.
 *
 * @param {boolean} disabled — pasar `true` mientras el splash esté visible
 *                              para evitar que se dispare antes de tiempo.
 */
export function useScrollReveal(disabled = false) {
  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    // Pequeño delay para asegurar que el DOM ya pintó tras el re-render
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(
        '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)'
      );
      els.forEach((el) => observer.observe(el));
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [disabled]);
}
