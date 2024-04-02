import { useState, useEffect, useRef } from 'react';
import { passwordRoutes, useCheckPassword } from 'entities/password';
import type { AxiosResponseErrorModel } from 'shared/lib/api';
import type { PasswordRulesKeys } from 'entities/password';
import { getApiType } from 'shared/lib/api';
import { getResponseErrors, isNonValidationErrorBody, DEFAULT_ERROR_MESSAGE } from 'shared/lib/api';
import { showErrorToast } from 'shared/lib/notifications';

interface Params {
  password: string;
  isShowErrorToast?: boolean;
}

export const usePasswordValidation = ({ password, isShowErrorToast = true }: Params) => {
  const mounted = useRef(false);
  const [passwordRules, setPasswordRules] = useState<null | Array<PasswordRulesKeys>>(null);
  const useCheckPasswordQuery = useCheckPassword(passwordRoutes[getApiType()].validatePassword);

  useEffect(() => {
    const validatePassword = async () => {
      try {
        const validationResponse = await useCheckPasswordQuery.mutateAsync({
          payload: { password },
        });

        setPasswordRules(validationResponse.data);
      } catch (error) {
        const errors = getResponseErrors(error as AxiosResponseErrorModel);

        if (isNonValidationErrorBody(errors) && isShowErrorToast) {
          showErrorToast(DEFAULT_ERROR_MESSAGE);
        } else {
          setPasswordRules(null);
        }
      }
    };

    if (mounted.current) {
      void validatePassword();
    } else {
      mounted.current = true;
    }
  }, [password, useCheckPasswordQuery.mutateAsync, isShowErrorToast]);

  return {
    passwordRules,
  };
};
