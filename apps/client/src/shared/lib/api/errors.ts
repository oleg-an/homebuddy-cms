import { getKeys } from 'shared/lib/object';
import { isNumber, isObject, isString } from 'shared/lib/type-guards';

import type {
  AxiosResponseErrorModel,
  ErrorsModel,
  NonValidationErrorModel,
  ValidationErrorsItemModel,
  ValidationErrorsModel,
} from './model';

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong! Please try again later or contact the support team';

export const isValidationErrorsModel = (obj: unknown): obj is ValidationErrorsModel =>
  isObject(obj) && 'errors' in obj && isObject(obj.errors) && !!getKeys(obj.errors).length;

export const isNonValidationErrorModel = (obj: unknown): obj is NonValidationErrorModel =>
  isObject(obj) && 'error' in obj && isString(obj.error);

export const isErrorsModel = (obj: unknown): obj is ErrorsModel => {
  return isValidationErrorsModel(obj) || isNonValidationErrorModel(obj);
};

export const isResponseError = (err: unknown): err is { response: Response } =>
  isObject(err) && 'response' in err && err.response instanceof Response;

export const isAxiosResponseError = (err: unknown): err is AxiosResponseErrorModel => {
  return (
    isObject(err) &&
    'response' in err &&
    isObject(err.response) &&
    'status' in err.response &&
    'data' in err.response &&
    isNumber(err.response.status) &&
    isErrorsModel(err.response.data)
  );
};

export const getFirstValidationError = (errors: ValidationErrorsModel['errors']): ValidationErrorsItemModel => {
  const error = Object.values(errors)[0];

  if (error) {
    return error[0];
  }

  return { code: 'empty_error_response', message: DEFAULT_ERROR_MESSAGE };
};

export function getResponseErrors(errResponse: AxiosResponseErrorModel): ValidationErrorsModel['errors'] | string {
  const errObj = errResponse.response.data;

  if (isValidationErrorsModel(errObj)) {
    return errObj.errors;
  }

  return isNonValidationErrorModel(errObj) ? errObj.error : DEFAULT_ERROR_MESSAGE;
}

// Helper for use within getResponseError
// Example can be seen in useCreatePassword.tsx
export function isNonValidationErrorBody(errors: ValidationErrorsModel['errors'] | string): errors is string {
  return isString(errors);
}

export function getFirstError(err: ErrorsModel): string {
  return isValidationErrorsModel(err) ? getFirstValidationError(err.errors).message : err.error;
}
