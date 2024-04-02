import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { TextWithBadge } from './TextWithBadge';

describe('TextWithBadge component', () => {
  it('should show text and Badge', () => {
    render(
      <TextWithBadge
        text="Text prop"
        badgeProps={{ text: 'Overbudget', color: 'deepBlue' }}
      />
    );

    expect(screen.getByText('Text prop')).toBeVisible();
    expect(screen.getByText('Overbudget')).toBeVisible();
  });
});
