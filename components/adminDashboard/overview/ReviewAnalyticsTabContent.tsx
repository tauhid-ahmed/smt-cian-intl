"use client";

import { BarChartCard } from "../charts/bar-chart";

const ReviewAnalyticsTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <BarChartCard />
    </div>
  );
};

export default ReviewAnalyticsTabContent;
