import { useQueryClient } from '@tanstack/react-query';
import type { CollectionSuccessApiResponse } from 'shared/lib/api';

export function useSetLoadingForUpdatedEntity<T extends { id: number }>({
  queryKey,
  id,
}: {
  queryKey: readonly unknown[];
  id: number;
}) {
  const queryClient = useQueryClient();
  const setLoaderForUpdatedEntity = () => {
    queryClient.setQueryData<CollectionSuccessApiResponse<T>>(
      queryKey,
      (oldData) =>
        oldData && {
          ...oldData,
          data: oldData.data.map((item) => ({ ...item, loading: item.id === id })),
        }
    );
  };

  return setLoaderForUpdatedEntity;
}
