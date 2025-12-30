import { BackHeader } from "@/components/layout/BackHeader";
import MatchGate from "@/app/(match)/match/MatchGate";

export default function MatchRegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <BackHeader
        // title="상대방 정보 등록하기"
        backHref="/"
      />
      <MatchGate />
    </div>
  );
}
