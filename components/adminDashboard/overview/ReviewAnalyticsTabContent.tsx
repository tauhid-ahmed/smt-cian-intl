"use client";

import { BarChartCard } from "../charts/bar-chart";
import { ReviewImpactSales } from "../review-impact";
export interface ReviewData {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
}

const sampleData: ReviewData[] = [
  { month: "Jan", positive: 45000, neutral: 3000, negative: 2000 },
  { month: "Feb", positive: 33000, neutral: 4000, negative: 3000 },
  { month: "Mar", positive: 26000, neutral: 1500, negative: 1500 },
  { month: "Apr", positive: 32000, neutral: 2500, negative: 2500 },
  { month: "May", positive: 45000, neutral: 3500, negative: 2500 },
  { month: "Jun", positive: 18000, neutral: 1000, negative: 500 },
  { month: "Jul", positive: 25000, neutral: 1500, negative: 1000 },
];

const reviewData = [
  {
    metric: "Products with 5-star reviews",
    value: "+34", // Note: The component logic handles the '%'
    unit: "increase",
  },
  {
    metric: "Products with 4-star reviews",
    value: "+18",
    unit: "sales", // Note: The component logic handles the ' sales' text
  },
  {
    metric: "Average reviews per product",
    value: 23,
    unit: "count",
  },
  {
    metric: "Review response rate",
    value: 89,
    unit: "%", // Note: The component logic handles the '%'
  },
  {
    metric: "Avg. time to moderate",
    value: 2.3,
    unit: "hours", // Note: The component logic handles the ' hours' text
  },
];
const ReviewAnalyticsTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <BarChartCard
        title="Review Sentiment Trends"
        subtitle="Positive, neutral, and negative reviews over time"
        data={sampleData}
      />

      <ReviewImpactSales
        data={reviewData}
        title="Review Metrics Snapshot"
        subtitle="Performance over the last 30 days"
      />
    </div>
  );
};

export default ReviewAnalyticsTabContent;
