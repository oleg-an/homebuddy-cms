import { useEffect } from 'react';

import { ExitEditingModal } from './ExitEditingModal';
import { useModalsActions } from './UseSideModalStore';

interface AlertModalProps {
  showCondition: boolean;
  onExit?: () => void;
}

export function AlertModal({ showCondition, onExit }: AlertModalProps) {
  const { removeCloseEvent, addCloseEvent, open } = useModalsActions();

  useEffect(() => {
    if (!showCondition) {
      removeCloseEvent();

      return;
    }
    addCloseEvent(() => open(<ExitEditingModal onExit={onExit} />));
  }, [showCondition]);

  return <></>;
}
