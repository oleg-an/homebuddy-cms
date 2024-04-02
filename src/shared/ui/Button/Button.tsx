import classNames from 'classnames';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { Loader } from 'shared/ui/Loader';

import style from './Button.module.scss';

interface ButtonProps extends DataAttributes {
  loading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  contentClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
  loaderClasses?: string;
  dataTestId?: string;
  variant?: 'primary' | 'danger' | 'outline' | 'outline-second' | 'outline-danger';
  size?: 'big' | 'medium' | 'small';
  iconLeftName?: string;
  iconRightName?: string;
}

interface ChildrenWrapperProps {
  iconLeftName?: string;
  iconRightName?: string;
  size?: 'big' | 'medium' | 'small';
  children: ReactNode;
}

interface IconProps {
  name: string;
  position: 'left' | 'right';
  size?: 'big' | 'medium' | 'small';
}

function Icon({ name, size, position }: IconProps) {
  return (
    <MaterialIcon
      className={classNames({
        'text-lg text-[19px]': size !== 'small',
        'text-[16px]': size === 'small',
        'mr-[9px]': size !== 'small' && position === 'left',
        'mr-[8px]': size === 'small' && position === 'left',
        'ml-[9px]': size !== 'small' && position === 'right',
        'ml-[8px]': size === 'small' && position === 'right',
      })}
    >
      {name}
    </MaterialIcon>
  );
}

function ChildrenWrapper({ iconLeftName, iconRightName, children, size }: ChildrenWrapperProps) {
  if (!iconLeftName && !iconRightName) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center">
      {iconLeftName && (
        <Icon
          name={iconLeftName}
          position="left"
          size={size}
        />
      )}
      <div>{children}</div>
      {iconRightName && (
        <Icon
          name={iconRightName}
          position="right"
          size={size}
        />
      )}
    </div>
  );
}

export function Button({
  loading = false,
  disabled = false,
  className,
  type,
  onClick,
  children,
  loaderClasses,
  contentClassName,
  dataTestId = '',
  variant = 'primary',
  size = 'big',
  iconLeftName,
  iconRightName,
  attributes,
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isButtonDisabled = disabled || loading;

  const classes = classNames(
    className,
    'outline-0 whitespace-nowrap rounded-sm disabled:opacity-50 disabled:cursor-not-allowed',
    { [style.primary]: variant === 'primary' },
    { [style.outline]: variant === 'outline' },
    { [style.outlineSecond]: variant === 'outline-second' },
    { [style.outlineDanger]: variant === 'outline-danger' },
    { [style.danger]: variant === 'danger' },
    { 'h-14 px-6': size === 'big' },
    { 'h-9 px-5 !text-sm': size === 'medium' },
    { 'h-8 px-4 !text-xs': size === 'small' }
  );

  return (
    <button
      ref={ref}
      className={classes}
      type={type}
      onClick={onClick}
      disabled={isButtonDisabled}
      data-testid={dataTestId}
      {...attributes}
    >
      <div className="relative flex items-center justify-center">
        {loading && (
          <Loader
            svgClasses={loaderClasses}
            className="absolute flex justify-center"
          />
        )}
        <span
          className={contentClassName}
          style={{ visibility: loading ? 'hidden' : 'visible' }}
        >
          <ChildrenWrapper
            iconRightName={iconRightName}
            iconLeftName={iconLeftName}
            size={size}
          >
            {children}
          </ChildrenWrapper>
        </span>
      </div>
    </button>
  );
}
