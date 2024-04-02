import { useMemo, useEffect } from 'react';
import { mapToOptions, type MappableListItem } from 'shared/lib/mappers';

import type { SelectModel, InfinityMenuProps } from './models';
import { Select } from './Select';
import { MenuInfinity } from './Components/MenuInfinity';

export type ListQuery<T = Object> = {
  data?: {
    data: T[];
    pages: { data: T[] }[];
  };
} & {
  isLoading: boolean;
  setQueryParams: (
    params: Record<string, string>
  ) => void | React.Dispatch<React.SetStateAction<Record<string, string> | undefined>>;
  refetch: () => void;
};

interface SelectIndependentQueryProps<T extends MappableListItem>
  extends Omit<SelectModel, 'onChange' | 'options' | 'selectedOptionId'> {
  queryParams?: Record<string, string>;
  selectedId: string;
  onChange: (id: string) => void;
  listQuery: ListQuery<T>;
  getFieldValueToShow: (item: T) => string;
}

export function SelectIndependentQuery<T extends MappableListItem>({
  queryParams = {},
  onChange,
  selectedId,
  noOptional = true,
  isSmall = true,
  listQuery,
  getFieldValueToShow,
  ...params
}: SelectIndependentQueryProps<T>) {
  const options = useMemo(() => {
    return mapToOptions({
      items: listQuery.data?.data
        ? listQuery.data.data
        : listQuery.data?.pages.flatMap((page) => page.data.map((item) => item)),
      textField: getFieldValueToShow,
    });
  }, [listQuery.data, listQuery.data?.pages]);

  useEffect(() => {
    const nonEmptyParams = () => Object.fromEntries(Object.entries(queryParams).filter(([, value]) => !!value));

    listQuery.setQueryParams(nonEmptyParams());
  }, [JSON.stringify(queryParams)]);

  return (
    <Select
      selectedOptionId={selectedId}
      options={options}
      noOptional={noOptional}
      isSmall={isSmall}
      isLoading={listQuery.isLoading}
      onChange={onChange}
      {...params}
    />
  );
}

type SelectIndependentInfinityListProps<T extends MappableListItem> = Omit<
  SelectIndependentQueryProps<T>,
  'renderCustomMenu'
> &
  InfinityMenuProps;

function InfinityList<T extends MappableListItem>({
  hasNextPage,
  loading,
  isFetchingNextPage,
  isFetching,
  removeQuery,
  onChangeSearchQuery,
  fetchNextPage,
  totalItems,
  selectedOptions,
  totalListItems,
  ...restProps
}: SelectIndependentInfinityListProps<T>) {
  const infinityProps = {
    hasNextPage,
    loading,
    isFetchingNextPage,
    isFetching,
    removeQuery,
    onChangeSearchQuery,
    fetchNextPage,
    totalListItems,
    selectedOptions,
    totalItems,
  };

  return (
    <SelectIndependentQuery
      {...restProps}
      renderCustomMenu={(renderMenuProps) => {
        return (
          <MenuInfinity
            {...renderMenuProps}
            {...infinityProps}
          />
        );
      }}
    />
  );
}

SelectIndependentQuery.Infinity = InfinityList;
