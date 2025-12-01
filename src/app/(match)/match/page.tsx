import MatchRegisterForm from "@/components/form/MatchRegisterForm";
import { BackHeader } from "@/components/layout/BackHeader";

export default function MatchRegisterPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-6">
      <BackHeader
        // title="상대방 정보 등록하기"
        backHref="/home"
      />
      <MatchRegisterForm />
    </div>
  );
}
