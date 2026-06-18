export function scrollToTop(immediate = true) {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.lenis?.scrollTo(0, { immediate });
}

export function disableScrollRestoration() {
  if (typeof window === "undefined") return () => {};

  const previous = window.history.scrollRestoration;
  window.history.scrollRestoration = "manual";

  return () => {
    window.history.scrollRestoration = previous;
  };
}
