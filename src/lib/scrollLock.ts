const HEADER_SELECTOR = ".site-view-header";

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/** Locks page scroll without layout shift from the disappearing scrollbar. */
export function lockPageScroll() {
  if (typeof window === "undefined") {
    return () => {};
  }

  const body = document.body;
  const header = document.querySelector<HTMLElement>(HEADER_SELECTOR);
  const scrollbarWidth = getScrollbarWidth();

  const previous = {
    bodyOverflow: body.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
    headerPaddingRight: header?.style.paddingRight ?? "",
  };

  body.style.overflow = "hidden";

  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
    if (header) {
      header.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  window.lenis?.stop();

  return () => {
    body.style.overflow = previous.bodyOverflow;
    body.style.paddingRight = previous.bodyPaddingRight;
    if (header) {
      header.style.paddingRight = previous.headerPaddingRight;
    }
    window.lenis?.start();
  };
}
