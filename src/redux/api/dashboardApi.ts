import baseApi from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: `/dashboard/summary`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const { useGetDashboardSummaryQuery } = dashboardApi;
