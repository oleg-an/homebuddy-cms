import type { ReactNode } from 'react';

// Temporary disabled in https://sirengroup.atlassian.net/browse/HB-1448
// Will be removed in one of the future task, when call center gets real phone number
export const phoneBlockIsTemporaryDisabled = true;

export function ContractorLayoutContent({ children }: { children?: ReactNode }) {
  return <>{children}</>;
}
