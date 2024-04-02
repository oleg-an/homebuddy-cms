import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery, type UseInfiniteQueryOptions } from '@tanstack/react-query';
import { INFINITY_LIST_ITEMS } from 'shared/constants';
import { useCallback, useRef } from 'react';
import { pathToUrl } from 'shared/lib/router';

import type { CollectionSuccessApiResponse, AxiosResponseErrorModel } from './model';
import { api } from './api';
import type { ToastOptionsModel } from './toasts';
import { errorHandler, successHandler } from './toasts';
import type { UrlParams } from './model';

interface BaseGetInfiniteQueryOptions<TResponse>
  extends Omit<UseInfiniteQueryOptions<TResponse, AxiosResponseErrorModel>, 'queryFn'> {
  toastOptions?: ToastOptionsModel;
  queryParams?: UrlParams;
}

export const useGetInfiniteQuery = <TResponse,>(
  url: string,
  options: BaseGetInfiniteQueryOptions<CollectionSuccessApiResponse<TResponse>>
): UseInfiniteQueryResult<CollectionSuccessApiResponse<TResponse>> & {
  setSearchParamQuery: (value: string) => void;
} => {
  const { queryKey: key, queryParams = {}, toastOptions, enabled } = options;

  const urlSearchParams = new URLSearchParams(queryParams as URLSearchParams);

  urlSearchParams.set('limit', urlSearchParams.get('limit') ?? String(INFINITY_LIST_ITEMS));

  const queryKey = key ?? [url];
  const searchParam = useRef('');

  const setSearchParamQuery = useCallback((value: string) => {
    searchParam.current = value;
  }, []);

  return {
    ...useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam = { page: 1 } }) => {
        const passedQueryParams = new URLSearchParams(urlSearchParams).toString();
        const modifiedUrl = `${pathToUrl(url)}?${passedQueryParams}&page=${pageParam.page}${
          searchParam.current ? `&search=${searchParam.current}` : ''
        }`;

        return api
          .get<CollectionSuccessApiResponse<TResponse>>(modifiedUrl)
          .then(({ data }) => successHandler(data, toastOptions?.successText))
          .catch((err) => errorHandler(err, toastOptions?.errorOptions));
      },
      enabled,
      getNextPageParam: (lastPageInfo) => {
        const {
          meta: { page, total, limit },
        } = lastPageInfo;

        const lastPage = Math.ceil(total / limit);

        return !(page === lastPage || total === 0) && { page: page + 1 };
      },
    }),
    setSearchParamQuery,
  };
};
