import { useModalsActions } from 'shared/ui/SideModal';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import React from 'react';
import { useEffect } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { urlResolver } from 'shared/lib/url';
import type { PageUiStates } from 'shared/lib/api';

export const MODAL_ID = 'modalId';

export const useModalFromUrlParam = (modalComponent: (id: number) => React.ReactNode, pageStates: PageUiStates) => {
  const { open } = useModalsActions();
  const location = useLocation();

  useEffect(() => {
    const modalId = Number(new URL(window.location.href).searchParams.get(MODAL_ID));

    if (!pageStates.isTableLoading && !pageStates.hasErrors && modalId) {
      open(modalComponent(modalId));
    }
  }, [pageStates.isTableLoading, pageStates.hasErrors, location.search]);
};

interface ModalFromUrlParamProps {
  pageStates: PageUiStates;
  children: (id: number) => ReactNode;
}

export function SideModalFromUrlParam({ pageStates, children }: ModalFromUrlParamProps) {
  useModalFromUrlParam((id) => children(id), pageStates);

  return <></>;
}

interface UseModalUrlParams {
  modalId: number | string;
  query: UseQueryResult;
  openInNewTab?: boolean;
}

export const useModalUrl = ({ modalId, query, openInNewTab }: UseModalUrlParams) => {
  const { closeAll } = useModalsActions();

  useEffect(() => {
    if (openInNewTab) {
      urlResolver.openNewTab(MODAL_ID, modalId.toString());
    } else {
      urlResolver.addParam(MODAL_ID, modalId.toString());
    }

    if (query.isError) {
      closeAll();
    }

    return () => urlResolver.removeParam(MODAL_ID);
  }, [query.isError, modalId, openInNewTab]);

  const isOpen = urlResolver.hasParam(MODAL_ID, modalId.toString());

  return { isOpen };
};
