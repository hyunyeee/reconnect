"use client";

import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { matchSchema, MatchFormData } from "@/schemas/matchSchema";
import { NormalInput } from "@/components/form/NormalInput";
import { DesireSlider } from "@/components/form/DesireSlider";
import { Button } from "@/components/ui/button";
import { useMatchRequest, useMatchUpdate } from "@/hooks/query/useMatch";
import { BackHeader } from "@/components/layout/BackHeader";

interface Props {
  mode: "create" | "edit";
  channel: "insta" | "tiktok";
  defaultValues?: MatchFormData;
}

export default function MatchRegisterForm({ mode, channel, defaultValues }: Props) {
  const router = useRouter();

  const methods = useForm<MatchFormData>({
    resolver: zodResolver(matchSchema),
    mode: "onChange",
    defaultValues:
      defaultValues ??
      ({
        channel,
        targetName: "",
        targetPhone: "",
        requesterDesire: 50,
        ...(channel === "insta" ? { targetInsta: "" } : { targetTiktok: "" }),
      } as MatchFormData),
  });

  const { mutate: requestMatch, isPending: isCreating } = useMatchRequest(channel);
  const { mutate: updateMatch, isPending: isUpdating } = useMatchUpdate(channel);

  const isPending = isCreating || isUpdating;

  const onSubmit: SubmitHandler<MatchFormData> = (data) => {
    const basePayload = {
      targetName: data.targetName,
      targetPhone: data.targetPhone,
      requesterDesire: data.requesterDesire,
    };

    if (data.channel === "insta") {
      const payload = {
        ...basePayload,
        targetInsta: data.targetInsta,
      };

      if (mode === "edit") {
        updateMatch(payload);
        router.push(`/waiting/insta`);
        return;
      }

      requestMatch(payload);
      router.push(`/waiting/insta`);
      return;
    }

    // 여기부터는 TypeScript가 자동으로 tiktok 타입으로 좁힘
    const payload = {
      ...basePayload,
      targetTiktok: data.targetTiktok,
    };

    if (mode === "edit") {
      updateMatch(payload);
      router.push(`/waiting/tiktok`);
      return;
    }

    console.log(payload);
    requestMatch(payload);
    router.push(`/waiting/tiktok`);
  };

  return (
    <>
      <BackHeader backHref="/match" />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex w-full flex-col space-y-10">
          <h1 className="text-center text-2xl font-bold">
            {mode === "edit" ? "매칭 정보 수정" : "다시 만나고 싶은 사람"}
          </h1>

          <div className="border-main-pink/40 bg-main-pink/5 rounded-lg border px-4 py-3 text-sm text-gray-700">
            <p className="text-main-pink font-semibold">
              ⚠️ 입력 정보는 반드시 정확하게 작성해 주세요
            </p>
            <p className="mt-1 leading-relaxed">
              이름 · 전화번호 · SNS ID는
              <br />
              <span className="text-main-pink font-bold">
                상대방이 입력한 정보와 단 한 글자라도 다르면 매칭되지 않습니다.
              </span>
              <br />
              오타 없이, 실제 사용하는 정보 그대로 입력해 주세요.
            </p>
          </div>

          <section className="flex flex-col space-y-5">
            <NormalInput name="targetName" label="이름" placeholder="상대방 이름" />

            <NormalInput name="targetPhone" label="전화번호" placeholder="01012345678" />

            {channel === "insta" && (
              <NormalInput name="targetInsta" label="인스타그램 ID" placeholder="instagram ID" />
            )}

            {channel === "tiktok" && (
              <NormalInput name="targetTiktok" label="틱톡 ID" placeholder="tiktok ID" />
            )}

            <DesireSlider name="requesterDesire" label="다시 만나고 싶은 마음" />
          </section>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-main-pink w-full py-3 text-white hover:bg-[#A41847]"
          >
            {isPending ? "처리 중..." : mode === "edit" ? "수정 완료" : "등록하기"}
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
