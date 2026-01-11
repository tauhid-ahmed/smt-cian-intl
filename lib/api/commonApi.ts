// in this file we will add all common api calls for admin and users.
import { API_ENDPOINTS } from "../config/api";
import { ArtistData, ArtistResponse, Product } from "./adminApi";
import { baseApi } from "./baseApi";

// get all artists response

export interface AllArtistsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        total: number;
        page: number;
        totalPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    data: ArtistData[];
}

export type ProductData = {
    [x: string]:
        | number
        | string
        | string[]
        | boolean
        | undefined
        | {
              id?: string;
              name?: string;
              duration?: string;
              url?: string;
              productId?: string;
              createdAt?: string;
              updatedAt?: string;
          }[]
        | {
              id?: string;
              name?: string;
          };
    id?: string;
    title?: string;
    category?: string;
    price?: number;
    rating?: number;
    discountPrice?: number;
    stock?: number;
    reorderPoint?: number;
    productType?: "REGULAR" | string;
    description?: string;
    shippingInfo?: string;
    returnPolicy?: string;
    mainImage?: string;
    gallery?: string[];
    sizes?: string[];
    colors?: string[];
    artistId?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
    tracks?: {
        id?: string;
        name?: string;
        duration?: string;
        url?: string;
        productId?: string;
        createdAt?: string;
        updatedAt?: string;
    }[];
    artist?: {
        id?: string;
        name?: string;
    };
};

export interface ProductsApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        total: number;
        page: number;
        totalPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
    data: {
        id: string;
        title: string;
        category: string;
        price: number;
        rating: number;
        discountPrice: number;
        stock: number;
        reorderPoint: number;
        productType: "REGULAR" | string;
        description: string;
        shippingInfo: string;
        returnPolicy: string;
        mainImage: string;
        gallery: string[];
        sizes: string[];
        colors: string[];
        artistId: string;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        tracks: {
            id: string;
            name: string;
            duration: string;
            url: string;
            productId: string;
            createdAt: string;
            updatedAt: string;
        }[];
        artist: {
            id: string;
            name: string;
        };
    }[];
}

export interface WishlistProductsApiResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: {
        userId: string;
        productId: string;
        id: string;
        title: string;
        category: string;
        rating: number;
        price: number;
        discountPrice: number;
        stock: number;
        reorderPoint: number;
        productType: "REGULAR" | string;
        description: string;
        shippingInfo: string;
        returnPolicy: string;
        mainImage: string;
        gallery: string[];
        sizes: string[];
        colors: string[];
        artistId: string;
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        artist: {
            id: string;
            name: string;
            image: string | null;
        };
    }[];
}

export interface ReviewResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        id: string;
        comment: string;
        userId: string;
        artistId: string | null;
        productId: string | null;
        rating: number;
        media: string[];
        status: string;
        isVerifiedPurchase: boolean;
        consentMarketing: boolean;
        allowFeature: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface ProductReview {
    id: string;
    comment: string;
    userId: string;
    artistId: string | null;
    productId: string;
    rating: number;
    media: string[];
    status: string;
    isVerifiedPurchase: boolean;
    consentMarketing: boolean;
    allowFeature: boolean;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    user: {
        id: string;
        fullName: string;
        image: string | null;
    };
    product: {
        id: string;
        title: string;
        mainImage: string;
    };
}

export interface ProductReviewsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
    data: ProductReview[];
}

export interface SingleProductResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Product;
}

export type ProductResponse = ProductsApiResponse;

export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getArtists: builder.query<AllArtistsResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.COMMON.GET_ARTIST,
                method: "GET",
            }),
            providesTags: ["Artist"],
        }),
        getSingleArtist: builder.query<ArtistResponse, string>({
            query: (id: string) => ({
                url: `${API_ENDPOINTS.COMMON.GET_SINGLE_ARTIST}/${id}`,
                method: "GET",
            }),
        }),

        getAllProducts: builder.query<
            ProductsApiResponse,
            {
                minPrice?: number;
                maxPrice?: number;
                rating?: number | string;
                category?: string;
                search?: string;
            } | void
        >({
            query: (params) => {
                const url = new URL(
                    API_ENDPOINTS.COMMON.GET_ALL_PRODUCTS,
                    "http://dummy.com"
                );
                if (params) {
                    if (params.minPrice)
                        url.searchParams.append(
                            "minPrice",
                            params.minPrice.toString()
                        );
                    if (params.maxPrice)
                        url.searchParams.append(
                            "maxPrice",
                            params.maxPrice.toString()
                        );
                    if (params.rating)
                        url.searchParams.append(
                            "rating",
                            params.rating.toString()
                        );
                    if (params.category)
                        url.searchParams.append("category", params.category);
                    if (params.search)
                        url.searchParams.append("search", params.search);
                }
                return {
                    url: url.pathname + url.search,
                    method: "GET",
                };
            },
        }),

        getSingleProduct: builder.query<SingleProductResponse, string>({
            query: (id: string) => ({
                url: `${API_ENDPOINTS.COMMON.GET_PRODUCTS}/${id}`,
                method: "GET",
            }),
        }),

        /**
         * /wishlist/toggle/:id
         */

        toggleWhishlist: builder.mutation<
            { success: boolean },
            { productId: string }
        >({
            query: ({ productId }) => ({
                url: `${API_ENDPOINTS.COMMON.ADD_TO_WISHLIST}/${productId}`,
                method: "POST",
            }),
        }),
        getWhishlist: builder.query<
            WishlistProductsApiResponse,
            { page?: number; limit?: number } | void
        >({
            query: (params) => {
                const url = new URL(
                    API_ENDPOINTS.COMMON.GET_WHISH_LIST,
                    "http://dummy.com"
                );
                if (params) {
                    if (params.page)
                        url.searchParams.append("page", params.page.toString());
                    if (params.limit)
                        url.searchParams.append(
                            "limit",
                            params.limit.toString()
                        );
                }
                return {
                    url: url.pathname + url.search,
                    method: "GET",
                };
            },
        }),
        addReview: builder.mutation<ReviewResponse, FormData>({
            query: (formData) => ({
                url: API_ENDPOINTS.COMMON.REVIEWS,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Product", "Artist", "Review"],
        }),
        getProductReviews: builder.query<
            ProductReviewsResponse,
            { page?: number; limit?: number } | void
        >({
            query: (params) => {
                const url = new URL(
                    API_ENDPOINTS.COMMON.GET_PRODUCT_REVIEWS,
                    "http://dummy.com"
                );
                if (params) {
                    if (params.page)
                        url.searchParams.append("page", params.page.toString());
                    if (params.limit)
                        url.searchParams.append(
                            "limit",
                            params.limit.toString()
                        );
                }
                return {
                    url: url.pathname + url.search,
                    method: "GET",
                };
            },
            providesTags: ["Review"],
        }),
        updateReviewStatus: builder.mutation<
            any,
            { id: string; status: "APPROVED" | "REJECTED" }
        >({
            query: ({ id, status }) => ({
                url: `${API_ENDPOINTS.COMMON.REVIEWS}/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Review", "Product"],
        }),
        addArtistReview: builder.mutation<ReviewResponse, FormData>({
            query: (formData) => ({
                url: API_ENDPOINTS.COMMON.REVIEWS_ARTIST,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Review", "Artist"],
        }),
    }),
});

export const {
    useGetArtistsQuery,
    useGetSingleArtistQuery,
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useToggleWhishlistMutation,
    useGetWhishlistQuery,
    useAddReviewMutation,
    useGetProductReviewsQuery,
    useUpdateReviewStatusMutation,
    useAddArtistReviewMutation,
} = commonApi;
