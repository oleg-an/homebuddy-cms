import { Roles } from 'shared/lib/store';
import { useClientDataStore } from 'shared/lib/store';

export type ApiType = 'app' | 'internal';

export function getApiType(): ApiType {
  const role = useClientDataStore.getState().getRole();

  return role === Roles.Contractor ? 'app' : 'internal';
}
