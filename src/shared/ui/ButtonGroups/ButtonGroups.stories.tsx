import type { Meta, StoryObj } from '@storybook/react';

import { ButtonGroups } from '.';

const meta: Meta<typeof ButtonGroups> = {
  title: 'ui/ButtonGroups',
  component: ButtonGroups,
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof ButtonGroups>;

const itemsPrimary = [
  {
    id: 1,
    label: 'View all',
    // eslint-disable-next-line no-console
    onClick: () => console.log('View all'),
    isSelected: true,
  },
  {
    id: 2,
    label: 'Spent 80%+',
    // eslint-disable-next-line no-console
    onClick: () => console.log('Spent 80%+'),
    isSelected: false,
  },
  {
    id: 3,
    label: 'Overbudget',
    // eslint-disable-next-line no-console
    onClick: () => console.log('Overbudget'),
    isSelected: false,
  },
  {
    id: 4,
    label: 'With updates',
    // eslint-disable-next-line no-console
    onClick: () => console.log('With updates'),
    isSelected: false,
  },
];

export const Primary: Story = {
  args: {
    items: itemsPrimary,
  },
};

const itemsWithCounter = [
  {
    id: 1,
    label: 'View all',
    // eslint-disable-next-line no-console
    onClick: () => console.log('View all'),
  },
  {
    id: 2,
    label: 'Overbudget',
    // eslint-disable-next-line no-console
    onClick: () => console.log('Overbudget'),
    counter: 3,
  },
];

export const withCounter: Story = {
  args: {
    items: itemsWithCounter,
    selectedId: 1,
  },
};
