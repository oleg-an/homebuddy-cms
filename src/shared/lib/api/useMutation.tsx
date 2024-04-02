import type { MutationOptions } from '@tanstack/query-core/src/types';
import { useMutation } from '@tanstack/react-query';
import { pathToUrl } from 'shared/lib/router';
import { getFilterQuery } from 'shared/lib/store';

import type { ResourceSuccessApiResponse, UrlParams, AxiosResponseErrorModel } from './model';
import { api } from './api';
import type { ToastOptionsModel } from './toasts';
import { errorHandler, successHandler } from './toasts';

export const usePostMutation = buildMutation('post');
export const usePutMutation = buildMutation('put');
export const useDeleteMutation = buildMutation('delete');

function buildMutation(method: 'put' | 'post' | 'delete') {
  return <TMutateParams, TResponse = never>(
    url: string,
    options?: MutationOptions<
      ResourceSuccessApiResponse<TResponse>,
      AxiosResponseErrorModel,
      {
        payload?: TMutateParams;
        urlParams?: UrlParams;
      } | void
    > & { toastOptions?: ToastOptionsModel; hasFilter?: boolean }
  ) => {
    return useMutation((mutateParams) => {
      const modifiedUrl = `${pathToUrl(url, mutateParams?.urlParams)}${options?.hasFilter ? getFilterQuery() : ''}`;

      return api[method]<ResourceSuccessApiResponse<TResponse>>(modifiedUrl, mutateParams?.payload)
        .then(({ data }) => successHandler(data, options?.toastOptions?.successText))
        .catch((err) => errorHandler(err, options?.toastOptions?.errorOptions));
    }, options);
  };
}
