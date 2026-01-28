"use client";

import { useEffect } from "react";
import { FormProvider, useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NormalInput } from "@/components/form/NormalInput";
import MbtiDropdown from "@/components/form/MbtiDropdown";

import { useMemberProfile, useUpdateMemberProfile } from "@/hooks/query/useAuth";
import type { MemberProfileUpdateForm } from "@/types/member";

export default function ProfileEditClient() {
  const { data, isLoading } = useMemberProfile();
  const updateMutation = useUpdateMemberProfile();

  const methods = useForm<MemberProfileUpdateForm>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      instagramId: "",
      tiktokId: "",
      emailAgree: false,
    },
  });

  const onSubmit: SubmitHandler<MemberProfileUpdateForm> = (values) => {
    updateMutation.mutate({
      ...values,
      tiktokId: values.tiktokId?.trim() || null,
    });
  };

  useEffect(() => {
    if (!data) return;

    methods.reset({
      nickname: data.nickname,
      instagramId: data.instagramId,
      tiktokId: data.tiktokId ?? "",
      mbti: data.mbti,
      emailAgree: data.emailAgree,
    });
  }, [data, methods]);

  if (isLoading || !data) {
    return <div className="text-muted-foreground text-sm">불러오는 중…</div>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        {/* 조회 전용 */}
        <div className="space-y-1">
          <Label>이메일</Label>
          <Input value={data.email} disabled />
        </div>

        <div className="space-y-1">
          <Label>이름</Label>
          <Input value={data.name} disabled />
        </div>

        {/* 수정 가능 */}
        <NormalInput name="nickname" label="닉네임" placeholder="닉네임을 입력하세요" />

        <NormalInput name="instagramId" label="인스타그램 ID" placeholder="instagram_id" />

        <NormalInput name="tiktokId" label="틱톡 ID" placeholder="tiktok_id" />

        <MbtiDropdown name="mbti" />

        <Controller
          name="emailAgree"
          control={methods.control}
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="emailAgree"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <Label htmlFor="emailAgree" className="text-sm">
                이메일 수신 동의
              </Label>
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-main-pink w-full py-3 text-white hover:bg-[#A41847]"
        >
          {updateMutation.isPending ? "수정 중..." : "수정하기"}
        </Button>
      </form>
    </FormProvider>
  );
}
