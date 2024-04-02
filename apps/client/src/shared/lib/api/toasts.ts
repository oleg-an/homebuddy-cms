import { showDefaultErrorToast, showErrorToast, showSuccessToast } from 'shared/lib/notifications';

import { getFirstError, isAxiosResponseError, isNonValidationErrorModel, isValidationErrorsModel } from './errors';

export interface ToastOptionsModel {
  successText?: string;
  errorOptions?: ErrorHandlingOptions;
}

type ErrorHandlingOptions = {
  showErrorToast?: boolean;
  showErrorPriority?: boolean;
  errorText?: string;
};

export const successHandler = <TResponse>(
  data: TResponse,
  successText?: ToastOptionsModel['successText']
): TResponse => {
  if (successText) {
    showSuccessToast(successText);
  }

  return data;
};

const showErrorToastByOptions = (err: unknown, options?: ToastOptionsModel['errorOptions']) => {
  if (options?.showErrorPriority && options.errorText) {
    showErrorToast(options.errorText);

    return;
  }

  if (!isAxiosResponseError(err)) {
    showDefaultErrorToast();

    return;
  }

  if (!options?.showErrorToast) {
    return;
  }

  if (options.errorText) {
    showErrorToast(options.errorText);

    return;
  }

  const errorBody = err.response.data;

  if (isNonValidationErrorModel(errorBody)) {
    showErrorToast(errorBody.error);

    return;
  }

  if (isValidationErrorsModel(errorBody)) {
    showErrorToast(getFirstError(errorBody));
  }
};

export const errorHandler = (err: unknown, options?: ErrorHandlingOptions) => {
  showErrorToastByOptions(err, options);

  return Promise.reject(err);
};
