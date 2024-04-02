import { isCorrectQueryParams } from './url';

describe('isCorrectQueryParams', () => {
  test('url has parameter', () => {
    const url =
      'https://api-rc.stage.sirenltd.dev/v1/internal/campaign-groups?sort%5Bcampaign_group%5D%5BcreatedAt%5D=desc';

    expect(
      isCorrectQueryParams(url, {
        inQuery: {
          'sort[campaign_group][createdAt]': 'desc',
        },
      })
    ).toBe(true);
  });

  test('url does not have parameter, that should be in it', () => {
    const url =
      'https://api-rc.stage.sirenltd.dev/v1/internal/campaign-groups?sort%5Bcampaign_group%5D%5BcreatedAt%5D=desc';

    expect(
      isCorrectQueryParams(url, {
        inQuery: {
          'sort[campaign_group][createdAt]': 'asc',
        },
      })
    ).toBe(false);
  });

  test('url should not have page parameter', () => {
    const url =
      'https://api-rc.stage.sirenltd.dev/v1/internal/campaign-groups?sort%5Bcampaign_group%5D%5BcreatedAt%5D=desc';

    expect(
      isCorrectQueryParams(url, {
        outOfQuery: {
          page: '1',
        },
      })
    ).toBe(true);
  });

  test('url should not have sort parameter', () => {
    const url =
      'https://api-rc.stage.sirenltd.dev/v1/internal/campaign-groups?sort%5Bcampaign_group%5D%5BcreatedAt%5D=desc';

    expect(
      isCorrectQueryParams(url, {
        outOfQuery: {
          'sort[campaign_group][createdAt]': 'desc',
        },
      })
    ).toBe(false);
  });

  test('url should have 1 parameter and should not have another', () => {
    const url =
      'https://api-rc.stage.sirenltd.dev/v1/internal/campaign-groups?sort%5Bcampaign_group%5D%5BcreatedAt%5D=desc';

    expect(
      isCorrectQueryParams(url, {
        inQuery: {
          'sort[campaign_group][createdAt]': 'desc',
        },
        outOfQuery: {
          page: '1',
        },
      })
    ).toBe(true);
  });

  test('url should have parameter that it should not have', () => {
    const url =
      'https://api-rc.stage.sirenltd.dev/v1/internal/campaign-groups?sort%5Bcampaign_group%5D%5BcreatedAt%5D=desc&page=1';

    expect(
      isCorrectQueryParams(url, {
        inQuery: {
          'sort[campaign_group][createdAt]': 'asc',
        },
        outOfQuery: {
          page: '1',
        },
      })
    ).toBe(false);
  });
});
