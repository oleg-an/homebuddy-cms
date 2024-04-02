import { useGetQuery } from 'shared/lib/api';
import { getApiType } from 'shared/lib/api';

import type { AuthenticatedContractorModel, AuthenticatedManagerModel } from '../index';

import { profileRoutes } from './routes';

const userQueryKey = ['getUser'];

export function useGetUser<T>() {
  return useGetQuery<T>(profileRoutes[getApiType()].getUser, {
    queryKey: userQueryKey,
  });
}

export function useGetManager() {
  return useGetUser<AuthenticatedManagerModel>();
}

export function useGetContractor() {
  return useGetUser<AuthenticatedContractorModel>();
}
