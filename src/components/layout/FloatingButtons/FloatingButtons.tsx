"use client";

import FloatingServiceGuideButton from "./FloatingServiceGuideButton";
import FloatingPrivacyButton from "./FloatingPrivacyButton";
import FloatingContactButton from "./FloatingContactButton";

export default function FloatingButtons() {
  return (
    <>
      {/* 왼쪽 버튼 스택 */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2.5">
        <FloatingContactButton />
        <FloatingPrivacyButton />
      </div>

      {/* 오른쪽 버튼 */}
      <div className="fixed right-4 bottom-4 z-50 flex items-start">
        <FloatingServiceGuideButton />
      </div>
    </>
  );
}
