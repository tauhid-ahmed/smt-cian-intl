import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

export interface Plan {
    id: string;
    publicName: string;
    name: string;
    description: string;
    realPrice: number;
    price: number;
    currency: string;
    interval: "month" | "year" | "week";
    features: string[];
    isActive: boolean;
    planType: "MONTHLY" | "YEARLY";
    stripeProductId: string;
    stripePriceId: string;
    isPopular: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PlansResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Plan[];
}

export const planApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlans: builder.query<PlansResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.ADMIN.PLANS,
                method: "GET",
            }),
            providesTags: ["Plans"],
        }),
        updatePlan: builder.mutation<any, { id: string; body: Partial<Plan> }>({
            query: ({ id, body }) => ({
                url: `${API_ENDPOINTS.ADMIN.PLANS}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Plans"],
        }),
    }),
});

export const { useGetPlansQuery, useUpdatePlanMutation } = planApi;
