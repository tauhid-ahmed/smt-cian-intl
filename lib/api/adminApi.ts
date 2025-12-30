/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface ArtistData {
  id: string;
  name: string;
  bio: string;
  image: string | null;
  banner: string | null;
  location: string;
  website: string;
  spotify: string;
  appleMusic: string;
  youtube: string;
  behindGallery: string[];
  instagram: string;
  twitter: string;
  facebook: string;
  tiktok: string;
  genres: string[];
  popularity: number;
  followers: number;
  awards: number;
  activeYearsStart: string;
  activeYearsEnd: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    bio: string;
    image: string | null;
    banner: string | null;
    location: string;
    website: string;
    spotify: string;
    appleMusic: string;
    youtube: string;
    behindGallery: string[];
    instagram: string;
    twitter: string;
    facebook: string;
    tiktok: string;
    genres: string[];
    popularity: number;
    followers: number;
    awards: number;
    activeYearsStart: string;
    activeYearsEnd: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

/* =======================
   Product Types
======================= */
export interface ProductTrack {
  id: string;
  name: string;
  duration: string;
  url: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  discountPrice: number;
  stock: number;
  description: string;
  shippingInfo: string;
  returnPolicy: string;
  mainImage: string | null;
  gallery: string[];
  sizes: string[];
  colors: string[];
  artistId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  tracks: ProductTrack[];
  artist: ArtistData;
}

export type ProductResponse = ApiResponse<Product>;

// post a new artitst
export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addArtist: builder.mutation<ArtistResponse, FormData>({
            query: (artistFormData) => ({
                url: API_ENDPOINTS.ADMIN.ADD_ARTIST,
                method: "POST",
                body: artistFormData,
            }),
        }),
        addProduct: builder.mutation<ProductResponse, any>({
            query: (body: any) => ({
                url: API_ENDPOINTS.ADMIN.ADD_PRODUCT,
                method: "POST",
                body,
            }),
        }),

        updateSingleArtist: builder.mutation<ArtistResponse, ArtistData>({
            query: (artistData: ArtistData) => ({
                url: `${API_ENDPOINTS.ADMIN.UPDATE_ARTIST}/${artistData.id}`,
                method: "PUT",
                body: artistData,
            }),
        }),

        getProducts: builder.query<ProductResponse, any>({
            query: () => ({
                url: API_ENDPOINTS.ADMIN.GET_PRODUCTS,
                method: "GET",
            }),
        }),
    }),
});

export const {
  useAddArtistMutation,
  useAddProductMutation,
  useGetProductsQuery
} = adminApi;


