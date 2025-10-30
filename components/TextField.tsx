import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface TextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export default function TextField({
  name,
  label,
  placeholder,
  type = "text",
}: TextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            className={`border p-2 rounded-lg w-full placeholder:text-sm ${
              errorMessage ? "border-red-500" : "border-gray-500"
            }`}
          />
        )}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
}
