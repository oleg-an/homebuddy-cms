import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { passwordRoutes, useForgotPassword } from 'entities/password';
import type { ApiType } from 'shared/lib/api';
import { pageRoutes } from 'shared/routes';
import { Button } from 'shared/ui/Button';
import { FormErrors } from 'shared/ui/FormErrors';
import { Input } from 'shared/ui/Input';
import { MaterialIcon } from 'shared/ui/MaterialIcon';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { isString } from 'shared/lib/type-guards';

interface PasswordRecoveryProps {
  apiType: ApiType;
}

export function PasswordRecovery({ apiType }: PasswordRecoveryProps) {
  const methods = useForm<{ email: string }>();
  const [isEmailWasSent, setIsEmailWasSent] = useState(false);
  const forgotPasswordQuery = useForgotPassword(passwordRoutes[apiType].forgotPassword);

  useEffect(() => {
    if (isString(forgotPasswordQuery.data)) {
      setIsEmailWasSent(true);
    }
  }, [forgotPasswordQuery.data]);

  return (
    <>
      {!isEmailWasSent && (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((value) =>
              forgotPasswordQuery.mutate({
                payload: value,
              })
            )}
          >
            <div className="mb-2 w-85 text-lg font-semibold text-slate-900">Password recovery</div>
            <div className="mb-5 text-sm">Enter your email</div>
            <FormErrors error={forgotPasswordQuery.error} />
            <Input
              className="mb-2"
              name="email"
              title="Email"
              {...getDataAutoTestAttributes(['input-password-recovery-email'])}
            />
            <div className="mb-5 flex items-center justify-between text-sm font-medium text-deep-blue-500">
              <Link
                to={pageRoutes.app.auth}
                {...getDataAutoTestAttributes(['link-password-recovery-back']).attributes}
              >
                Back to Login
              </Link>
              <Link
                to=""
                className="hidden"
                {...getDataAutoTestAttributes(['link-password-recovery-contact-support']).attributes}
              >
                Forgot email? Contact support
              </Link>
            </div>
            <Button
              className="w-full"
              loading={forgotPasswordQuery.isLoading}
              {...getDataAutoTestAttributes(['button-password-recovery-send'])}
            >
              Send instructions
            </Button>
          </form>
        </FormProvider>
      )}
      {isEmailWasSent && (
        <>
          <div className="mb-2 flex items-center">
            <MaterialIcon
              className="mr-2 text-[24px] text-deep-blue-500"
              type="outlined"
            >
              mark_email_unread
            </MaterialIcon>
            <div className="text-lg font-semibold text-slate-900">Email was sent</div>
          </div>
          <div className="text-sm">
            Click on the link that has just been sent to your email address to reset password. It may be in your spam
            folder.
          </div>
        </>
      )}
    </>
  );
}
