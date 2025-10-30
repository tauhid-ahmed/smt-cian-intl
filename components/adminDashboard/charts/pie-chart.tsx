"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface PieChartData extends Record<string, string | number | undefined> {
  name: string;
  value: number;
  color?: string; // optional, in case you want per-item color
}

interface PieChartCardProps {
  title: string;
  subtitle?: string;
  data: PieChartData[];
}

// Define default colors if not provided
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function PieChartCard({ title, subtitle, data }: PieChartCardProps) {
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="text-left text-white mb-4">
        <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
        {subtitle && <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>}
      </div>

      <div className="flex flex-col lg:flex-row items-center-safe justify-around gap-12">
        <div className="shrink-0">
          <ResponsiveContainer width={280} height={280}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={130}
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
              <Tooltip formatter={(value: number) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{
                  backgroundColor: item.color || COLORS[index % COLORS.length],
                }}
              />
              <span className="text-sm text-[#C3C3C3]">
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
