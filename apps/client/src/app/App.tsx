import React, { Suspense, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { useClientDataStore } from 'shared/lib/store';
import { Roles } from 'shared/lib/store';
import { Loader } from 'shared/ui/Loader';
import { Error404 } from 'pages/Error404';
import { getClientData } from 'shared/lib/api';
import { EditWizard } from 'pages/Wizards/EditWizard';
import { ContractorAuth } from 'pages/ContractorAuth';

import { useSentry } from './userSentry';
import { ContractorLayoutContent } from './Layout/ContractorLayoutContent';
import { AppLayout } from './Layout/AppLayout';
import { setRedirectUri } from './lib';

const publicPages = [pageRoutes.app.auth];

export function App() {
  const { setRole, getRole } = useClientDataStore();
  const role = getRole();
  const history = useHistory();

  useSentry();

  useEffect(() => {
    const savedRole = getClientData().role;

    setRole(savedRole);

    if (!savedRole && !publicPages.includes(history.location.pathname)) {
      const replaceUrl = setRedirectUri();

      history.replace(replaceUrl);
    }
  }, []);

  return (
    <AppLayout
      role={role}
      publicPages={publicPages}
    >
      <Suspense fallback={<Loader className="mt-20 flex justify-center" />}>
        <Switch>
          <Route
            path={pageRoutes.app.auth}
            component={ContractorAuth}
            exact
          />
          <Route
            path={pageRoutes.app.notFound}
            component={Error404}
          />
          {role === Roles.Contractor && (
            <Route>
              <ContractorLayoutContent>
                <Switch>
                  <Route path={pageRoutes.app.wizard}>
                    <EditWizard />
                  </Route>
                </Switch>
              </ContractorLayoutContent>
            </Route>
          )}
        </Switch>
      </Suspense>
    </AppLayout>
  );
}
