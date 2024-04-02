import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { isObject } from 'shared/lib/type-guards';

import { getAuthToken } from './token';

const isHeaders = (params: unknown): params is { params: { headers?: Record<string, unknown> } } =>
  isObject(params) && 'headers' in params && isObject(params.headers);

export const api = {
  get: <ResponseDataType>(url: string, params?: Record<string, unknown>) => {
    let headers = {};

    if (isHeaders(params)) {
      headers = { ...params.params.headers };
      delete params.params.headers;
    }

    return axios.get<ResponseDataType>(url, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        ...headers,
      },
      ...params,
    });
  },
  post: <ResponseDataType>(url: string, data: unknown, headers?: Record<string, unknown>) =>
    axios.post<ResponseDataType, AxiosResponse<ResponseDataType>>(url, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        ...headers,
      },
    }),
  put: <ResponseDataType>(url: string, data: unknown, headers?: Record<string, unknown>) =>
    axios.put<ResponseDataType, AxiosResponse<ResponseDataType>>(url, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        ...headers,
      },
    }),
  delete: <ResponseDataType>(url: string) =>
    axios.delete<ResponseDataType, AxiosResponse<ResponseDataType>>(url, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }),
};
