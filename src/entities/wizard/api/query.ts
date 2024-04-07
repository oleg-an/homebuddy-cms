import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { WizardModel } from 'entities/wizard';

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
    mutationFn: (data) => api.put(`/rest/wizards/${id}`, data),
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
