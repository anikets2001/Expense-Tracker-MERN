import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,

  endpoints: (build) => ({
    // create new user
    createUser: build.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    signIn: build.mutation({
      query: (loginData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: loginData
      })
    }),
    getMe: build.query({
      query: () => '/auth/me',
    }),
  })
});

export const {useCreateUserMutation, useSignInMutation, useGetMeQuery}  = authApi
