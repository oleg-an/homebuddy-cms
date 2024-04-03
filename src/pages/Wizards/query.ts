import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { WizardModel } from 'pages/Wizards/models';

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

/*
export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => api.get<WizardModel[]>(`/rest/wizards`).then((x) => x.data),
  });
}
 */
export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () => Promise.resolve([wizardMock]),
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
