import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px' }
    );

    // Observe the element itself if it has .reveal, or all .reveal children
    const targets = el.querySelectorAll('.reveal');
    if (targets.length > 0) {
      targets.forEach((t) => observer.observe(t));
    } else if (el.classList.contains('reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold, options.rootMargin, ...deps]);

  return ref;
}
