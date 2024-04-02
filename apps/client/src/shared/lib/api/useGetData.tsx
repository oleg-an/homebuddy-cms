import { useCallback, useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';
import { logError } from 'shared/lib/log-errors';
import { showDefaultErrorToast } from 'shared/lib/notifications';
import { pathToUrl } from 'shared/lib/router';

import { api } from './api';

interface GetData {
  url: string;
  urlParams?: Record<string, string>;
  queryParams?: Record<string, string>;
  defaultQueryParams?: Record<string, string>;
}

function getData<T>({ url, urlParams = {}, queryParams, defaultQueryParams }: GetData) {
  const queryParamsToUrl = { ...defaultQueryParams, ...queryParams };

  const queryParamsString = Object.values(queryParamsToUrl).length
    ? `?${new URLSearchParams(queryParamsToUrl).toString()}`
    : '';

  return api.get<T>(pathToUrl(url, urlParams) + queryParamsString);
}

export const useGetData = <T,>({ url, urlParams = {}, queryParams, defaultQueryParams }: GetData) => {
  const [response, setResponse] = useState<AxiosResponse<T> | undefined>();
  const [queryParamsStore, setQueryParams] = useState(queryParams);
  const [isLoading, setIsLoading] = useState(false);

  const refetch = useCallback(() => {
    setIsLoading(true);

    getData<T>({ url, urlParams, queryParams: queryParamsStore, defaultQueryParams })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        logError(err);
        showDefaultErrorToast();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, urlParams, queryParamsStore, defaultQueryParams]);

  useEffect(() => {
    if (queryParamsStore) {
      refetch();
    }
  }, [queryParamsStore]);

  return { data: response?.data, isLoading, setQueryParams, refetch };
};
