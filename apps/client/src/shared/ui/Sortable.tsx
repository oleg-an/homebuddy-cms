import { useCallback } from 'react';
import * as React from 'react';
import { useApiQueryParams, useApiQueryActions } from 'shared/lib/store';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { urlResolver } from 'shared/lib/url';

type Ordering = SortDirection.asc | SortDirection.desc | undefined;
export type SortRecord = Record<string | number | symbol, Ordering>;

type SortableProps<TSort extends SortRecord> = React.PropsWithChildren<{
  sortKey: keyof TSort;
}>;

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

const getOrderingIcon = (ordering: Ordering) => {
  switch (ordering) {
    case SortDirection.asc:
      return 'expand_more';
    case SortDirection.desc:
      return 'expand_less';
    default:
      return 'unfold_more';
  }
};

const getNextOrdering = (current: Ordering): Ordering => {
  switch (current) {
    case SortDirection.asc:
      return SortDirection.desc;
    case SortDirection.desc:
      return;
    default:
      return SortDirection.asc;
  }
};

export function Sortable<TSort extends SortRecord>({ sortKey, children }: SortableProps<TSort>) {
  const { setSort } = useApiQueryActions<{}, SortRecord, {}>();
  const params = useApiQueryParams<{}, SortRecord, {}>();

  const sort = params.sort;
  const ordering = sort[sortKey];

  const updateSort = useCallback(() => {
    const nextOrdering = getNextOrdering(ordering);

    if (nextOrdering) {
      setSort({ [sortKey]: nextOrdering });
      urlResolver.addParam(sortKey.toString(), nextOrdering);
    } else {
      urlResolver.removeParam(sortKey.toString());
      setSort({});
    }
  }, [sort, setSort, sortKey]);

  return (
    <div
      className="inline-flex cursor-pointer items-center"
      onClick={updateSort}
      {...getDataAutoTestAttributes([
        sortKey.toString().replaceAll('[', '-').replaceAll(']', '').replaceAll('_', '-').toLocaleLowerCase(),
      ]).attributes}
    >
      {children}
      <MaterialIcon className="ml-1 select-none text-[12px]">{getOrderingIcon(ordering)}</MaterialIcon>
    </div>
  );
}
