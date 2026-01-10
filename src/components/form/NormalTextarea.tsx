"use client";

import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NormalTextareaProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  rows?: number;
  error?: string;
}

export function NormalTextarea<T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 10,
  error,
}: NormalTextareaProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const innerError = (errors[name]?.message as string | undefined) ?? error;

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={name}>{label}</Label>

      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          "resize-none rounded-md border px-3 py-2 text-sm transition-colors outline-none",
          innerError
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-400",
        )}
      />

      {innerError && <p className="mt-1 text-xs text-red-500">{innerError}</p>}
    </div>
  );
}
