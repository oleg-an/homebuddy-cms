export enum PassWordValidationRules {
  uppercaseRule = 'uppercaseRule',
  lowercaseRule = 'lowercaseRule',
  numberRule = 'numberRule',
  minCharacterRule = 'minCharacterRule',
}

export type PasswordRulesKeys = keyof typeof PassWordValidationRules;

export interface CheckPasswordRequest {
  password: string;
}

export type CheckPasswordResponse = Array<keyof typeof PassWordValidationRules>;

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  email: string;
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface CheckPasswordTokenData {
  email: string;
  token: string;
}

export const PasswordValidationLabels: Record<PasswordRulesKeys, string> = {
  [PassWordValidationRules.uppercaseRule]: 'at least one uppercase letter',
  [PassWordValidationRules.lowercaseRule]: 'at least one lowercase letter',
  [PassWordValidationRules.numberRule]: 'a number',
  [PassWordValidationRules.minCharacterRule]: '8 characters minimum',
};
