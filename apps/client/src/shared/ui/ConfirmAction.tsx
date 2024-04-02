import { useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { getDataAutoTestAttributes } from 'shared/lib/data-auto-test';

interface ConfirmActionProps {
  isConfirmLoading: boolean;
  cancel: () => void;
  confirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmAction({
  isConfirmLoading,
  cancel,
  confirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmActionProps) {
  const [secsLeft, setSecsLeft] = useState(3);

  useEffect(() => {
    const intervalRef = window.setInterval(() => {
      setSecsLeft((secsLeft) => {
        if (!secsLeft) {
          window.clearInterval(intervalRef);

          return 0;
        }

        return secsLeft - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalRef);
  }, []);

  return (
    <>
      <Button
        loading={isConfirmLoading}
        disabled={!!secsLeft}
        className="mb-2 w-full"
        type="button"
        variant="danger"
        size="medium"
        onClick={confirm}
        {...getDataAutoTestAttributes(['button-confirm-action'])}
      >
        {!!secsLeft && (
          <span>
            {confirmText} ({secsLeft}s)
          </span>
        )}
        {!secsLeft && <span>{confirmText}</span>}
      </Button>
      <Button
        type="button"
        className="w-full"
        size="medium"
        onClick={cancel}
        variant="outline-second"
        {...getDataAutoTestAttributes(['button-cancel-action'])}
      >
        {cancelText}
      </Button>
    </>
  );
}
