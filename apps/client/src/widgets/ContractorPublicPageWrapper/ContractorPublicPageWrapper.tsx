import type { ReactNode } from 'react';

export function ContractorPublicPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen justify-between">
      <div className="bg-white px-19 py-4 ">
        <div className="h-[49px] w-[206px] bg-[url('/assets/contractor-auth-logo.svg')] bg-cover" />
        <div className="mt-57 w-85">{children}</div>
      </div>
      <div className="w-full bg-[url('/assets/contractor-auth.jpg')] bg-cover bg-right" />
    </div>
  );
}
