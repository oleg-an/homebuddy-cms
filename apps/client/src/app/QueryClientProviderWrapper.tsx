import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useLogout } from 'entities/profile';
import { isAxiosResponseError } from 'shared/lib/api';
import { showSessionExpiredToast } from 'shared/lib/notifications';
import { useModalsActions } from 'shared/ui/SideModal';

export function QueryClientProviderWrapper({ children }: { children: ReactNode }) {
  const logout = useLogout();
  const { closeAll } = useModalsActions();

  const checkNonAuthorizedUser = useCallback(
    (err: unknown) => {
      if (!isAxiosResponseError(err)) {
        return false;
      }

      const status = err.response.status;

      if (status === 401) {
        void logout();
        closeAll();

        return true;
      }
      if (status === 419) {
        void logout();
        showSessionExpiredToast();
        closeAll();

        return true;
      }

      return false;
    },
    [logout]
  );

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onError: (err) => checkNonAuthorizedUser(err),
    }),
    queryCache: new QueryCache({
      onError: (err) => checkNonAuthorizedUser(err),
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {!process.env.REACT_APP_PLAYWRIGHT_RUNNING && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  );
}
