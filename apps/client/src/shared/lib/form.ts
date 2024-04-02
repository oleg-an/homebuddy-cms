import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form/dist/types/errors';

import { getKeys } from './object';

// We use ANY here because it is an original react-hook-form type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function form<TFieldValues extends FieldValues>(methods: UseFormReturn<TFieldValues, any>) {
  return !!getKeys(methods.formState.dirtyFields).length;
}

export function getInputError(object: FieldErrors, path: string): string {
  let result: FieldErrors | undefined = object;

  for (const property of path.split('.')) {
    result = result?.[property];
  }

  return (result?.message || '').toString();
}
