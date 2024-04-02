import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';

export function useGetWizard({ id }: { id: string }) {
  // JSON.parse
  return useQuery({
    queryFn: () => api.get(`/rest/wizards/${id}`),
  });
}

export function useGetWizardList() {
  return useQuery({
    queryFn: () => api.get(`/rest/wizards`),
  });
}
