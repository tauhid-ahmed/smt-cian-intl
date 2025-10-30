"use client";

import React from "react";

interface MetricItem {
  label: string;
  percentage: number;
  color: string;
}

interface ProgressBarCardProps {
  title: string;
  subtitle?: string;
  metrics: MetricItem[]; // single array
}

export function ProgressBarCard({
  title,
  subtitle,
  metrics,
}: ProgressBarCardProps) {
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="text-left text-white mb-6">
        <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
        {subtitle && <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>}
      </div>

      {/* Progress Bars */}
      <div className="shrink-0">
        <div className="space-y-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white font-normal">{metric.label}</span>
              </div>
              <div className="w-full bg-[#3B3B3B] rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${metric.percentage}%`,
                    backgroundColor: metric.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
