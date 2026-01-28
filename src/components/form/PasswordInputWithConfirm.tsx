"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { NormalInput } from "@/components/form/NormalInput";

interface Props {
  passwordField: string;
  confirmField: string;
}

export const PasswordInputWithConfirm = ({ passwordField, confirmField }: Props) => {
  const { watch } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const password = watch(passwordField);
  const confirm = watch(confirmField);

  const showMismatch =
    password &&
    confirm &&
    password !== confirm;

  return (
    <div className="flex flex-col space-y-4">
      {/* 비밀번호 */}
      <div className="relative">
        <NormalInput
          name={passwordField}
          label="비밀번호"
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute top-7 right-3"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* 비밀번호 확인 */}
      <div className="relative">
        <NormalInput
          name={confirmField}
          label="비밀번호 확인"
          type={showConfirm ? "text" : "password"}
          placeholder="비밀번호를 다시 입력하세요"
        />
        <button
          type="button"
          onClick={() => setShowConfirm((v) => !v)}
          className="absolute top-7 right-3"
        >
          {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>

        {showMismatch && (
          <p className="mt-1 text-xs text-red-500">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>
    </div>
  );
};
