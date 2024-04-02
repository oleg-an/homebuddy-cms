import { type ToastOptionsModel, useGetQuery, usePutMutation } from 'shared/lib/api';
import { useQueryClient } from '@tanstack/react-query';
import { getApiType } from 'shared/lib/api';

import type {
  NotificationsData,
  AuthenticatedContractorModel,
  AuthenticatedManagerModel,
  UpdatePasswordModel,
  UpdateProfileModel,
} from '../index';

import { profileRoutes } from './routes';

const userQueryKey = ['getUser'];

export const useGetNotifications = () => useGetQuery<NotificationsData>(profileRoutes.app.getNotifications);
export const useUpdateIntegration = () => usePutMutation<NotificationsData>(profileRoutes.app.updateNotifications);

export function useUpdateContractor(toastOptions?: ToastOptionsModel) {
  const queryClient = useQueryClient();

  return usePutMutation<UpdateProfileModel | UpdatePasswordModel>(profileRoutes.app.updateUser, {
    toastOptions,
    onSuccess: () => {
      void queryClient.invalidateQueries(userQueryKey);
    },
  });
}

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
