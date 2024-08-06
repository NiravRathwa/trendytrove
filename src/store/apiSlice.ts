import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:8800/api/v1";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "/auth/google-auth",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, data }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: data,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    AddProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    editProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGoogleAuthMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useEditProductMutation
} = apiSlice;
export default apiSlice;
