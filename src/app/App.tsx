import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { pageRoutes } from 'shared/routes';
import { Loader } from 'shared/ui/Loader';
import { Error404 } from 'pages/Error404';
import { EditWizard } from 'pages/Wizards/EditWizard';
import { WizardList } from 'pages/Wizards/WizardList';
import { CreateWizard } from 'pages/Wizards/CreateWizard';

import { AppLayout } from './Layout/AppLayout';

export function App() {
  return (
    <AppLayout>
      <Suspense fallback={<Loader className="mt-20 flex justify-center" />}>
        <Switch>
          <Route path={pageRoutes.app.newWizard}>
            <CreateWizard />
          </Route>
          <Route path={pageRoutes.app.wizard}>
            <EditWizard />
          </Route>
          <Route path={pageRoutes.app.wizardList}>
            <WizardList />
          </Route>
          <Route
            exact
            path={pageRoutes.app.main}
          >
            <Redirect to={pageRoutes.app.wizardList} />
          </Route>
          <Route
            path={pageRoutes.app.notFound}
            component={Error404}
          />
        </Switch>
      </Suspense>
    </AppLayout>
  );
}
