"use client";

import { useState, useRef, useEffect } from "react";
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

  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { mutateAsync: sendCode, isPending: isSending } = useSendPhoneCode();
  const { mutateAsync: verifyCode, isPending: isVerifying } = useVerifyPhoneCode();

  const setInputRef = (el: HTMLInputElement | null, idx: number) => {
    inputsRef.current[idx] = el;
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const next = [...codes];
    next[index] = value;
    setCodes(next);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
    if (!value && index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handleVerify = async () => {
    const code = codes.join("");
    if (code.length < 6) {
      toast.error("6자리 인증번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await verifyCode({ phoneNumber, verificationCode: code });

      if (res.success) {
        toast.success("휴대폰 인증 완료", {
          description: res.data ?? "인증이 정상적으로 완료되었습니다.",
        });
        onVerified?.();
        setTimeout(closeOverlay, 1000);
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
      setCodes(["", "", "", "", "", ""]);
      setCooldown(30);
      toast.success("인증번호가 전송되었습니다.", {
        description: "휴대폰을 확인해주세요.",
      });
      inputsRef.current[0]?.focus();
    } catch {
      toast.error("전송 실패", {
        description: "잠시 후 다시 시도해주세요.",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={closeOverlay}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
      >
        <X className="h-5 w-5" />
      </button>

      <Phone className="mt-2 mb-4 h-10 w-10 text-blue-500" />
      <h2 className="text-base font-semibold text-gray-900">인증번호를 입력해주세요</h2>
      <p className="mt-1 mb-6 text-sm text-gray-600">{phoneNumber}</p>

      <div className="mb-6 flex justify-center gap-2">
        {codes.map((val, idx) => (
          <input
            key={idx}
            ref={(el) => setInputRef(el, idx)}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="h-10 w-10 rounded-md border border-gray-300 text-center text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        ))}
      </div>

      <div className="flex w-full flex-col space-y-2">
        <Button
          onClick={handleVerify}
          disabled={isVerifying}
          className="bg-main-pink w-full text-white hover:bg-[#1E293B]"
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
