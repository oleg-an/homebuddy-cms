import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import type { FetchNextPageOptions } from '@tanstack/react-query';
import { Loader } from 'shared/ui/Loader';
import debounce from 'debounce';
import { useIntersection } from 'react-use';
import { formatDecimal } from 'shared/lib/formatting';
import { SearchBar } from 'shared/ui/Select/SearchBar';
import styles from 'shared/ui/Select/Select.module.scss';
import type { Option } from 'shared/ui/Select';

import { ListMenu } from './Menu';

interface MenuInfinityProps<T extends Option> {
  open: boolean;
  className?: string;
  menuItemClassName?: string;
  isCustomScrollbar?: boolean;
  hasNextPage: boolean;
  loading: boolean;
  isFetchingNextPage: boolean;
  isFetching: boolean;
  fetchNextPage: (params?: FetchNextPageOptions) => void;
  removeQuery: () => void;
  totalItems: number;
  options: T[];
  selectedOptions: T[];
  onChangeSearchQuery: (value: string) => void;
  handleSelect: (id: string) => void;
  setHeaderText?: (text: string) => void;
  isSyncedWithUrl?: boolean;
}

interface InfinitySearchBarProps {
  onSearch: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
  search: string;
  showBorder: boolean;
  isSearched: boolean;
}

function InfinitySearchBar({ onSearch, search, showBorder, isSearched, onClear, onClose }: InfinitySearchBarProps) {
  useEffect(() => {
    const handleCloseMenu = () => {
      if (isSearched) {
        onClear();
      }

      onClose();
    };

    return handleCloseMenu;
  }, [isSearched]);

  return (
    <SearchBar
      onInputChange={onSearch}
      value={search}
      showEmptyMessage={false}
      className={classNames({ 'border-b-slate-100 border-b': showBorder })}
    />
  );
}

export function MenuInfinity<T extends Option>({
  open,
  className,
  menuItemClassName,
  isCustomScrollbar,
  hasNextPage,
  loading,
  isFetchingNextPage,
  isFetching,
  fetchNextPage,
  removeQuery,
  totalItems,
  options,
  selectedOptions = [],
  setHeaderText,
  onChangeSearchQuery,
  handleSelect,
  isSyncedWithUrl = true,
}: MenuInfinityProps<T>) {
  const hasBeenSelected = useRef(false);
  const [isSearchPrinting, setIsSearchPrinting] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    if (hasBeenSelected.current || !isSyncedWithUrl) {
      return;
    }

    if (selectedOptions.length) {
      setHeaderText?.(selectedOptions[0].text);
      hasBeenSelected.current = true;
    }
  }, [selectedOptions, isSyncedWithUrl]);

  const scrollAnchor = useRef<HTMLLIElement>(null);
  const intersection = useIntersection(scrollAnchor, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });
  const showBorder = intersection && intersection.intersectionRatio < 1;

  const handleMadeSearch = useRef(
    debounce(() => {
      fetchNextPage({ pageParam: { page: 1 } });
    }, 300)
  );

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    const id = (e.target as HTMLElement).getAttribute('data-id') || '';

    e.stopPropagation();
    handleSelect(id);

    const option = options.find((item) => item.id === id);

    setHeaderText?.(option?.text || '');
  };

  const handleClearMenu = () => {
    setSearch('');
    removeQuery();
    onChangeSearchQuery('');
    fetchNextPage({ pageParam: { page: 1 } });
    setIsSearched(false);
  };

  const handleCloseMenu = () => {};

  const handleSearch = (value: string) => {
    if (value.length > 0) {
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }

    setSearch(value);
    setIsSearchPrinting(true);
    onChangeSearchQuery(value);
    removeQuery();
    handleMadeSearch.current();
  };

  const optionClassName = classNames('hover:bg-deep-blue-25', styles.menuItem, menuItemClassName);
  const isLoading = loading || isFetching || isFetchingNextPage;
  const isEmptyList = !isSearchPrinting && options.length === 0;
  const showLoader = isLoading || isSearchPrinting;
  const showMore = hasNextPage && options.length < totalItems;

  useEffect(() => {
    if (!isLoading) {
      setIsSearchPrinting(false);
    }
  }, [isLoading]);

  return (
    <ListMenu open={open}>
      {open && (
        <InfinitySearchBar
          onSearch={handleSearch}
          search={search}
          showBorder={!!showBorder}
          onClear={handleClearMenu}
          isSearched={isSearched}
          onClose={handleCloseMenu}
        />
      )}

      <ul
        className={classNames(
          styles.list,
          'max-h-[252px]',
          {
            'menu-scrollbar': isCustomScrollbar,
          },
          className
        )}
      >
        <li ref={scrollAnchor} />
        {options.length > 0 &&
          !isSearchPrinting &&
          options.map((item) => (
            <li
              key={item.id}
              className={optionClassName}
              data-id={item.id}
              onClick={handleItemClick}
            >
              {item.text}
            </li>
          ))}
        {showLoader && (
          <li className={optionClassName}>
            <Loader
              className="flex w-full justify-center"
              svgClasses="w-[15px] h-[15px]"
            />
          </li>
        )}
        {showMore && !showLoader && (
          <li className={optionClassName}>
            <button
              className="w-full text-left text-deep-blue-500"
              onClick={() => fetchNextPage()}
            >
              Show more
            </button>
          </li>
        )}
      </ul>
      <div
        className={classNames('flex border-t px-4 pt-4 text-[14px] font-medium text-slate-600', {
          'justify-end': !isSearchPrinting && !isEmptyList,
          'justify-start': isSearchPrinting || isEmptyList,
          'border-slate-100': !isSearchPrinting && !isEmptyList,
          'border-transparent': isSearchPrinting || isEmptyList,
        })}
      >
        {isSearchPrinting && 'Loading...'}
        {isEmptyList && !isLoading && 'No results'}
        {!isSearchPrinting && !isEmptyList && (
          <>
            {formatDecimal(options.length)} of {formatDecimal(totalItems)}
          </>
        )}
      </div>
    </ListMenu>
  );
}
