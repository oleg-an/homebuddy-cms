import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel, WizardModel } from 'entities/wizard';

const getWizardKey = ['getWizard'];
const getWizardList = ['getWizardList'];

export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryKey: getWizardKey,
    queryFn: () => api.get<WizardModel>(`/rest/wizards/${id}`).then((x) => x.data),
  });
}

/*
export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryKey: getWizardKey,
    queryFn: () => Promise.resolve(wizardMock),
  });
}
 */

export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => api.get<WizardModel[]>(`/rest/wizards`).then((x) => x.data),
  });
}

/* export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => Promise.resolve([wizardMock]),
  });
} */

export function useUpdateWizard(id: string) {
  return useMutation({
    mutationFn: (data: StepModel[]) => api.put(`/rest/wizards/${id}`, data),
  });
}

export function useCreateWizard() {
  return useMutation({
    mutationFn: (data: StepModel[]) => api.post(`/rest/wizards`, data),
  });
}

export function useDeleteWizard(id: string) {
  return useMutation({
    mutationFn: () => api.post(`/rest/wizards/${id}`, {}),
  });
}
