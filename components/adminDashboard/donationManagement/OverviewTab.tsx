"use client";

import { MessagesSquare, TrendingUp, Users } from "lucide-react";
import { MetricsGrid } from "../metrics-grid";
import { RevenueChart } from "../charts/revenue-chart";
import { PieChartCard } from "../charts/pie-chart";
import { BarChartCard } from "../charts/bar-chart";
import {
    useGetDonationsQuery,
    useGetDonationStatsQuery,
    useGetDonationGrowthQuery,
    useGetDonationTrendsQuery,
    useGetCampaignPerformanceQuery,
} from "@/lib/api/adminDonationApi";
import { useMemo, useState, useEffect, useRef } from "react";

// Predefined color palette for consistent colors
const CAMPAIGN_COLORS = [
    "#0088FE", // Blue
    "#00C49F", // Teal
    "#FFBB28", // Yellow
    "#FF8042", // Orange
    "#8884D8", // Purple
    "#82CA9D", // Green
    "#FF6B6B", // Red
    "#4ECDC4", // Turquoise
    "#FFA500", // Orange
    "#9370DB", // Medium Purple
];

// Skeleton components
const MetricsGridSkeleton = () => (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-700 rounded w-24"></div>
            <div className="h-8 w-8 bg-gray-700 rounded"></div>
        </div>
        <div className="h-8 bg-gray-700 rounded w-32"></div>
    </div>
);

const ChartSkeleton = () => (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-40 mb-2"></div>
        <div className="h-3 bg-gray-700 rounded w-32 mb-6"></div>
        <div className="h-64 bg-gray-800 rounded"></div>
    </div>
);

const TableSkeleton = () => (
    <>
        {/* Desktop Table Skeleton */}
        <div className="hidden md:block">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-gray-800 py-4 animate-pulse">
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-24"></div>
                        </div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-20"></div>
                        </div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-16"></div>
                        </div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-700 rounded w-16 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-12"></div>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <div className="h-6 bg-gray-700 rounded w-20"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Mobile Table Skeleton */}
        <div className="md:hidden space-y-3">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 animate-pulse">
                    <div className="flex justify-between items-start mb-3">
                        <div className="h-4 bg-gray-700 rounded w-32"></div>
                        <div className="h-6 bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-3 bg-gray-700 rounded w-20"></div>
                        <div className="h-3 bg-gray-700 rounded w-24"></div>
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                        <div className="h-3 bg-gray-700 rounded w-20"></div>
                        <div className="h-3 bg-gray-700 rounded w-12"></div>
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                </div>
            ))}
        </div>
    </>
);

const OverviewTab = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [trendType, setTrendType] = useState<string>("monthly");
    const [trendYear, setTrendYear] = useState<number>(new Date().getFullYear());
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounce search term
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 200);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchTerm]);

    // Fetch all data using query hooks - pass search term to donations query
    const {
        data: donationsData,
        isLoading: donationsLoading,
        isError: donationsError,
        refetch: refetchDonations,
    } = useGetDonationsQuery({ searchTerm: debouncedSearchTerm });

    const {
        data: statsData,
        isLoading: statsLoading,
        isError: statsError,
        refetch: refetchStats,
    } = useGetDonationStatsQuery();

    const {
        data: growthData,
        isLoading: growthLoading,
        isError: growthError,
        refetch: refetchGrowth,
    } = useGetDonationGrowthQuery();

    const {
        data: trendsData,
        isLoading: trendsLoading,
        isError: trendsError,
        refetch: refetchTrends,
    } = useGetDonationTrendsQuery({ type: trendType, year: trendYear });

    const {
        data: campaignData,
        isLoading: campaignLoading,
        isError: campaignError,
        refetch: refetchCampaign,
    } = useGetCampaignPerformanceQuery();

    // Check loading and error states
    const isLoading =
        donationsLoading ||
        statsLoading ||
        growthLoading ||
        trendsLoading ||
        campaignLoading;

    const hasError =
        donationsError || statsError || growthError || trendsError || campaignError;

    // Function to refetch all data
    const refetchAllData = () => {
        refetchDonations();
        refetchStats();
        refetchGrowth();
        refetchTrends();
        refetchCampaign();
    };

    // Transform stats data for metrics grid
    const metricsData = useMemo(
        () => [
            {
                title: "Total Donations",
                value: statsData?.data?.totalDonationAmont
                    ? `$${statsData.data.totalDonationAmont.toLocaleString()}`
                    : "$0",
                icon: TrendingUp,
            },
            {
                title: "Total Donors",
                value: statsData?.data?.activeDonors
                    ? statsData.data.activeDonors.toLocaleString()
                    : "0",
                icon: Users,
            },
            {
                title: "Avg. Donation",
                value: statsData?.data?.avgDonationAmount
                    ? `$${statsData.data.avgDonationAmount.toFixed(2)}`
                    : "$0",
                icon: MessagesSquare,
            },
        ],
        [statsData]
    );

    // Transform trends data for donation trend chart
    const donationTrendData = useMemo(
        () =>
            trendsData?.data?.map((trend: any) => ({
                month: trend.name,
                amount: trend.amount,
            })) ||
            Array(12)
                .fill(0)
                .map((_, i) => ({
                    month: `Month ${i + 1}`,
                    amount: 0,
                })),
        [trendsData]
    );

    // Transform campaign data for pie chart with deterministic colors
    const customerData = useMemo(() => {
        if (!campaignData?.data) return [];

        return campaignData.data.map((campaign, index) => ({
            name: campaign.campaign,
            value: campaign.totalAmount,
            // Use a color from the palette
            color: CAMPAIGN_COLORS[index % CAMPAIGN_COLORS.length],
        }));
    }, [campaignData]);

    // Transform growth data for bar chart (donor growth trends)
    const sampleData = useMemo(
        () =>
            growthData?.data?.map((growth) => ({
                name: growth.name,
                positive: growth.activeDonors,
                neutral: 0,
                negative: 0,
            })) || [],
        [growthData]
    );

    // Use actual donations data for the table
    const donations = useMemo(() => {
        if (!donationsData?.data?.donations) return [];

        return donationsData.data.donations.map((donation) => {
            // Determine status based on paymentStatus
            let status = "Pending";
            if (donation.paymentStatus === "SUCCEEDED") {
                status = "Completed";
            } else if (donation.paymentStatus === "FAILED") {
                status = "Failed";
            }

            // Get donor name from donarInfo
            const donorName =
                donation.donarInfo?.firstName || donation.donarInfo?.lastName
                    ? `${donation.donarInfo.firstName || ""} ${donation.donarInfo.lastName || ""
                        }`.trim()
                    : donation.user?.fullName || "Anonymous";

            return {
                id: donation.id,
                donor: donorName,
                campaign: donation.donarInfo?.campaign || "Unknown Campaign",
                date: new Date(donation.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }),
                amount: `$${donation.amount.toFixed(2)}`,
                status: status,
            };
        });
    }, [donationsData]);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm("");
    };

    // Show error state
    if (hasError && !isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <div className="text-white text-center mb-4">
                    <h3 className="text-lg font-semibold mb-2">Error Loading Data</h3>
                    <p className="text-gray-400">
                        Failed to load dashboard data. Please try again.
                    </p>
                </div>
                <button
                    onClick={refetchAllData}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {isLoading ? (
                    <>
                        <MetricsGridSkeleton />
                        <MetricsGridSkeleton />
                        <MetricsGridSkeleton />
                    </>
                ) : (
                    metricsData.map((metric, index) => (
                        <MetricsGrid
                            key={index}
                            title={metric.title}
                            value={metric.value}
                            icon={metric.icon}
                        />
                    ))
                )}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                {isLoading ? (
                    <>
                        <ChartSkeleton />
                        <ChartSkeleton />
                    </>
                ) : (
                    <>
                        <div className="relative group">
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <select
                                    value={trendType}
                                    onChange={(e) => setTrendType(e.target.value)}
                                    className="bg-[#2A2A2A] text-white text-xs rounded border border-gray-700 px-2 py-1 outline-none focus:border-blue-500 shadow-sm cursor-pointer hover:bg-[#333333] transition-colors">
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                <select
                                    value={trendYear}
                                    onChange={(e) => setTrendYear(Number(e.target.value))}
                                    className="bg-[#2A2A2A] text-white text-xs rounded border border-gray-700 px-2 py-1 outline-none focus:border-blue-500 shadow-sm cursor-pointer hover:bg-[#333333] transition-colors">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <RevenueChart
                                data={donationTrendData}
                                title={trendType === "monthly" ? "Monthly Donation Trends" : "Yearly Donation Trends"}
                                subtitle={trendType === "monthly" ? "Donation amounts over time" : "Donation amounts by year"}
                                lineDataKey="amount"
                            />
                        </div>
                        <PieChartCard
                            data={customerData}
                            title="Campaign Performance"
                            subtitle="Distribution of donations by campaign"
                        />
                    </>
                )}
            </div>

            {/* Bar chart */}
            <div className="mt-8">
                {isLoading ? (
                    <ChartSkeleton />
                ) : (
                    <BarChartCard
                        title="Donor Growth Trends"
                        subtitle="Active donors over time"
                        data={sampleData}
                    />
                )}
            </div>

            {/* Recent Donation */}
            <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full mt-8">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="text-left text-white">
                            <h1 className="font-semibold text-base sm:text-lg">
                                Recent Donations
                            </h1>
                            {!isLoading && (
                                <p className="text-sm text-gray-400 mt-1">
                                    Showing {donations.length} donation
                                    {donations.length !== 1 ? "s" : ""}
                                    {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
                                </p>
                            )}
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
                                    placeholder="Search donations by donor, campaign..."
                                    className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72 disabled:opacity-50 disabled:cursor-not-allowed"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    disabled={isLoading}
                                />
                                {searchTerm && !isLoading && (
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        onClick={clearSearch}>
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Loading state for table */}
                    {isLoading ? (
                        <TableSkeleton />
                    ) : donations.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-400">
                                {debouncedSearchTerm
                                    ? `No donations found for "${debouncedSearchTerm}"`
                                    : "No donations found"}
                            </p>
                        </div>
                    ) : (
                        <>
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
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${donation.status === "Completed"
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
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${donation.status === "Completed"
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
                                                <span className="text-white ml-2">
                                                    {donation.campaign}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Date:</span>
                                                <span className="text-white ml-2">{donation.date}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400">Amount:</span>
                                                <span className="text-white ml-2">
                                                    {donation.amount}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
