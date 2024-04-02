export const EMPTY_OBJECT = {};
export const EMPTY_ARRAY = [];

// Use this function instead of Object.keys directly (only if you sure that no additional keys will be inside the object), as "getKeys" has extended return type (returns not only string[], but only the keyof given object)
// LIMITATIONS: https://stackoverflow.com/questions/55012174/why-doesnt-object-keys-return-a-keyof-type-in-typescript
export const getKeys = <T extends object>(obj: T): (keyof T)[] =>
  // eslint-disable-next-line no-restricted-properties
  Object.keys(obj) as (keyof T)[];
