import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NormalInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
}

export const NormalInput = ({
  name,
  label,
  placeholder,
  type = "text",
  error,
}: NormalInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const innerError = (errors[name]?.message as string | undefined) ?? error;

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        autoComplete="new-password"
        autoCorrect="off"
        className={cn(
          "rounded-md border px-3 py-2 text-sm transition-colors duration-200 outline-none",
          innerError
            ? "border-red-500 hover:border-red-500"
            : "border-gray-300 hover:border-gray-400",
        )}
      />
      {innerError && <p className="mt-1 text-xs text-red-500">{innerError}</p>}
    </div>
  );
};
