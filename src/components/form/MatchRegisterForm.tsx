"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { matchSchema, MatchFormData } from "@/schemas/matchSchema";
import { NormalInput } from "@/components/form/NormalInput";
import { DesireSlider } from "@/components/form/DesireSlider";
import { Button } from "@/components/ui/button";

import { useMatchRequest, useMatchUpdate } from "@/hooks/query/useMatch";
import { useRouter } from "next/navigation";

interface Props {
  mode: "create" | "edit";
  defaultValues?: MatchFormData;
}

export default function MatchRegisterForm({ mode, defaultValues }: Props) {
  const router = useRouter();

  const methods = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    mode: "onChange",
    defaultValues: defaultValues ?? {
      targetName: "",
      targetPhone: "",
      targetInsta: "",
      requesterDesire: 50,
    },
  });

  const { mutate: requestMatch, isPending: isCreating } = useMatchRequest();
  const { mutate: updateMatch, isPending: isUpdating } = useMatchUpdate();

  const isPending = isCreating || isUpdating;

  const onSubmit: SubmitHandler<MatchFormData> = (data) => {
    if (mode === "edit") {
      updateMatch(data);
      router.push("/waiting");
      return;
    }

    requestMatch(data);
    router.push("/waiting");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-10">
        <h1 className="text-center text-2xl font-bold">
          {mode === "edit" ? "정보 수정" : "다시 만나고 싶은 사람"}
        </h1>

        <section className="flex flex-col space-y-5">
          <NormalInput name="targetName" label="이름" placeholder="상대방 이름" />

          <NormalInput name="targetPhone" label="전화번호" placeholder="01012345678" />

          <NormalInput name="targetInsta" label="인스타그램 ID" placeholder="instagram_id" />

          <DesireSlider name="requesterDesire" label="다시 만나고 싶은 마음" />
        </section>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-main-pink w-full py-3 text-white hover:bg-[#A41847]"
        >
          {isPending ? "처리 중..." : mode === "edit" ? "수정하기" : "등록하기"}
        </Button>
      </form>
    </FormProvider>
  );
}
