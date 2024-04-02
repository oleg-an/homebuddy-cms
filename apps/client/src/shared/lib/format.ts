import { isString } from 'shared/lib/type-guards';
import { formatDecimal } from 'shared/lib/formatting';

export const DATEPICKER_DATE_FORMAT = 'yyyy-MM-dd';
export const CALENDAR_DATE_FORMAT = 'MM/dd/yyyy';

export const endOfDay = (dirtyDate: Date) => {
  const actualDate = new Date(dirtyDate);
  const endOfDayDate = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate(), 23, 59, 59);

  return endOfDayDate;
};

export const getFormattedDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const getDayName = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long' });
};

export const getCurrentYear = () => new Date().getFullYear();

export const getPendingDate = (date?: string | null) => {
  if (!date) {
    return '';
  }

  return parseDateValue(date);
};

export const getHistoryEventDate = (date: string) => {
  return parseDateValue(date, 'withPeriod');
};

/**
 * Returns date string in one of the formats:
 * default - MM/dd/yyyy HH:mm (02/13/2023 15:24)
 * with period - MM/dd/yyyy HH:mm:pm (02/13/2023 15:24pm)
 * only date - MM/dd/yyyy (02/13/2023)
 * @param value - date value from backend in format - YYYY-MM-DD HH:mm:ss (2023-02-13 15:24:22)
 * @param type - withPeriod | onlyDate
 * withPeriod - value to show time period (am/pm)
 * onlyDate - value to show only date
 */
export function parseDateValue(value: string | null, type: 'withPeriod' | 'onlyDate' | '' = '') {
  if (!isString(value)) {
    throw new Error('parseDateValue: Invalid time value');
  }

  let [date, time] = value.split(' ');
  let [year, month, day] = date.split('-');
  let [hour, minute] = time.split(':');

  if (type === 'onlyDate') {
    return `${month}/${day}/${year}`;
  }

  if (type === 'withPeriod') {
    let period = Number(hour) > 12 ? 'pm' : 'am';

    return `${month}/${day}/${year} ${hour}:${minute}${period}`;
  }

  return `${month}/${day}/${year} ${hour}:${minute}`;
}

const formatDateMMddyyyy = (date: Date): string => {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return `${month}/${day}/${year}`;
};

const formatDateyyyyMMdd = (date: Date): string => {
  const dateObject = new Date(date);
  let month = `${dateObject.getMonth() + 1}`;
  let day = `${dateObject.getDate()}`;
  const year = dateObject.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export const format = (date: Date, format: string) => {
  if (format === DATEPICKER_DATE_FORMAT) {
    return formatDateyyyyMMdd(date);
  }

  if (format === CALENDAR_DATE_FORMAT) {
    return formatDateMMddyyyy(date);
  }

  throw new Error(`Date format ${format} in not supported`);
};

export const getDefaultStartDate = () => {
  return getLast30DateRange()[0];
};

export const getDefaultEndDate = () => {
  return getLast30DateRange()[1];
};

export function getLast30DateRange() {
  const endDate = new Date();
  const startDate = new Date();

  startDate.setDate(endDate.getDate() - 29);

  return [startDate, endDate];
}

export const isFloat = (value: number) => {
  if (typeof value === 'number' && !Number.isNaN(value) && !Number.isInteger(value)) {
    return true;
  }

  return false;
};

export const formatNumberToView = (value: string | number, toFixed?: number): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (isFloat(value)) {
    return value.toFixed(toFixed).replace('.', ',');
  }

  return formatDecimal(value);
};

export const formatTrafficDays = (days: string): string => {
  const daysArray = days.split('-');

  return daysArray
    .map((dayStr) => {
      const day = dayStr.charAt(0).toUpperCase() + dayStr.slice(1, 3);

      return day;
    })
    .join(' - ');
};

export const formatTrafficHours = (time: string): string => {
  const [hours, minutes] = time.split(':');

  return `${hours.padStart(2, '0')}:${minutes.slice(0, 2)} ${minutes.slice(2)}`;
};

export const formatDate = (dateStr: string) => {
  const newDateStr = dateStr.length === 6 ? `0${dateStr}` : dateStr;

  return newDateStr;
};

export const transformZipCount = (zipCount: number) => {
  return formatNumberToView(zipCount);
};

export const centsToDollars = (cents: number) => cents / 100;
