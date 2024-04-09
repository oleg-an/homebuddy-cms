import { lazy } from 'react';

const ContractorAuth = lazy(() =>
  import('pages/ContractorAuth').then((module) => ({
    default: module.ContractorAuth,
  }))
);

export { ContractorAuth };
