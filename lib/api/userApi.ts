/* eslint-disable @typescript-eslint/no-explicit-any */
// get all artists response

import { API_ENDPOINTS } from "../config/api";
import { baseApi } from "./baseApi";

export interface DemoArtistSubmissionResponse {
  success: true;
  statusCode: number;
  message: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    location: string;
    socialMedia: string | null;
    songTitle: string;
    genre: string;
    audioUrl: string;
    pressKitUrl: string | null;
    videoLink: string | null;
    briefBio: string;
    whyJoin: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    isViewed: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export const commonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDemoArtistSubmission: builder.mutation<
      DemoArtistSubmissionResponse,
      any
    >({
      query: (body: any) => ({
        url: API_ENDPOINTS.USER.ADD_DEMO_ARTIST_SUBMISSION,
        method: "POST",
        body,
      }),
    }),

    getAllDemoArtistSubmission: builder.query<
      DemoArtistSubmissionResponse,
      any
    >({
      query: (body: any) => ({
        url: API_ENDPOINTS.USER.GET_DEMO_ARTIST_SUBMISSION,
        method: "GET",
        body,
      }),
    }),

    getSingleDemoArtistSubmission: builder.query<
      DemoArtistSubmissionResponse,
      string
    >({
      query: (id: string) => ({
        url: `${API_ENDPOINTS.USER.GET_SINGLE_DEMO_ARTIST_SUBMISSION}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddDemoArtistSubmissionMutation,
  useGetAllDemoArtistSubmissionQuery,
  useGetSingleDemoArtistSubmissionQuery,
} = commonApi;
