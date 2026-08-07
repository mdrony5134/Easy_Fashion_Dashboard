import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getProductList: builder.query({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("limit", limit);

        // if (category) params.append("category", category);
        // if (style) params.append("style", style);
        // if (size) params.append("size", size);
        if (search) params.append("search", search);

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    deleteProduct: builder.mutation({
      query: (id ) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetProductListQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
} = authApi;
