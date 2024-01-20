import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
});

export const API = createApi({
  reducerPath: "api",
  tagTypes: ["userTag", "auth"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
