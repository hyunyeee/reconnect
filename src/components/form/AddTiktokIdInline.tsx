"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NormalInput } from "@/components/form/NormalInput";
import { useAddTiktokId } from "@/hooks/query/useAuth";

interface FormValues {
  tiktokId: string;
}

export default function AddTiktokIdInline() {
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      tiktokId: "",
    },
  });

  const { mutate, isPending } = useAddTiktokId();

  const onSubmit = (data: FormValues) => {
    mutate(
      { tiktokId: data.tiktokId },
      {
        onSuccess: () => {
          // 등록 성공 → 매칭 플로우 진입
          router.push("/match/tiktok");
        },
      },
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <NormalInput name="tiktokId" label="내 틱톡 아이디" placeholder="Tiktok ID" />

        <Button type="submit" disabled={isPending} className="bg-main-pink w-full">
          {isPending ? "등록 중..." : "틱톡 아이디 등록하고 매칭 시작"}
        </Button>
      </form>
    </FormProvider>
  );
}
