"use client";

interface DataType {
  metric: string;
  value: string | number; // Updated to handle values like "+34%", 23, 89
  unit: string;
}

interface TopProductsCardProps {
  data: DataType[];
  title?: string;
  subtitle?: string;
}

export function ReviewImpactSales({
  data,
  title = "Review Impact on Sales",
  subtitle = "Key performance indicators",
}: TopProductsCardProps) {
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-4">
        <div className="text-left text-white mb-4">
          <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
          <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            // Retaining the original CSS classes for styling
            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors duration-200">
            {/* Display the metric name on the left */}
            <p className="font-medium text-sm text-white">{item.metric}</p>
            {/* Display the combined value and unit on the right */}
            <p className="font-normal text-sm text-[#F2F2F2]">
              {typeof item.value === "string" &&
              (item.value.includes("%") || item.value.includes("+"))
                ? item.value
                : item.value}
              {item.unit === "hours" && ` ${item.unit}`}
              {item.unit === "count" && ""}{" "}
              {/* No extra text needed for a simple number like 23 */}
              {item.unit === "%" && item.value !== 89 ? ` ${item.unit}` : ""}
              {item.unit === "sales" && ` ${item.unit}`}
              {item.unit === "increase" && ""}
              {item.metric.includes("response rate") ? "%" : ""}
              {item.metric.includes("time to moderate") ? " hours" : ""}
              {item.metric.includes("4-star reviews") ? " sales" : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
