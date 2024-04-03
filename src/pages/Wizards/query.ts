import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel, WizardModel } from 'pages/Wizards/models';

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

export function useUpdateWizard(wizard: WizardModel) {
  return useMutation({
    mutationFn: () => api.put(`/rest/wizards`, wizard),
  });
}

export function useCreateWizard() {
  return useMutation({
    mutationFn: () => api.post(`/rest/wizards`, {}),
  });
}

export function useDeleteWizard({ id }: { id: string }) {
  return useMutation({
    mutationFn: () => api.post(`/rest/wizards/${id}`, {}),
  });
}
