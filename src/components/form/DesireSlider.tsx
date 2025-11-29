"use client";

import { useFormContext } from "react-hook-form";
import { Slider } from "@/components/ui/slider";

interface Props {
  name: string;
  label: string;
}

export function DesireSlider({ name, label }: Props) {
  const { setValue, watch } = useFormContext();
  const value = watch(name) ?? 50;

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Slider
        defaultValue={[value]}
        max={100}
        step={1}
        onValueChange={(v) => setValue(name, v[0], { shouldValidate: true })}
      />
      <span className="text-sm text-gray-500">{value} / 100</span>
    </div>
  );
}
