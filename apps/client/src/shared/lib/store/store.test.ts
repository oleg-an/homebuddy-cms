import { renderHook } from '@testing-library/react-hooks/dom';
import { act } from 'react-dom/test-utils';

import { useApiQueryActions } from './useApiQueryParamsStore';
import { useApiQueryParams } from './useApiQueryParamsStore';

describe('useApiQueryParamsStore', () => {
  test('initial state', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });

  test('set pagination', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setPagination({ limit: 10, page: 1 });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?limit=10&page=1');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: { limit: 10, page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });
  test('set sort', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setSort({ invoiceNumber: 'asc' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?invoiceNumber=asc');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: { invoiceNumber: 'asc' },
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });

  test('set default sort', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setDefaultSort({ invoiceNumber: 'asc' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: { invoiceNumber: 'asc' },
      defaultFilters: {},
    });

    act(() => {
      actions.result.current.setSort({});
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?invoiceNumber=asc');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: { invoiceNumber: 'asc' },
      search: '',
      arrayFilters: {},
      defaultSort: { invoiceNumber: 'asc' },
      defaultFilters: {},
    });
  });

  test('set filters', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setFilters({ from: '2022-01-30', to: '2022-10-30' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?from=2022-01-30&to=2022-10-30&page=1');
    expect(params.result.current).toStrictEqual({
      filters: { from: '2022-01-30', to: '2022-10-30' },
      pagination: { page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });

  test('set default filters', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setDefaultFilters({ test: 'default' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?test=default');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: { test: 'default' },
    });

    act(() => {
      actions.result.current.setFilters({ from: '2022-01-30', to: '2022-10-30' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?test=default&from=2022-01-30&to=2022-10-30&page=1');
    expect(params.result.current).toStrictEqual({
      filters: { from: '2022-01-30', to: '2022-10-30', test: 'default' },
      pagination: { page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: { test: 'default' },
    });

    act(() => {
      actions.result.current.setDefaultFilters({});
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?from=2022-01-30&to=2022-10-30&page=1');
    expect(params.result.current).toStrictEqual({
      filters: { from: '2022-01-30', to: '2022-10-30' },
      pagination: { page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });

  test('set search', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setSearch('hello');
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?page=1&search=hello');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: { page: 1 },
      sort: {},
      search: 'hello',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });
  test('replace sort', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setSort({ invoiceNumber: 'asc' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?invoiceNumber=asc');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: { invoiceNumber: 'asc' },
      defaultSort: {},
      search: '',
      arrayFilters: {},
      defaultFilters: {},
    });

    let newQueryString: string | null = '';

    act(() => {
      actions.result.current.setSort({ total: 'desc' });
      newQueryString = actions.result.current.getQueryString();
    });

    expect(newQueryString).toBe('?total=desc');
    expect(params.result.current).toStrictEqual({
      filters: {},
      pagination: {},
      sort: { total: 'desc' },
      defaultSort: {},
      search: '',
      arrayFilters: {},
      defaultFilters: {},
    });
  });

  test('replace filters', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setFilters({ from: '2022-01-30', to: '2022-10-30' });
      actions.result.current.replaceFilters({ test: 'test' });
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?test=test&page=1');
    expect(params.result.current).toStrictEqual({
      filters: { test: 'test' },
      pagination: { page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });

  test('remove filter', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setFilters({ from: '2022-01-30', to: '2022-10-30', test: 'test' });
      actions.result.current.removeFilter('test');
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?from=2022-01-30&to=2022-10-30&page=1');
    expect(params.result.current).toStrictEqual({
      filters: { from: '2022-01-30', to: '2022-10-30' },
      pagination: { page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });

  test('remove array of filters', () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const params = renderHook(() => useApiQueryParams());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const actions = renderHook(() => useApiQueryActions());

    let queryString: string | null = '';

    act(() => {
      actions.result.current.setFilters({ from: '2022-01-30', to: '2022-10-30', test: 'test' });
      actions.result.current.removeFilter(['from', 'to']);
      queryString = actions.result.current.getQueryString();
    });

    expect(queryString).toBe('?test=test&page=1');
    expect(params.result.current).toStrictEqual({
      filters: { test: 'test' },
      pagination: { page: 1 },
      sort: {},
      search: '',
      arrayFilters: {},
      defaultSort: {},
      defaultFilters: {},
    });
  });
});
