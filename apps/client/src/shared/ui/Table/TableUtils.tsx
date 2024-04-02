import type { ReactElement } from 'react';
import { cloneElement } from 'react';
import { Skeleton } from 'shared/ui/Skeleton';

import type { Column, TableProps } from './table-models';

export function renderRows<T>({ data, rowClassName, rowKey, onRowClick, columns }: TableProps<T>) {
  return (data ?? []).map((row) => {
    const className = rowClassName?.(row);

    return (
      <tr
        key={rowKey(row)}
        {...(className ? { className } : {})}
        onClick={() => onRowClick?.(row)}
      >
        {columns.map(({ columnCell, columnLoadingCell, key }, index) => {
          return !row.loading
            ? cloneElement(
                columnCell({
                  value: row[key as keyof T],
                  row,
                }),
                { key: index }
              )
            : getLoadingCell(columnLoadingCell, index);
        })}
      </tr>
    );
  });
}

function getLoadingCell(columnLoadingCell: (() => ReactElement) | undefined, index: number) {
  return columnLoadingCell ? (
    cloneElement(columnLoadingCell(), { key: index })
  ) : (
    <td key={index}>
      <Skeleton className="skeleton h-[22px]" />
    </td>
  );
}

const SKELETON_ROWS_COUNT = 10;

export function renderLoadingRows<T>(columns: Column<T>[], rows = SKELETON_ROWS_COUNT) {
  return [...Array(rows)].map((_, index) => (
    <tr key={index}>{columns.map(({ columnLoadingCell }, index) => getLoadingCell(columnLoadingCell, index))}</tr>
  ));
}
