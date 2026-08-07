import baseApi from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrdersList: builder.query({
      query: () => ({
        url: `/orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useGetAllOrdersListQuery,
    useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
