import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel } from 'pages/Wizards/models';

const getWizardKey = ['getWizard'];
const getWizardList = ['getWizardList'];

export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryKey: getWizardKey,
    queryFn: () => api.get<{ steps: StepModel[]; _id: string }>(`/rest/wizards/${id}`).then((x) => x.data),
  });
}

export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => api.get<{ steps: StepModel[]; _id: string }[]>(`/rest/wizards`).then((x) => x.data),
  });
}

/*
export function updateWizard({ id }: { id: string }) {
  return useMutation({
    mutationFn: () => api.post(),
  });
}

 */
