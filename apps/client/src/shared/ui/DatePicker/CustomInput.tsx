import classNames from 'classnames';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

export const CustomInput = forwardRef<
  HTMLButtonElement,
  HTMLProps<HTMLButtonElement> & {
    onClearClick?: () => void;
    isOpenCalendar: boolean;
  }
>(({ value, onClearClick, isOpenCalendar, placeholder, ...input }, ref) => {
  const title = value || placeholder;

  return (
    <button
      {...input}
      type="button"
      value={value}
      className={classNames(
        'text-sm font-normal h-9 border hover:border-deep-blue-500 w-full rounded-sm bg-deep-blue-25',
        'focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-deep-blue-500',
        isOpenCalendar ? 'border-deep-blue-500' : 'border-transparent'
      )}
      ref={ref}
    >
      <div className="flex justify-between px-4 py-1">
        <div className="flex justify-start">
          <div className="whitespace-nowrap pt-1 font-medium">{title}</div>
          {onClearClick && (
            <div
              className="flex flex-col justify-center pl-1"
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClearClick();
              }}
            >
              <MaterialIcon
                className="cursor-pointer select-none pl-[5px] pt-[2px] text-[12px] text-slate-500"
                testId="datepicker-close"
              >
                close
              </MaterialIcon>
            </div>
          )}
        </div>
        <MaterialIcon className="pt-[2px] text-lg text-slate-300">calendar_month</MaterialIcon>
      </div>
    </button>
  );
});
