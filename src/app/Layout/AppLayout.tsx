import type { ReactNode } from 'react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PaginationUrlParams } from 'shared/ui/Pagination';
import { SideModalContainer } from 'shared/ui/SideModal';

import { ContractorLayoutMenu } from './ContractorLayoutMenu';
import { LayoutHeader } from './LayoutHeader';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <PaginationUrlParams />
      <ToastContainer />
      <div className="flex h-screen flex-col">
        <div className="relative flex flex-1 overflow-hidden">
          <SideModalContainer />
          <ContractorLayoutMenu />
          <div className="flex w-full flex-col overflow-hidden bg-white">
            <LayoutHeader />
            <div className="flex-1 overflow-y-scroll p-8">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
