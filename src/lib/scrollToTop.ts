const HASH_RETRY_MS = 50;
const HASH_MAX_ATTEMPTS = 40;

export function scrollToTop(immediate = true) {
  if (typeof window === "undefined") return;

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.lenis?.scrollTo(0, { immediate });
}

export function getHeaderScrollOffset(extra = 16) {
  if (typeof window === "undefined") return -extra;

  const header = document.querySelector(".site-view-header");
  const height = header?.getBoundingClientRect().height ?? 0;
  return -(height + extra);
}

export function scrollToHash(
  hash?: string,
  options?: { immediate?: boolean; duration?: number },
) {
  if (typeof window === "undefined") return false;

  const id = (hash ?? window.location.hash).replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  const offset = getHeaderScrollOffset();

  if (window.lenis) {
    window.lenis.scrollTo(target, {
      offset,
      immediate: options?.immediate ?? false,
      duration: options?.duration ?? 1.2,
    });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top,
      behavior: options?.immediate ? "auto" : "smooth",
    });
  }

  return true;
}

export function scrollToHashWhenReady(
  hash?: string,
  options?: { immediate?: boolean; duration?: number },
) {
  if (typeof window === "undefined") return () => {};

  const id = (hash ?? window.location.hash).replace(/^#/, "");
  if (!id) return () => {};

  let attempts = 0;
  let cancelled = false;
  let timer: number | undefined;

  const tryScroll = () => {
    if (cancelled) return;

    if (scrollToHash(`#${id}`, options)) {
      return;
    }

    attempts += 1;
    if (attempts < HASH_MAX_ATTEMPTS) {
      timer = window.setTimeout(tryScroll, HASH_RETRY_MS);
    }
  };

  tryScroll();

  return () => {
    cancelled = true;
    if (timer !== undefined) window.clearTimeout(timer);
  };
}

export function disableScrollRestoration() {
  if (typeof window === "undefined") return () => {};

  const previous = window.history.scrollRestoration;
  window.history.scrollRestoration = "manual";

  return () => {
    window.history.scrollRestoration = previous;
  };
}
