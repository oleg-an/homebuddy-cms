import type { StepModel } from './models';

export const mock: StepModel[] = [
  {
    title: 'Are you considering any changes to your layout, such as relocating your appliances or sink?',
    name: 'replace',
    select: {
      isMultiselect: false,
      options: [
        {
          title: 'Reface all or most cabinets',
          value: 'roofCurrentCondition',
          nextStepId: 3,
        },
        {
          title: 'Repair existing windows',
          value: 'repair',
        },
        {
          title: 'Not sure',
          value: 'notSure',
        },
      ],
    },
  },
  {
    title: 'Why do you want to replace your windows?',
    name: 'replace',
  },
];

export const Wizards = [
  {
    id: 1,
    steps: mock,
  },
];
