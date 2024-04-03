import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel } from 'pages/Wizards/models';

const getWizardKey = ['getWizard'];
const getWizardList = ['getWizardList'];

export function useGetWizard({ id }: { id: string }) {
  return useQuery({
    queryKey: getWizardKey,
    queryFn: () =>
      api
        .get<{ steps: string; _id: string }>(`/rest/wizards/${id}`)
        .then((x) => x.data)
        .then((response) => {
          return {
            ...response,
            steps: JSON.parse(response.steps) as StepModel[],
          };
        }),
  });
}

export function useGetWizardList() {
  return useQuery({
    queryKey: getWizardList,
    queryFn: () =>
      api
        .get<{ steps: string; _id: string }[]>(`/rest/wizards`)
        .then((x) => x.data)
        .then((response) => {
          return response.map((x) => ({
            ...x,
            steps: JSON.parse(x.steps) as StepModel[],
          }));
        }),
  });
}
