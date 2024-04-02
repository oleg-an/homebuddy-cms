import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import type { UseFormReturn } from 'react-hook-form/dist/types';
import { isAxiosResponseError, isNonValidationErrorModel, api, clientAuthDataKey } from 'shared/lib/api';
import { showErrorToast } from 'shared/lib/notifications';
import { useClientDataStore } from 'shared/lib/store';
import { logError } from 'shared/lib/log-errors';
import { Roles } from 'shared/lib/store';
import { pageRoutes } from 'shared/routes';

import type { IssueTokenRequestModel } from '../model';
import { profileRoutes } from '../api';

export const REDIRECT_URI = 'redirect_uri';

export const getRedirectUri = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const value = searchParams.get(REDIRECT_URI);

  if (value) {
    return decodeURIComponent(value);
  }

  return null;
};

export function useLogout() {
  const history = useHistory();
  const { removeRole, getRole } = useClientDataStore();
  const role = getRole();

  let authPage: string;
  let deleteTokenRoute: string;

  if (role === Roles.Contractor) {
    authPage = pageRoutes.app.auth;
    deleteTokenRoute = profileRoutes.app.deleteToken;
  }

  return async () => {
    removeRole();
    history.replace(authPage);

    try {
      await api.delete(deleteTokenRoute);
    } catch (err) {
      logError(err);
    }

    localStorage.removeItem(clientAuthDataKey);
  };
}

export const WrongCredentialsErrorMessage = 'Either email address or password is incorrect.\nPlease try again.';

export function useLogin(apiRoute: string, role: Roles, methods: UseFormReturn<IssueTokenRequestModel>) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setRole } = useClientDataStore();
  const ignoreStateChange = useRef(false);

  useEffect(() => {
    return () => {
      ignoreStateChange.current = true;
    };
  }, []);

  return {
    submit: async (params: IssueTokenRequestModel) => {
      setLoading(true);

      try {
        const response = await axios.post<{ data: { token: string } }>(apiRoute, params);

        localStorage.setItem(clientAuthDataKey, JSON.stringify({ token: response.data.data.token, role }));
        setRole(role);

        const redirectUri = getRedirectUri();

        history.replace(redirectUri || pageRoutes.app.wizard);
      } catch (e) {
        if (!isAxiosResponseError(e)) {
          return;
        }

        if (isNonValidationErrorModel(e.response.data)) {
          showErrorToast(e.response.data.error);

          return;
        }

        const errors = e.response.data.errors;

        if (!errors.email) {
          return;
        }

        const error = errors.email[0];

        if (error.code === 'email_error') {
          methods.setError('email', {
            message: WrongCredentialsErrorMessage,
          });
          methods.setError('password', {
            message: WrongCredentialsErrorMessage,
          });

          return;
        }

        if (error.code === 'email_email') {
          methods.setError('email', {
            message: error.message,
          });
        }
      } finally {
        if (!ignoreStateChange.current) {
          setLoading(false);
        }
      }
    },
    loading,
  };
}
