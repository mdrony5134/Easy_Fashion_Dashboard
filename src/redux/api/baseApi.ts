import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // console.log("Token is set:", token);
      } else {
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "product", "users", "orders"],
});

export default baseApi;
