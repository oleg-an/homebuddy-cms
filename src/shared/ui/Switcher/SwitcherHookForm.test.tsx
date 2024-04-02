import { FormProvider, useForm } from 'react-hook-form';
import { SwitcherHookForm } from 'shared/ui/Switcher';
import { setup } from 'shared/lib/testing';

function SwitcherHookFormWrapper({ onSubmit }: { onSubmit: (params: { switcher: boolean }) => void }) {
  const methods = useForm({ defaultValues: { switcher: true } });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((params) => {
          onSubmit(params);
        })}
      >
        <SwitcherHookForm name="switcher" />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}

describe('SwitcherHookForm', () => {
  test('Set default value and check', async () => {
    const onSubmit = jest.fn();
    const { user, getByRole } = setup(<SwitcherHookFormWrapper onSubmit={onSubmit} />);

    await user.click(getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledWith({ switcher: true });
  });
});
