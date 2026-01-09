import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

export const adminDonationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET ALL DONATIONS
        getDonations: builder.query<any, Record<string, string>>({
            query: (params) => ({
                url: API_ENDPOINTS.ADMIN_DONATION.GET_DONATIONS,
                method: "GET",
                params,
            }),
            providesTags: ["AdminDonation"],
        }),

        // GET DONATION STATS
        getDonationStats: builder.query<any, void>({
            query: () => ({
                url: API_ENDPOINTS.ADMIN_DONATION.GET_DONATION_STATS,
                method: "GET",
            }),
            providesTags: ["AdminDonation"],
        }),

        // GET DONATION GROWTH
        getDonationGrowth: builder.query<any, void>({
            query: () => ({
                url: `${API_ENDPOINTS.ADMIN_DONATION.GET_DONATION_GROWTH}?type=monthly&year=2025`,
                method: "GET",
            }),
            providesTags: ["AdminDonation"],
        }),

        // GET DONATION TRENDS
        getDonationTrends: builder.query<
            any,
            { type: string; year?: number | string } | void
        >({
            query: (params) => ({
                url: API_ENDPOINTS.ADMIN_DONATION.GET_DONATION_TRENDS,
                method: "GET",
                params: params || {
                    type: "monthly",
                    year: new Date().getFullYear(),
                },
            }),
            providesTags: ["AdminDonation"],
        }),

        // GET CAMPAIGN PERFORMANCE
        getCampaignPerformance: builder.query<any, void>({
            query: () => ({
                url: API_ENDPOINTS.ADMIN_DONATION.GET_CAMPAING_PERFORMANCE,
                method: "GET",
            }),
            providesTags: ["AdminDonation"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetDonationsQuery,
    useGetDonationStatsQuery,
    useGetDonationGrowthQuery,
    useGetDonationTrendsQuery,
    useGetCampaignPerformanceQuery,
} = adminDonationApi;
