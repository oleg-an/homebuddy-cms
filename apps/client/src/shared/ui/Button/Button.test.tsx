import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { setup } from 'shared/lib/testing';

import { Button } from './Button';

describe('Common Button', () => {
  test('show button', () => {
    setup(<Button />);

    const button = screen.getByRole('button');

    expect(button).toBeVisible();
  });

  test('click button', async () => {
    const clickHandler = jest.fn();

    const { user } = setup(<Button onClick={clickHandler} />);

    const button = screen.getByRole('button');

    await user.click(button);

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  test('show button with loader', () => {
    setup(<Button loading />);

    const loader = screen.getByText(/loading/i);

    expect(loader).toBeVisible();
  });

  test('show disabled button', () => {
    setup(<Button disabled />);

    const button = screen.getByRole('button');

    expect(button).toBeDisabled();
  });
});
