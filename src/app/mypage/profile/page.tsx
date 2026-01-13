import ProfileEditForm from "./ProfileEditClient";
import { BackHeader } from "@/components/layout/BackHeader";

export default function ProfileEditPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <BackHeader backHref='/' />
      <h1 className="mb-6 text-lg font-semibold">내 정보 수정</h1>
      <ProfileEditForm />
    </main>
  );
}
