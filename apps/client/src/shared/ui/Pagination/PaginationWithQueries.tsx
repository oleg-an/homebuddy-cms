import { useApiQueryActions } from 'shared/lib/store';
import { urlResolver } from 'shared/lib/url';

import { PAGE_PARAM_NAME, LIMIT_PARAM_NAME } from './constants';
import type { PaginationModel } from './Pagination';
import { Pagination } from './Pagination';

interface PaginationWithQueriesProps extends Omit<PaginationModel, 'onChange' | 'currentPage'> {
  initialPage?: number;
  isDisabled?: boolean;
}

export function PaginationWithQueries(props: PaginationWithQueriesProps): JSX.Element | null {
  const { setPagination } = useApiQueryActions();

  const onChangeHandler = ({ page, itemsPerPage }: { page: number; offset: number; itemsPerPage: number }) => {
    setPagination({ limit: itemsPerPage, page });
    urlResolver.addParam(PAGE_PARAM_NAME, page.toString());
    urlResolver.addParam(LIMIT_PARAM_NAME, itemsPerPage.toString());
  };

  const lastPage =
    props.numOfItems && props.initialItemsPerPage ? Math.ceil(props.numOfItems / props.initialItemsPerPage) : 1;
  const isShow = props.numOfItems && (props.initialPage || 1) <= lastPage;

  return isShow ? (
    <>
      <Pagination
        {...props}
        currentPage={props.initialPage}
        onChange={onChangeHandler}
      />
    </>
  ) : null;
}
