import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'shared/ui/Button';

import { SideModal } from './SideModal';
import { useModalsActions } from './UseSideModalStore';

export function ErrorModal({ isOpen }: { isOpen: boolean }) {
  const history = useHistory();
  const { open } = useModalsActions();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    open(
      <SideModal>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="text-center">
            <div className="mb-2 text-xl font-medium">🤔 Something went wrong</div>
            <div className="mb-6 text-sm">Please reload the page or try again later.</div>
            <Button
              className="w-43"
              onClick={() => history.go(0)}
              iconLeftName="refresh"
            >
              <div className="font-semibold">Reload page</div>
            </Button>
          </div>
        </div>
      </SideModal>
    );
  }, [isOpen]);

  return <></>;
}
