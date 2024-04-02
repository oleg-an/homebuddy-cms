import classNames from 'classnames';
import debounce from 'debounce';
import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { useRef } from 'react';
import * as React from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { uuidv4 } from 'shared/lib/uuidv4';

import { InputError } from './InputError';
import { InputWrapper } from './InputWrapper';

enum IconType {
  left = 'left',
  right = 'right',
}

interface InputProps {
  title: string;
  name: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  debounceTime?: number;
  isDisabled?: boolean;
  isErrorMessageHidden?: boolean;
  isOptional?: boolean;
  registerOptions?: RegisterOptions;
  attributes?: InputHTMLAttributes<HTMLInputElement> & DataAttributes;
  children?: JSX.Element;
  isSmall?: boolean;
  hasMinimizedLabelOnly?: boolean;
  iconType?: keyof typeof IconType;
  iconName?: string;
  iconClassName?: string;
  iconClick?: () => void;
}

export function Input({
  title,
  name,
  className,
  type = 'text',
  isDisabled,
  isErrorMessageHidden,
  isOptional,
  registerOptions,
  attributes,
  children,
  isSmall,
  hasMinimizedLabelOnly,
  iconType = IconType.left,
  iconClick = () => null,
  debounceTime,
  iconName,
  iconClassName,
}: InputProps) {
  const methods = useFormContext();
  const error = methods.formState.errors[name]?.message;
  const optionalMarker = <span> (optional)</span>;
  const id = useRef(uuidv4()).current;
  const register = methods.register(name, registerOptions);

  return (
    <InputWrapper
      className={classNames(className, { 'input-sm': isSmall })}
      name={name}
    >
      <input
        type={type}
        id={id}
        disabled={isDisabled}
        className={classNames('cursor-pointer', {
          '!pl-11': iconName && iconType === IconType.left,
          '!pr-11': iconName && iconType === IconType.right,
        })}
        {...attributes}
        {...register}
        onChange={debounceTime ? debounce(register.onChange, debounceTime) : register.onChange}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className={classNames('max-w-full pr-2 truncate pointer-events-none', {
          '!text-red-500': !!error,
          '!pl-11': iconName && iconType === IconType.left,
          '!pr-11': iconName && iconType === IconType.right,
          'minimized-only': hasMinimizedLabelOnly,
        })}
      >
        {title}
        {isOptional && optionalMarker}
      </label>
      {!!iconName && (
        <MaterialIcon
          className={classNames('absolute text-slate-300 text-[22px] cursor-pointer select-none', iconClassName, {
            'left-[15px]': iconType === IconType.left,
            'right-[15px]': iconType === IconType.right,
            'top-[17px]': iconName && !isSmall,
            'top-[7px]': iconName && isSmall,
          })}
          onClick={iconClick}
        >
          {iconName}
        </MaterialIcon>
      )}
      {children}
      {!isErrorMessageHidden && <InputError name={name} />}
    </InputWrapper>
  );
}
