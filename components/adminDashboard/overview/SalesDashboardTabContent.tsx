"use client";

import { MessagesSquare, Star, TrendingUp, Users } from "lucide-react";
import { MetricsGrid } from "../metrics-grid";
import { RevenueChart } from "../charts/revenue-chart";
import { TopProductsCard } from "../top-products";

const metricsData = [
  {
    title: "Total Revenue",
    value: "$45,230",
    icon: TrendingUp,
  },
  {
    title: "Conversion Rate",
    value: "12.4%",
    icon: MessagesSquare,
  },
  {
    title: "Total Orders",
    value: "1,278",
    icon: Users,
  },
  {
    title: "Reviews",
    value: "342",
    icon: Star,
  },
];

const revenueData12Months = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1500 },
  { month: "Mar", users: 1800 },
  { month: "Apr", users: 2000 },
  { month: "May", users: 2200 },
  { month: "Jun", users: 2500 },
  { month: "Jul", users: 2700 },
  { month: "Aug", users: 3000 },
  { month: "Sep", users: 3200 },
  { month: "Oct", users: 3500 },
  { month: "Nov", users: 3800 },
  { month: "Dec", users: 4000 },
];

const productsList = [
  { name: "Vinyl Record - Jazz Collection", units: 342, revenue: "$10,260" },
  { name: "Artist T-Shirt - Limited Ed.", units: 289, revenue: "$8,670" },
  { name: "Premium Membership", units: 156, revenue: "$15,600" },
  { name: "Concert Ticket Bundle", units: 234, revenue: "$14,040" },
  { name: "Exclusive Art Print", units: 198, revenue: "$5,940" },
];

const SalesDashboardTabContent = () => {
  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {metricsData.map((metric, index) => (
          <MetricsGrid
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <RevenueChart
          data={revenueData12Months}
          title="Revenue Over Time"
          subtitle="Monthly revenue trends"
          lineDataKey="users"
        />

        <TopProductsCard
          products={productsList}
          title="Top Products"
          subtitle="Best selling products by revenue"
        />
      </div>
    </div>
  );
};

export default SalesDashboardTabContent;
