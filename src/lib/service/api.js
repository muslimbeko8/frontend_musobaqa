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
      }),
    }),

    getManagers: builder.query({
      query: () => "/managers",
    }),

    getEmployees: builder.query({
      query: () => "/employees",
    }),

    getTasks: builder.query({
      query: () => "/tasks",
    }),

    getSpecificTask: builder.query({
      query: (type) => `/tasks?type=${type}`,
    }),

    createService: builder.mutation({
      query: ({ task, id }) => ({
        url: `/managers/${id}`,
        method: "PATCH",
        body: task,
      }),
    }),

    getSingleManager: builder.query({
      query: (id) => `/managers/${id}`,
    }),

    searchManager: builder.query({
      query: (name) => `/managers?name=${name}`,
    }),

    paginationManager: builder.query({
      query: ({ limit, page }) => `/managers?_limit=${limit}&_page=${page}`,
    }),

    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/managers/${id}`,
        method: "DELETE",
      }),
    }),

    editManager: builder.mutation({
      query: ({ body, id }) => ({
        url: `/managers/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetManagersQuery,
  useGetEmployeesQuery,
  useGetTasksQuery,
  useGetSpecificTaskQuery,
  useCreateServiceMutation,
  useGetSingleManagerQuery,
  useSearchManagerQuery,
  usePaginationManagerQuery,
  useDeleteManagerMutation,
  useEditManagerMutation,
} = api;

export default api;
