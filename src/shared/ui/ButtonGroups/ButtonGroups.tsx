import classNames from 'classnames';

interface ButtonGroupsProps {
  items: {
    id: number;
    label: string;
    onClick?: () => void;
    counter?: number;
  }[];
  className?: string;
  selectedId: number;
}

export function ButtonGroups({ items, className, selectedId }: ButtonGroupsProps) {
  return (
    <div
      data-testid="TestId__button-groups"
      className={classNames(
        'flex flex-row items-center border border-slate-100 rounded-sm w-max cursor-pointer select-none overflow-hidden',
        className
      )}
    >
      {items.map(({ id, label, onClick, counter }, i, items) => {
        const isCounterShown = typeof counter === 'number' && counter > 0;

        return (
          <div
            key={id}
            onClick={onClick}
            className={classNames('px-[19px] py-[7px] text-sm  border-slate-100 hover:bg-slate-50 relative', {
              'bg-slate-50': selectedId === id,
              'bg-white': selectedId !== id,
              'border-r': i !== items.length - 1,
              'pr-[15px]': isCounterShown,
            })}
          >
            <span
              className={classNames('absolute flex flex-start flex-nowrap whitespace-nowrap', {
                'font-semibold text-slate-900': selectedId === id,
                'text-slate-700 font-medium': selectedId !== id,
              })}
            >
              {label}
              {isCounterShown && (
                <div className="ml-[16px] mt-[-2px] flex h-6 min-w-[24px] items-center justify-center rounded-xxl bg-deep-blue-500 text-xs text-white">
                  <div className="px-2">{counter}</div>
                </div>
              )}
            </span>
            <span className={classNames('font-semibold text-slate-900 invisible')}>
              {label}
              {isCounterShown && <span className="ml-[16px] px-2 text-xs">{counter}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}
