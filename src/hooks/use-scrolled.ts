"use client";

import { useEffect, useState } from "react";

/**
 * 스크롤 감지 hook
 * @param threshold default 값: 24px
 * @return threshold 픽셀 이상 스크롤되면 true
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollHandler = () => setScrolled(window.scrollY > threshold);

    scrollHandler();

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [threshold]);

  return scrolled;
}
