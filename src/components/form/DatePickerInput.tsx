"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface DatePickerInputProps {
  yearField: string;
  monthField: string;
  dayField: string;
  validateField: string;
  label?: string;
}

export function DatePickerInput({
  yearField,
  monthField,
  dayField,
  validateField,
  label,
}: DatePickerInputProps) {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const year = watch(yearField);
  const month = watch(monthField);
  const day = watch(dayField);

  const displayDate =
    year && month && day ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : "";

  const error = errors?.[validateField]?.message as string | undefined;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const y = format(selectedDate, "yyyy");
    const m = format(selectedDate, "MM");
    const d = format(selectedDate, "dd");

    setValue(yearField, y, { shouldValidate: true });
    setValue(monthField, m, { shouldValidate: true });
    setValue(dayField, d, { shouldValidate: true });

    // 검증용 필드 채움
    setValue(validateField, "selected", { shouldValidate: true });
  };

  return (
    <div className="flex flex-col space-y-2.5">
      {label && <label className="text-sm font-medium text-gray-800">{label}</label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start border-gray-300 bg-white px-4 py-3 text-left font-normal",
              error && "border-red-500",
              !displayDate && "text-gray-400",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
            {displayDate || "날짜를 선택하세요"}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={12} className="rounded-2xl border p-5 shadow-xl">
          <Calendar
            mode="single"
            selected={displayDate ? new Date(displayDate) : undefined}
            onSelect={handleSelect}
            captionLayout="dropdown"
            className={cn(
              "w-full rounded-lg border-0 text-sm text-gray-800",
              "[&_table]:mx-auto [&_table]:mt-4 [&_table]:w-full",
              "[&_button]:rounded-md [&_button]:py-2 [&_button]:text-sm [&_button]:text-gray-700",
              "[&_button]:focus:ring-0 [&_button]:focus:outline-none",
              "[&_button[aria-selected='true']]:bg-main-pink [&_button[aria-selected='true']]:text-white",
              "[&_button[aria-selected='true']:hover]:bg-main-pink",
              "[&_select]:border-0 [&_select]:ring-0 [&_select]:outline-none",
              "[&_select]:bg-transparent",
              "[&_select]:px-2 [&_select]:py-1",
              "[&_div[data-cap='dropdown']]:pb-3",
            )}
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* 검증용 hidden field */}
      <input
        type="hidden"
        {...register(validateField, {
          required: "생년월일을 선택해주세요.",
        })}
      />
    </div>
  );
}
