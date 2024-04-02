import { Roles } from 'shared/lib/store';
import { usePageTitle } from 'shared/lib/title';
import { Login } from 'features/login';
import { ContractorPublicPageWrapper } from 'widgets/ContractorPublicPageWrapper';

export function ContractorAuth() {
  usePageTitle('Log In', Roles.Contractor);

  return (
    <ContractorPublicPageWrapper>
      <div>
        <div className="mb-1 text-base font-medium text-slate-900">&#128075; Welcome</div>
        <div className="mb-5 text-lg font-semibold text-slate-900">Login as a contractor</div>
        <Login
          apiType="app"
          role={Roles.Contractor}
        />
      </div>
    </ContractorPublicPageWrapper>
  );
}
