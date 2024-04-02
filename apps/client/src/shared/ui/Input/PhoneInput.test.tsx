import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { PhoneInput } from './PhoneInput';

const INPUT_VALUE = '1234567890';
const OUTPUT_VALUE = '(123) 456 7890';
const FIELD_NAME = 'phoneName';

const setup = (component: ReactNode) => {
  function Wrapper() {
    const formMethods = useForm({ defaultValues: { [FIELD_NAME]: '' } });
    const onSubmit = () => {
      formMethods.setError(FIELD_NAME, {
        type: 'test',
        message: 'error message',
      });
    };

    return (
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          {component}
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    );
  }

  render(<Wrapper />);

  const input = screen.getByLabelText(/phone/i) satisfies HTMLInputElement;
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  return { input, user };
};

describe('PhoneInput', () => {
  test('Input formatting PhoneInput functionality', async () => {
    const { input, user } = setup(<PhoneInput name={FIELD_NAME} />);

    await user.type(input, INPUT_VALUE);

    expect(input).toHaveValue(OUTPUT_VALUE);
  });

  test('Phone clear input functionality', async () => {
    const { input, user } = setup(<PhoneInput name={FIELD_NAME} />);

    await user.clear(input);

    expect(input).toHaveValue('');
  });

  test('Show error label', async () => {
    const { user } = setup(<PhoneInput name={FIELD_NAME} />);

    await user.click(screen.getByText(/submit/i));

    expect(screen.getByText(/phone/i)).toHaveClass('!text-red-500');
  });
});
