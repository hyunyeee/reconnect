import SignUpForm from "@/components/form/SignUpForm";
import { BackHeader } from "@/components/layout/BackHeader";

export default function SignUpPage() {
  return (
    <div className="max-w-md px-4 py-6">
      <BackHeader
        // title="회원가입"
        backHref="/login"
      />
      <h1 className="mb-8 text-center text-2xl font-semibold text-gray-900">회원가입</h1>
      <SignUpForm />
    </div>
  );
}
