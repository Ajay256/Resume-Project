import { useEffect, useState, useCallback } from "react";

export const TARGET_PAGE_HEIGHT = 1123;
export const MIN_CONTENT_SCALE = 0.8;
export const MAX_CONTENT_SCALE = 1.0;
export const SCALE_STEP = 0.02;

export interface PageOverflowInfo {
  isOverflowing: boolean;
  contentHeight: number;
  targetHeight: number;
  overflowPx: number;
  percentageOver: number;
}

/**
 * Measures the rendered height of the resume document.
 */
export function measurePageOverflow(
  element: HTMLElement | null
): PageOverflowInfo {
  if (!element) {
    return {
      isOverflowing: false,
      contentHeight: TARGET_PAGE_HEIGHT,
      targetHeight: TARGET_PAGE_HEIGHT,
      overflowPx: 0,
      percentageOver: 0,
    };
  }

  // scrollHeight represents total height of internal content including overflow
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight || TARGET_PAGE_HEIGHT;
  const overflowPx = Math.max(0, scrollHeight - clientHeight);
  const isOverflowing = overflowPx > 3; // 3px tolerance for subpixel rounding
  const percentageOver = isOverflowing
    ? Math.round((overflowPx / TARGET_PAGE_HEIGHT) * 100)
    : 0;

  return {
    isOverflowing,
    contentHeight: scrollHeight,
    targetHeight: clientHeight,
    overflowPx,
    percentageOver,
  };
}

/**
 * Hook to continuously monitor page overflow and provide fit-to-page logic.
 */
export function useFitToPage(
  elementId = "resume-document",
  contentScale = 1.0,
  setContentScale?: (scale: number) => void,
  dependencies: unknown[] = []
) {
  const [overflowInfo, setOverflowInfo] = useState<PageOverflowInfo>({
    isOverflowing: false,
    contentHeight: TARGET_PAGE_HEIGHT,
    targetHeight: TARGET_PAGE_HEIGHT,
    overflowPx: 0,
    percentageOver: 0,
  });

  const checkOverflow = useCallback(() => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(elementId);
    if (el) {
      const info = measurePageOverflow(el);
      setOverflowInfo(info);
    }
  }, [elementId]);

  // Check on mount, resize, and dependencies change
  useEffect(() => {
    const timer = setTimeout(checkOverflow, 120);

    const handleResize = () => checkOverflow();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkOverflow, contentScale, ...dependencies]);

  /**
   * Iteratively reduces the scale until the document fits inside 1123px or hits minimum.
   */
  const fitToOnePage = useCallback(() => {
    if (!setContentScale || typeof document === "undefined") return;
    const el = document.getElementById(elementId);
    if (!el) return;

    let current = contentScale;
    let info = measurePageOverflow(el);

    if (!info.isOverflowing && current >= 0.98) return;

    // Estimate scale reduction based on overflow ratio
    const neededScale = Math.max(
      MIN_CONTENT_SCALE,
      Number(((TARGET_PAGE_HEIGHT / el.scrollHeight) * current).toFixed(2))
    );

    // Fine-tune slightly for margins
    const targetScale = Math.max(
      MIN_CONTENT_SCALE,
      Math.min(MAX_CONTENT_SCALE, neededScale - 0.02)
    );
    setContentScale(targetScale);

    // Re-check after layout recalculation
    setTimeout(checkOverflow, 150);
  }, [elementId, contentScale, setContentScale, checkOverflow]);

  const resetScale = useCallback(() => {
    if (setContentScale) {
      setContentScale(1.0);
      setTimeout(checkOverflow, 150);
    }
  }, [setContentScale, checkOverflow]);

  return {
    ...overflowInfo,
    checkOverflow,
    fitToOnePage,
    resetScale,
  };
}
