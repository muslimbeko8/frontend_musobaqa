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

      if (parsedToken?.accessToken) {
        headers.set("Authorization", `Bearer ${parsedToken.accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),

    // Get all managers
    getManagers: builder.query({
      query: ({ limit, page }) => `/managers?_limit=${limit}&_page=${page}`,
    }),

    // Get all employees
    getEmployees: builder.query({
      query: ({ limit, page }) => `/employees?_limit=${limit}&_page=${page}`,
    }),

    // Get all tasks
    getTasks: builder.query({
      query: ({ limit, page }) => `/tasks?_limit=${limit}&_page=${page}`,
    }),

    // Get specific tasks by type
    getSpecificTask: builder.query({
      query: (type) => `/tasks?type=${type}`,
    }),

    // Create or update a service for a manager
    createService: builder.mutation({
      query: ({ task, id }) => ({
        url: `/managers/${id}`,
        method: "PATCH",
        body: task,
      }),
    }),

    // Get a single manager by ID
    getSingleManager: builder.query({
      query: (id) => `/managers/${id}`,
    }),

    // Search manager by name
    searchManager: builder.query({
      query: (name) => `/managers?name=${name}`,
    }),

    // Delete a manager
    deleteManager: builder.mutation({
      query: (id) => ({
        url: `/managers/${id}`,
        method: "DELETE",
      }),
    }),

    // Edit manager details
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
  useDeleteManagerMutation,
  useEditManagerMutation,
} = api;

export default api;
