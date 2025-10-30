"use client";

import React from "react";
import { Activity, TrendingUp } from "lucide-react";

interface Metric {
  name: string;
  loadTime: string;
  uptime: string;
  status: "Excellent" | "Good" | string;
}

interface PerformanceMetricsTableProps {
  title?: string;
  subtitle?: string;
  metrics: Metric[];
}

const PerformanceMetricsTable: React.FC<PerformanceMetricsTableProps> = ({
  title = "Performance Metrics",
  subtitle = "Page load times and uptime monitoring",
  metrics,
}) => {
  const getStatusColor = (status: string) => {
    return status === "Excellent" ? "text-[#03C900]" : "text-[#DCC602]";
  };

  return (
    <div className="border border-white bg-transparent p-[17px] rounded-[15px] mt-8 overflow-x-auto">
      {/* Header */}
      <div className="text-left text-white mb-6">
        <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
        <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>
      </div>

      {/* Metrics List */}
      <div className="space-y-6 min-w-[300px]">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex-1 mb-2 sm:mb-0">
              <h3 className="text-base mb-2">{metric.name}</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-white">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Load Time: {metric.loadTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Uptime: {metric.uptime}</span>
                </div>
              </div>
            </div>
            <div
              className={`text-sm font-medium ${getStatusColor(
                metric.status
              )}`}>
              {metric.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMetricsTable;
