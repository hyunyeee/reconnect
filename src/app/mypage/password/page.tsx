import PasswordResetClient from "./PasswordResetClient";
import { BackHeader } from "@/components/layout/BackHeader";

export default function PasswordResetPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <BackHeader backHref="/" />
      <h1 className="mb-6 text-lg font-semibold">비밀번호 재설정</h1>
      <PasswordResetClient />;
    </main>
  );
}
