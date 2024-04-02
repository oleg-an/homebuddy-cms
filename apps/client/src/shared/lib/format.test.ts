import { formatTrafficDays, formatTrafficHours, parseDateValue } from './format';

const DATE_VALUE = '2023-02-13 15:24:22';
const PARSED_VALUE = '02/13/2023 15:24';
const PARSED_VALUE_WITH_PERIOD = '02/13/2023 15:24pm';
const PARSED_VALUE_ONLY_DATE = '02/13/2023';
const ERROR_MESSAGE = 'parseDateValue: Invalid time value';

describe('parseDateValue', () => {
  test('returns correct parsed string', () => {
    const result = parseDateValue(DATE_VALUE);

    expect(result).toBe(PARSED_VALUE);
  });

  test('returns correct parsed string with period', () => {
    const result = parseDateValue(DATE_VALUE, 'withPeriod');

    expect(result).toBe(PARSED_VALUE_WITH_PERIOD);
  });

  test('returns correct parsed string only date', () => {
    const result = parseDateValue(DATE_VALUE, 'onlyDate');

    expect(result).toBe(PARSED_VALUE_ONLY_DATE);
  });

  test('throw error if value is not a string', () => {
    expect(() => parseDateValue(null)).toThrow(ERROR_MESSAGE);
  });
});

describe('formatTrafficDays', () => {
  it('should return formatted days', () => {
    const days = 'monday-friday';
    const expected = 'Mon - Fri';
    const result = formatTrafficDays(days);

    expect(result).toEqual(expected);
  });
});

describe('formatTrafficHours', () => {
  it('should return formatted hours am', () => {
    const hours = '2:00am';
    const expected = /\d{2}:\d{2} (am|pm)/;
    const result = formatTrafficHours(hours);

    expect(result).toMatch(expected);
  });

  it('should return formatted hours pm', () => {
    const hours = '1:00pm';

    const expected = /\d{2}:\d{2} (am|pm)/;
    const result = formatTrafficHours(hours);

    expect(result).toMatch(expected);
  });
});
