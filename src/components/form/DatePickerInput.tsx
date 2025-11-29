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
  label?: string;
}

export function DatePickerInput({ yearField, monthField, dayField, label }: DatePickerInputProps) {
  const { setValue, watch } = useFormContext();
  const year = watch(yearField);
  const month = watch(monthField);
  const day = watch(dayField);

  const displayDate =
    year && month && day ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}` : "";

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const y = format(selectedDate, "yyyy");
    const m = format(selectedDate, "MM");
    const d = format(selectedDate, "dd");

    setValue(yearField, y, { shouldValidate: true });
    setValue(monthField, m, { shouldValidate: true });
    setValue(dayField, d, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col space-y-2.5">
      {label && <label className="text-sm font-medium text-gray-800">{label}</label>}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start border-gray-300 bg-white px-4 py-3 text-left font-normal",
              !displayDate && "text-gray-400",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
            {displayDate ? displayDate : "날짜를 선택하세요"}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" sideOffset={12} className="rounded-2xl border p-5 shadow-xl">
          <Calendar
            mode="single"
            selected={displayDate ? new Date(displayDate) : undefined}
            onSelect={handleSelect}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
