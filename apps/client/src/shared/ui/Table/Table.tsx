import classNames from 'classnames';
import { cloneElement } from 'react';
import { InfoBox } from 'shared/ui/InfoBox';

import type { TableProps } from './table-models';
import style from './Table.module.scss';
import { renderRows, renderLoadingRows } from './TableUtils';

export function Table<T>({
  data = [],
  isLoading = false,
  isDisabled = false,
  columns,
  onRowClick,
  rowClassName,
  rowKey,
  className,
  variant = 'table',
  hasRowCursorPointer,
  hasVerticalScroll,
  skeletonRowsCount,
}: TableProps<T>) {
  const tableClass = classNames(className, style[variant], {
    [style.tableVerticalScroll]: hasVerticalScroll,
    [style.rowHoverPointer]: hasRowCursorPointer,
    [style.disabledTable]: isDisabled,
  });
  const headerCells = columns.map(({ key, label, headerCell }) => cloneElement(headerCell({ value: label }), { key }));
  const rows =
    isLoading && !data.some(({ loading }) => loading)
      ? renderLoadingRows(columns, skeletonRowsCount)
      : renderRows({ data, rowClassName, rowKey, onRowClick, columns });

  if (!isLoading && !data.length) {
    return (
      <InfoBox
        title="🧐 No results"
        text="We couldn’t find what you were looking for. Check your request and search again."
        className="mt-6"
      />
    );
  }

  return (
    <div className={tableClass}>
      <table>
        <thead>
          <tr>{headerCells}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
