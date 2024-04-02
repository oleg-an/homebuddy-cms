import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';

export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryFn: () =>
      api.get<{ steps: string; _id: string }>(`/rest/wizards/${id}`).then((x) => {
        return {
          ...x.data,
          steps: JSON.parse(x.data.steps),
        };
      }),
  });
}

export function useGetWizardList() {
  return useQuery({
    queryFn: () => api.get(`/rest/wizards`),
  });
}
