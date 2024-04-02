export const isObject = (obj: unknown): obj is object => typeof obj === 'object' && obj !== null;

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isEmptyString = (val: unknown) => isString(val) && val === '';

export const isNull = (value: unknown): value is null => value === null;

export const isFunction = (value: unknown): value is Function => typeof value === 'function';

export const isBoolean = (value: unknown): value is Boolean => typeof value === 'boolean';

export const exhaustiveMatchingGuard = (): never => {
  throw new Error('Should not have reached here');
};
