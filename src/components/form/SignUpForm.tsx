"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export default function SignUpForm() {
  const methods = useForm({
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
      tiktokId: "",
      mbti: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      birthDate: "", // 검증용 필드
      privacyAgree: false,
      useAgree: false,
      emailAgree: false,
    },
  });

  const signUpMutation = useSignup();

  const onSubmit = (data: any) => {
    const parsed = memberSchema.parse(data);
    const { passwordConfirm, ...payload } = parsed;

    signUpMutation.mutate(payload as MemberSignUpPayload);
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
          <NormalInput name="instagramId" label="인스타그램 ID" placeholder="instagram ID" />
          <NormalInput name="tiktokId" label="틱톡 ID" placeholder="tiktok ID (선택)" />
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
