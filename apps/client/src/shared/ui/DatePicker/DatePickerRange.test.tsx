import React from 'react';
import { noop } from 'shared/lib/functions';
import { setup } from 'shared/lib/testing';

import { DatePickerRange } from './DatePickerRange';

const buildDate = (value: string) => {
  const date = new Date(`${value}`);

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

async function datePickerRangeTestBuilder({ dateRangeName, dateRange }: { dateRangeName: string; dateRange: Date[] }) {
  const mockOnChange = jest.fn();
  const { user, getByRole, queryByRole, getByText } = setup(
    <DatePickerRange
      placeholder="Date range"
      onChange={mockOnChange}
    />
  );

  expect(getByText('Date range')).toBeVisible();
  const openCalendarButton = getByRole('button', { name: 'Date range calendar_month' });

  await user.click(openCalendarButton);
  await user.click(getByRole('button', { name: dateRangeName }));

  expect(mockOnChange).toHaveBeenCalledWith([dateRange[0], dateRange[1]]);
  expect(queryByRole('button', { name: dateRangeName })).not.toBeInTheDocument();

  await user.click(openCalendarButton);
  expect(openCalendarButton).toHaveTextContent(`${formatDate(dateRange[0])} - ${formatDate(dateRange[1])}`);
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

describe('DatePickerRange', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(buildDate('2023-10-20'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('open datepicker, select "Today" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'Today',
      dateRange: [buildDate('2023-10-20'), buildDate('2023-10-20')],
    });
  });

  test('open datepicker, select "Yesterday" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'Yesterday',
      dateRange: [buildDate('2023-10-19'), buildDate('2023-10-19')],
    });
  });

  test('open datepicker, select "Last 7 days" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'Last 7 days',
      dateRange: [buildDate('2023-10-14'), buildDate('2023-10-20')],
    });
  });

  test('open datepicker, select "Last 30 days" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'Last 30 days',
      dateRange: [buildDate('2023-09-21'), buildDate('2023-10-20')],
    });
  });

  test('open datepicker, select "This month" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'This month',
      dateRange: [buildDate('2023-10-01'), buildDate('2023-10-20')],
    });
  });

  test('open datepicker, select "This year" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'This year',
      dateRange: [buildDate('2023-01-01'), buildDate('2023-10-20')],
    });
  });

  test('open datepicker, select "Last year" range, check onChange params', async () => {
    await datePickerRangeTestBuilder({
      dateRangeName: 'Last year',
      dateRange: [buildDate('2022-01-01'), buildDate('2022-12-31')],
    });
  });

  test('check datepicker header', async () => {
    const { user, getByRole, getByText, getByTestId } = setup(
      <DatePickerRange
        placeholder="Date range"
        onChange={noop}
      />
    );
    const openCalendarButton = getByRole('button', { name: 'Date range calendar_month' });

    await user.click(openCalendarButton);
    expect(getByTestId('TestId_datepickerTitle')).toHaveTextContent('October 2023');

    await user.click(getByText('chevron_left'));
    expect(getByTestId('TestId_datepickerTitle')).toHaveTextContent('September 2023');

    await user.click(getByText('chevron_right'));
    expect(getByTestId('TestId_datepickerTitle')).toHaveTextContent('October 2023');
  });
});
