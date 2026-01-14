"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/form/PhoneInput";
import { PasswordInputWithConfirm } from "@/components/form/PasswordInputWithConfirm";

import { useResetPassword } from "@/hooks/query/useAuth";
import { ResetPasswordForm, resetPasswordSchema } from "@/schemas/resetPasswordSchema";

export default function PasswordResetClient() {
  const methods = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });

  const resetPassword = useResetPassword();

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    resetPassword.mutate({
      phoneNumber: data.phoneNumber,
      newPassword: data.newPassword,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-md flex-col space-y-8"
      >
        {/* 휴대폰 인증 */}
        <PhoneInput name="phoneNumber" label="휴대폰 번호" placeholder="01012345678" />

        {/* 새 비밀번호 */}
        <PasswordInputWithConfirm passwordField="newPassword" confirmField="newPasswordConfirm" />

        <Button
          type="submit"
          disabled={resetPassword.isPending}
          className="bg-main-pink w-full py-3 text-white hover:bg-[#A41847]"
        >
          {resetPassword.isPending ? "변경 중..." : "비밀번호 변경"}
        </Button>
      </form>
    </FormProvider>
  );
}
