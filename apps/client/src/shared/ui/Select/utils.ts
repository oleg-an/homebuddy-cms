import type { CollectionSuccessApiResponse } from 'shared/lib/api';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';

import type { Option } from './models';

export function getInfinityListPropsFromQuery<TResponse = Object>(
  params: UseInfiniteQueryResult<CollectionSuccessApiResponse<TResponse>> & {
    setSearchParamQuery: (value: string) => void;
    selectedOptions: Option[];
  }
) {
  const totalItems = params.data?.pages[0]?.meta.total || 0;
  const totalItemsWithoutFilters = params.data?.pages[0]?.meta.total_without_filters || 0;
  const totalListItems = totalItems < totalItemsWithoutFilters ? totalItems : totalItemsWithoutFilters;

  return {
    loading: params.isLoading,
    isFetchingNextPage: params.isFetchingNextPage,
    isFetching: params.isFetching,
    hasNextPage: !!params.hasNextPage,
    fetchNextPage: params.fetchNextPage,
    totalItems,
    totalListItems,
    totalItemsWithoutFilters,
    removeQuery: params.remove,
    onChangeSearchQuery: params.setSearchParamQuery,
    selectedOptions: params.selectedOptions,
  };
}
