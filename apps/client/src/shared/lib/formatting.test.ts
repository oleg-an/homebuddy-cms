import { capitalizeFirstLetter, getTimezoneName, getTrimmedPhone } from 'shared/lib/formatting';

describe('capitalizeFirstLetter', () => {
  test('first letter should be capitalized', () => {
    const string = 'hello world';

    expect(capitalizeFirstLetter(string)).toBe('Hello world');
  });

  test('should return empty string with empty string as argument', () => {
    const string = '';

    expect(capitalizeFirstLetter(string)).toBe('');
  });
});

test('Pass phone value from a field and trim it', () => {
  expect(getTrimmedPhone('(937) 409 8511')).toEqual('9374098511');
});

test('Timezone is transformed correctly', () => {
  expect(getTimezoneName('America/New_York')).toEqual('(UTC -4) ET, Eastern Time (New York)');
  expect(getTimezoneName('America/Chicago')).toEqual('(UTC -5) CT, Central Time (Chicago)');
  expect(getTimezoneName('America/Denver')).toEqual('(UTC -6) MT, Mountain Time (Salt Lake City)');
  expect(getTimezoneName('America/Los_Angeles')).toEqual('(UTC -7) PT, Pacific Time (Los Angeles)');
  expect(getTimezoneName('America/Phoenix')).toEqual('(UTC -7) MT, Mountain Time (Phoenix)');
  expect(getTimezoneName('Unknown/Timezone')).toEqual(undefined);
});
