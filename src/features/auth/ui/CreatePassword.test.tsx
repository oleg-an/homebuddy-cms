import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { useCheckPasswordToken, useResetPassword, useCheckPassword } from 'entities/password';
import { pageRoutes } from 'shared/routes';
import { noop } from 'shared/lib/functions';
import { setup } from 'shared/lib/testing';

import { CreatePassword } from './CreatePassword';

const checkPasswordTokenMock = useCheckPasswordToken as jest.Mock;
const resetPasswordMock = useResetPassword as jest.Mock;
const checkPasswordMock = useCheckPassword as jest.Mock;

jest.mock('entities/password/api');
jest.mock('entities/profile/api');

const rulesMockData = {
  data: [],
};

function setUrlSearch(search: string) {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      ...window.location,
      search,
    },
  });
}

describe('CreatePassword', () => {
  test('go to auth page if page url does not contains token or email', async () => {
    const history = createMemoryHistory();

    checkPasswordTokenMock.mockImplementation(() => ({
      data: undefined,
      mutate: noop,
    }));
    resetPasswordMock.mockImplementation(() => ({ data: undefined }));
    (checkPasswordMock as jest.Mock).mockReturnValue({
      mutateAsync: () => rulesMockData,
      isLoading: false,
    });
    setUrlSearch('');
    setup(
      <Router history={history}>
        <CreatePassword apiType="app" />
      </Router>
    );

    await waitFor(() => checkPasswordMock());
    expect(history.location.pathname).toBe(pageRoutes.app.auth);
  });

  test('page url contains token and email', async () => {
    const history = createMemoryHistory();

    checkPasswordTokenMock.mockImplementation(() => ({
      data: undefined,
      mutate: noop,
    }));
    resetPasswordMock.mockImplementation(() => ({ data: undefined }));
    (checkPasswordMock as jest.Mock).mockReturnValue({
      mutateAsync: () => rulesMockData,
      isLoading: false,
    });

    setUrlSearch('?token=dvds&email=homebuddy-qa+johndoe@sirenltd.com');
    setup(
      <Router history={history}>
        <CreatePassword apiType="app" />
      </Router>
    );
    await waitFor(() => checkPasswordMock());
    expect(history.location.pathname).toBe('/');
  });
});
