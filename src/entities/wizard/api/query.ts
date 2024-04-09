import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel, WizardModel } from 'entities/wizard';
import PocketBase from 'pocketbase';

const getWizardKey = ['getWizard'];
const getWizardList = ['getWizardList'];

const pb = new PocketBase('https://homebuddy-wizard.pockethost.io');

export function useGetWizard({ id }: { id: string }) {
  return useQuery<WizardModel>({
    queryKey: getWizardKey,
    queryFn: () => pb.collection('wizards').getOne(id),
  });
}

export function useGetWizardList() {
  return useQuery<WizardModel[]>({
    queryKey: getWizardList,
    queryFn: () =>
      pb.collection('wizards').getFullList({
        sort: '-created',
      }),
  });
}

export function useCreateWizard() {
  return useMutation({
    mutationFn: (data: StepModel[]) => api.post(`/rest/wizards`, data),
  });
}

export function useUpdateWizard(id: string) {
  return useMutation({
    mutationFn: (data: StepModel[]) => api.put(`/rest/wizards/${id}`, data),
  });
}

export function useDeleteWizard(id: string) {
  return useMutation({
    mutationFn: () => api.delete(`/rest/wizards/${id}`),
  });
}
