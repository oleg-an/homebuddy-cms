import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import type { AxiosResponseErrorModel } from 'shared/lib/api';
import { isValidationErrorsModel } from 'shared/lib/api';
import { getKeys } from 'shared/lib/object';

export function FormErrors({ error, keys }: { error: AxiosResponseErrorModel | null; keys?: string[] }) {
  const methods = useFormContext();

  useEffect(() => {
    if (!isValidationErrorsModel(error?.response.data)) {
      return;
    }

    const errors = error?.response.data.errors || {};
    const errorFields = getKeys(errors);

    errorFields.forEach((key: string) => {
      if (!keys || keys.includes(key)) {
        const error = errors[key];

        if (error) {
          methods.setError(key, {
            type: 'custom',
            message: error[0].message,
          });
        }
      }
    });
  }, [error]);

  return null;
}
