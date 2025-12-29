/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

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

// post a new artitst
export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addArtist: builder.mutation<ArtistResponse, any>({
      query: (body: any) => ({
        url: API_ENDPOINTS.ADMIN.ADD_ARTIST,
        method: "POST",
        body,
      }),
    }),
  
  }),
});


