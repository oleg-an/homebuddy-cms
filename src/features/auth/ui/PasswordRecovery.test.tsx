import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import type { MemoryHistory } from 'history/createMemoryHistory';
import React from 'react';
import { Router } from 'react-router-dom';
import { useForgotPassword } from 'entities/password';
import { pageRoutes } from 'shared/routes';
import { noop } from 'shared/lib/functions';
import { getErrorResponse, setup } from 'shared/lib/testing';

import { PasswordRecovery } from './PasswordRecovery';

const forgotPasswordMock = useForgotPassword as jest.Mock;

jest.mock('entities/password/api');

describe('PasswordRecovery', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  test('enter valid email and show success message', async () => {
    forgotPasswordMock.mockImplementation(() => ({
      mutate: noop,
    }));

    const { user } = setup(
      <Router history={history}>
        <PasswordRecovery apiType="app" />
      </Router>
    );

    forgotPasswordMock.mockImplementation(() => ({ data: '' }));
    await user.click(screen.getByText('Send instructions'));
    expect(screen.getByText('Email was sent'));
  });

  test('enter invalid email and get error', async () => {
    forgotPasswordMock.mockImplementation(() => ({
      mutate: noop,
    }));
    const { user } = setup(
      <Router history={history}>
        <PasswordRecovery apiType="app" />
      </Router>
    );
    const errors = getErrorResponse({
      email: [
        {
          code: 'email_email',
          message: 'The email must be a valid email address.',
        },
      ],
    });

    forgotPasswordMock.mockImplementation(() => errors);
    await user.click(screen.getByText('Send instructions'));
    expect(screen.getByText('The email must be a valid email address.'));
  });

  test('click "Back to Login" and got to auth page', async () => {
    forgotPasswordMock.mockImplementation(() => ({
      mutate: noop,
    }));

    const { user } = setup(
      <Router history={history}>
        <PasswordRecovery apiType="app" />
      </Router>
    );

    forgotPasswordMock.mockImplementation(() => ({ data: {} }));
    await user.click(screen.getByText('Back to Login'));
    expect(history.location.pathname).toBe(pageRoutes.app.auth);
  });

  test('check "back to Login" link on manager side', async () => {
    forgotPasswordMock.mockImplementation(() => ({ mutate: noop }));

    const { user } = setup(
      <Router history={history}>
        <PasswordRecovery apiType="internal" />
      </Router>
    );

    forgotPasswordMock.mockImplementation(() => ({ data: {} }));
    await user.click(screen.getByText('Back to Login'));
    expect(history.location.pathname).toBe(pageRoutes.internal.auth);
  });
});
