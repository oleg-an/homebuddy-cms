import classNames from 'classnames';
import { useRef } from 'react';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import { uuidv4 } from 'shared/lib/uuidv4';

import style from './Switcher.module.scss';

export interface SwitcherProps extends DataAttributes {
  name: string;
  type?: 'primary' | 'danger';
  disabled?: boolean;
  checked?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
}

export function Switcher({
  type = 'primary',
  name,
  disabled,
  checked,
  className,
  onChange,
  attributes,
}: SwitcherProps) {
  const id = useRef(uuidv4()).current;

  return (
    <div
      className={classNames(style.toggle, className)}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...attributes}
    >
      <input
        name={name}
        type="checkbox"
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        data-checked={checked}
        data-testid="TestId__switcher"
        htmlFor={id}
        tabIndex={disabled ? -1 : 1}
      >
        <div className={style.innerWrapper}>
          <span
            className={classNames(style.inner, {
              'before:bg-deep-green-500': type === 'primary',
              'before:bg-red-500': type === 'danger',
            })}
            tabIndex={-1}
          />
        </div>
        <span
          className={style.switch}
          tabIndex={-1}
        />
      </label>
    </div>
  );
}
