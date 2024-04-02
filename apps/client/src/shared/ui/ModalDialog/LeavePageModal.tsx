import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { noop } from 'shared/lib/functions';
import { useHidable } from 'shared/lib/hooks';
import { Button } from 'shared/ui/Button';
import { ModalDialog } from 'shared/ui/ModalDialog';

interface LeavePageModalProps {
  isOpen?: boolean;
  isForcedOpen?: boolean;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
  onClose?: () => void;
  goForward?: boolean;
  btnYesLabel?: string;
  btnNoLabel?: string;
  title?: string;
  subtitle?: string;
  modalClassName?: string;
  noModalPaths?: string[];
}

export function LeavePageModal({
  isOpen,
  isForcedOpen = false,
  onConfirm,
  onCancel,
  btnYesLabel = 'Yes',
  btnNoLabel = 'No',
  title = 'Do you want to leave the page?',
  subtitle,
  modalClassName,
  noModalPaths,
  goForward = true,
  onClose,
}: LeavePageModalProps) {
  const history = useHistory();
  const letGoForward = useRef(noop);
  const dialog = useHidable(false);

  const noModalsPathDeps = noModalPaths?.join('');

  useEffect(() => {
    const unblock = history.block(({ pathname, search }) => {
      if (noModalPaths?.some((substring) => `${pathname}${search}`.includes(substring))) {
        return;
      }

      letGoForward.current = () => {
        unblock();
        history.push({ pathname, search });
      };

      if (isOpen) {
        dialog.show();

        return false;
      }

      return undefined;
    });

    return unblock;
  }, [isOpen, noModalsPathDeps]);

  const handleClose = async () => {
    dialog.hide();
    onClose?.();
  };

  const handleCancelClick = async () => {
    dialog.hide();
    await onCancel?.();
  };

  return (
    <ModalDialog
      isOpen={dialog.isShown || isForcedOpen}
      onClose={handleClose}
      title={title}
      subtitle={subtitle}
      className={modalClassName}
    >
      <Button
        className="mt-6"
        onClick={async () => {
          dialog.hide();
          await onConfirm?.();
          if (goForward) {
            letGoForward.current();
          }
        }}
      >
        {btnYesLabel}
      </Button>
      <Button
        className="mt-2"
        onClick={handleCancelClick}
        variant="outline-second"
      >
        {btnNoLabel}
      </Button>
    </ModalDialog>
  );
}
