"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

// Type for one data point
interface ReviewData {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
}

// Sample data
const data: ReviewData[] = [
  { month: "Jan", positive: 45000, neutral: 3000, negative: 2000 },
  { month: "Feb", positive: 33000, neutral: 4000, negative: 3000 },
  { month: "Mar", positive: 26000, neutral: 1500, negative: 1500 },
  { month: "Apr", positive: 32000, neutral: 2500, negative: 2500 },
  { month: "May", positive: 45000, neutral: 3500, negative: 2500 },
  { month: "Jun", positive: 18000, neutral: 1000, negative: 500 },
  { month: "Jul", positive: 25000, neutral: 1500, negative: 1000 },
];

// Custom Tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    // payload items are of type any for TS safety
    const negative = payload.find((p: any) => p.dataKey === "negative");
    const neutral = payload.find((p: any) => p.dataKey === "neutral");
    const positive = payload.find((p: any) => p.dataKey === "positive");

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
          {negative?.value !== undefined && (
            <p>Negative: {Number(negative.value).toLocaleString()}</p>
          )}
          {neutral?.value !== undefined && (
            <p>Neutral: {Number(neutral.value).toLocaleString()}</p>
          )}
          {positive?.value !== undefined && (
            <p>Positive: {Number(positive.value).toLocaleString()}</p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

// Main component
export function BarChartCard() {
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="text-left text-white mb-4">
        <h1 className="font-semibold text-base sm:text-lg">
          Review Sentiment Trends
        </h1>
        <h2 className="text-sm text-[#F2F2F2]">
          Positive, neutral, and negative reviews over time
        </h2>
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
              content={<CustomTooltip />}
              cursor={{ fill: "#C7C7C7", opacity: 0.2 }}
            />
            <Bar dataKey="positive" stackId="a" fill="#FFFFFF" />
            <Bar dataKey="neutral" stackId="a" fill="#FFC300" />
            <Bar
              dataKey="negative"
              stackId="a"
              fill="#C70039"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
