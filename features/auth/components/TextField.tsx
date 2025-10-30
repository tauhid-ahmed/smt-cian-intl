"use client";

import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  variant?: "dark" | "light";
}

export default function TextField({
  name,
  label,
  placeholder,
  type = "text",
  variant,
}: TextFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message as string | undefined;

  const [focus, setFocus] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const filled = !!field.value;
          const isFocused = focus || filled;
          return (
            <div className="relative">
              <div className="relative flex flex-col items-center">
                <Input
                  {...field}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  onFocus={() => setFocus(true)}
                  onBlur={(e) => {
                    if (e.target.value.length <= 0) setFocus(false);
                  }}
                  className={cn(
                    "w-full rounded-md px-3 py-5 placeholder-transparent outline-none! ring-transparent!",
                    errorMessage && "border-red-500",
                    variant === "light" && "border border-muted",
                    variant === "dark" && "border border-white/50"
                  )}
                />
                <motion.label
                  ref={labelRef}
                  htmlFor={name}
                  animate={{
                    top: isFocused ? "0" : "50%",
                    y: "-50%",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "absolute left-3 px-1 pointer-events-none",
                    variant === "dark" && "bg-sidebar text-muted",
                    variant !== "dark" && "bg-white text-muted-foreground",
                    isFocused && variant === "light" && "text-black",
                    isFocused && variant === "dark" && "text-white"
                  )}
                >
                  {label}
                </motion.label>
              </div>
              {errorMessage && (
                <span className="text-red-500 text-xs mt-1 w-full left-0">
                  {errorMessage}
                </span>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
