import type { ErrorsModel } from 'shared/lib/api';
import { getFirstValidationError, isValidationErrorsModel } from 'shared/lib/api';

export const getRunCampaignError = (err: ErrorsModel) => {
  if (!isValidationErrorsModel(err)) {
    return err.error;
  }

  if (err.errors.isActive) {
    const [{ message }] = err.errors.isActive;

    return message;
  }

  return getFirstValidationError(err.errors).message;
};
