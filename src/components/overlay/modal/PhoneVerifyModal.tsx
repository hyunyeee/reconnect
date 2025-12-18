"use client";

import { useState } from "react";
import { useOverlay } from "@/hooks/useOverlay";
import { Button } from "@/components/ui/button";
import { X, Phone } from "lucide-react";
import { toast } from "sonner";
import { useSendPhoneCode, useVerifyPhoneCode } from "@/hooks/query/usePhoneAuth";

interface PhoneVerifyModalProps {
  onVerified?: () => void;
  phoneNumber: string;
}

export default function PhoneVerifyModal({ onVerified, phoneNumber }: PhoneVerifyModalProps) {
  const { closeOverlay } = useOverlay();

  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { mutateAsync: sendCode, isPending: isSending } = useSendPhoneCode();
  const { mutateAsync: verifyCode, isPending: isVerifying } = useVerifyPhoneCode();

  const handleVerify = async () => {
    if (!code.trim()) {
      toast.error("인증번호를 입력해주세요.");
      return;
    }

    try {
      const res = await verifyCode({
        phoneNumber,
        verificationCode: code,
      });

      if (res.success) {
        toast.success("휴대폰 인증 완료", {
          description: res.data ?? "인증이 정상적으로 완료되었습니다.",
        });
        onVerified?.();
        setTimeout(closeOverlay, 800);
      } else {
        toast.error("인증 실패", {
          description: res.message ?? "인증번호가 올바르지 않습니다.",
        });
      }
    } catch {
      toast.error("인증 실패", {
        description: "서버와의 통신에 문제가 발생했습니다.",
      });
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    try {
      await sendCode({ phoneNumber });
      setCode("");
      setCooldown(30);

      toast.success("인증번호가 전송되었습니다.", {
        description: "휴대폰을 확인해주세요.",
      });

      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      toast.error("전송 실패", {
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={closeOverlay}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X className="h-5 w-5" />
      </button>

      <Phone className="text-main-pink mt-2 mb-4 h-10 w-10" />
      <h2 className="text-base font-semibold text-gray-900">인증번호를 입력해주세요</h2>
      <p className="mt-1 mb-6 text-sm text-gray-600">{phoneNumber}</p>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        className="mb-6 h-11 w-full rounded-md border border-gray-300 px-3 text-center text-base focus:outline-none"
      />

      <div className="flex w-full flex-col space-y-2">
        <Button
          onClick={handleVerify}
          disabled={isVerifying}
          className="bg-main-pink w-full text-white hover:bg-[#A41847]"
        >
          {isVerifying ? "확인 중..." : "인증번호 확인"}
        </Button>

        <Button
          onClick={handleResend}
          disabled={isSending || cooldown > 0}
          variant="outline"
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          {isSending
            ? "전송 중..."
            : cooldown > 0
              ? `재전송 ${cooldown}초 남음`
              : "인증번호 재전송"}
        </Button>
      </div>
    </div>
  );
}
