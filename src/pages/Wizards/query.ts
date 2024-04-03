import { useQuery } from '@tanstack/react-query';
import { api } from 'shared/lib/api';
import type { StepModel } from 'pages/Wizards/models';

export function useGetWizard({ id }: { id: string }) {
  return useQuery({
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
