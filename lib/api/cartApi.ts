import { baseApi } from "./baseApi";
import { API_ENDPOINTS } from "../config/api";

export interface CartItem {
    id: string;
    productId: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
    total: number;
}

export interface CartData {
    cartId: string;
    items: CartItem[];
    totalAmount: number;
    totalItems: number;
}

export interface CartResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: CartData;
}

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.CART.GET_CART,
                method: "GET",
            }),
            providesTags: ["Cart"],
        }),
        addToCart: builder.mutation<
            CartResponse,
            { productId: string; quantity: number }
        >({
            query: (body) => ({
                url: API_ENDPOINTS.CART.ADD_TO_CART,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCart: builder.mutation<
            CartResponse,
            { itemId: string; quantity: number }
        >({
            query: ({ itemId, quantity }) => ({
                url: `${API_ENDPOINTS.CART.UPDATE_CART}/${itemId}`,
                method: "PATCH",
                body: { quantity },
            }),
            invalidatesTags: ["Cart"],
        }),
        removeFromCart: builder.mutation<CartResponse, { itemId: string }>({
            query: ({ itemId }) => ({
                url: `${API_ENDPOINTS.CART.REMOVE_FROM_CART}/${itemId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartMutation,
    useRemoveFromCartMutation,
} = cartApi;
