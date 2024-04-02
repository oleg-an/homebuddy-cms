import { useEffect, useRef } from 'react';
import { useApiQueryParams } from 'shared/lib/store';
import { getKeys } from 'shared/lib/object';
import { urlResolver } from 'shared/lib/url';

import { PAGE_PARAM_NAME } from './constants';

export function PaginationUrlParams() {
  const { filters, search, arrayFilters } = useApiQueryParams();
  const prevFiltersCount = useRef(0);

  useEffect(() => {
    const filtersCount = getKeys(Object.assign({}, filters, arrayFilters)).length || search?.length;

    if (prevFiltersCount.current !== filtersCount) {
      const pageParam = new URLSearchParams(window.location.search).get(PAGE_PARAM_NAME);

      if (Number(pageParam) > 1) {
        urlResolver.addParam(PAGE_PARAM_NAME, '1');
      }
    }

    prevFiltersCount.current = filtersCount || 0;
  }, [filters, arrayFilters, search]);

  return null;
}
