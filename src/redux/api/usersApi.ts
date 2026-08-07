import baseApi from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    getUserList: builder.query({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);
        if (search) params.append("search", search);

        return {
          url: `/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body: data, 
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserListQuery,
  useUpdateUserStatusMutation,
} = usersApi;
