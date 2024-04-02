import { getLast30DateRange } from 'shared/lib/format';

export function getZeroTimeDate(date: Date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export type PickerValue = Date | null;

type DateRangesNames =
  | 'Today'
  | 'Yesterday'
  | 'Last 7 days'
  | 'Last 30 days'
  | 'This month'
  | 'Last month'
  | 'This year'
  | 'Last year';

export const DATE_RANGES: { name: DateRangesNames; getValue: () => PickerValue[] }[] = [
  {
    name: 'Today',
    getValue: () => {
      return [new Date(), new Date()];
    },
  },
  {
    name: 'Yesterday',
    getValue: () => {
      const date = new Date();

      date.setDate(date.getDate() - 1);

      return [date, date];
    },
  },
  {
    name: 'Last 7 days',
    getValue: () => {
      const endDate = new Date();
      const startDate = new Date();

      startDate.setDate(endDate.getDate() - 6);

      return [startDate, endDate];
    },
  },
  {
    name: 'Last 30 days',
    getValue: () => {
      return getLast30DateRange();
    },
  },
  {
    name: 'This month',
    getValue: () => {
      const currentDate = new Date();
      const startDate = new Date(currentDate);

      startDate.setDate(1);

      return [startDate, currentDate];
    },
  },
  {
    name: 'Last month',
    getValue: () => {
      const startDate = new Date();
      const endDate = new Date();

      startDate.setDate(1);
      startDate.setMonth(startDate.getMonth() - 1);

      return [startDate, new Date(endDate.getFullYear(), endDate.getMonth(), 0)];
    },
  },
  {
    name: 'This year',
    getValue: () => {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);

      return [startDate, currentDate];
    },
  },
  {
    name: 'Last year',
    getValue: () => {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
      const endDate = new Date(currentDate.getFullYear() - 1, 12, 0);

      return [startDate, endDate];
    },
  },
];

export function isDateRangesEquals(range1: PickerValue[], range2: PickerValue[]) {
  if (!range1[0] || !range1[1] || !range2[0] || !range2[1]) {
    return false;
  }

  return (
    getZeroTimeDate(range1[0]).getTime() === getZeroTimeDate(range2[0]).getTime() &&
    getZeroTimeDate(range1[1]).getTime() === getZeroTimeDate(range2[1]).getTime()
  );
}
