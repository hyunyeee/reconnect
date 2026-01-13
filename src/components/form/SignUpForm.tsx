"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
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
import { memberSchema, MemberFormData } from "@/schemas/memberSchema";

export default function SignUpForm() {
  const methods = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phoneNumber: "",
      password: "",
      gender: "MALE",
      instagramId: "",
      mbti: "",
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      privacyAgree: false,
      useAgree: false,
      emailAgree: false,
    },
  });

  const signUpMutation = useSignup();

  const onSubmit: SubmitHandler<MemberFormData> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-10">
        {/* 기본 정보 */}
        <section className="flex flex-col space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <NormalInput name="name" label="이름" placeholder="홍길동" />
            <NormalInput name="nickname" label="닉네임" placeholder="둘리" />
          </div>
          <PhoneInput name="phoneNumber" label="연락처" placeholder="01012341234" />
        </section>

        {/* 이메일 + 비밀번호 */}
        <section className="flex flex-col space-y-5">
          <NormalInput name="email" label="이메일" placeholder="example@mail.com" />
          <PasswordInputWithConfirm passwordField="password" confirmField="passwordConfirm" />
        </section>

        {/* 기타 정보 */}
        <section className="flex flex-col space-y-5">
          <NormalInput name="instagramId" label="인스타그램 ID" placeholder="instagramId" />
          <GenderSelect name="gender" label="성별" />
          <MbtiDropdown name="mbti" />

          {/* 생년월일 DatePicker */}
          <DatePickerInput
            yearField="birthYear"
            monthField="birthMonth"
            dayField="birthDay"
            label="생년월일"
          />
        </section>

        {/* 약관 */}
        <section className="flex flex-col space-y-3">
          <AgreementSection />
        </section>

        {/* 제출 */}
        <Button
          type="submit"
          disabled={signUpMutation.isPending}
          className="bg-main-pink w-full rounded-md py-3 text-white transition hover:bg-[#A41847]"
        >
          회원가입
        </Button>
      </form>
    </FormProvider>
  );
}
