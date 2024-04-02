import classNames from 'classnames';
import React from 'react';
import { createPortal } from 'react-dom';
import type { TriggerType } from 'react-popper-tooltip';
import { usePopperTooltip } from 'react-popper-tooltip';

import css from './Tooltip.module.scss';

const getOffset = ({ placement }: { placement: Placement }): [number, number] => {
  switch (placement) {
    case 'top':
      return [0, 24];
    case 'top-start':
      return [-24, 24];
    case 'bottom-start':
      return [-24, 30];
    case 'top-end':
      return [24, 30];
    case 'bottom':
      return [0, 30];
    case 'bottom-end':
      return [24, 30];
    case 'left':
    case 'right':
      return [0, 24];
    default:
      return [0, 0];
  }
};

export type Placement = 'top-start' | 'top-end' | 'top' | 'bottom-start' | 'bottom-end' | 'left' | 'right' | 'bottom';
interface Tooltip {
  children: JSX.Element | string | (({ visible }: { visible: boolean }) => JSX.Element);
  // At this moment we have only this two placements
  // We've decide to add new placement only when we need it
  // You need to set Tooltip positions in pair, cause it flips
  placement: Placement;
  content: JSX.Element | string | React.ReactNode;
  className?: string;
  rootElement?: Element;
  isDisabled?: boolean;
  contentClass?: string;
  widthClass?: string;
  trigger?: TriggerType;
  dataTestId?: string;
}

export function Tooltip({
  children,
  trigger,
  placement,
  content,
  className,
  contentClass,
  isDisabled,
  widthClass = 'max-w-[250px]',
  rootElement = document.querySelector('#popper-Tooltip') ?? document.body,
  dataTestId,
}: Tooltip) {
  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip(
    {
      followCursor: true,
      placement,
      trigger,
    },
    {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: getOffset,
          },
        },
      ],
    }
  );

  return (
    <>
      <span
        className={className}
        ref={setTriggerRef}
        data-testid={dataTestId}
      >
        {typeof children === 'function' ? children({ visible }) : children}
      </span>
      {!isDisabled &&
        createPortal(
          <>
            <div
              data-testid="TestId__tooltip"
              ref={setTooltipRef}
              {...getTooltipProps({
                className: classNames(css.popper, { [css.isVisible]: visible }, widthClass, contentClass),
              })}
            >
              <span {...getArrowProps()} />
              {content}
            </div>
          </>,
          rootElement
        )}
    </>
  );
}
