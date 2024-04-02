import { noop, buildArrayQueryString } from './functions';

test('noop returns undefined', () => {
  expect(noop()).toBeUndefined();
});

test('buildArrayQueryString returns valid string', () => {
  expect(buildArrayQueryString('cars[]', ['Saab', 'Audi'])).toBe('cars[]=Saab&cars[]=Audi');
});
