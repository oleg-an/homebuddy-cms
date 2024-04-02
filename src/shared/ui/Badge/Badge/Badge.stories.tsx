import { Badge } from 'shared/ui/Badge';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/Badge',
  component: Badge,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Badge>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Paid',
  color: 'deepGreen',
};
