"use client";

import React from "react";

interface MetricsGridProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
}

export function MetricsGrid({ title, value, icon: Icon }: MetricsGridProps) {
  return (
    <div className="border border-white bg-transparent p-[17px] rounded-[15px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#F2F2F2] mb-1">{title}</p>
          <p className="text-[30px] font-bold text-white">{value}</p>
        </div>
        {Icon && <Icon className="w-12 h-12 text-white" />}
      </div>
    </div>
  );
}
