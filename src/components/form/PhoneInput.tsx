"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useOverlay } from "@/hooks/useOverlay";
import PhoneVerifyModal from "@/components/overlay/modal/PhoneVerifyModal";
import { useSendPhoneCode } from "@/hooks/query/usePhoneAuth";

interface PhoneInputProps {
  name: string;
  label: string;
  placeholder?: string;
  buttonText?: string;
  disabled?: boolean;
}

export const PhoneInput = ({
  name,
  label,
  placeholder,
  buttonText = "인증하기",
  disabled = false,
}: PhoneInputProps) => {
  const {
    register,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const [isVerified, setIsVerified] = useState(false);

  const { mutate: sendPhoneCode, isPending } = useSendPhoneCode();
  const { openOverlay } = useOverlay();

  const errorMessage = errors[name]?.message as string | undefined;

  // 인증 필요 에러인지 구분
  const isVerifyError = errorMessage === "휴대폰 인증을 완료해주세요.";

  // 형식 에러일 때만 막고, 인증 에러일 때는 허용
  const canSend = !disabled && (!errorMessage || isVerifyError);

  const handleClick = () => {
    const value = getValues(name) as string;

    if (!value || (!canSend && !isVerifyError)) {
      toast.error("올바른 전화번호를 입력해주세요.");
      return;
    }

    sendPhoneCode(
      { phoneNumber: value },
      {
        onSuccess: () => {
          openOverlay(
            "modal",
            <PhoneVerifyModal
              phoneNumber={value}
              onVerified={() => {
                setIsVerified(true);
                clearErrors(name);
                toast.success("휴대폰 인증이 완료되었습니다.");
              }}
            />,
          );
        },
      },
    );
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={name}>{label}</Label>

      <div className="flex items-center gap-2">
        <Input
          id={name}
          placeholder={placeholder}
          readOnly={isVerified}
          {...register(name, {
            onChange: () => {
              if (isVerified) {
                setIsVerified(false);
                clearErrors(name); //  인증 에러 초기화
              }
            },
          })}
          className={cn(
            "flex-1 rounded-md border px-3 py-2 text-sm transition-colors outline-none",
            errorMessage
              ? "border-red-500 hover:border-red-500"
              : "border-gray-300 hover:border-gray-400",
          )}
        />

        {isVerified ? (
          <Button
            type="button"
            disabled
            className="flex cursor-default items-center gap-1 bg-gray-200 text-gray-600"
          >
            <CheckCircle2 size={16} />
            인증완료
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleClick}
            disabled={!canSend || isPending}
            className={cn(
              "min-w-[90px] rounded-md text-sm font-medium",
              !canSend || isPending
                ? "cursor-not-allowed bg-gray-200 text-gray-500"
                : "bg-main-pink text-white hover:bg-[#1E293B]",
            )}
          >
            {isPending ? "로딩중..." : buttonText}
          </Button>
        )}
      </div>

      {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};
