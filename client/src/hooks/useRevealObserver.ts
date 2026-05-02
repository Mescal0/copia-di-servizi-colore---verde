import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a section element and adds the "visible"
 * class to every child that carries the "reveal" class, staggering them by
 * `staggerMs` milliseconds each.
 */
export function useRevealObserver<T extends HTMLElement>(
  staggerMs = 100,
  threshold = 0.1,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * staggerMs);
            });
          }
        });
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [staggerMs, threshold]);

  return ref;
}
