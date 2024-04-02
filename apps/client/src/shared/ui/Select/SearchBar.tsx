import classNames from 'classnames';
import { useRef, useEffect } from 'react';

import style from './Select.module.scss';

interface Option {
  id: string;
  text: string;
}

interface MenuSearchProps {
  options?: Option[];
  onInputChange: (searchText: string) => void;
  className?: string;
  value: string;
  showEmptyMessage?: boolean;
}

export function SearchBar({ options = [], onInputChange, value, className, showEmptyMessage = true }: MenuSearchProps) {
  const optionsToRender = options.filter((option) => option.text.toLowerCase().includes(value.trim().toLowerCase()));
  const hasResults = optionsToRender.length > 0;
  const isEmpty = !hasResults && showEmptyMessage;

  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className={className}>
      <div className={classNames('bg-white py-2 px-4 rounded-t-sm')}>
        <input
          className={style.search}
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleSearch}
          onKeyDownCapture={(e) => {
            if (e.key === ' ') {
              e.stopPropagation();
            }
          }}
          ref={searchInput}
        />
      </div>
      {isEmpty && <span className="pl-4 text-sm font-medium">No results</span>}
    </div>
  );
}
