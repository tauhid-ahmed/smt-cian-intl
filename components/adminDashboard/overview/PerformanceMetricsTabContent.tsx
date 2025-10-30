import { MetricsGrid } from "../metrics-grid";
import PerformanceMetricsTable from "../performance-metrics-table";

const metricsData = [
  {
    title: "Server Response Time",
    value: "145ms",
  },
  {
    title: "Overall Uptime",
    value: "12.4%",
  },
  {
    title: "Error Rate",
    value: "0.4%",
  },
];

const metrics = [
  {
    name: "Home",
    loadTime: "1.2s",
    uptime: "99.9%",
    status: "Excellent",
  },
  {
    name: "Product Catalog",
    loadTime: "1.8s",
    uptime: "99.8%",
    status: "Excellent",
  },
  {
    name: "Artist Profiles",
    loadTime: "1.5s",
    uptime: "99.9%",
    status: "Excellent",
  },
  {
    name: "Checkout",
    loadTime: "2.1s",
    uptime: "99.7%",
    status: "Good",
  },
  {
    name: "Dashboard",
    loadTime: "1.6s",
    uptime: "99.9%",
    status: "Excellent",
  },
];
const PerformanceMetricsTabContent = () => {
  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metricsData.map((metric, index) => (
          <MetricsGrid key={index} title={metric.title} value={metric.value} />
        ))}
      </div>

      <PerformanceMetricsTable metrics={metrics} />
    </div>
  );
};

export default PerformanceMetricsTabContent;
