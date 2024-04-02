import type { UseQueryResult, UseInfiniteQueryResult } from '@tanstack/react-query';

import type { CollectionSuccessApiResponse, ResourceSuccessApiResponse } from './model';

export interface PageUiStates {
  isTableLoading: boolean;
  isTableFetching: boolean;
  hasErrors: boolean;
  noItemsInDB: boolean;
  isEmptyResponse: boolean;
}

type ApiResponse = CollectionSuccessApiResponse<unknown> | ResourceSuccessApiResponse<unknown>;

export function getPageUiStates(
  tableQueries: Array<UseQueryResult<ApiResponse>>,
  filtersQueries?: Array<UseQueryResult<ApiResponse>>,
  infinityFiltersQueries?: Array<UseInfiniteQueryResult<ApiResponse>>
): PageUiStates {
  let isTableLoading = false;
  let isTableFetching = false;
  let hasErrors = false;
  let noItemsInDB = false;
  let isEmptyResponse = false;

  tableQueries.forEach(({ isFetching, isLoading, isError, data, isLoadingError }) => {
    isTableLoading ||= isLoading || (!data && !isLoadingError);
    isTableFetching ||= isFetching;
    hasErrors ||= isError;

    if (data && 'meta' in data) {
      noItemsInDB ||= data.meta.total_without_filters === 0;
      isEmptyResponse ||= data.meta.total === 0;
    }
  });

  [...(filtersQueries ?? []), ...(infinityFiltersQueries ?? [])].forEach(({ isError }) => {
    hasErrors ||= isError;
  });

  return {
    isTableLoading,
    isTableFetching,
    hasErrors,
    noItemsInDB,
    isEmptyResponse,
  };
}
