import type { ReactElement, ReactNode } from 'react';

export type Column<T> = {
  label: string;
  key: string;
  columnCell: ({ value }: { value: T[keyof T]; row: T }) => ReactElement;
  headerCell: ({ value }: { value: ReactNode }) => ReactElement;
  columnLoadingCell?: () => ReactElement;
  disabled?: boolean;
};

export type TableDataType<T> = T & { loading?: boolean };

export interface TableProps<T> {
  columns: Column<T>[];
  skeletonRowsCount?: number;
  onRowClick?: (data: T) => void;
  rowKey: (row: T) => string | number;
  rowClassName?: (row: T) => string;
  isLoading?: boolean;
  isDisabled?: boolean;
  data?: TableDataType<T>[];
  className?: string;
  variant?: 'table' | 'table-sm';
  hasRowCursorPointer?: boolean;
  hasVerticalScroll?: boolean;
}
