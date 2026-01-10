/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";
import { OrdersResponse } from "./adminApi";

export interface CreateCheckoutRequest {
    items: {
        productId: string;
        quantity: number;
        size?: string;
        color?: string;
    }[];
    shippingInfo: {
        fullName: string;
        email: string;
        phoneNumber: string;
        address: string;
        city: string;
        postCode: string;
        country: string;
    };
}

export interface CreateCheckoutResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        orderId: string;
        orderNumber: string;
        clientSecret: string;
        paymentIntentId: string;
        totalAmount: number;
    };
}

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOrders: builder.query<
            OrdersResponse,
            {
                page?: number;
                limit?: number;
                sortBy?: string;
                sortOrder?: string;
            }
        >({
            query: ({
                page = 1,
                limit = 5,
                sortBy = "createdAt",
                sortOrder = "desc",
            }) => ({
                url: `${API_ENDPOINTS.ORDERS.MY_ORDERS}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
        createCheckout: builder.mutation<
            CreateCheckoutResponse,
            CreateCheckoutRequest
        >({
            query: (body) => ({
                url: API_ENDPOINTS.ORDERS.CREATE_CHECKOUT,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Orders", "Cart"],
        }),
        getSingleMyOrder: builder.query<any, string>({
            query: (id) => ({
                url: `${API_ENDPOINTS.ORDERS.GET_SINGLE_ORDER}/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Orders", id }],
        }),
    }),
});

export const {
    useGetMyOrdersQuery,
    useCreateCheckoutMutation,
    useGetSingleMyOrderQuery,
} = orderApi;
