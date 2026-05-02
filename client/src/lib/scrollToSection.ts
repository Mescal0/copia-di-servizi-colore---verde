/**
 * Smoothly scrolls to the section identified by `href` (a CSS selector such as "#servizi").
 */
export function scrollToSection(href: string): void {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}
