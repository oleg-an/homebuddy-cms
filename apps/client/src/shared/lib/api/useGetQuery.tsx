import { pathToUrl } from 'shared/lib/router';
import { getFilterQuery } from 'shared/lib/store';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { CollectionSuccessApiResponse, ResourceSuccessApiResponse, AxiosResponseErrorModel } from './model';
import type { UrlParams } from './model';
import { api } from './api';
import { errorHandler, successHandler, type ToastOptionsModel } from './toasts';

interface BaseGetQueryOptions<TResponse> extends Omit<UseQueryOptions<TResponse, AxiosResponseErrorModel>, 'queryFn'> {
  toastOptions?: ToastOptionsModel;
  urlParams?: UrlParams;
  queryParams?: UrlParams;
  hasFilter?: boolean;
}

export const useGetQuery = <TResponse,>(
  url: string,
  options?: BaseGetQueryOptions<ResourceSuccessApiResponse<TResponse>>
) => useBuildUseQuery<ResourceSuccessApiResponse<TResponse>>(url, options);

export const useGetQueryCollection = <TResponse,>(
  url: string,
  options?: BaseGetQueryOptions<CollectionSuccessApiResponse<TResponse>>
) => useBuildUseQuery<CollectionSuccessApiResponse<TResponse>>(url, options);

function useBuildUseQuery<TResponse>(url: string, options?: BaseGetQueryOptions<TResponse>) {
  const { hasFilter, toastOptions, urlParams, queryParams, queryKey, enabled } = options ?? {};
  const queryParamsString = queryParams
    ? `?${new URLSearchParams(queryParams as Record<string, string>).toString()}`
    : '';
  const modifiedUrl = `${pathToUrl(url, urlParams)}${hasFilter ? getFilterQuery() : queryParamsString}`;

  return useQuery({
    ...options,
    queryFn: () =>
      api
        .get<TResponse>(modifiedUrl)
        .then(({ data }) => successHandler(data, toastOptions?.successText))
        .catch((err) => errorHandler(err, toastOptions?.errorOptions)),
    queryKey: queryKey ?? (hasFilter ? [url] : [modifiedUrl]),
    enabled: hasFilter ? false : enabled,
  });
}
