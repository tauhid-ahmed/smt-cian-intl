"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MetricsGrid } from "./metrics-grid";
import { RevenueChart } from "./charts/revenue-chart";
import { TopProductsCard } from "./top-products";
import { PieChartCard } from "./charts/pie-chart";
import { BarChartCard } from "./charts/bar-chart";

const tabs = [
  { id: "sales", label: "Sales Dashboard" },
  { id: "customer", label: "Customer Analytics" },
  { id: "review", label: "Review Analytics" },
  { id: "performance", label: "Performance Metrics" },
];

export function MainContent() {
  const [activeTab, setActiveTab] = useState("sales");
  const [dateRange, setDateRange] = useState("month");

  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className="p- space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Analytics & Insights
          </h1>
          <p className="text-muted-foreground">
            Monitor your business performance and customer behavior
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={cn(
                "rounded-full transition-all duration-200",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border text-foreground hover:bg-secondary"
              )}>
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Date Range Filter */}
        <div className="flex gap-2">
          {["week", "month", "quarter", "year"].map((range) => (
            <Button
              key={range}
              onClick={() => setDateRange(range)}
              variant={dateRange === range ? "default" : "outline"}
              size="sm"
              className={cn(
                "transition-all duration-200",
                dateRange === range
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border text-foreground hover:bg-secondary"
              )}>
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>

        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <TopProductsCard />
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartCard />
          <BarChartCard />
        </div>
      </div>
    </main>
  );
}

import { cn } from "@/lib/utils";
