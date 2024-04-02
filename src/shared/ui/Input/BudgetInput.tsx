import classNames from 'classnames';
import type { InputHTMLAttributes } from 'react';
import { forwardRef, useEffect, useRef } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { uuidv4 } from 'shared/lib/uuidv4';

import { InputError } from './InputError';
import { InputWrapper } from './InputWrapper';

interface BudgetInputProps {
  name: string;
  isHiddenError?: boolean;
  isFocused?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder: string;
  inputClassName?: string;
  isLabelDisabled?: boolean;
  isLabelCentered?: boolean;
  thousandSeparator?: boolean;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  attributes?: Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'type'>;
  isSmall?: boolean;
  noPrefix?: boolean;
  suffix?: string;
}

export const BudgetInput = forwardRef<HTMLInputElement | null, BudgetInputProps>(
  (
    {
      isHiddenError,
      name,
      className,
      disabled,
      placeholder,
      inputClassName,
      isLabelDisabled,
      isLabelCentered,
      rules,
      attributes,
      thousandSeparator,
      isSmall,
      noPrefix,
      suffix,
      isFocused,
    },
    ref
  ) => {
    const { field } = useController({ name, rules });
    const { formState } = useFormContext();
    const { errors } = formState;
    const hasError = !!errors[name]?.message;
    const id = useRef(uuidv4()).current;

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (isFocused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isFocused]);

    return (
      <InputWrapper
        className={classNames(className, { 'input-sm': isSmall })}
        name={name}
      >
        <NumericFormat
          thousandSeparator={thousandSeparator}
          className={inputClassName}
          autoComplete="off"
          allowNegative={false}
          decimalScale={0}
          id={id}
          getInputRef={ref ?? inputRef}
          disabled={disabled}
          placeholder={isLabelDisabled ? placeholder : ' '}
          onChange={field.onChange}
          value={field.value}
          prefix={noPrefix ? '' : '$'}
          suffix={suffix}
          {...attributes}
        />
        {!isLabelDisabled && (
          <label
            htmlFor={id}
            className={classNames({
              '!text-red-500': hasError,
              centered: isLabelCentered,
            })}
          >
            {placeholder}
          </label>
        )}
        {!isHiddenError && <InputError name={name} />}
      </InputWrapper>
    );
  }
);
