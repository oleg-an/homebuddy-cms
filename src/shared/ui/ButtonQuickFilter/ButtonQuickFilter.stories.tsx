import type { Meta, StoryObj } from '@storybook/react';

import { ButtonQuickFilter } from './ButtonQuickFilter';

const meta: Meta<typeof ButtonQuickFilter> = {
  title: 'ui/ButtonQuickFilter',
  component: ButtonQuickFilter,
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof ButtonQuickFilter>;

export const Primary: Story = {
  args: {
    // eslint-disable-next-line no-console
    onClick: () => console.log('clicked'),
    isActivated: false,
  },
};
