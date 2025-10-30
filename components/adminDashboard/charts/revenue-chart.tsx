"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RevenueChartProps {
  data: { month: string; [key: string]: number | string }[];
  title?: string;
  subtitle?: string;
  lineDataKey?: string;
}

export function RevenueChart({
  data,
  title = "Revenue Over Time",
  subtitle = "Monthly revenue trends",
  lineDataKey = "users",
}: RevenueChartProps) {
  return (
    <div className="bg-[#181818] rounded-xl p-4 sm:p-6 w-full">
      <div className="text-left text-white mb-4">
        <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
        <h2 className="text-sm text-white">{subtitle}</h2>
      </div>

      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 0"
              stroke="#C7C7C7"
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
              cursor={{ stroke: "#7C3AED", strokeWidth: 0 }}
              contentStyle={{
                backgroundColor: "#2A2A2A",
                border: "1px solid #3b3b3b",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
              labelStyle={{ color: "#B3B3B3", fontSize: 12 }}
              formatter={(value: number) =>
                `${lineDataKey}: ${value.toLocaleString()}`
              }
            />
            <Line
              type="monotone"
              dataKey={lineDataKey}
              stroke="#FFFFFF"
              strokeWidth={1.8}
              dot={{ r: 5, fill: "#AC8EE3", strokeWidth: 3.5 }}
              activeDot={{ r: 5, fill: "#FFFFFF", stroke: "none" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
