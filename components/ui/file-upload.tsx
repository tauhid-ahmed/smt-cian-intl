"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 10, y: -10, opacity: 0.9 },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange && onChange(newFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => console.log(error),
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        // whileHover="animate"
        className="p-2 group/file block rounded-lg cursor-pointer w-full relative 
                   overflow-hidden bg-transparent border-2 border-dashed border-[#3B3B3B]
                   max-h-[250px] sm:max-h-[300px]">
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center text-center h-full overflow-hidden px-2 sm:px-4 py-2">
          <p className="relative z-20 font-sans font-bold text-neutral-300 text-[11px] sm:text-sm">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 text-[9px] sm:text-xs mt-1">
            Drag or drop files or click to upload
          </p>

          <div className="relative w-full mt-2 flex gap-2 sm:gap-3 overflow-x-auto overflow-y-hidden p-1">
            {files.length > 0 ? (
              files.map((file, idx) => (
                <motion.div
                  key={file.name + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative flex-shrink-0 bg-neutral-800 p-1 rounded-md shadow-sm flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24"
                  )}>
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="object-cover w-full h-14 sm:h-16 rounded-md"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-14 sm:h-16 bg-neutral-700 rounded-md text-neutral-300 text-[8px] sm:text-[10px] p-1 text-center">
                      {file.name}
                    </div>
                  )}

                  <p className="text-[8px] sm:text-[10px] text-neutral-400 mt-1 truncate w-full">
                    {file.name}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => handleRemove(e, idx)}
                    className="absolute top-0 right-0 text-neutral-300 hover:text-red-500 bg-gray-400/50 rounded-full h-5 w-5 flex items-center justify-center">
                    <IconX size={14} />
                  </button>
                </motion.div>
              ))
            ) : (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-neutral-800 flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-md shadow-[0px_5px_25px_rgba(0,0,0,0.1)] mx-auto"
                )}>
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-400 flex flex-col items-center text-[9px] sm:text-xs">
                    Drop it
                    <IconUpload className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-400 mt-1" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-3 w-3 sm:h-4 sm:w-4 text-neutral-300" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-px gap-y-px scale-90 sm:scale-100">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-3 sm:w-4 h-3 sm:h-4 flex shrink-0 rounded-[1px] ${index % 2 === 0
                ? "bg-neutral-950"
                : "bg-neutral-900 shadow-[0px_0px_1px_1px_rgba(0,0,0,0.5)_inset]"
                }`}
            />
          );
        })
      )}
    </div>
  );
}
