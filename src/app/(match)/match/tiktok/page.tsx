"use client";

import MatchGate from "@/app/(match)/match/MatchGate";
import { BackHeader } from "@/components/layout/BackHeader";
import AddTiktokIdInline from "@/components/form/AddTiktokIdInline";

export default function TiktokMatchPage() {
  const hasMyTiktok = false;

  if (!hasMyTiktok) {
    return (
      <div className="mx-auto max-w-md px-4 pt-6">
        <BackHeader backHref="/match" />

        <div className="mt-10 mb-8 text-center">
          <p className="text-lg font-semibold text-gray-900">틱톡 매칭을 위해</p>
          <p className="mt-1 text-sm text-gray-500">내 틱톡 아이디를 먼저 등록해주세요.</p>
        </div>

        <AddTiktokIdInline />
      </div>
    );
  }

  return <MatchGate channel="tiktok" />;
}
