// in this file we will add all common api calls for admin and users.
import { API_ENDPOINTS } from "../config/api";
import { ArtistData, ArtistResponse } from "./adminApi";
import { baseApi } from "./baseApi";

// get all artists response

interface AllArtistsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: ArtistData[];
}

export type ProductData = {
    id?: string;
    title?: string;
    category?: string;
    price?: number;
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
}


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

export type ProductResponse = ProductsApiResponse;

export const commonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getArtists: builder.query<AllArtistsResponse, void>({
            query: () => ({
                url: API_ENDPOINTS.COMMON.GET_ARTIST,
                method: "GET",
            }),
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

        getSingleProduct : builder.query<ProductResponse, string>({
            query: (id: string) => ({
                url: `${API_ENDPOINTS.COMMON.GET_PRODUCTS}/${id}`,
                method: "GET",  
            }),
        }),

        /** 
         * /wishlist/toggle/:id
         */

        addToWhishlist : builder.mutation<{ success: boolean }, { productId: string }>({
            query: ({ productId }) => ({
                url: `${API_ENDPOINTS.COMMON.ADD_TO_WISHLIST}/${productId}`,
                method: "POST",
            }),
        })
    }),
});

export const { useGetArtistsQuery, useGetSingleArtistQuery, useGetAllProductsQuery, useGetSingleProductQuery, useAddToWhishlistMutation } = commonApi;
