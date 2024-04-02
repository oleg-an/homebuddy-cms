import classNames from 'classnames';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { profileRoutes, useLogin, WrongCredentialsErrorMessage } from 'entities/profile';
import type { IssueTokenRequestModel } from 'entities/profile';
import type { ApiType } from 'shared/lib/api';
import { pageRoutes } from 'shared/routes';
import { Button } from 'shared/ui/Button';
import { Checkbox } from 'shared/ui/Checkbox';
import { Input } from 'shared/ui/Input';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import type { Roles } from 'shared/lib/store';

export function Login({ apiType, role }: { apiType: ApiType; role: Roles }) {
  const methods = useForm<IssueTokenRequestModel>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { submit, loading } = useLogin(profileRoutes[apiType].getToken, role, methods);
  const [email, password] = methods.watch(['email', 'password']);

  const isDisabled = Object.values([email, password]).some((x) => !x.trim());

  const isFieldHasWrongCredentials = (field: 'email' | 'password') =>
    methods.formState.errors[field]?.message === WrongCredentialsErrorMessage;

  useEffect(() => {
    if (isFieldHasWrongCredentials('password')) {
      methods.clearErrors();
    }
  }, [email]);

  useEffect(() => {
    if (isFieldHasWrongCredentials('email')) {
      methods.clearErrors();
    }
  }, [password]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <Input
          isErrorMessageHidden={isFieldHasWrongCredentials('email')}
          isDisabled={loading}
          className={classNames('mb-2 w-85', {
            'pointer-events-none': loading,
          })}
          name="email"
          title="Email"
          hasMinimizedLabelOnly
          {...getDataAutoTestAttributes(['input-login-email'])}
        />
        <Input
          className={classNames('mb-4 w-85', {
            'pointer-events-none': loading,
          })}
          name="password"
          title="Password"
          type="password"
          hasMinimizedLabelOnly
          {...getDataAutoTestAttributes(['input-login-password'])}
        />
        <div className="mb-5 flex items-center justify-between">
          <Checkbox
            isDisabled={loading}
            name="rememberMe"
            {...getDataAutoTestAttributes(['checkbox-login-remember-me'])}
          >
            <span className="text-sm">Remember me</span>
          </Checkbox>
          <Link
            to={pageRoutes.app.recovery}
            className="text-sm font-medium text-deep-blue-500"
            {...getDataAutoTestAttributes(['href-login-forgot-password']).attributes}
          >
            Forgot password?
          </Link>
        </div>
        <Button
          className="w-full"
          loading={loading}
          disabled={isDisabled}
          {...getDataAutoTestAttributes(['button-login'])}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
