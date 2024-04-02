import { useTitle } from 'react-use';
import { useEffect } from 'react';

import { Roles, useClientDataStore } from './store/useClientDataStore';
import { useTitleStoreActions, useTitleStoreTitle } from './store/useTitleStore';

const titles = {
  [Roles.Contractor]: 'Contractors',
};

const getPageTitle = (title: string, role?: Roles | null) => {
  if (!role) {
    return `${title} - HomeBuddy`;
  }

  return `${title} - HomeBuddy for ${titles[role]}`;
};

export function usePageTitle(pageHeader: string, defaultRole?: Roles) {
  const title = useTitleStoreTitle();

  const role = useClientDataStore().getRole();

  useTitle(getPageTitle(pageHeader || title || '', defaultRole || role));
}

export function useSetPageTitle(title: string) {
  const { setTitle, removeTitle } = useTitleStoreActions();

  useEffect(() => {
    setTitle(title);

    return () => removeTitle();
  }, [setTitle]);
}
