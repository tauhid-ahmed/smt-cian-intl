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


type ProductResponse = {
    name : string 
}

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
    }),
});

export const { useGetArtistsQuery, useGetSingleArtistQuery } = commonApi;
