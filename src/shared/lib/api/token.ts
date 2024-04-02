import type { Roles } from 'shared/lib/store';

export const clientAuthDataKey = 'homebuddyAuthData';

export const getAuthToken = () => {
  return getClientData().token;
};

export interface ClientAuthDataModel {
  role: Roles | null;
  token: string;
}

export function getClientData(): ClientAuthDataModel {
  try {
    return JSON.parse(localStorage.getItem(clientAuthDataKey) || '');
  } catch {
    return {
      role: null,
      token: '',
    };
  }
}
