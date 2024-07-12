import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = "http://localhost:8800/api/v1";

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
        credentials:"include"
      }),
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: '/auth/google-auth',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useGoogleAuthMutation } = apiSlice;
export default apiSlice;
