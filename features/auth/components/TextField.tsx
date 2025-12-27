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
                    variant === "light" && "border border-muted bg-white text-black",
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

// "use client";

// import { Controller, useFormContext } from "react-hook-form";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";
// import { useRef, useState } from "react";
// import { Input } from "@/components/ui/input";

// interface TextFieldProps {
//   name: string;
//   label?: string;
//   placeholder?: string;
//   type?: string;
//   variant?: "dark" | "light";
// }

// export default function TextField({
//   name,
//   label,
//   placeholder,
//   type = "text",
//   variant = "light",
// }: TextFieldProps) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const errorMessage = errors[name]?.message as string | undefined;
//   const [focus, setFocus] = useState(false);
//   const labelRef = useRef<HTMLLabelElement>(null);

//   return (
//     <div className="relative w-full">
//       <Controller
//         name={name}
//         control={control}
//         render={({ field }) => {
//           const filled = !!field.value;
//           const isFocused = focus || filled;

//           return (
//             <div className="relative">
//               <div className="relative flex flex-col">
//                 {/* INPUT */}
//                 <Input
//                   {...field}
//                   id={name}
//                   type={type}
//                   placeholder={placeholder}
//                   onFocus={() => setFocus(true)}
//                   onBlur={(e) => {
//                     if (!e.target.value) setFocus(false);
//                   }}
//                   className={cn(
//                     "w-full h-14 rounded-md px-3 pt-6 pb-2 outline-none ring-0 placeholder-transparent transition-colors",

//                     /* TEXT + BG (IMPORTANT FIX) */
//                     variant === "light" && "bg-white text-black",
//                     variant === "dark" &&
//                       "bg-gray-800 text-white caret-white",

//                     /* BORDER */
//                     variant === "light" && "border border-muted",
//                     variant === "dark" && "border border-white/30",

//                     /* FOCUS */
//                     "focus:border-primary focus:ring-1 focus:ring-primary",

//                     /* ERROR */
//                     errorMessage &&
//                       "border-red-500 focus:border-red-500 focus:ring-red-500"
//                   )}
//                 />

//                 {/* FLOATING LABEL */}
//                 {label && (
//                   <motion.label
//                     ref={labelRef}
//                     htmlFor={name}
//                     animate={{
//                       top: isFocused ? "6px" : "50%",
//                       fontSize: isFocused ? "12px" : "14px",
//                       y: isFocused ? "0%" : "-50%",
//                     }}
//                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                     className={cn(
//                       "absolute left-3 pointer-events-none px-1",

//                       variant === "light" &&
//                         "bg-white text-muted-foreground",
//                       variant === "dark" &&
//                         "bg-gray-800 text-gray-400",

//                       isFocused && variant === "light" && "text-black",
//                       isFocused && variant === "dark" && "text-white"
//                     )}
//                   >
//                     {label}
//                   </motion.label>
//                 )}
//               </div>

//               {/* ERROR MESSAGE */}
//               {errorMessage && (
//                 <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
//               )}
//             </div>
//           );
//         }}
//       />
//     </div>
//   );
// }
