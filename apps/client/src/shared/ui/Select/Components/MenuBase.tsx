import classNames from 'classnames';
import { Loader } from 'shared/ui/Loader';
import { useRef } from 'react';
import { SearchBar } from 'shared/ui/Select/SearchBar';
import { useIntersection } from 'react-use';
import type { Option } from 'shared/ui/Select';
import styles from 'shared/ui/Select/Select.module.scss';

import { ListMenu } from './Menu';

interface MenuBaseProps {
  className?: string;
  listClassName?: string;
  open: boolean;
  isSearch?: boolean;
  isLoading?: boolean;
  options: Option[];
  isCustomScrollbar?: boolean;
  search?: string;
  setSearch: (value: string) => void;
  getSelectList: () => JSX.Element[] | undefined;
}

export function MenuBase({
  open,
  className,
  isSearch,
  isLoading,
  options = [],
  isCustomScrollbar,
  search = '',
  listClassName,
  setSearch,
  getSelectList,
}: MenuBaseProps) {
  const scrollAnchor = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(scrollAnchor, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  const showBorder = intersection && intersection.intersectionRatio < 1;

  return (
    <ListMenu
      open={open}
      className={classNames('max-h-[160px]', className)}
      isSearch={isSearch}
    >
      {isLoading ? (
        <Loader className="flex justify-center" />
      ) : (
        <>
          {isSearch && (
            <SearchBar
              options={options}
              onInputChange={setSearch}
              value={search}
              className={classNames({ 'border-b-slate-100 border-b': showBorder })}
            />
          )}
          <div
            className={classNames(
              'max-h-[152px]',
              {
                [styles.list]: !isSearch,
                [styles.listWithSearch]: isSearch,
                'menu-scrollbar': isCustomScrollbar,
              },
              listClassName
            )}
          >
            <div ref={scrollAnchor} />
            {getSelectList()}
          </div>
        </>
      )}
    </ListMenu>
  );
}
