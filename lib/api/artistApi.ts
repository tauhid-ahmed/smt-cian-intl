import { API_ENDPOINTS } from "../config/api";
import { ArtistListResponseType } from "../types/artistTypes";
import { baseApi } from "./baseApi";

export const artistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADD ARTIST
    addArtist: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.ARTIST.ADD_ARTIST,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Artist"],
    }),

    // UPDATE ARTIST
    updateArtist: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.ARTIST.UPDATE_ARTIST,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Artist"],
    }),

    // GET ALL ARTISTS
    getAllArtists: builder.query<any, void>({
      query: () => ({
        url: API_ENDPOINTS.ARTIST.GET_ALL_ARTIST,
        method: "GET",
      }),
      providesTags: ["Artist"],
    }),

    // GET SINGLE ARTIST (PRIVATE)
    getSingleArtist: builder.query<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ARTIST.GET_SINGLE_ARTIST}/${id}`,
        method: "GET",
      }),
      providesTags: ["Artist"],
    }),

    // GET ARTIST LIST
    getArtistList: builder.query<ArtistListResponseType, void>({
      query: () => ({
        url: `${API_ENDPOINTS.ARTIST.GET_SINGLE_ARTIST}/list`,
        method: "GET",
      }),
      providesTags: ["Artist"],
    }),

    // GET SINGLE ARTIST (PUBLIC)
    getSingleArtistPublic: builder.query<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ARTIST.GET_SINGLE_ARTIST}/${id}/external`,
        method: "GET",
      }),
      providesTags: ["Artist"],
    }),

    // DELETE ARTIST
    deleteArtist: builder.mutation<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ARTIST.DELETE_ARTIST}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artist"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddArtistMutation,
  useUpdateArtistMutation,
  useGetAllArtistsQuery,
  useGetSingleArtistQuery,
  useGetArtistListQuery,
  useGetSingleArtistPublicQuery,
  useDeleteArtistMutation,
} = artistApi;
