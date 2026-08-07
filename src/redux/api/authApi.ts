import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    myProfile: builder.query({
      query: () => ({
        url: `/auth/me`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    updateMyProfile: builder.mutation({
      query: (data) => ({
        url: `/auth/me`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useMyProfileQuery,
  useUpdateMyProfileMutation,
} = authApi;
