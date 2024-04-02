import { lazy } from 'react';

const ContractorAuth = lazy(() =>
  import('pages/ContractorAuth').then((module) => ({
    default: module.ContractorAuth,
  }))
);

const ContractorPasswordRecovery = lazy(() =>
  import('pages/ContractorPasswordRecovery').then((module) => ({
    default: module.ContractorPasswordRecovery,
  }))
);

export { ContractorAuth, ContractorPasswordRecovery };
