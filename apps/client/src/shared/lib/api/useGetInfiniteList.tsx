import { useEffect, useMemo, useRef, useState } from 'react';
import { getKeys } from 'shared/lib/object';
import { type MappableListItem, mapToOptions } from 'shared/lib/mappers';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { useGetInfiniteQuery } from './useGetInfiniteQuery';
import type { ToastOptionsModel } from './toasts';

const infinityListKey = createQueryKeys('infinity', {
  list: [''],
  selectedList: [''],
});

export const useGetInfiniteList = <TResponse,>(
  url: string,
  {
    isSyncedWithUrl = true,
    filterName = '',
    defaultParams,
    paramsForMain,
    toastOptions,
    getFieldValueToShow,
    limit = '1000',
  }: {
    filterName?: string;
    defaultParams?: Record<string, string>;
    isSyncedWithUrl?: boolean;
    paramsForMain?: Record<string, string>;
    toastOptions?: ToastOptionsModel;
    limit?: string;
    getFieldValueToShow?: (item: Record<string, string>) => string;
  }
) => {
  const [queryParamsForSync, setQueryParamsForSync] = useState<URLSearchParams | Record<string, string> | undefined>();
  const [queryParamsMain, setQueryParamsMain] = useState<URLSearchParams | Record<string, string> | undefined>({
    ...defaultParams,
    ...paramsForMain,
  });

  const hasBeenCalled = useRef({ syncedDataFetched: false, mainDataFetched: false });

  useEffect(() => {
    const queryString = window.location.search;
    const ignoreDataFromUrl = !queryString || !isSyncedWithUrl || !filterName;

    if (!ignoreDataFromUrl) {
      const allParams = new URLSearchParams(queryString);
      const selectedIdsFromUrl = allParams.getAll(filterName);

      if (!selectedIdsFromUrl.length) {
        return;
      }

      setQueryParamsForSync(
        selectedIdsFromUrl.reduce((acc: URLSearchParams, id, index) => {
          acc.append(filterName, id);

          if (index === selectedIdsFromUrl.length - 1 && defaultParams) {
            acc.set('limit', limit);
            getKeys(defaultParams).forEach((key) => {
              acc.set(key, defaultParams[key]);
            });
          }

          return acc;
        }, new URLSearchParams())
      );
    }
  }, []);

  const { data, remove } = useGetInfiniteQuery<TResponse>(url, {
    enabled: !!(queryParamsForSync && !hasBeenCalled.current.syncedDataFetched),
    queryParams: queryParamsForSync,
    staleTime: Infinity,
    queryKey: [...infinityListKey.selectedList.queryKey, url],
  });

  const selectedOptions = useMemo(() => {
    const items = data?.pages.flatMap(({ data }) => data.map((item) => item));
    const getTextFiled = getFieldValueToShow || (({ companyName }) => companyName);

    return mapToOptions({
      items: items as (Record<string, string> & MappableListItem)[],
      textField: getTextFiled,
    });
  }, [data?.pages, getFieldValueToShow]);

  useEffect(() => remove, [remove]);

  useEffect(() => {
    if (selectedOptions.length && !hasBeenCalled.current.syncedDataFetched) {
      hasBeenCalled.current.syncedDataFetched = true;
    }
  }, [selectedOptions]);

  const infinityQueryResult = useGetInfiniteQuery<TResponse>(url, {
    queryKey: [...infinityListKey.list.queryKey, url],
    queryParams: queryParamsMain,
    toastOptions,
  });

  useEffect(() => infinityQueryResult.remove, [infinityQueryResult.remove]);
  useEffect(() => {
    if (hasBeenCalled.current.mainDataFetched) {
      infinityQueryResult.remove();
      void infinityQueryResult.fetchNextPage({ pageParam: { page: 1 } });

      return;
    }

    hasBeenCalled.current.mainDataFetched = true;
  }, [queryParamsMain]);

  return {
    ...infinityQueryResult,
    selectedOptions,
    setQueryParams: (newParams: Record<string, string>) => {
      setQueryParamsMain({
        ...defaultParams,
        ...newParams,
      });
    },
  };
};
