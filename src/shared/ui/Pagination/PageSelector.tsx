import classNames from 'classnames';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { MaterialIcon } from 'shared/ui/MaterialIcon';

export function PageSelector({
  className,
  itemsPerPage,
  itemsPerPageList,
  onSelectChange,
  isDisabled,
}: {
  className?: string;
  isDisabled?: boolean;
  itemsPerPage: number;
  itemsPerPageList: number[];
  onSelectChange: (showOnPage: number) => void;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const onSelectItemClick = (showOnPage: number) => {
    onSelectChange(showOnPage);
  };

  useClickAway(selectRef, () => setIsOpen(false));

  return (
    <div
      className={classNames('cursor-pointer select-none relative', { 'pointer-events-none': isDisabled }, className)}
      onClick={() => setIsOpen(!isOpen)}
      ref={selectRef}
      {...getDataAutoTestAttributes(['pagination-limit-selector']).attributes}
    >
      <div
        className={classNames(
          'flex items-center justify-center border border-slate-100 rounded-sm min-h-[36px] px-[11px] hover:border-deep-blue-500 group',
          { 'border-deep-blue-500': isOpen, 'text-slate-200': isDisabled }
        )}
      >
        <div className="text-sm">{itemsPerPage}</div>
        <MaterialIcon
          className={classNames('pl-2 text-base text-slate-300 group-hover:text-deep-blue-500', {
            'border-deep-blue-500 !text-deep-blue-500': isOpen,
          })}
        >
          {isOpen ? 'expand_less' : 'expand_more'}
        </MaterialIcon>
      </div>
      {isOpen && (
        <div className="absolute bottom-10 w-full rounded-sm bg-white py-2 shadow-sm">
          {itemsPerPageList.map((items) => (
            <div
              key={items}
              className="h-[36px] pl-4 pt-2 text-sm hover:bg-deep-blue-25"
              onClick={() => onSelectItemClick(items)}
              {...getDataAutoTestAttributes([`pagination-limit-selector-${items}`]).attributes}
            >
              {items}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
