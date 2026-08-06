import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/admin-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    myProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useMyProfileQuery } = authApi;
