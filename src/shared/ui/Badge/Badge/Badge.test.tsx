import { screen } from '@testing-library/react';
import { setup } from 'shared/lib/testing';

import { Badge } from './Badge';

describe('Badge component', () => {
  test('works correctly with only required props', () => {
    setup(
      <Badge
        text="Overbudget"
        color="magenta"
      />
    );

    const badge = screen.getByTestId('TestId_badge_for_Overbudget');

    expect(badge).toHaveClass('magenta', { exact: false });
    expect(screen.getByText('Overbudget')).toBeVisible();
  });
  test('works correctly with size and icon name props', () => {
    setup(
      <Badge
        text="Overbudget"
        color="orange"
        iconName="local_offer"
        size="lg"
      />
    );

    const badge = screen.getByTestId('TestId_badge_for_Overbudget');

    expect(badge).toHaveClass('orange large withIcon', { exact: false });
    expect(screen.getByText('Overbudget')).toBeVisible();
    expect(screen.getByText('local_offer')).toBeVisible();
  });
});
