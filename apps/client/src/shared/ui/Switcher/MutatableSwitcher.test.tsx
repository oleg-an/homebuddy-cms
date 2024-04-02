import { act } from '@testing-library/react';
import { MutatableSwitcher } from 'shared/ui/Switcher';
import { setup } from 'shared/lib/testing';

describe('MutatableSwitcher', () => {
  test('Click and check mutate params after success response', async () => {
    const useUpdateCampaignMock = jest.fn();
    const mutateAsync = jest.fn();

    useUpdateCampaignMock.mockImplementation(() => ({
      mutateAsync: (params: { isActive: boolean }) => {
        mutateAsync(params);

        return Promise.resolve();
      },
    }));

    await act(async () => {
      const { user, getByTestId } = setup(
        <MutatableSwitcher
          useUpdate={() => useUpdateCampaignMock()}
          name="switcher"
          isChecked
          buildMutateArgs={(isActive) => ({ isActive })}
          afterMutate={Promise.resolve}
        />
      );

      await user.click(getByTestId('TestId__switcher'));
      expect(mutateAsync).toHaveBeenCalledWith({ isActive: false });
    });
  });

  test('Click and return initial state after fail response', async () => {
    const useUpdateCampaignMock = jest.fn();

    useUpdateCampaignMock.mockImplementation(() => ({
      mutateAsync: () => {
        return Promise.reject();
      },
    }));

    await act(async () => {
      const { user, getByTestId } = setup(
        <MutatableSwitcher
          useUpdate={() => useUpdateCampaignMock()}
          name="switcher"
          isChecked
          buildMutateArgs={(isActive) => ({ isActive })}
          afterMutate={Promise.resolve}
        />
      );

      await user.click(getByTestId('TestId__switcher'));
      expect(getByTestId('TestId__switcher')).toHaveAttribute('data-checked', 'true');
    });
  });
});
