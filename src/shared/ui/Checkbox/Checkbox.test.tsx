import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import '@testing-library/jest-dom';

import { Checkbox } from './Checkbox';
import type { CheckboxProps } from './interfaces';

function HookFormWrapper(props: CheckboxProps) {
  const methods = useForm({ defaultValues: { [props.name]: false } });

  return (
    <FormProvider {...methods}>
      <Checkbox {...props} />
    </FormProvider>
  );
}

describe('Checkbox component', () => {
  function setup(jsx: JSX.Element) {
    return {
      user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
      ...render(jsx),
    };
  }

  test('should render the checkbox', () => {
    render(<HookFormWrapper name="test" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('should have the disabled class', () => {
    const { container } = setup(
      <HookFormWrapper
        name="test"
        isDisabled
      />
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.querySelector('label')).toHaveClass('disabled');
  });

  test('should be checked when user clicks on it', async () => {
    const { user } = setup(<HookFormWrapper name="test" />);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('should have indeterminate_check_box icon when isPartial is true and user clicks on it', async () => {
    const { user } = setup(
      <HookFormWrapper
        name="test"
        isPartial
      />
    );

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    const checkboxIcon = screen.getByText('indeterminate_check_box');

    expect(checkboxIcon).toBeInTheDocument();
  });
});
