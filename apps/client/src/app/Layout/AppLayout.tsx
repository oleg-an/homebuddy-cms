import type { ReactNode } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Roles } from 'shared/lib/store';
import { PaginationUrlParams } from 'shared/ui/Pagination';
import { SideModalContainer } from 'shared/ui/SideModal';

import { ContractorLayoutMenu } from './ContractorLayoutMenu';
import { LayoutHeader } from './LayoutHeader';

interface AppLayoutProps {
  role: Roles | null;
  publicPages: string[];
  children: ReactNode;
}

export function AppLayout({ children, publicPages, role }: AppLayoutProps) {
  const location = useLocation();
  const isAuthenticatedPage = !publicPages.includes(location.pathname);

  return (
    <>
      <PaginationUrlParams />
      <ToastContainer />
      {isAuthenticatedPage ? (
        <div className="flex h-screen flex-col">
          <div className="relative flex flex-1 overflow-hidden">
            <SideModalContainer />
            {role === Roles.Contractor && <ContractorLayoutMenu />}
            <div className="flex w-full flex-col overflow-hidden bg-white">
              <LayoutHeader />
              <div className="flex-1 overflow-y-scroll p-8">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
