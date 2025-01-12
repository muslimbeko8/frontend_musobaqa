import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctorhelper.pythonanywhere.com/api/v1",
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
      query: ({ phone, password }) => ({
        url: "/login/",
        method: "POST",
        body: { phone, password },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    tokenVerify: builder.mutation({
      query: (token) => ({
        url: "/verify/",
        method: "POST",
        body: { token },
      }),
    }),
    refreshToken: builder.mutation({
      query: (refresh) => ({
        url: "/refresh/",
        method: "POST",
        body: { refresh },
      }),
    }),

    getServices: builder.query({
      query: () => "/service/",
    }),
    getServiceId: builder.query({
      query: (id) => `/service/${id}`,
    }),
    geDoctors: builder.query({
      query: () => "/doctor/",
    }),
    getDoctorId: builder.query({
      query: (id) => `/doctor/${id}`,
    }),
    getServiceTypes: builder.query({
      query: () => `/service-types/`,
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

export const {
  useGetServicesQuery,
  useGetServiceIdQuery,
  useGeDoctorsQuery,
  useGetDoctorIdQuery,
  useTokenVerifyMutation,
  useRefreshTokenMutation,
  useLoginMutation,
  useCreateServiceMutation,
  useGetServiceTypesQuery,
} = api;
export default api;
