import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form/dist/types';
import { useHistory } from 'react-router-dom';
import { passwordRoutes, useCheckPasswordToken, useResetPassword } from 'entities/password';
import type { ApiType } from 'shared/lib/api';
import { pageRoutes } from 'shared/routes';
import { getResponseErrors, isNonValidationErrorBody } from 'shared/lib/api';
import { showErrorToast, showSuccessToast } from 'shared/lib/notifications';
import { isString } from 'shared/lib/type-guards';

interface CreatePasswordModel {
  password: string;
  passwordConfirmation: string;
}

export function useCreatePassword(methods: UseFormReturn<CreatePasswordModel>, type: ApiType) {
  const { clearErrors, setError, control } = methods;
  const password = useWatch({ control, name: 'password' });
  const resetPassword = useResetPassword(passwordRoutes[type].resetPassword);
  const checkTokenQuery = useCheckPasswordToken(passwordRoutes[type].checkPasswordToken);
  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token')?.trim() || '';
  const email = urlParams.get('email')?.trim() || '';
  const authPage = pageRoutes.app.auth;

  useEffect(() => {
    if (!token || !email) {
      history.push(authPage);
    }
    checkTokenQuery.mutate({
      payload: { token, email },
    });
  }, []);

  useEffect(() => {
    if (isString(resetPassword.data)) {
      history.push(authPage);
      showSuccessToast('Your password was changed successfully.');
    }
  }, [resetPassword.data]);

  useEffect(() => {
    clearErrors();
  }, [password]);

  useEffect(() => {
    const responseError = resetPassword.error || checkTokenQuery.error;

    if (!responseError) {
      return;
    }

    const errors = getResponseErrors(responseError);

    if (isNonValidationErrorBody(errors)) {
      showErrorToast(errors);
      history.push(authPage);

      return;
    }

    if (Array.isArray(errors.token)) {
      showErrorToast(errors.token[0].message);
      history.push(authPage);

      return;
    }

    if (Array.isArray(errors.password)) {
      setError('passwordConfirmation', {
        message: errors.password[0].message,
      });
    }
  }, [resetPassword.error, checkTokenQuery.error]);

  return {
    mutate: (value: CreatePasswordModel) => {
      resetPassword.mutate({
        payload: {
          ...value,
          token,
          email,
        },
      });
    },
    isLoading: resetPassword.isLoading,
  };
}
