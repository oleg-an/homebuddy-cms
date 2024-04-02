import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { isObject } from 'shared/lib/type-guards';

function getApiKeyHeader() {
  return {
    'x-apikey': '6ed3abd836dd9aa33f8ea54048d7db8631bb5',
  };
}

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
        ...getApiKeyHeader(),
        ...headers,
      },
      ...params,
    });
  },
  post: <ResponseDataType>(url: string, data: unknown, headers?: Record<string, unknown>) =>
    axios.post<ResponseDataType, AxiosResponse<ResponseDataType>>(url, data, {
      headers: {
        ...getApiKeyHeader(),
        ...headers,
      },
    }),
  put: <ResponseDataType>(url: string, data: unknown, headers?: Record<string, unknown>) =>
    axios.put<ResponseDataType, AxiosResponse<ResponseDataType>>(url, data, {
      headers: {
        ...getApiKeyHeader(),
        ...headers,
      },
    }),
  delete: <ResponseDataType>(url: string) =>
    axios.delete<ResponseDataType, AxiosResponse<ResponseDataType>>(url, {
      headers: {
        ...getApiKeyHeader(),
      },
    }),
};
