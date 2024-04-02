import type { Meta, StoryFn } from '@storybook/react';

import { Estimator } from './Estimator';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/Estimator',
  component: Estimator,
} as Meta<typeof Estimator>;

// eslint-disable-next-line react/function-component-definition
const TemplateEstimator: StoryFn<typeof Estimator> = (props) => {
  return (
    <div className="w-[340px]">
      <Estimator {...props} />
    </div>
  );
};

export const EstimatorStory = TemplateEstimator.bind({});

EstimatorStory.args = {
  title: 'Good to know!',
  tooltipContent:
    "This amount is calculated from all ZIP Codes' performance in the previous 4 weeks. Bids are not taken into account so data may not be entirely accurate.",
  items: [
    { info: 'Average of Bids', content: '$80' },
    { info: 'Lead volume range', content: '50 - 80' },
  ],
};
