"use client";

import { useEffect } from "react";
import { FormProvider, useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NormalInput } from "@/components/form/NormalInput";
import MbtiDropdown from "@/components/form/MbtiDropdown";

import { useMemberProfile, useUpdateMemberProfile, useDeleteMember } from "@/hooks/query/useAuth";

import { memberProfileUpdateSchema, type MemberProfileUpdateForm } from "@/schemas/memberSchema";
import { MemberProfileUpdatePayload } from "@/types/member";

export default function ProfileEditClient() {
  const { data, isLoading } = useMemberProfile();
  const updateMutation = useUpdateMemberProfile();
  const deleteMutation = useDeleteMember();

  const methods = useForm<MemberProfileUpdateForm>({
    resolver: zodResolver(memberProfileUpdateSchema),
    mode: "onChange",
    defaultValues: {
      nickname: "",
      instagramId: "",
      tiktokId: "",
      mbti: undefined,
      emailAgree: false,
    },
  });

  useEffect(() => {
    if (!data) return;

    methods.reset({
      nickname: data.nickname ?? "",
      instagramId: data.instagramId ?? "",
      tiktokId: data.tiktokId ?? "",
      mbti: data.mbti,
      emailAgree: data.emailAgree ?? false,
    });
  }, [data, methods]);

  const onSubmit: SubmitHandler<MemberProfileUpdateForm> = (data) => {
    const { tiktokId, emailAgree, ...rest } = data;

    const trimmedTiktokId = tiktokId?.trim();

    if (!trimmedTiktokId) {
      alert("틱톡 아이디를 등록하지 않으면\n<틱톡으로 매칭하기> 기능을 이용하기 어려울 수 있어요.");
    }

    const payload: MemberProfileUpdatePayload = {
      ...rest,
      tiktokId: trimmedTiktokId && trimmedTiktokId !== "" ? trimmedTiktokId : null,
      emailAgree: emailAgree ?? false,
    };

    updateMutation.mutate(payload);
  };

  if (isLoading || !data) {
    return <div className="text-muted-foreground text-sm">불러오는 중…</div>;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        {/* ================= 조회 전용 ================= */}
        <div className="space-y-1">
          <Label>이메일</Label>
          <Input value={data.email} disabled />
        </div>

        <div className="space-y-1">
          <Label>이름</Label>
          <Input value={data.name} disabled />
        </div>

        {/* ================= 수정 가능 ================= */}
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
                checked={field.value ?? false}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <Label className="text-sm">이메일 수신 동의</Label>
            </div>
          )}
        />

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="bg-main-pink w-full py-3 text-white"
        >
          {updateMutation.isPending ? "수정 중..." : "수정하기"}
        </Button>

        {/* ================= 회원 탈퇴 ================= */}
        <div className="mt-12">
          <button
            type="button"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            className="w-full rounded-md border border-gray-200 py-3 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-600 disabled:opacity-50"
          >
            회원 탈퇴
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
