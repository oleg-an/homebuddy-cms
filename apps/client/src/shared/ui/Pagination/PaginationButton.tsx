import classNames from 'classnames';
import type { MouseEventHandler } from 'react';
import type { DataAttributes } from 'shared/lib/data-auto-test';
import { exhaustiveMatchingGuard } from 'shared/lib/type-guards';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

type PaginationButtonType = 'first' | 'prev' | 'current' | 'next' | 'last';

interface PaginationButtonProps extends DataAttributes {
  className?: string;
  type: PaginationButtonType;
  onClick: MouseEventHandler<HTMLDivElement>;
  pageNumber?: number;
  isDisabled?: boolean;
  isClickBlocked?: boolean;
}

const getIcon = (type: PaginationButtonType) => {
  switch (type) {
    case 'first':
      return 'first_page';
    case 'prev':
      return 'chevron_left';
    case 'current':
      return '';
    case 'next':
      return 'chevron_right';
    case 'last':
      return 'last_page';
    default:
      return exhaustiveMatchingGuard();
  }
};

export function PaginationButton({
  className,
  type,
  onClick,
  pageNumber,
  isDisabled,
  attributes,
  isClickBlocked,
}: PaginationButtonProps): JSX.Element {
  return (
    <div
      className={classNames('cursor-pointer select-none', className, {
        'pointer-events-none': isDisabled || isClickBlocked,
      })}
      onClick={onClick}
      {...attributes}
    >
      <div
        className={classNames(
          'flex items-center justify-center border border-slate-100 rounded-sm min-h-[36px] px-[11px]',
          {
            'hover:border-deep-blue-500 hover:text-deep-blue-500': !isDisabled,
            'text-slate-200': type === 'current' && isDisabled,
          }
        )}
      >
        {pageNumber ? (
          <div className="text-sm">{pageNumber}</div>
        ) : (
          <MaterialIcon
            className={classNames('text-base', {
              'text-deep-blue-500': !isDisabled,
              'text-deep-blue-200': isDisabled,
            })}
          >
            {getIcon(type)}
          </MaterialIcon>
        )}
      </div>
    </div>
  );
}
