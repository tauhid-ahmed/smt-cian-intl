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
        id: string;
        userId: string;
        productId: string;
        createdAt: string;
        updatedAt: string;
        product: {
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
        };
    }[];
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

        getAllProducts: builder.query<ProductsApiResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.COMMON.GET_ALL_PRODUCTS,
                method: "GET",
            }),
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
        getWhishlist: builder.query<WishlistProductsApiResponse, void>({
            query: () => ({
                url: `${API_ENDPOINTS.COMMON.GET_WHISH_LIST}`,
                method: "GET",
            }),
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
} = commonApi;
