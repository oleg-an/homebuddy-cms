import { useQuery } from '@tanstack/react-query';

import { Wizards } from './mock';

export function useGetWizard({ id }: { id: number }) {
  return useQuery({
    queryFn: () => Promise.resolve(Wizards.find((x) => x.id === id)),
  });
}
