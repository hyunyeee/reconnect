"use client";

import { useAtom } from "jotai";
import { overlayAtom, OverlayType } from "@/atoms/overlayAtom";
import type { ReactNode } from "react";

export function useOverlay() {
  const [overlay, setOverlay] = useAtom(overlayAtom);

  const openOverlay = (type: OverlayType, content: ReactNode) => {
    setOverlay({ type, content });
  };

  const closeOverlay = () => {
    setOverlay({ type: null, content: null });
  };

  return { overlay, openOverlay, closeOverlay };
}
