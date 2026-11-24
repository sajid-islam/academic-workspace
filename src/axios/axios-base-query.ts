import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import AxiosClient from "./axios-client";

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  },
  unknown,
  unknown
> => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const result = await AxiosClient({ url, method, data, params, headers });
      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};
