import classNames from 'classnames';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext, useWatch } from 'react-hook-form';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import { getInputError } from 'shared/lib/form';

import style from './Textarea.module.scss';
import { TextareaPlaceholder } from './TextareaPlaceholder';

interface TextareaProps {
  className?: string;
  placeholder?: string;
  name: string;
  registerOptions?: RegisterOptions;
  isDisabled?: boolean;
  attributes?: DataAttributes['attributes'];
  isOptional?: boolean;
}

export function Textarea({
  className,
  placeholder,
  name,
  registerOptions,
  isDisabled,
  attributes,
  isOptional,
}: TextareaProps) {
  const methods = useFormContext();
  const errors = methods.formState.errors;
  const value = useWatch({ name });
  const error = getInputError(errors, name);

  return (
    <div className="relative">
      {!value && (
        <TextareaPlaceholder
          placeholder={placeholder}
          isOptional={isOptional}
          className="left-4 top-4"
        />
      )}
      <textarea
        disabled={isDisabled}
        className={classNames(
          style.textarea,
          style.textareaScroll,
          !!error && style.error,
          className,
          'rounded-sm p-4 w-full font-medium text-sm bg-deep-blue-25 text-slate-900'
        )}
        {...methods.register(name, registerOptions)}
        name={name}
        {...attributes}
      />
      {!!error && <p className="ml-4 mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
