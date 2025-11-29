"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { matchSchema, MatchFormData } from "@/schemas/matchSchema";

import { NormalInput } from "@/components/form/NormalInput";
import { Button } from "@/components/ui/button";
import { DesireSlider } from "@/components/form/DesireSlider";

export default function MatchRegisterForm() {
  const methods = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    mode: "onChange",
    defaultValues: {
      targetName: "",
      targetPhone: "",
      targetInsta: "",
      requesterDesire: 50,
    },
  });

  const onSubmit: SubmitHandler<MatchFormData> = (data) => {
    console.log("📌 매칭 등록 데이터:", data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-10">
        <h1 className="text-center text-2xl font-bold">다시 만나고 싶은 사람</h1>

        <section className="flex flex-col space-y-5">
          <NormalInput name="targetName" label="이름" placeholder="다시 만나고 싶은 사람 이름" />

          <NormalInput name="targetPhone" label="전화번호" placeholder="01012345678" />

          <NormalInput name="targetInsta" label="인스타그램 ID" placeholder="instagram_id" />

          <DesireSlider name="requesterDesire" label="다시 만나고 싶은 마음" />
        </section>

        <div className="pt-4">
          <Button
            type="submit"
            className="bg-main-pink w-full rounded-md py-3 text-white transition hover:bg-[#A41847]"
          >
            등록하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
