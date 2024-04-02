import type { UseMutationResult } from '@tanstack/react-query';
import classNames from 'classnames';
import { useState, useMemo, useEffect } from 'react';
import { Loader } from 'shared/ui/Loader';
import type { ErrorsModel } from 'shared/lib/api';
import { DEFAULT_ERROR_MESSAGE, isAxiosResponseError, isErrorsModel } from 'shared/lib/api';
import { showErrorToast } from 'shared/lib/notifications';

import { Checkbox } from './Checkbox';

interface MutatableCheckboxProps<T> {
  name: string;
  isChecked: boolean;
  isDisabled?: boolean;
  isPartial?: boolean;
  withLoader?: boolean;
  externalIsLoading?: boolean;
  useUpdate: () => UseMutationResult<unknown, unknown, T>;
  buildMutateArgs: (isSelected: boolean) => T;
  afterMutate?: () => void | Promise<unknown>;
  onMutateSuccess?: () => void | Promise<unknown>;
  getErrorMessage?: (errors: ErrorsModel) => string;
}

export function MutatableCheckbox<T>(props: MutatableCheckboxProps<T>) {
  const {
    name,
    isChecked,
    isDisabled,
    useUpdate,
    buildMutateArgs,
    afterMutate,
    getErrorMessage,
    onMutateSuccess,
    isPartial,
    withLoader,
    externalIsLoading,
  } = props;
  const { mutateAsync, isLoading } = useUpdate();
  const [isSelected, setIsSelected] = useState<boolean>(isChecked);
  const isLaderShown = withLoader && (isLoading || externalIsLoading);

  useEffect(() => {
    setIsSelected(isChecked);
  }, [isChecked, isPartial]);

  const controlledProps = useMemo(
    () => ({
      checked: isSelected || isPartial,
      disabled: isDisabled || isLoading,
    }),
    [isSelected, isDisabled, isLoading, isPartial]
  );

  const handleClick = async () => {
    setIsSelected(!isSelected);
    const wasSelectedBeforeMutate = isSelected;

    try {
      await mutateAsync(buildMutateArgs(!isSelected));
      await onMutateSuccess?.();
    } catch (error) {
      setIsSelected(wasSelectedBeforeMutate);

      let errorMessage = DEFAULT_ERROR_MESSAGE;

      if (isErrorsModel(error)) {
        errorMessage = getErrorMessage?.(error) || DEFAULT_ERROR_MESSAGE;
      } else if (isAxiosResponseError(error)) {
        errorMessage = getErrorMessage?.(error.response.data) || DEFAULT_ERROR_MESSAGE;
      }
      showErrorToast(errorMessage);
    }

    await afterMutate?.();
  };

  return (
    <div className="relative inline-flex h-[17px] w-[25px]">
      <Checkbox
        name={name}
        controlledProps={controlledProps}
        onClick={handleClick}
        isChecked={controlledProps.checked}
        isDisabled={controlledProps.disabled}
        isPartial={isPartial}
        className={classNames(isLaderShown && 'invisible')}
      />

      {isLaderShown && (
        <Loader
          className="absolute left-0 top-[-6px] flex h-6 w-6 justify-center"
          fillColor="text-slate-400 fill-white"
        />
      )}
    </div>
  );
}
