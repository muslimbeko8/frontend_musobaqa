import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      let parsedToken;

      try {
        parsedToken = JSON.parse(token);
      } catch (e) {
        console.error("Invalid token in localStorage:", e);
      }

      if (parsedToken?.access) {
        headers.set("Authorization", `Bearer ${parsedToken.access}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getServices: builder.query({
      query: () => "/service/",
    }),
    getServiceId: builder.query({
      query: (id) => `/service/${id}`,
    }),

    createService: builder.mutation({
      query: (type) => ({
        url: "/service/",
        method: "POST",
        body: type,
      }),
    }),
    createServ: builder.mutation({
      query: (type) => ({
        url: "/service/",
        method: "POST",
        body: type,
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
export default api;
