"use client";

import { PieChartCard } from "../charts/pie-chart";
import { ProgressBarCard } from "../progress-bar";

const customerData = [
  { name: "Regular Customer", value: 45, color: "#DD6E42" },
  { name: "Premium Members", value: 30, color: "#E8DAB2" },
  { name: "One-time Buyers", value: 15, color: "#4F6D7A" },
];
const metrics = [
  { label: "Avg. Session Duration", percentage: 85, color: "#335C67" },
  { label: "Pages per Session", percentage: 72, color: "#FFF3B0" },
  { label: "Return Customer Rate", percentage: 28, color: "#9E2A2B" },
  { label: "Customer Satisfaction", percentage: 92, color: "#E09F3E" },
];
const CustomerAnalyticsTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <PieChartCard
        data={customerData}
        title="Customer Segments"
        subtitle="Distribution by customer type"
      />
      <ProgressBarCard
        title="Customer Behaviour"
        subtitle="Key metrics and insights"
        metrics={metrics}
      />
    </div>
  );
};

export default CustomerAnalyticsTabContent;
