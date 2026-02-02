"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, UserPlus } from "lucide-react";

import { NormalInput } from "@/components/form/NormalInput";
import { Button } from "@/components/ui/button";
import { LoginFormData, loginSchema } from "@/schemas/memberSchema";

import { useLogin } from "@/hooks/query/useAuth";

export default function LoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        <NormalInput name="email" label="이메일" placeholder="example@mail.com" />
        <NormalInput name="password" label="비밀번호" type="password" placeholder="********" />

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="bg-main-pink w-full rounded-md py-3 text-white shadow-lg transition hover:bg-[#A41847]"
        >
          로그인
        </Button>
      </form>

      <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
        {/* 회원가입 */}
        <Link href="/signup" passHref>
          <Button
            variant="ghost"
            className="w-full justify-center text-gray-700 transition duration-200 hover:bg-gray-100"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            아직 회원이 아니신가요?
            <b className="text-main-pink ml-1">회원가입하기</b>
          </Button>
        </Link>

        {/* 비밀번호 재설정 */}
        <Link href="/mypage/password" passHref>
          <Button
            variant="ghost"
            className="w-full justify-center text-gray-700 transition duration-200 hover:bg-gray-100"
          >
            <KeyRound className="mr-2 h-4 w-4" />
            비밀번호를 잊으셨나요?
            <b className="text-main-pink ml-1">비밀번호 재설정</b>
          </Button>
        </Link>
      </div>
    </FormProvider>
  );
}
