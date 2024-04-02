export interface ExampleModel {
  id: number;
  createdAt: string;
  number: string;
  time: {
    day: string;
    from: string;
    to: string;
    isDisabled?: boolean;
  }[];
  group: {
    groupNumber: string;
    groupNames: {
      id: number;
      name: string;
    }[];
  };
  weeklyBudget: {
    budget: {
      amount: string;
      currency: 'USD';
    };
    spent: {
      amount: string;
      currency: 'USD';
    };
    spentToBudgetPercent: number;
  };
  counters: {
    campaigns: number;
    contractors: number;
    overBudgedCampaigns: number;
    zipCodesInUse: number;
    totalZipCodes: number;
    percentZipCodesInUse: number;
    budgetSpent80percent: number;
  };
  adNetworks: {
    groupId: number;
    networks: string[];
  }[];
}

export const data: ExampleModel[] = [
  {
    id: 1,
    createdAt: '2021-01-01',
    number: '1234',
    group: {
      groupNumber: '1',
      groupNames: [
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
        { id: 3, name: 'Group 3' },
      ],
    },
    time: [
      {
        day: 'Monday',
        from: '10:00 am',
        to: '11:00 am',
      },
      {
        day: 'Tuesday',
        from: '10:00 am',
        to: '11:00 am',
      },
      {
        day: 'Wednesday',
        from: '10:00 am',
        to: '11:00 am',
      },
      {
        day: 'Thursday',
        from: '10:00 am',
        to: '11:00 am',
      },
      {
        day: 'Friday',
        from: '10:00 am',
        to: '11:00 am',
      },
      {
        day: 'Saturday',
        from: '10:00 am',
        to: '11:00 am',
        isDisabled: true,
      },
      {
        day: 'Sunday',
        from: '10:00 am',
        to: '11:00 am',
        isDisabled: true,
      },
    ],
    weeklyBudget: {
      budget: {
        amount: '8500',
        currency: 'USD',
      },
      spent: {
        amount: '39600',
        currency: 'USD',
      },
      spentToBudgetPercent: 466,
    },
    counters: {
      campaigns: 4,
      overBudgedCampaigns: 0,
      contractors: 4,
      zipCodesInUse: 10,
      totalZipCodes: 12,
      percentZipCodesInUse: 120,
      budgetSpent80percent: 0,
    },
    adNetworks: [
      {
        networks: ['facebook', 'native'],
        groupId: 1,
      },
      {
        networks: ['facebook'],
        groupId: 2,
      },
    ],
  },
];
