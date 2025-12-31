import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADD
    addAlbum: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.ALBUM.ADD_ALBUM,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Albums"],
    }),

    // UPDATE
    updateAlbum: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.ALBUM.UPDATE_ALBUM,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Albums"],
    }),

    // GET ALL
    getAllAlbums: builder.query<any, void>({
      query: () => ({
        url: API_ENDPOINTS.ALBUM.GET_ALL_ALBUM,
        method: "GET",
      }),
      providesTags: ["Albums"],
    }),

    // GET SINGLE
    getSingleAlbum: builder.query<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ALBUM.GET_SINGLE_ALBUM}/${id}`,
        method: "GET",
      }),
      providesTags: ["Albums"],
    }),

    // DELETE
    deleteAlbum: builder.mutation<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.ALBUM.DELETE_ALBUM}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Albums"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddAlbumMutation,
  useUpdateAlbumMutation,
  useGetAllAlbumsQuery,
  useGetSingleAlbumQuery,
  useDeleteAlbumMutation,
  useLazyGetAllAlbumsQuery,
} = adminApi;
