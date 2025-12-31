import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ADD
    addMusic: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.MUSIC.ADD_MUSIC,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Music"],
    }),

    // UPDATE
    updateMusic: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: API_ENDPOINTS.MUSIC.UPDATE_MUSIC,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Music"],
    }),

    // GET ALL
    getAllMusic: builder.query<any, void>({
      query: () => ({
        url: API_ENDPOINTS.MUSIC.GET_ALL_MUSIC,
        method: "GET",
      }),
      providesTags: ["Music"],
    }),

    // GET SINGLE
    getSingleMusic: builder.query<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.MUSIC.GET_SINGLE_MUSIC}/${id}`,
        method: "GET",
      }),
      providesTags: ["Music"],
    }),

    // DELETE
    deleteMusic: builder.mutation<any, string>({
      query: (id) => ({
        url: `${API_ENDPOINTS.MUSIC.DELETE_MUSIC}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Music"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddMusicMutation,
  useUpdateMusicMutation,
  useGetAllMusicQuery,
  useGetSingleMusicQuery,
  useDeleteMusicMutation,
} = adminApi;
