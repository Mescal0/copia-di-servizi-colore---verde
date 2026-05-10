import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a section element and adds the "visible"
 * class to every child with the "reveal" class, staggered by `staggerMs` ms.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLElement>(
  options: { threshold?: number; staggerMs?: number } = {},
) {
  const { threshold = 0.1, staggerMs = 100 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * staggerMs);
            });
          }
        });
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [threshold, staggerMs]);

  return ref;
}
