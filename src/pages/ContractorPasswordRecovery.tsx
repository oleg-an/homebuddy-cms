import { Roles } from 'shared/lib/store';
import { usePageTitle } from 'shared/lib/title';
import { PasswordRecovery } from 'features/auth';
import { ContractorPublicPageWrapper } from 'widgets/ContractorPublicPageWrapper';

export function ContractorPasswordRecovery() {
  usePageTitle('Password Recovery', Roles.Contractor);

  return (
    <ContractorPublicPageWrapper>
      <PasswordRecovery apiType="app" />
    </ContractorPublicPageWrapper>
  );
}
