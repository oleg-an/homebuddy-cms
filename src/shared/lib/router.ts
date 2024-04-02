import { compile } from 'path-to-regexp';

export const pathToUrl = (path: string, params: object = {}) => {
  return compile(path)(params);
};

export const addParamsToUrl = (url: string, params?: Record<string, string>) => {
  if (!params) {
    return url;
  }

  return `${url}?${new URLSearchParams(params).toString()}`;
};

export const buildQueryString = (params: Record<string, unknown>): string => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return queryString;
};
