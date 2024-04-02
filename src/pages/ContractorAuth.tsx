import { Roles } from 'shared/lib/store';
import { usePageTitle } from 'shared/lib/title';
import { Login } from 'features/login';
import { ContractorPublicPageWrapper } from 'widgets/ContractorPublicPageWrapper';

export function ContractorAuth() {
  usePageTitle('Log In', Roles.Contractor);

  return (
    <ContractorPublicPageWrapper>
      <div>
        <div className="mb-2 text-lg font-semibold text-slate-900">Login</div>
        <Login
          apiType="app"
          role={Roles.Contractor}
        />
      </div>
    </ContractorPublicPageWrapper>
  );
}
