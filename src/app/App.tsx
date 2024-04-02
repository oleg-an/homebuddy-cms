import React, { Suspense, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { useClientDataStore } from 'shared/lib/store';
import { Roles } from 'shared/lib/store';
import { Loader } from 'shared/ui/Loader';
import { Error404 } from 'pages/Error404';
import { getClientData } from 'shared/lib/api';
import { EditWizard } from 'pages/Wizards/EditWizard';

import { ContractorLayoutContent } from './Layout/ContractorLayoutContent';
import { AppLayout } from './Layout/AppLayout';
import { setRedirectUri } from './lib';
import { ContractorAuth, ContractorPasswordRecovery } from './lazy-pages';

const publicPages = [
  pageRoutes.internal.auth,
  pageRoutes.app.recovery,
  pageRoutes.app.auth,
  pageRoutes.app.newPassword,
  pageRoutes.internal.recovery,
  pageRoutes.internal.newPassword,
];

export function App() {
  const { setRole, getRole } = useClientDataStore();
  const role = getRole();
  const history = useHistory();

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
          <Route
            path={pageRoutes.app.recovery}
            component={ContractorPasswordRecovery}
          />
          {role === Roles.Contractor && (
            <Route>
              <ContractorLayoutContent>
                <Switch>
                  <Route path={pageRoutes.app.wizard}>
                    <EditWizard />
                  </Route>
                  <Route
                    exact
                    path={pageRoutes.app.main}
                  >
                    <Redirect to={pageRoutes.app.campaigns} />
                  </Route>
                  <Route>
                    <Redirect to={pageRoutes.app.notFound} />
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
