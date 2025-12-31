import { API_ENDPOINTS } from "../config/api";
import { GetAllMusicResponseTypes } from "../types/musicTypes";
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
    updateMusic: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `${API_ENDPOINTS.MUSIC.UPDATE_MUSIC}/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Music"],
    }),

    // GET ALL
    getAllMusic: builder.query<
      GetAllMusicResponseTypes,
      Record<string, string>
    >({
      query: (params) => ({
        url: API_ENDPOINTS.MUSIC.GET_ALL_MUSIC,
        method: "GET",
        params,
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
