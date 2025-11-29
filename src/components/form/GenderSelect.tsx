"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface GenderSelectProps {
  name: string;
  label?: string;
}

export const GenderSelect = ({ name, label = "성별" }: GenderSelectProps) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selected = watch(name);
  const error = errors[name]?.message as string | undefined;

  const handleSelect = (value: "MALE" | "FEMALE") => {
    setValue(name, value, { shouldValidate: true });
  };

  const baseButton = "flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-all";

  const inactiveButton = "border-gray-300 bg-white text-gray-800 hover:border-gray-400";

  return (
    <div className="flex flex-col space-y-1">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>

      <div className="flex gap-3">
        {/* MALE */}
        <button
          type="button"
          onClick={() => handleSelect("MALE")}
          className={cn(
            baseButton,
            selected === "MALE" ? "bg-main-pink border-main-pink text-white" : inactiveButton,
          )}
        >
          Male
        </button>

        {/* FEMALE */}
        <button
          type="button"
          onClick={() => handleSelect("FEMALE")}
          className={cn(
            baseButton,
            selected === "FEMALE" ? "bg-main-pink border-main-pink text-white" : inactiveButton,
          )}
        >
          Female
        </button>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* hidden input */}
      <input type="hidden" {...register(name)} />
    </div>
  );
};
