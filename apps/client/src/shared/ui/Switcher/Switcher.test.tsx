import { setup } from 'shared/lib/testing';

import { Switcher } from './Switcher';

describe('Switcher', () => {
  test('Check onChange prop', async () => {
    const onChange = jest.fn();
    const { user, getByTestId } = setup(
      <Switcher
        name="switcher"
        onChange={onChange}
      />
    );

    await user.click(getByTestId('TestId__switcher'));
    expect(onChange).toHaveBeenCalledWith(true);

    await user.click(getByTestId('TestId__switcher'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test('Check init value', async () => {
    const onChange = jest.fn();
    const { getByTestId } = setup(
      <Switcher
        checked
        name="switcher"
        onChange={onChange}
      />
    );

    expect(getByTestId('TestId__switcher')).toHaveAttribute('data-checked', 'true');
  });
});
