import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  const root = document.createElement('div');

  it('renders without crashing', () => {
    render(
      <Tooltip
        placement="top-start"
        content="Tooltip Content"
        rootElement={root}
      >
        Hover me
      </Tooltip>
    );
  });
  it('Tooltip is not visible by default', () => {
    const { queryByText } = render(
      <Tooltip
        placement="top-start"
        content="Tooltip Content"
        rootElement={root}
      >
        Hover me
      </Tooltip>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(queryByText('Tooltip Content')).not.toBeInTheDocument();
  });
});
