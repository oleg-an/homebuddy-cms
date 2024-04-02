import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import type { ValidationErrorsItemModel } from 'shared/lib/api';
import { ToastContainer } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { SideModalContainer } from 'shared/ui/SideModal';

export function setup(jsx: React.ReactElement, options?: { withFormProvider?: boolean }) {
  function Wrapper() {
    const methods = useForm();
    const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());

    return (
      <>
        <SideModalContainer />
        <ToastContainer />
        {options?.withFormProvider ? (
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>{jsx}</form>
          </FormProvider>
        ) : (
          jsx
        )}
      </>
    );
  }

  const view = render(<Wrapper />);
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  return { user, ...view };
}

export function getErrorResponse(errors: Record<string, ValidationErrorsItemModel[]>) {
  return {
    error: {
      response: { data: { errors } },
    },
  };
}
