import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel } from 'entities/wizard';

import wizardMock from './example.json';

const getWizardKey = ['getWizard'];
const getWizardList = ['getWizardList'];

/*
export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryKey: getWizardKey,
    queryFn: () => api.get<WizardModel>(`/rest/wizards/${id}`).then((x) => x.data),
  });
}

 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryKey: getWizardKey,
    queryFn: () => Promise.resolve(wizardMock),
  });
}
export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => Promise.resolve([wizardMock]),
  });
}

/*
export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => api.get<WizardModel[]>(`/rest/wizards`).then((x) => x.data),
  });
}
 */

export function useCreateWizard() {
  return useMutation({
    mutationFn: (data: StepModel[]) => api.post(`/rest/wizards`, JSON.stringify(data)),
  });
}

export function useUpdateWizard(id: string) {
  return useMutation({
    mutationFn: (data: StepModel[]) => api.put(`/rest/wizards/${id}`, JSON.stringify(data)),
  });
}

export function useDeleteWizard(id: string) {
  return useMutation({
    mutationFn: () => api.delete(`/rest/wizards/${id}`),
  });
}
