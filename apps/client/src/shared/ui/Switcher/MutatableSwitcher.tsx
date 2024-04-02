import type { UseMutationResult } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import type { ErrorsModel } from 'shared/lib/api';
import { DEFAULT_ERROR_MESSAGE, getFirstError, isAxiosResponseError, isErrorsModel } from 'shared/lib/api';
import { showErrorToast } from 'shared/lib/notifications';

import { Switcher } from './Switcher';

interface MutatableSwitcherProps<T> extends DataAttributes {
  type?: 'primary' | 'danger';
  useUpdate: () => UseMutationResult<unknown, unknown, T>;
  buildMutateArgs: (isSelected: boolean) => T;
  afterMutate?: (isChecked: boolean) => void | Promise<unknown>;
  getErrorMessage?: (errors: ErrorsModel) => string;
  name: string;
  isChecked: boolean;
  isDisabled?: boolean;
  onChecked?: (checked: boolean) => void;
}

export function MutatableSwitcher<T>({
  onChecked,
  type,
  useUpdate,
  afterMutate,
  buildMutateArgs,
  getErrorMessage = getFirstError,
  name,
  isChecked,
  isDisabled,
  attributes,
}: MutatableSwitcherProps<T>) {
  const { isLoading, mutateAsync } = useUpdate();
  const [checked, setChecked] = useState(isChecked);

  const onChange = useCallback(
    (checked: boolean) => {
      setChecked(checked);
      onChecked?.(checked);

      mutateAsync(buildMutateArgs(checked))
        .then(() => afterMutate?.(checked))
        .catch((error) => {
          setChecked(!checked);
          onChecked?.(!checked);

          let errorMessage = DEFAULT_ERROR_MESSAGE;

          if (isErrorsModel(error)) {
            errorMessage = getErrorMessage(error);
          } else if (isAxiosResponseError(error)) {
            errorMessage = getErrorMessage(error.response.data);
          }

          showErrorToast(errorMessage);
        });
    },

    [checked]
  );

  return (
    <Switcher
      type={type}
      name={name}
      checked={checked}
      onChange={onChange}
      className={isLoading ? 'pointer-events-none' : ''}
      disabled={isDisabled}
      attributes={attributes}
    />
  );
}
