"use client";

import { useAtom } from "jotai";
import { overlayAtom } from "@/atoms/overlayAtom";
import { useOverlay } from "@/hooks/useOverlay";
import Portal from "@/components/overlay/Portal";
import ModalContainer from "@/components/overlay/ModalContainer";

export default function OverlayRenderer() {
  const [overlay] = useAtom(overlayAtom);
  const { closeOverlay } = useOverlay();

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) closeOverlay();
  };

  if (!overlay.content) return null;

  return (
    <Portal>
      <div
        onClick={handleBackdropClick}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
      >
        {overlay.type === "modal" && (
          <div onClick={(e) => e.stopPropagation()}>
            <ModalContainer>{overlay.content}</ModalContainer>
          </div>
        )}
      </div>
    </Portal>
  );
}
