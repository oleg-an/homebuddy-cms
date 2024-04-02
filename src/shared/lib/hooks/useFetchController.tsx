import { useEffect, useState } from 'react';
import { useApiQueryActions, useApiQueryParams } from 'shared/lib/store';
import { isString } from 'shared/lib/type-guards';
import {
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE_LIST,
  LIMIT_PARAM_NAME,
  PAGE_PARAM_NAME,
} from 'shared/ui/Pagination/constants';
import { urlResolver } from 'shared/lib/url';
import { getKeys } from 'shared/lib/object';

interface FetchControllerParams {
  fetcher: (params?: { cancelRefetch: boolean }) => void | Promise<unknown>;
  initialFilters?: Record<`filters[${string}`, string>;
  defaultFilters?: Record<`filters[${string}`, string>;
  initialSort?: Record<`sort[${string}`, string>;
  defaultSort?: Record<`sort[${string}`, string>;
  initialSearch?: string;
  initialDate?: Record<`filters[${string}`, string>;
  cancelRefetch?: boolean;
  queryId?: string;
  enabled?: boolean;
}
export const useFetchController = ({
  initialFilters,
  defaultFilters,
  initialSort,
  defaultSort,
  initialSearch,
  initialDate,
  fetcher,
  cancelRefetch = true,
  enabled = true,
  queryId,
}: FetchControllerParams) => {
  // We need useApiQueryParams here to update component on params change
  useApiQueryParams();
  const [isInitialFilterReady, setIsInitialFilterReady] = useState(false);
  const {
    setFilters,
    setArrayFilters,
    clearQueryParams,
    getQueryString,
    setPagination,
    setSort,
    setDefaultSort,
    setSearch,
    setDefaultFilters,
  } = useApiQueryActions<{}, {}, {}>();
  const queryString = getQueryString();

  useEffect(() => {
    if (!isInitialFilterReady) {
      const { page, hasParams, limit } = getPaginationParamsFromUrl();

      clearQueryParams();

      if (initialFilters) {
        setArrayFilters(initialFilters);
      }

      if (initialDate) {
        setFilters(initialDate);
      }

      if (initialSearch) {
        setSearch(initialSearch);
      }

      if (initialSort) {
        setSort(initialSort);
      } else if (defaultSort) {
        setDefaultSort(defaultSort);
        setSort(defaultSort);
      }

      if (hasParams) {
        const outOfArea = !ITEMS_PER_PAGE_LIST.includes(Number(limit));

        setPagination({
          page: outOfArea ? 1 : Number(page) || 1,
          limit: outOfArea ? DEFAULT_ITEMS_PER_PAGE : Number(limit),
        });

        if (outOfArea) {
          urlResolver.addParam(LIMIT_PARAM_NAME, DEFAULT_ITEMS_PER_PAGE.toString());
          urlResolver.addParam(PAGE_PARAM_NAME, '1');
        }
      }

      if (defaultFilters) {
        setDefaultFilters(defaultFilters);
      }

      setIsInitialFilterReady(true);
    }
  }, [isInitialFilterReady]);

  useEffect(() => {
    const isQueryReadyToFetch = isInitialFilterReady && isString(queryString) && enabled;

    if (isQueryReadyToFetch) {
      void fetcher({ cancelRefetch });
    }
  }, [queryString, isInitialFilterReady, cancelRefetch, queryId, enabled]);
};

export function getPaginationParamsFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  const page = searchParams.get(PAGE_PARAM_NAME);
  const limit = searchParams.get(LIMIT_PARAM_NAME);

  return {
    page,
    limit,
    hasParams: !!(page || limit),
  };
}

export function getCustomParamFromUrl(paramName: string) {
  const searchParams = new URLSearchParams(window.location.search);
  const params = searchParams.getAll(paramName);

  return {
    params,
    hasParams: !!params.length,
  };
}

export function getFromToFiltersFromUrl(paramNameStartsWith: string) {
  const searchParams = new URLSearchParams(window.location.search);
  let filters: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (key.startsWith(paramNameStartsWith)) {
      filters[key] = `${key}=${value}`;
    }
  });

  return filters;
}

export function getDateParamsFromUrl(paramFromName: string, paramToName: string) {
  const searchParams = new URLSearchParams(window.location.search);
  const from = searchParams.get(paramFromName);
  const to = searchParams.get(paramToName);

  return {
    from: from ? new Date(from) : null,
    to: to ? new Date(to) : null,
  };
}

export function useGetInitialSortFromUrl(sortingKeys: Record<string, string>) {
  for (let key of getKeys(sortingKeys)) {
    const sortingName = sortingKeys[key];
    const { params, hasParams } = getCustomParamFromUrl(sortingName);

    if (hasParams) {
      return {
        [sortingName]: params[0],
      };
    }
  }
}
