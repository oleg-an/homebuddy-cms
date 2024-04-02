import { useEffect } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type { ApiType } from 'shared/lib/api';
import { Button } from 'shared/ui/Button';
import { PasswordInput } from 'shared/ui/Input';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

import { usePasswordValidation } from './hooks';
import { PasswordRules } from './PasswordRules';
import { useCreatePassword } from './UseCreatePassword';

interface CreatePasswordProps {
  apiType: ApiType;
}

export function CreatePassword({ apiType }: CreatePasswordProps) {
  const methods = useForm({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const useCreatePasswordQuery = useCreatePassword(methods, apiType);

  const formValues = useWatch({
    control: methods.control,
    name: ['password', 'passwordConfirmation'],
  });

  const [password, passwordConfirmation] = formValues;

  const { passwordRules } = usePasswordValidation({ password });
  const areFieldsEmpty = formValues.some((x) => !x.trim());

  const isSubmitDisabled =
    areFieldsEmpty || passwordConfirmation !== password || !passwordRules || passwordRules.length > 0;

  useEffect(() => {
    if (password.length && passwordConfirmation.length && passwordConfirmation !== password) {
      methods.setError('passwordConfirmation', {
        message: 'Passwords do not match, please try again',
      });
    } else {
      methods.clearErrors();
    }
  }, [password, passwordConfirmation, methods.setError]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(useCreatePasswordQuery.mutate)}>
        <div className="mb-5 w-85 text-lg font-semibold text-slate-900">Create new password</div>
        <PasswordInput
          className="mb-2 w-85"
          name="password"
          title="Password"
          debounceTime={300}
          {...getDataAutoTestAttributes(['input-create-password'])}
        />
        <PasswordInput
          className="mb-5 w-85"
          name="passwordConfirmation"
          title="Repeat password"
          {...getDataAutoTestAttributes(['input-create-repeat-password'])}
        />
        <PasswordRules
          className="mb-4"
          passwordRules={passwordRules}
        />

        <Button
          className="w-full"
          disabled={isSubmitDisabled}
          loading={useCreatePasswordQuery.isLoading}
          {...getDataAutoTestAttributes(['button-create-password-continue'])}
        >
          Continue
        </Button>
      </form>
    </FormProvider>
  );
}
