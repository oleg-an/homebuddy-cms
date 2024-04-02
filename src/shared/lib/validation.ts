import type { RegisterOptions } from 'react-hook-form';

export const emailRegisterOptions: RegisterOptions = {
  required: 'Please enter email address',
};

export const companyNameRegisterOptions: RegisterOptions = {
  required: 'Enter your company name',
  validate: (companyName: string) => {
    companyName = companyName.trim();
    if (!companyName) {
      return 'Enter your company name';
    }
    if (companyName.length >= 64) {
      return 'The maximum number of characters is 64';
    }

    return true;
  },
};

export const companyNameRegisterOptionsOnlyEmpty: RegisterOptions = {
  required: 'Enter your company name',
};
