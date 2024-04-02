import type { Roles } from 'shared/lib/store';

export const clientAuthDataKey = 'homebuddyAuthData';
export const removeImpersonateToken = () => {
  sessionStorage.removeItem('impersonate_token');
};

export const openImpersonateWindow = async (id: number | string, e?: React.MouseEvent<Element, MouseEvent>) => {
  e?.preventDefault();
  e?.stopPropagation();

  window.open(`/?impersonate=${id}`);
};

export const isImpersonate = () => !!sessionStorage.getItem('impersonate_token');
export const getImpersonateToken = () => sessionStorage.getItem('impersonate_token');

export const getAuthToken = () => {
  if (isImpersonate()) {
    return getImpersonateToken();
  }

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
