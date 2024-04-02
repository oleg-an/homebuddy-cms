import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'outline', 'outline-second'],
      control: { type: 'radio' },
    },
    size: {
      options: ['big', 'medium', 'small'],
      control: { type: 'radio' },
    },
    iconLeftName: {
      options: ['', 'home', 'add_circle_outline'],
      control: { type: 'radio' },
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default meta;
type Story = StoryObj<typeof Button>;
// BIG
export const PrimaryBig: Story = {
  args: {
    children: 'Text',
  },
};
export const PrimaryWithLeftIconBig: Story = {
  args: {
    ...PrimaryBig.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const PrimaryWithRightIconBig: Story = {
  args: {
    ...PrimaryBig.args,
    iconRightName: 'add_circle_outline',
  },
};
export const PrimaryWithLeftAndRightIconBig: Story = {
  args: {
    ...PrimaryBig.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineBig: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
  },
};
export const OutlineWithLeftIconBig: Story = {
  args: {
    ...OutlineBig.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const OutlineWithLeftAndRightIconBig: Story = {
  args: {
    ...OutlineBig.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSecondBig: Story = {
  args: {
    children: 'Text',
    variant: 'outline-second',
  },
};
export const OutlineSecondWithLeftIconBig: Story = {
  args: {
    ...OutlineSecondBig.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const OutlineSecondWithRightIconBig: Story = {
  args: {
    ...OutlineSecondBig.args,
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSecondWithLeftAndRightIconBig: Story = {
  args: {
    ...OutlineSecondBig.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
// Medium
export const PrimaryMedium: Story = {
  args: {
    children: 'Text',
    size: 'medium',
  },
};
export const PrimaryWithLeftIconMedium: Story = {
  args: {
    ...PrimaryMedium.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const PrimaryWithRightIconMedium: Story = {
  args: {
    ...PrimaryMedium.args,
    iconRightName: 'add_circle_outline',
  },
};
export const PrimaryWithLeftAndRightIconMedium: Story = {
  args: {
    ...PrimaryMedium.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineMedium: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
    size: 'medium',
  },
};
export const OutlineWithLeftIconMedium: Story = {
  args: {
    ...OutlineMedium.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const OutlineWithRightIconMedium: Story = {
  args: {
    ...OutlineMedium.args,
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineWithLeftAndRightIconMedium: Story = {
  args: {
    ...OutlineMedium.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSecondMedium: Story = {
  args: {
    children: 'Text',
    variant: 'outline-second',
    size: 'medium',
  },
};
export const OutlineSecondWithLeftIconMedium: Story = {
  args: {
    ...OutlineSecondMedium.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const OutlineSecondWithRightIconMedium: Story = {
  args: {
    ...OutlineSecondMedium.args,
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSecondWithLeftAndRightIconMedium: Story = {
  args: {
    ...OutlineSecondMedium.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
// Small
export const PrimarySmall: Story = {
  args: {
    children: 'Text',
    size: 'small',
  },
};
export const PrimaryWithLeftIconSmall: Story = {
  args: {
    ...PrimarySmall.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const PrimaryWithRightIconSmall: Story = {
  args: {
    ...PrimarySmall.args,
    iconRightName: 'add_circle_outline',
  },
};
export const PrimaryWithLeftAndRightIconSmall: Story = {
  args: {
    ...PrimarySmall.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSmall: Story = {
  args: {
    children: 'Text',
    variant: 'outline',
    size: 'small',
  },
};
export const OutlineWithLeftIconSmall: Story = {
  args: {
    ...OutlineSmall.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const OutlineWithRightIconSmall: Story = {
  args: {
    ...OutlineSmall.args,
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineWithLeftAndRightIconSmall: Story = {
  args: {
    ...OutlineSmall.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSecondSmall: Story = {
  args: {
    children: 'Text',
    variant: 'outline-second',
    size: 'small',
  },
};
export const OutlineSecondWithLeftIconSmall: Story = {
  args: {
    ...OutlineSecondSmall.args,
    iconLeftName: 'add_circle_outline',
  },
};
export const OutlineSecondWithRightIconSmall: Story = {
  args: {
    ...OutlineSecondSmall.args,
    iconRightName: 'add_circle_outline',
  },
};
export const OutlineSecondWithLeftAndRightIconSmall: Story = {
  args: {
    ...OutlineSecondSmall.args,
    iconLeftName: 'add_circle_outline',
    iconRightName: 'add_circle_outline',
  },
};
