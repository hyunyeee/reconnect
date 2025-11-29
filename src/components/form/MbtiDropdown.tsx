import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MBTI_LIST } from "@/constants/mbtiList";

export type MbtiValue = (typeof MBTI_LIST)[number];

interface MbtiDropdownProps {
  name?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: MbtiValue;
  disabled?: boolean;
  className?: string;
}

export default function MbtiDropdown({
  name = "mbti",
  label = "MBTI",
  placeholder = "MBTI를 선택하세요",
  defaultValue = "ISTP",
  disabled = false,
  className = "",
}: MbtiDropdownProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors?.[name]?.message as string | undefined;

  return (
    <div className={`w-full ${className}`}>
      <Label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </Label>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(v) => field.onChange(v as MbtiValue)}
            disabled={disabled}
          >
            <SelectTrigger
              id={name}
              className={`w-full rounded-md px-3 py-2 text-sm transition-colors duration-200 outline-none ${
                error
                  ? "border-red-500 hover:border-red-500"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>MBTI</SelectLabel>
                {MBTI_LIST.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
