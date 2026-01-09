/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartData extends Record<string, string | number | undefined> {
    name: string;
    value: number;
    color?: string;
}

interface PieChartCardProps {
    title: string;
    subtitle?: string;
    data: PieChartData[];
    valuePrefix?: string;
    showPercentage?: boolean;
}

// Define default colors if not provided
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

export function PieChartCard({
    title,
    subtitle,
    data,
    valuePrefix = "",
    showPercentage = true
}: PieChartCardProps) {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full h-full">
            <div className="text-left text-white mb-4">
                <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
                {subtitle && <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>}
            </div>

            <div className="flex flex-col xl:flex-row items-center justify-start gap-8 lg:gap-12">
                <div className="shrink-0">
                    <ResponsiveContainer width={240} height={240}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="value"
                                paddingAngle={2}
                                stroke="none">
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color || COLORS[index % COLORS.length]}
                                        stroke="none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number, name: string, props: any) => {
                                    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                    const count = props.payload.count;
                                    const amountStr = `${valuePrefix}${value.toLocaleString()}`;
                                    const percentageStr = `(${percentage}%)`;
                                    const countStr = count !== undefined ? ` | Count: ${count}` : "";
                                    return [`${amountStr} ${percentageStr}${countStr}`, "Details"];
                                }}
                                contentStyle={{
                                    backgroundColor: "#2A2A2A",
                                    border: "1px solid #3b3b3b",
                                    borderRadius: "8px",
                                    color: "#FFFFFF",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-3 w-full overflow-y-auto max-h-[240px] pr-2 custom-scrollbar">
                    {data.map((item, index) => {
                        const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
                        return (
                            <div key={item.name} className="flex items-center justify-between gap-3 w-full">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: item.color || COLORS[index % COLORS.length],
                                        }}
                                    />
                                    <span className="text-xs sm:text-sm text-[#C3C3C3] line-clamp-1">
                                        {item.name}
                                    </span>
                                </div>
                                <span className="text-xs sm:text-sm text-white font-medium whitespace-nowrap">
                                    {valuePrefix}{item.value.toLocaleString()} {showPercentage && `(${percentage}%)`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
