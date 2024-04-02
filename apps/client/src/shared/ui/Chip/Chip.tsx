import classNames from 'classnames';
import { useCallback, forwardRef } from 'react';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

import style from './Chip.module.scss';

interface ChipProps {
  label: string;
  onClick?: (id?: string) => void;
  id?: string;
  actionIcon?: string;
  className?: string;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export const Chip = forwardRef<HTMLElement, ChipProps>((props, ref) => {
  const { label, onClick, id, actionIcon, className, isDisabled, children } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (!onClick) {
        return;
      }
      e.stopPropagation();
      onClick(id);
    },
    [onClick, id]
  );

  return (
    <span
      ref={ref}
      className={classNames(style.chip, className)}
      tabIndex={-1}
    >
      <span className="truncate">{label}</span>
      {actionIcon && (
        <>
          <span className="h-4 w-[12px]" />
          <span
            role="button"
            tabIndex={0}
            className={classNames(
              'absolute right-0 top-0 flex h-full w-[18px] items-center justify-center rounded-r-[4px] transition-all hover:bg-deep-blue-50',
              isDisabled && style.disabled
            )}
            onClick={handleClick}
          >
            <MaterialIcon className="text-xs text-slate-500">{actionIcon}</MaterialIcon>
          </span>
        </>
      )}
      {children}
    </span>
  );
});
