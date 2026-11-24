import { axiosBaseQuery } from "@/axios/axios-base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "./types/user.type";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => ({ url: "/user/me", method: "GET" }),
    }),
  }),
});

export const { useGetMeQuery } = userApi;
