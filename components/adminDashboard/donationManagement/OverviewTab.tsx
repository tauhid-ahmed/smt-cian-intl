"use client";

import { ContactRound, CornerRightUp, Users } from "lucide-react";
import { MetricsGrid } from "../metrics-grid";
import { RevenueChart } from "../charts/revenue-chart";
import { PieChartCard } from "../charts/pie-chart";
import { BarChartCard } from "../charts/bar-chart";

const metricsData = [
  {
    title: "Total Donation",
    value: "$45,230",
    icon: CornerRightUp,
  },
  {
    title: "Active Donors",
    value: "12.4%",
    icon: ContactRound,
  },
  {
    title: "Avg. Donation",
    value: "1,278",
    icon: Users,
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
const customerData = [
  { name: "Winter Relief", value: 45, color: "#DD6E42" },
  { name: "Education Found", value: 30, color: "#E8DAB2" },
  { name: "Healthcare", value: 15, color: "#4F6D7A" },
  { name: "Emergency Aid", value: 25, color: "#98AC00" },
];

const sampleData = [
  { month: "Jan", positive: 45000, neutral: 3000, negative: 2000 },
  { month: "Feb", positive: 33000, neutral: 4000, negative: 3000 },
  { month: "Mar", positive: 26000, neutral: 1500, negative: 1500 },
  { month: "Apr", positive: 32000, neutral: 2500, negative: 2500 },
  { month: "May", positive: 45000, neutral: 3500, negative: 2500 },
  { month: "Jun", positive: 18000, neutral: 1000, negative: 500 },
  { month: "Jul", positive: 25000, neutral: 1500, negative: 1000 },
];

const donations = [
  {
    id: 1,
    donor: "John Smith",
    campaign: "Education Fund",
    date: "2024-01-15",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: 2,
    donor: "Sarah Johnson",
    campaign: "Medical Relief",
    date: "2024-01-14",
    amount: "$500.00",
    status: "Pending",
  },
  {
    id: 3,
    donor: "Michael Brown",
    campaign: "Food Drive",
    date: "2024-01-13",
    amount: "$100.00",
    status: "Completed",
  },
  {
    id: 4,
    donor: "Emily Davis",
    campaign: "Shelter Project",
    date: "2024-01-12",
    amount: "$750.00",
    status: "Failed",
  },
  {
    id: 5,
    donor: "Robert Wilson",
    campaign: "Education Fund",
    date: "2024-01-11",
    amount: "$300.00",
    status: "Completed",
  },
];
const OverviewTab = () => {
  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          title="Monthly Donation Trends"
          subtitle="Donation amounts over time"
          lineDataKey="users"
        />
        <PieChartCard
          data={customerData}
          title="Campaign Performance"
          subtitle="Distribution of donations by campaign"
        />
      </div>

      {/* Bar chart */}
      <div className="mt-8">
        <BarChartCard
          title="Review Sentiment Trends"
          subtitle="Positive, neutral, and negative reviews over time"
          data={sampleData}
        />
      </div>

      {/* Recent Donation */}
      <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full mt-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left text-white">
              <h1 className="font-semibold text-base sm:text-lg">
                Recent Donation
              </h1>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search donations..."
                  className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72"
                />
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                  <th className="py-4 pr-4">Donor</th>
                  <th className="py-4 pr-4">Campaign</th>
                  <th className="py-4 pr-4">Date</th>
                  <th className="py-4 pr-4">Amount</th>
                  <th className="py-4 pr-4 text-end">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr
                    key={donation.id}
                    className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                    <td className="py-4 pr-4 text-white text-sm">
                      {donation.donor}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {donation.campaign}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {donation.date}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {donation.amount}
                    </td>
                    <td className="py-4 pr-4 flex justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          donation.status === "Completed"
                            ? "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]"
                            : donation.status === "Pending"
                            ? "bg-[#FFF27233] text-[#FFD700] border border-[#FFD700]"
                            : "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]"
                        }`}>
                        {donation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card */}
          <div className="md:hidden space-y-3">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-white font-medium text-sm">
                    {donation.donor}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      donation.status === "Completed"
                        ? "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]"
                        : donation.status === "Pending"
                        ? "bg-[#FFF27233] text-[#FFD700] border border-[#FFD700]"
                        : "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]"
                    }`}>
                    {donation.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Campaign:</span>
                    <span className="text-white ml-2">{donation.campaign}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white ml-2">{donation.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white ml-2">{donation.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
