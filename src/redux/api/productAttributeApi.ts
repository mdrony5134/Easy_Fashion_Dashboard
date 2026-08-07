import baseApi from "./baseApi";

const productAttributeApi = baseApi.injectEndpoints({
  // categories api endpoint
  endpoints: (builder) => ({
    createCategories: builder.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // styles api endpoint
    createStyles: builder.mutation({
      query: (data) => ({
        url: `/styles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getAllStyles: builder.query({
      query: () => ({
        url: `/styles`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateStyle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/styles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteStyle: builder.mutation({
      query: (id) => ({
        url: `/styles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    // sizes api endpoint
    createSizes: builder.mutation({
      query: (data) => ({
        url: `/sizes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getAllSizes: builder.query({
      query: () => ({
        url: `/sizes`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateSize: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sizes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    deleteSize: builder.mutation({
      query: (id) => ({
        url: `/sizes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateCategoriesMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateStylesMutation,
  useGetAllStylesQuery,
  useUpdateStyleMutation,
  useDeleteStyleMutation,
  useCreateSizesMutation,
  useGetAllSizesQuery,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = productAttributeApi;
