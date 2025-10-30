"use client";

import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState, useLayoutEffect } from "react";
import { Input } from "@/components/ui/input";

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

  const [focus, setFocus] = useState(false);
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="relative w-full" data-mode="auth-card-light">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const filled = !!field.value;
          const isFocused = focus || filled;
          return (
            <div className="relative flex items-center">
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
                  "w-full rounded-md border px-3 py-5 placeholder-transparent outline-none! ring-transparent!",
                  errorMessage && "border-red-500"
                )}
              />

              {label && (
                <motion.label
                  ref={labelRef}
                  htmlFor={name}
                  animate={{
                    top: isFocused ? "0" : "50%",
                    y: "-50%",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "absolute left-4 px-1 pointer-events-none bg-red-500 text-white leading-0"
                  )}
                >
                  {label}
                </motion.label>
              )}

              {errorMessage && (
                <span className="text-red-500 text-xs mt-1 absolute bottom-[-1.25rem] left-0">
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
