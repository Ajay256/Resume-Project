"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PrintPortalProps {
  children: React.ReactNode;
}

/**
 * Portals the printable resume directly into document.body.
 * This guarantees the printed document has no transformed, scaled, or
 * overflow-clipped ancestor elements that would shift or blank the print view.
 */
export function PrintPortal({ children }: PrintPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div id="print-root" aria-hidden="true">
      {children}
    </div>,
    document.body
  );
}
