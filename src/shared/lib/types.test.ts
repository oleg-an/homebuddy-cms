import { isBoolean, isFunction, isNull, isNumber, isObject, isString } from './type-guards';

describe('isObject type guard', () => {
  test('returns true for objects', () => {
    expect(isObject({})).toBe(true);
  });

  test('returns false for primitives', () => {
    expect(isObject(null)).toBe(false);
  });
});

describe('isNumber type guard', () => {
  test('returns true for numbers', () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
  });

  test('returns false for not numbers', () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber('foo')).toBe(false);
  });
});

describe('isString type guard', () => {
  test('returns true for strings', () => {
    expect(isString('foo')).toBe(true);
    expect(isString('42')).toBe(true);
    expect(isString('')).toBe(true);
  });

  test('returns false for not strings', () => {
    expect(isString(42)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(/foo/)).toBe(false);
  });
});

describe('isNull type guard', () => {
  test('returns true for null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('returns false for not null', () => {
    expect(isNull(42)).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNull({})).toBe(false);
  });
});

describe('isFunction type guard', () => {
  test('returns true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(Object.assign)).toBe(true);
  });

  test('returns false for not functions', () => {
    expect(isFunction(42)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction({})).toBe(false);
  });
});

describe('isBoolean type guard', () => {
  test('returns true for boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  test('returns false for not functions', () => {
    expect(isBoolean(42)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean('false')).toBe(false);
  });
});
