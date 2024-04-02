import type { InputHTMLAttributes } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RegisterOptions } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { isNull } from 'shared/lib/type-guards';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { Tooltip } from 'shared/ui/Tooltip';

import { Input } from './Input';

function isEllipsisActive(e?: HTMLInputElement | null) {
  if (e) {
    return e.offsetWidth < e.scrollWidth;
  }

  return false;
}

interface InputWithTooltipProps {
  className?: string;
  title: string;
  type?: string;
  name: string;
  isDisabled?: boolean;
  registerOptions?: RegisterOptions;
  attributes?: InputHTMLAttributes<HTMLInputElement>;
  isOptional?: boolean;
  tooltipText: string;
  tooltipOverflowDisabledText?: string;
  icon?: string;
}

export function InputWithTooltip({
  tooltipText,
  tooltipOverflowDisabledText,
  icon = 'info',
  ...rest
}: InputWithTooltipProps) {
  const rootRef = useRef<HTMLDivElement>();
  const methods = useFormContext();
  const [isTooltip, setIsTooltip] = useState(false);

  const setTooltipHandler = () => {
    if (rootRef.current) {
      const input = rootRef.current.querySelector('input');

      setIsTooltip(isEllipsisActive(input));
    }
  };

  useEffect(() => {
    setTooltipHandler();
  }, [methods.watch()]);

  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!isNull(node)) {
      rootRef.current = node;
    }
    setTooltipHandler();
  }, []);

  return (
    <div
      className="relative"
      ref={ref}
    >
      <Input {...rest}>
        <Tooltip
          content={<div className="text-center text-xs">{tooltipText}</div>}
          placement="top-start"
        >
          <div className="absolute right-[15px] top-[18px]">
            <MaterialIcon className="cursor-pointer text-[20px] text-slate-200">{icon}</MaterialIcon>
          </div>
        </Tooltip>
      </Input>
      {isTooltip && (
        <Tooltip
          content={<div className="text-center text-xs">{tooltipOverflowDisabledText}</div>}
          placement="bottom-start"
        >
          <div className="absolute left-4 top-0 min-h-[56px] w-[282px] cursor-not-allowed" />
        </Tooltip>
      )}
    </div>
  );
}
