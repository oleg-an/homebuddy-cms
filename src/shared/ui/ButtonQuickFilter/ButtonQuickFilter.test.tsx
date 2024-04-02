import { screen } from '@testing-library/react';
import { setup } from 'shared/lib/testing';

import { ButtonQuickFilter } from './ButtonQuickFilter';

describe('ButtonQuickFilter', () => {
  it('renders without errors', () => {
    setup(<ButtonQuickFilter onClick={() => {}} />);
  });

  it('calls onClick prop when clicked', async () => {
    const onClick = jest.fn();
    const { container, user } = setup(<ButtonQuickFilter onClick={onClick} />);

    // eslint-disable-next-line testing-library/no-node-access, @typescript-eslint/no-non-null-assertion
    const button = container.querySelector('.border')!;

    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies className prop', () => {
    setup(
      <ButtonQuickFilter
        onClick={() => {}}
        className="custom-class"
      />
    );

    expect(screen.getByTestId('TestId__button-quick-filter')).toHaveClass('custom-class');
  });

  it('applies isActivated prop', () => {
    const { container } = setup(
      <ButtonQuickFilter
        onClick={() => {}}
        isActivated
      />
    );

    expect(screen.getByTestId('TestId__button-quick-filter')).toHaveClass('bg-slate-200');
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.querySelector('span')).toHaveClass('text-slate-600');
  });
});
