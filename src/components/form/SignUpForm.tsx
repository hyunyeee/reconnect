"use client";

import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useSignup } from "@/hooks/query/useAuth";
import { NormalInput } from "@/components/form/NormalInput";
import { GenderSelect } from "@/components/form/GenderSelect";
import { AgreementSection } from "@/components/form/AgreementSection";
import { Button } from "@/components/ui/button";
import { PasswordInputWithConfirm } from "@/components/form/PasswordInputWithConfirm";
import { DatePickerInput } from "@/components/form/DatePickerInput";
import { PhoneInput } from "@/components/form/PhoneInput";
import MbtiDropdown from "@/components/form/MbtiDropdown";

import { memberSchema, MemberSignUpPayload } from "@/schemas/memberSchema";

type SignUpFormValues = z.infer<typeof memberSchema>;

export default function SignUpForm() {
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(memberSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      gender: "MALE",
      instagramId: "",
      tiktokId: null,
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      birthDate: "",
      privacyAgree: true,
      useAgree: true,
      emailAgree: false,
    },
  });

  const { setError, formState } = methods;
  const signUpMutation = useSignup();

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    // 휴대폰 인증 안 된 경우 (형식 에러는 이미 resolver가 처리)
    if (!formState.errors.phoneNumber && data.phoneNumber) {
      setError("phoneNumber", {
        type: "manual",
        message: "휴대폰 인증을 완료해주세요.",
      });
      return;
    }

    const { passwordConfirm, tiktokId, ...rest } = data;

    const payload: MemberSignUpPayload = {
      ...rest,
      tiktokId: tiktokId && tiktokId.trim() !== "" ? tiktokId : null,
    };

    signUpMutation.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-10">
        <section className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <NormalInput name="name" label="이름" placeholder="홍길동" />
            <NormalInput name="nickname" label="닉네임" placeholder="둘리" />
          </div>
          <PhoneInput name="phoneNumber" label="연락처" placeholder="01012341234" />
        </section>

        <section className="space-y-5">
          <NormalInput name="email" label="이메일" placeholder="example@mail.com" />
          <PasswordInputWithConfirm passwordField="password" confirmField="passwordConfirm" />
        </section>

        <section className="space-y-5">
          <NormalInput
            name="instagramId"
            label="인스타그램 ID"
            placeholder="인스타그램 ID를 입력하세요"
          />
          <NormalInput name="tiktokId" label="틱톡 ID (선택)" placeholder="틱톡 ID를 입력하세요" />
          <GenderSelect name="gender" label="성별" />
          <MbtiDropdown name="mbti" />
          <DatePickerInput
            yearField="birthYear"
            monthField="birthMonth"
            dayField="birthDay"
            validateField="birthDate"
            label="생년월일"
          />
        </section>

        <AgreementSection />

        <Button type="submit" className="bg-main-pink w-full py-3 text-white">
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
}
