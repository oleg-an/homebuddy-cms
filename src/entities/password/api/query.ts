import { usePostMutation } from 'shared/lib/api';

import type {
  CheckPasswordRequest,
  CheckPasswordResponse,
  CheckPasswordTokenData,
  ForgotPasswordData,
  ResetPasswordData,
} from '../model';

export const useForgotPassword = (apiRoute: string) => usePostMutation<ForgotPasswordData, {}>(apiRoute);

export const useResetPassword = (apiRoute: string) => usePostMutation<ResetPasswordData, {}>(apiRoute);

export const useCheckPasswordToken = (apiRoute: string) => usePostMutation<CheckPasswordTokenData, {}>(apiRoute);

export const useCheckPassword = (apiRoute: string) =>
  usePostMutation<CheckPasswordRequest, CheckPasswordResponse>(apiRoute);
