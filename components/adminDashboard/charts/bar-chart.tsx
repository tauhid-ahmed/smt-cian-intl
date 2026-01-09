"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import React from "react";

// Type for one data point
export interface ReviewData {
    month: string;
    positive: number;
    neutral: number;
    negative: number;
}

// Props for the reusable chart
interface BarChartCardProps {
    title: string;
    subtitle?: string;
    data: ReviewData[];
    labels?: {
        positive?: string;
        neutral?: string;
        negative?: string;
    };
}

// Custom Tooltip
const CustomTooltip = ({ active, payload, label, labels }) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="p-2 text-[12px] text-black"
                style={{
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    borderRadius: "8px",
                    color: "#000000",
                    boxShadow: "0px 4px 4px 0px #00000040",
                }}>
                <p className="font-bold mb-1">{label}</p>
                <div className="space-y-1">
                    {payload.map((p, i) => (
                        <p key={i}>
                            {labels?.[p.dataKey] || p.dataKey.charAt(0).toUpperCase() + p.dataKey.slice(1)}: {Number(p.value).toLocaleString()}
                        </p>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// Reusable Component
export function BarChartCard({ title, subtitle, data, labels }: BarChartCardProps) {
    // Check which bars have data to avoid showing empty legend items/bars
    const hasPositive = data.some(d => d.positive > 0);
    const hasNeutral = data.some(d => d.neutral > 0);
    const hasNegative = data.some(d => d.negative > 0);

    return (
        <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full h-full">
            <div className="text-left text-white mb-4">
                <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
                {subtitle && <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>}
            </div>
            <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                        barCategoryGap="20%"
                        barGap={0}>
                        <CartesianGrid
                            strokeDasharray="3 0"
                            stroke="#C7C7C7"
                            opacity={0}
                            vertical={false}
                        />
                        <XAxis
                            dataKey="month"
                            stroke="#FFFFFF"
                            tick={{ fill: "#FFFFFF", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#FFFFFF"
                            tick={{ fill: "#FFFFFF", fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            content={<CustomTooltip active={undefined} label={undefined} payload={undefined} labels={labels} />}
                            cursor={{ fill: "#C7C7C7", opacity: 0.2 }}
                        />
                        {hasPositive && <Bar dataKey="positive" stackId="a" fill="#FFFFFF" radius={!hasNeutral && !hasNegative ? [4, 4, 0, 0] : [0, 0, 0, 0]} />}
                        {hasNeutral && <Bar dataKey="neutral" stackId="a" fill="#FFC300" radius={!hasNegative ? [4, 4, 0, 0] : [0, 0, 0, 0]} />}
                        {hasNegative && (
                            <Bar
                                dataKey="negative"
                                stackId="a"
                                fill="#C70039"
                                radius={[4, 4, 0, 0]}
                            />
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
