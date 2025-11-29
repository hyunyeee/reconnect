import LoginForm from "@/components/form/LoginForm";
import { BackHeader } from "@/components/layout/BackHeader";

export default function LoginPage() {
  return (
    <div className="max-w-md px-4 py-6">
      <BackHeader
        // title="로그인"
        backHref="/"
      />
      <h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">로그인</h1>
      <LoginForm />
    </div>
  );
}
