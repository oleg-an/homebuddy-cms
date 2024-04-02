import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';
import { Button } from 'shared/ui/Button';

import { SideModal } from './SideModal';
import { SideModalBody } from './SideModalBody';
import { useModalsActions } from './UseSideModalStore';

interface ExitEditingModalProps {
  onExit?: () => void;
}

export function ExitEditingModal({ onExit }: ExitEditingModalProps) {
  const { close, closeAll } = useModalsActions();

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
    closeAll();
  };

  return (
    <SideModal>
      <SideModalBody>
        <div className="flex h-full flex-col justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2 text-center text-xl font-bold">Exit editing?</div>
            <div className="mb-6 text-center text-sm">Changes you made so far will not be saved.</div>
            <Button
              className="mb-2 w-63"
              onClick={close}
              {...getDataAutoTestAttributes(['leave-modal-back-btn'])}
            >
              Back to editing
            </Button>
            <Button
              className="w-63"
              onClick={handleExit}
              variant="outline-second"
              {...getDataAutoTestAttributes(['leave-modal-close-btn'])}
            >
              Exit without saving
            </Button>
          </div>
        </div>
      </SideModalBody>
    </SideModal>
  );
}
