import classNames from 'classnames';
import { useController, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import type { DataAttributes } from 'shared/lib/data-auto-test';

import { InputError } from './InputError';
import { InputWrapper } from './InputWrapper';

const INPUT_ID = 'phone';

interface PhoneInputProps {
  name: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  attributes?: DataAttributes['attributes'];
  isOptional?: boolean;
}

export function PhoneInput({ name, className, disabled, placeholder, attributes, isOptional }: PhoneInputProps) {
  const { formState } = useFormContext();
  const {
    field: { onChange, value, ref },
  } = useController({ name });
  const { errors } = formState;
  const hasErrorMessage = !!errors[name]?.message;
  const optionalMarker = <span> (optional)</span>;

  return (
    <InputWrapper
      className={className}
      name={name}
    >
      <PatternFormat
        format="(###) ### ####"
        patternChar="#"
        autoComplete="off"
        id={INPUT_ID}
        type="tel"
        disabled={disabled}
        placeholder={placeholder || ' '}
        onChange={onChange}
        value={value}
        name={name}
        getInputRef={ref}
        {...attributes}
      />
      <label
        htmlFor={INPUT_ID}
        className={classNames({ '!text-red-500': hasErrorMessage })}
      >
        Phone
        {isOptional && optionalMarker}
      </label>
      <InputError name={name} />
    </InputWrapper>
  );
}
