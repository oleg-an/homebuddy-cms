import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { getInputError } from 'shared/lib/form';

export function InputWrapper({ children, className, name }: { className?: string; name: string; children: ReactNode }) {
  const methods = useFormContext();
  const error = getInputError(methods.formState.errors, name);

  const inputClass = classNames('input', className, {
    valid: !error,
    invalid: !!error,
  });

  return <div className={inputClass}>{children}</div>;
}
