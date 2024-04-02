import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

import { ITEMS_PER_PAGE_LIST, DEFAULT_ITEMS_PER_PAGE } from './constants';
import { PageSelector } from './PageSelector';
import { PaginationButton } from './PaginationButton';

export interface PaginationModel {
  className?: string;
  currentPage?: number;
  initialItemsPerPage?: number;
  itemsPerPageList?: number[];
  numOfItems?: number;
  isDisabled?: boolean;
  onPageBtnClickCb?: (pageNum: number) => void;
  onChange: ({ page, offset, itemsPerPage }: { page: number; offset: number; itemsPerPage: number }) => void;
}

export function Pagination({
  className,
  currentPage = 1,
  initialItemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  itemsPerPageList = ITEMS_PER_PAGE_LIST,
  numOfItems = 0,
  onPageBtnClickCb,
  onChange,
  isDisabled,
}: PaginationModel): JSX.Element {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  useEffect(() => {
    setItemsPerPage(initialItemsPerPage);
  }, [initialItemsPerPage]);

  const getOffset = (page: number) => {
    return (page - 1) * itemsPerPage + 1;
  };

  const onChangeHandler = (page: number, itemsPerPage: number) => {
    onChange({
      page,
      offset: getOffset(page),
      itemsPerPage,
    });
  };

  const getShowingText = () => {
    const lastItemOnPage = getOffset(currentPage) + itemsPerPage - 1;

    return `Showing ${getOffset(currentPage)}-${
      lastItemOnPage < numOfItems ? lastItemOnPage : numOfItems
    } of ${numOfItems}`;
  };

  const isFirstPage = currentPage === 1;
  const lastPage = Math.ceil(numOfItems / itemsPerPage);
  const isLastPage = currentPage === lastPage;

  const getPageClickHandler = (pageNum: number) => {
    return () => {
      onChangeHandler(pageNum, itemsPerPage);
    };
  };

  const onFirstPageClick = getPageClickHandler(1);
  const onPrevPageClick = getPageClickHandler(currentPage - 1);
  const onCurPageClick = () => onPageBtnClickCb?.(currentPage);
  const onNextPageClick = getPageClickHandler(currentPage + 1);
  const onLastPageClick = getPageClickHandler(lastPage);

  const onAfterSelectCb = (showOnPage: number) => {
    const newPage = 1;

    setItemsPerPage(showOnPage);

    onChangeHandler(newPage, showOnPage);
  };

  return (
    <div
      className={classNames(className, 'min-w-[600px]', {
        'pointer-events-none': isDisabled,
      })}
    >
      <div className="relative flex items-center justify-between">
        <div className="text-sm font-medium text-slate-300">{getShowingText()}</div>
        <div className="absolute left-1/2 flex -translate-x-1/2 justify-start">
          <PaginationButton
            type="first"
            onClick={onFirstPageClick}
            isDisabled={isFirstPage || isDisabled}
            {...getDataAutoTestAttributes(['pagination-button-first'])}
          />
          <PaginationButton
            className="ml-1"
            type="prev"
            onClick={onPrevPageClick}
            isDisabled={isFirstPage || isDisabled}
            {...getDataAutoTestAttributes(['pagination-button-prev'])}
          />
          <PaginationButton
            className="ml-1"
            type="current"
            pageNumber={currentPage}
            isClickBlocked={!onPageBtnClickCb}
            onClick={onCurPageClick}
            isDisabled={isDisabled}
            {...getDataAutoTestAttributes(['pagination-button-current'])}
          />
          <PaginationButton
            className="ml-1"
            type="next"
            onClick={onNextPageClick}
            isDisabled={isLastPage || isDisabled}
            {...getDataAutoTestAttributes(['pagination-button-next'])}
          />
          <PaginationButton
            className="ml-1"
            type="last"
            onClick={onLastPageClick}
            isDisabled={isLastPage || isDisabled}
            {...getDataAutoTestAttributes(['pagination-button-last'])}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="text-sm font-medium text-slate-300">Show on page</div>
          <PageSelector
            className="ml-4"
            onSelectChange={onAfterSelectCb}
            itemsPerPage={itemsPerPage}
            itemsPerPageList={itemsPerPageList}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
}
