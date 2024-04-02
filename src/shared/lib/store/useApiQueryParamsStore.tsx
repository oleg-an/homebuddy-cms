import { create } from 'zustand';
import { showErrorToast } from 'shared/lib/notifications';
import { getKeys } from 'shared/lib/object';
import { produce } from 'immer';
import { urlResolver } from 'shared/lib/url';

const QUERY_MAX_LENGTH = 1900;
const TOAST_ID = 'too-many-filters';

const defaultQueryParams = {
  filters: {},
  defaultFilters: {},
  sort: {},
  pagination: {},
  search: '',
  arrayFilters: {},
  defaultSort: {},
};

type ApiQueryParams<T, K, X> = {
  filters: T;
  arrayFilters: X;
  sort: K;
  pagination: {
    limit?: number;
    page?: number;
  };
  search?: string;
  defaultFilters: T;
};

export function getFilterQuery() {
  return _useApiQueryParamsStore.getState().actions.getQueryString() || '';
}

export type ApiQueryParamsStore<T, K, X> = {
  params: ApiQueryParams<T, K, X>;
  actions: {
    setFilters: (params: ApiQueryParams<T, K, X>['filters']) => void;
    setArrayFilters: (params: ApiQueryParams<T, K, X>['arrayFilters']) => void;
    removeFilter: (params: string | string[]) => void;
    replaceFilters: (params: Record<string, string>) => void;
    replaceArrayFilters: (params: ApiQueryParams<T, K, X>['arrayFilters']) => void;
    setSort: (params: ApiQueryParams<T, K, X>['sort']) => void;
    setDefaultSort: (params: ApiQueryParams<T, K, X>['sort']) => void;
    setDefaultFilters: (params: ApiQueryParams<T, K, X>['filters']) => void;
    setPagination: (params: ApiQueryParams<T, K, X>['pagination']) => void;
    setSearch: (params: ApiQueryParams<T, K, X>['search']) => void;
    hasQueries: () => boolean;
    clearQueryParams: () => void;
    getQueryString: () => string | null;
  };
};

const _useApiQueryParamsStore = create<
  ApiQueryParamsStore<Record<string, string>, Record<string, string>, Record<string, string>>
>((set, get) => ({
  params: defaultQueryParams,
  actions: {
    getQueryString: () => {
      const { filters, sort, pagination, search, arrayFilters, defaultFilters } = get().params;

      const queryParams: Record<string, string> = {
        ...defaultFilters,
        ...filters,
        ...sort,
      };

      const arrayQueryParamsString = Object.entries(arrayFilters)
        .reduce((acc, [, value]) => {
          return `${acc}${value}&`;
        }, '')
        .slice(0, -1);

      if (pagination.limit) {
        queryParams.limit = pagination.limit.toString();
      }

      if (pagination.page) {
        queryParams.page = pagination.page.toString();
      }

      if (search) {
        queryParams.search = search;
      }

      const queryString = new URLSearchParams(queryParams).toString();

      if (!queryString && !arrayQueryParamsString) {
        return '';
      }

      let additionalQuery = '';

      if (arrayQueryParamsString) {
        additionalQuery = new URLSearchParams(arrayQueryParamsString).toString();
      }

      const separator = queryString && additionalQuery ? '&' : '';

      const query = `?${queryString}${separator}${additionalQuery}`;

      if (query.length > QUERY_MAX_LENGTH) {
        showErrorToast('Too many filters, please remove some of them.', TOAST_ID);

        return null;
      }

      return query;
    },
    hasQueries: () => Boolean(get().params.search || getKeys(get().params.filters).length),
    setFilters: (filters) => {
      set(
        produce((state) => {
          state.params.filters = { ...state.params.filters, ...state.params.defaultFilters, ...filters };
          state.params.pagination.page = 1;
        })
      );
    },
    setArrayFilters: (arrayFilters) => {
      set(
        produce((state) => {
          state.params.arrayFilters = { ...state.params.arrayFilters, ...arrayFilters };
          state.params.pagination.page = 1;
        })
      );
    },
    removeFilter: (filterToRemove) => {
      set(
        produce((state) => {
          state.params.pagination.page = 1;

          let filters: string[];

          if (typeof filterToRemove === 'string') {
            filters = [filterToRemove];
          } else {
            filters = filterToRemove;
          }

          filters.forEach((filter) => {
            if (filter in state.params.filters) {
              delete state.params.filters[filter];
            } else if (filter in state.params.arrayFilters) {
              delete state.params.arrayFilters[filter];
            }
          });
        })
      );
    },
    replaceFilters: (filters) => {
      set(
        produce((state) => {
          state.params.filters = { ...state.params.defaultFilters, ...filters };
          state.params.pagination.page = 1;
        })
      );
    },
    replaceArrayFilters: (arrayFilters) => {
      set(
        produce((state) => {
          state.params.arrayFilters = { ...arrayFilters };
          state.params.pagination.page = 1;
        })
      );
    },
    setPagination: (pagination) => {
      set(
        produce((state) => {
          state.params.pagination = { ...state.params.pagination, ...pagination };
        })
      );
    },
    setSort: (sort) => {
      set(
        produce((state) => {
          const existingKey = getKeys(state.params.sort)[0];

          if (existingKey) {
            urlResolver.removeParam(existingKey.toString());
          }
          state.params.sort = getKeys(sort).length ? sort : state.params.defaultSort;
        })
      );
    },
    setDefaultSort: (sort) => {
      set(
        produce((state) => {
          state.params.defaultSort = sort;
        })
      );
    },
    setDefaultFilters: (filters) => {
      set(
        produce((state) => {
          const currentDefaultFilters = getKeys(state.params.defaultFilters);
          const newFilters = state.params.filters;

          currentDefaultFilters.forEach((filter) => {
            delete newFilters[filter];
          });

          state.params.filters = newFilters;
          state.params.defaultFilters = filters;
        })
      );
    },
    setSearch: (search) => {
      set(
        produce((state) => {
          state.params.search = search;
          state.params.pagination.page = 1;
        })
      );
    },
    clearQueryParams: () => {
      set(
        produce((state) => {
          state.params = defaultQueryParams;
        })
      );
    },
  },
}));

export const useApiQueryParams: <
  TFilters extends object,
  TSort extends object,
  TArrayFilters extends object
>() => ApiQueryParamsStore<TFilters, TSort, TArrayFilters>['params'] = <TFilters, TSort, TArrayFilters>() =>
  _useApiQueryParamsStore((store) => store.params) as ApiQueryParamsStore<TFilters, TSort, TArrayFilters>['params'];

export const useApiQueryActions: <
  TFilters extends object,
  TSort extends object,
  TArrayFilters extends object
>() => ApiQueryParamsStore<TFilters, TSort, TArrayFilters>['actions'] = <TFilters, TSort, TArrayFilters>() =>
  _useApiQueryParamsStore((store) => store.actions) as ApiQueryParamsStore<TFilters, TSort, TArrayFilters>['actions'];

export const useApiQueryParamsSearch = () => _useApiQueryParamsStore((store) => store.params.search);
