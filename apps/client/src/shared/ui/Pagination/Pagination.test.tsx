import { screen, act } from '@testing-library/react';
import { setup } from 'shared/lib/testing';

import { Pagination } from './Pagination';

const NUM_OF_ITEMS = 389;

describe('Pagination', () => {
  test('click next page button', async () => {
    const handleOnChange = jest.fn();

    const { user } = setup(
      <Pagination
        numOfItems={NUM_OF_ITEMS}
        onChange={handleOnChange}
      />
    );

    await user.click(screen.getByText('chevron_right'));

    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 25,
        offset: 26,
        page: 2,
      });
    });
  });

  test('click last page button', async () => {
    const handleOnChange = jest.fn();

    const { user } = setup(
      <Pagination
        numOfItems={NUM_OF_ITEMS}
        onChange={handleOnChange}
      />
    );

    await user.click(screen.getByText('last_page'));
    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 25,
        offset: 376,
        page: 16,
      });
    });
  });
  test('click prev page button', async () => {
    const handleOnChange = jest.fn();

    const { user } = setup(
      <Pagination
        numOfItems={NUM_OF_ITEMS}
        onChange={handleOnChange}
        currentPage={2}
      />
    );

    await user.click(screen.getByText('chevron_left'));
    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 25,
        offset: 1,
        page: 1,
      });
    });
  });

  test('click first page button', async () => {
    const handleOnChange = jest.fn();

    const { user } = setup(
      <Pagination
        numOfItems={NUM_OF_ITEMS}
        onChange={handleOnChange}
        currentPage={2}
      />
    );

    await user.click(screen.getByText('last_page'));
    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 25,
        offset: 376,
        page: 16,
      });
    });

    await user.click(screen.getByText('first_page'));
    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 25,
        offset: 1,
        page: 1,
      });
    });
  });
  test('change items num on page to 25', async () => {
    const handleOnChange = jest.fn();

    const { getByText, user } = setup(
      <Pagination
        numOfItems={389}
        onChange={handleOnChange}
      />
    );

    await user.click(screen.getByText('expand_more'));
    await user.click(screen.getByText('50'));

    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 50,
        offset: 1,
        page: 1,
      });
    });

    expect(getByText(`Showing 1-50 of ${NUM_OF_ITEMS}`)).toBeVisible();
  });
  test('change items num on page to 50', async () => {
    const handleOnChange = jest.fn();

    const { getByText, user } = setup(
      <Pagination
        numOfItems={389}
        onChange={handleOnChange}
      />
    );

    await user.click(screen.getByText('expand_more'));
    await user.click(screen.getByText('50'));

    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 50,
        offset: 1,
        page: 1,
      });
    });

    expect(getByText(`Showing 1-50 of ${NUM_OF_ITEMS}`)).toBeVisible();
  });

  test('change items num on page to 100', async () => {
    const handleOnChange = jest.fn();

    const { getByText, user } = setup(
      <Pagination
        numOfItems={389}
        onChange={handleOnChange}
      />
    );

    await user.click(screen.getByText('expand_more'));
    await user.click(screen.getByText('100'));

    await act(async () => {
      expect(handleOnChange).toHaveBeenCalledWith({
        itemsPerPage: 100,
        offset: 1,
        page: 1,
      });
    });

    expect(getByText(`Showing 1-100 of ${NUM_OF_ITEMS}`)).toBeVisible();
  });
});
